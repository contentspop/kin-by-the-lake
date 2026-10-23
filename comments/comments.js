/* KIN Design System — pinned comments + Export PDF
   Backend: Google Apps Script bridge → Notion (see apps-script.gs).
   Set the endpoint in comments-config.js. With no endpoint, comments stay in this browser (preview mode). */
(function () {
  if (window.__kinComments) return;
  window.__kinComments = true;

  var ENDPOINT = (window.KIN_COMMENTS_ENDPOINT || '').trim();
  var PREVIEW = !ENDPOINT;
  var BRASS = '#B38A45', LAKE = '#1E3D5A', OFF = '#F3EFE6', RED = '#A8412E';

  /* ---------- storage helpers ---------- */
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- page identity ---------- */
  function relPath() {
    var p = decodeURIComponent(location.pathname);
    var m = p.match(/\/(kin-by-the-lake|kin-design-system)\/(.*)$/);
    p = m ? m[2] : p.replace(/^\//, '');
    if (p === '' || /\/$/.test(p)) p += 'index.html';
    return p || 'index.html';
  }
  function pageKey() { return relPath() + (window.KIN_SCREEN ? '#' + window.KIN_SCREEN : ''); }
  function pageName() {
    var p = relPath();
    if (p === 'index.html' || p === '') return 'Home';
    if (/KIN-Brand-Book/.test(p)) return 'Brand Book';
    if (/KIN-Design-System/.test(p)) return 'Design System';
    if (/^questionnaire\//.test(p)) return 'Questionnaire';
    if (/^menu\//.test(p)) return 'Menu & Offer';
    if (/^(strategy|benchmark)\//.test(p)) return 'Strategy & Activation';
    if (/^photography\//.test(p)) return 'Photography Guideline';
    if (/^benchmark\//.test(p)) return 'Benchmark · Longrain';
    if (/ui_kits\/social/.test(p)) return 'Social';
    if (/ui_kits\/website/.test(p)) return 'Website' + (window.KIN_SCREEN ? ' · ' + window.KIN_SCREEN.charAt(0).toUpperCase() + window.KIN_SCREEN.slice(1) : '');
    if (/^guidelines\//.test(p)) return 'Guideline · ' + p.replace(/^guidelines\//, '').replace(/\.html$/, '');
    if (/^components\//.test(p)) return 'Components · ' + p.split('/')[1];
    return p;
  }

  /* ---------- anchoring ---------- */
  function anchorFor(el) {
    var a = el && el.closest && el.closest('[data-screen-label],section,[id]');
    while (a && a.id && /^(kinc-|root$)/.test(a.id)) a = a.parentElement && a.parentElement.closest('[data-screen-label],section,[id]');
    if (!a) return { el: document.body, key: 'doc' };
    if (a.getAttribute('data-screen-label')) return { el: a, key: 'label:' + a.getAttribute('data-screen-label') };
    if (a.tagName === 'SECTION') {
      var all = Array.prototype.slice.call(document.querySelectorAll('section'));
      return { el: a, key: 'section:' + all.indexOf(a) };
    }
    return { el: a, key: 'id:' + a.id };
  }
  function resolveAnchor(key) {
    if (!key || key === 'doc') return document.body;
    var i = key.indexOf(':'), t = key.slice(0, i), v = key.slice(i + 1);
    if (t === 'label') return document.querySelector('[data-screen-label="' + v.replace(/"/g, '\\"') + '"]') || document.body;
    if (t === 'id') return document.getElementById(v) || document.body;
    if (t === 'section') return document.querySelectorAll('section')[+v] || document.body;
    return document.body;
  }
  function sectionName(anchorEl) {
    if (!anchorEl || anchorEl === document.body) return '';
    var lbl = anchorEl.getAttribute('data-screen-label');
    if (lbl) return lbl;
    var h = anchorEl.querySelector('h1,h2,h3');
    return h ? h.textContent.trim().slice(0, 80) : '';
  }
  function docRect(el) {
    var r = el.getBoundingClientRect();
    return { left: r.left + scrollX, top: r.top + scrollY, width: r.width || 1, height: r.height || 1 };
  }

  function clean(t, n) { return String(t || '').replace(/\s+/g, ' ').trim().slice(0, n || 90); }
  function isOurs(el) { return !!(el && el.closest && el.closest('#kinc-bar,#kinc-layer,.kinc-pop,#kinc-shield,#kinc-hint,#kinc-toast')); }
  // nearest heading / label above (or at) the click point, inside the anchor
  function areaFor(anchorEl, px, py) {
    var root = anchorEl === document.body ? document.body : anchorEl;
    var cands = root.querySelectorAll('h1,h2,h3,h4,h5,h6,figcaption,legend,label,th,strong,span,div,p,a,button');
    var best = null, bestScore = 1e9;
    for (var i = 0; i < cands.length; i++) {
      var el = cands[i];
      if (isOurs(el)) continue;
      var isHead = /^(H[1-6]|FIGCAPTION|LEGEND|LABEL|TH)$/.test(el.tagName);
      if (!isHead) {
        if (el.children.length > 1) continue;
        var cs = getComputedStyle(el);
        var labelish = cs.textTransform === 'uppercase' || parseInt(cs.fontWeight, 10) >= 500 || /Cinzel/i.test(cs.fontFamily);
        if (!labelish) continue;
      }
      var t = clean(el.textContent, 120);
      if (t.length < 2 || t.length > 80) continue;
      var r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      var top = r.top + scrollY, bottom = r.bottom + scrollY, left = r.left + scrollX;
      if (top > py + 6) continue;                       // must start above / at the click
      var dy = Math.max(0, py - bottom);
      var inCol = px >= left - 40 && px <= left + Math.max(r.width, 560);
      var score = dy + (inCol ? 0 : 700) - (isHead ? 40 : 0);
      if (dy > 1600) continue;
      if (score < bestScore) { bestScore = score; best = t; }
    }
    return best || '';
  }
  // what the pin sits on: text under the cursor, or the image
  function clickedOn(target, cx, cy) {
    if (target && target.tagName === 'IMG') {
      var src = (target.getAttribute('src') || '').split('/').pop();
      return 'Image: ' + clean(target.alt || src, 80);
    }
    var range = document.caretRangeFromPoint ? document.caretRangeFromPoint(cx, cy) : null;
    var node = range && range.startContainer;
    if (node && node.nodeType === 3) { var t = clean(node.textContent, 90); if (t.length > 1) return '“' + t + '”'; }
    var bg = target && getComputedStyle(target).backgroundImage;
    if (bg && bg !== 'none' && !/gradient/.test(bg)) return 'Image: ' + clean(bg.replace(/^url\(["']?|["']?\)$/g, '').split('/').pop(), 80);
    var txt = target ? clean(target.innerText || '', 90) : '';
    return txt ? '“' + txt + '”' : '';
  }
  function pageTopic() {
    var p = relPath();
    if (/KIN-Brand-Book|^brand\//.test(p)) return 'Brand & Story';
    if (/^menu\//.test(p)) return 'Menu & Offer';
    if (/^(strategy|benchmark)\//.test(p)) return 'Strategy & Activation';
    if (/^questionnaire\//.test(p)) return '';
    return 'Design & Content';
  }
  function pageUrl() { return location.href.split('#')[0] + (window.KIN_SCREEN ? '#screen=' + window.KIN_SCREEN : ''); }

  /* ---------- transport (JSONP so responses are readable cross-origin) ---------- */
  function jsonp(params) {
    return new Promise(function (resolve, reject) {
      var cb = '__kinc' + Date.now() + Math.floor(Math.random() * 1e6);
      var s = document.createElement('script');
      var t = setTimeout(function () { cleanup(); reject(new Error('timeout')); }, 20000);
      function cleanup() { clearTimeout(t); try { delete window[cb]; } catch (e) { window[cb] = undefined; } s.remove(); }
      window[cb] = function (data) { cleanup(); resolve(data); };
      params.callback = cb;
      var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k] == null ? '' : params[k]); }).join('&');
      s.src = ENDPOINT + (ENDPOINT.indexOf('?') >= 0 ? '&' : '?') + q;
      s.onerror = function () { cleanup(); reject(new Error('network')); };
      document.head.appendChild(s);
    });
  }
  function previewStore() { try { return JSON.parse(lsGet('kinc-preview', '[]')); } catch (e) { return []; } }
  function fetchComments() {
    if (PREVIEW) return Promise.resolve(previewStore().filter(function (c) { return c.page === pageKey(); }));
    return jsonp({ action: 'list', page: pageKey() }).then(function (r) { if (!r.ok) throw new Error(r.error || 'error'); return r.comments || []; });
  }
  function saveComment(c) {
    if (PREVIEW) {
      var all = previewStore(); c.id = 'p' + Date.now(); c.ts = new Date().toISOString(); all.push(c); lsSet('kinc-preview', JSON.stringify(all));
      return Promise.resolve({ ok: true, id: c.id, ts: c.ts });
    }
    return jsonp({ action: 'add', page: c.page, section: c.section, area: c.area, clicked: c.clicked, topic: c.topic || pageTopic(), anchor: c.anchor, x: c.x, y: c.y, name: c.name, comment: c.comment, url: pageUrl() })
      .then(function (r) { if (!r.ok) throw new Error(r.error || 'error'); return r; });
  }

  /* ---------- styles ---------- */
  var css = '' +
    '#kinc-bar{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;gap:6px;font:500 11px/1 Montserrat,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase}' +
    '#kinc-bar button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:11px 14px;background:' + LAKE + ';color:' + OFF + ';box-shadow:0 6px 20px rgba(15,37,56,.28);border:1px solid rgba(243,239,230,.18)}' +
    '#kinc-bar button:hover{background:#16304A}#kinc-bar button[aria-pressed="true"]{background:' + BRASS + ';color:#0F2538}' +
    '#kinc-bar svg{width:15px;height:15px;flex:none}' +
    '#kinc-layer{position:absolute;left:0;top:0;width:0;height:0;z-index:2147482000}' +
    '.kinc-pin{position:absolute;width:28px;height:28px;margin:-28px 0 0 0;border-radius:50% 50% 50% 0;background:' + BRASS + ';color:#0F2538;border:2px solid ' + OFF + ';box-shadow:0 3px 10px rgba(15,37,56,.35);font:600 12px/24px Montserrat,system-ui,sans-serif;text-align:center;cursor:pointer;transition:transform .15s}' +
    '.kinc-pin:hover{transform:scale(1.12)}.kinc-pin.sending{opacity:.6}.kinc-pin.pulse{animation:kincpulse 1s ease-in-out 4}' +
    '@keyframes kincpulse{0%,100%{box-shadow:0 0 0 0 rgba(179,138,69,.7)}50%{box-shadow:0 0 0 16px rgba(179,138,69,0)}}' +
    '#kinc-shield{position:fixed;inset:0;z-index:2147482500;cursor:crosshair;background:rgba(30,61,90,.06)}' +
    '#kinc-hint{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:2147483001;background:' + LAKE + ';color:' + OFF + ';padding:10px 16px;font:500 11px/1.4 Montserrat,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 6px 20px rgba(15,37,56,.28)}' +
    '.kinc-pop{position:absolute;z-index:2147482800;width:min(300px,calc(100vw - 32px));background:#FBF9F4;color:' + LAKE + ';border:1px solid #D9D3C6;box-shadow:0 16px 48px rgba(15,37,56,.28);padding:14px;font:300 13px/1.55 Montserrat,system-ui,sans-serif}' +
    '.kinc-pop .kinc-meta{font:500 10px/1.4 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:' + BRASS + ';margin-bottom:6px}' +
    '.kinc-pop .kinc-body{white-space:pre-wrap;word-wrap:break-word}' +
    '.kinc-pop input,.kinc-pop textarea{box-sizing:border-box;width:100%;border:1px solid #D9D3C6;background:#fff;padding:8px 10px;font:300 13px/1.5 Montserrat,system-ui,sans-serif;color:' + LAKE + ';margin:0 0 8px;outline:none}' +
    '.kinc-pop input:focus,.kinc-pop textarea:focus{border-color:' + BRASS + '}.kinc-pop textarea{min-height:84px;resize:vertical}' +
    '.kinc-row{display:flex;gap:8px;justify-content:flex-end;align-items:center}' +
    '.kinc-row button{all:unset;cursor:pointer;padding:8px 12px;font:500 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase}' +
    '.kinc-row .kinc-go{background:' + LAKE + ';color:' + OFF + '}.kinc-row .kinc-x{color:' + LAKE + '}' +
    '.kinc-note{font:400 10px/1.4 Montserrat,system-ui,sans-serif;color:#6B7A88;margin-right:auto}' +
    '#kinc-toast{position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:2147483001;background:' + LAKE + ';color:' + OFF + ';padding:10px 16px;font:500 11px/1.4 Montserrat,system-ui,sans-serif;letter-spacing:.1em;box-shadow:0 6px 20px rgba(15,37,56,.28)}' +
    '#kinc-toast.err{background:' + RED + '}' +
    '.kinq-done{background:#E3EEDF!important;color:#3F6B35!important;border-color:#B9D3AE!important}' +
    '#kinc-draft{position:fixed;left:16px;bottom:16px;z-index:2147483000;background:#A8412E;color:#F3EFE6;font:600 10px/1 Montserrat,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;padding:9px 12px;box-shadow:0 6px 20px rgba(15,37,56,.22);pointer-events:none}' +
    '@media print{#kinc-draft{position:fixed;left:auto;right:12px;top:12px;bottom:auto;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}}' +
    '@media print{#kinc-bar,#kinc-layer,#kinc-shield,#kinc-hint,#kinc-toast,.kinc-pop{display:none!important}}';
  var st = document.createElement('style'); st.id = 'kinc-style'; st.textContent = css; document.head.appendChild(st);

  /* ---------- UI ---------- */
  var ICON_CMT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/></svg>';
  var ICON_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>';
  var ICON_PDF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/></svg>';

  var bar = document.createElement('div'); bar.id = 'kinc-bar';
  bar.innerHTML =
    '<button type="button" id="kinc-add" aria-pressed="false" title="Click anywhere on the page to leave a comment">' + ICON_CMT + '<span>Comment</span></button>' +
    '<button type="button" id="kinc-toggle" aria-pressed="true" title="Show or hide comment pins">' + ICON_EYE + '<span id="kinc-count">0</span></button>' +
    '<button type="button" id="kinc-pdf" title="Save this page as PDF">' + ICON_PDF + '<span>PDF</span></button>';
  var layer = document.createElement('div'); layer.id = 'kinc-layer';
  var draft = document.createElement('div'); draft.id = 'kinc-draft'; draft.textContent = 'Draft · for review';

  function mount() { if (!st.isConnected) (document.head || document.documentElement).appendChild(st); if (!bar.isConnected) document.body.appendChild(bar); if (!layer.isConnected) document.body.appendChild(layer); if (!draft.isConnected) document.body.appendChild(draft); }

  var pulseId = null, comments = [], showPins = lsGet('kinc-show', '1') === '1', openPop = null;

  function toast(msg, err) {
    var t = document.getElementById('kinc-toast'); if (t) t.remove();
    t = document.createElement('div'); t.id = 'kinc-toast'; if (err) t.className = 'err'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, err ? 5000 : 2600);
  }
  function closePop() { if (openPop) { openPop.remove(); openPop = null; } }
  function placePop(pop, x, y) {
    document.body.appendChild(pop);
    var w = pop.offsetWidth, h = pop.offsetHeight, vx = x - scrollX, vy = y - scrollY;
    var left = vx + 14 + w > innerWidth - 8 ? x - w - 14 : x + 14;
    var top = vy + h > innerHeight - 8 ? y - h : y;
    pop.style.left = Math.max(scrollX + 8, left) + 'px'; pop.style.top = Math.max(scrollY + 8, top) + 'px';
    openPop = pop;
  }
  function fmtDate(ts) { try { return new Date(ts).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }

  function pinPos(c) {
    var a = resolveAnchor(c.anchor), r = docRect(a);
    return { x: r.left + (+c.x || 0) * r.width, y: r.top + (+c.y || 0) * r.height };
  }
  var globalAnswers = [];
  function markAnswered() {
    var done = {};
    var seen = {};
    comments.concat(globalAnswers).forEach(function (c) { if (c.id && seen[c.id]) return; if (c.id) seen[c.id] = 1; var m = String(c.area || '').match(/^(Q\d+)\b/); if (m) done[m[1]] = (done[m[1]] || 0) + 1; });
    document.querySelectorAll('[data-q]').forEach(function (el) {
      var q = el.getAttribute('data-q'), n = done[q] || 0;
      el.classList.toggle('kinq-done', n > 0);
      var st = el.querySelector('.kinq-st'); if (st) st.textContent = n ? '✓ Answered' + (n > 1 ? ' ×' + n : '') : 'Answer →';
    });
    var tot = document.querySelectorAll('[data-q-row]').length, ans = document.querySelectorAll('[data-q-row].kinq-done').length;
    var cnt = document.getElementById('kinq-count'); if (cnt) cnt.textContent = ans + ' of ' + tot + ' answered';
    document.querySelectorAll('[data-qcount]').forEach(function (el) {
      var t = el.getAttribute('data-qcount');
      var rows = Array.prototype.filter.call(document.querySelectorAll('[data-q-row]'), function (r) { return t === 'all' || r.getAttribute('data-topic') === t; });
      var d = rows.filter(function (r) { return r.classList.contains('kinq-done'); }).length;
      el.textContent = d + ' of ' + rows.length + ' answered';
    });
  }
  function render() {
    try { markAnswered(); } catch (e) {}
    layer.innerHTML = '';
    layer.style.display = showPins ? '' : 'none';
    document.getElementById('kinc-count').textContent = String(comments.length);
    document.getElementById('kinc-toggle').setAttribute('aria-pressed', String(showPins));
    comments.forEach(function (c, i) {
      var p = pinPos(c), pin = document.createElement('div');
      pin.className = 'kinc-pin' + (c._sending ? ' sending' : '') + (pulseId && String(c.id) === pulseId ? ' pulse' : ''); pin.textContent = String(i + 1);
      pin.style.left = p.x + 'px'; pin.style.top = p.y + 'px'; pin.dataset.id = c.id || '';
      pin.title = (c.name || 'Guest') + ': ' + String(c.comment || '').slice(0, 80);
      pin.addEventListener('click', function (e) { e.stopPropagation(); showComment(c, i, p); });
      layer.appendChild(pin);
    });
  }
  function showComment(c, i, p) {
    closePop();
    var pop = document.createElement('div'); pop.className = 'kinc-pop';
    pop.innerHTML = '<div class="kinc-meta">#' + (i + 1) + ' · ' + esc(c.name || 'Guest') + (c.ts ? ' · ' + esc(fmtDate(c.ts)) : '') + '</div>' +
      '<div class="kinc-body">' + esc(c.comment) + '</div>' +
      '<div class="kinc-row" style="margin-top:10px">' + (c.section || c.area ? '<span class="kinc-note">' + esc([c.section, c.area].filter(Boolean).join(' · ')) + '</span>' : '') +
      (c.id && !PREVIEW ? '<button type="button" class="kinc-x" data-act="link">Copy link</button>' : '') +
      '<button type="button" class="kinc-go" data-act="close">Close</button></div>';
    pop.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-act');
      if (a === 'close') closePop();
      if (a === 'link') { var u = location.href.split('#')[0] + (window.KIN_SCREEN ? '#screen=' + window.KIN_SCREEN + '&' : '#') + 'pin=' + c.id; (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function () { toast('Link copied'); }, function () { prompt('Copy link', u); }); }
    });
    placePop(pop, p.x, p.y);
  }

  function loadGlobalAnswers() {
    if (PREVIEW || !document.querySelector('[data-q]')) return;
    jsonp({ action: 'list' }).then(function (r) { if (r && r.ok) { globalAnswers = (r.comments || []).filter(function (c) { return /^Q\d+\b/.test(String(c.area || '')); }); try { markAnswered(); } catch (e) {} } }).catch(function () {});
  }
  function load() {
    loadGlobalAnswers();
    return fetchComments().then(function (list) { comments = list; render(); focusFromHash(); })
      .catch(function () { comments = []; render(); });
  }
  function focusFromHash() {
    var m = location.hash.match(/pin=([\w-]+)/); if (!m) return;
    var idx = comments.findIndex(function (c) { return String(c.id) === m[1]; }); if (idx < 0) return;
    showPins = true; pulseId = m[1]; setTimeout(function () { pulseId = null; }, 9000); render();
    var p = pinPos(comments[idx]); scrollTo({ top: Math.max(0, p.y - innerHeight / 2), behavior: 'smooth' });
    setTimeout(function () { render(); showComment(comments[idx], idx, pinPos(comments[idx])); }, 700);
  }

  /* ---------- comment mode ---------- */
  var shield = null, hint = null;
  function setMode(on) {
    document.getElementById('kinc-add').setAttribute('aria-pressed', String(on));
    if (on) {
      closePop();
      shield = document.createElement('div'); shield.id = 'kinc-shield';
      hint = document.createElement('div'); hint.id = 'kinc-hint';
      hint.textContent = PREVIEW ? 'Click where you want to comment · preview mode (not sent yet)' : 'Click where you want to comment · Esc to cancel';
      document.body.appendChild(shield); document.body.appendChild(hint);
      shield.addEventListener('click', onPick);
    } else {
      if (shield) shield.remove(); if (hint) hint.remove(); shield = hint = null;
    }
  }
  function onPick(e) {
    e.stopPropagation();
    shield.style.pointerEvents = 'none'; layer.style.pointerEvents = 'none';
    var target = document.elementFromPoint(e.clientX, e.clientY);
    var clicked = clickedOn(target, e.clientX, e.clientY);
    layer.style.pointerEvents = '';
    setMode(false);
    var a = anchorFor(target), r = docRect(a.el), px = e.clientX + scrollX, py = e.clientY + scrollY;
    var area = areaFor(a.el, px, py), sec = sectionName(a.el);
    compose({ anchor: a.key, section: sec, area: area, clicked: clicked, x: +((px - r.left) / r.width).toFixed(4), y: +((py - r.top) / r.height).toFixed(4) }, px, py);
  }
  function compose(base, px, py) {
    closePop();
    var pop = document.createElement('div'); pop.className = 'kinc-pop';
    pop.innerHTML = '<div class="kinc-meta">' + (base.question ? 'Answer · ' + esc(base.question) : 'New comment' + (base.area || base.section ? ' · ' + esc(base.area || base.section) : '')) + '</div>' +
      '<input type="text" maxlength="120" placeholder="Your name" value="' + esc(lsGet('kinc-name', '')) + '">' +
      '<textarea maxlength="1900" placeholder="' + (base.question ? 'Your answer' : 'What would you like to change?') + '"></textarea>' +
      '<div class="kinc-row"><button type="button" class="kinc-x" data-act="cancel">Cancel</button><button type="button" class="kinc-go" data-act="send">Send</button></div>';
    placePop(pop, px, py);
    var name = pop.querySelector('input'), txt = pop.querySelector('textarea');
    (name.value ? txt : name).focus();
    pop.addEventListener('click', function (e) {
      var act = e.target.getAttribute && e.target.getAttribute('data-act');
      if (act === 'cancel') closePop();
      if (act === 'send') send();
    });
    pop.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(); });
    function send() {
      var comment = txt.value.trim(); if (!comment) { txt.focus(); return; }
      var nm = name.value.trim() || 'Guest'; lsSet('kinc-name', nm);
      var c = { page: pageKey(), section: (pageName() + (base.section ? ' · ' + base.section : '')).slice(0, 180), area: base.area || '', clicked: base.clicked || '', topic: base.topic || '', anchor: base.anchor, x: base.x, y: base.y, name: nm, comment: comment, _sending: true };
      closePop(); showPins = true; comments.push(c); render();
      saveComment(c).then(function (r) { c.id = r.id; c.ts = r.ts || new Date().toISOString(); c._sending = false; render(); toast(PREVIEW ? 'Saved in this browser (preview mode)' : 'Comment sent. Thank you!'); })
        .catch(function () { comments.splice(comments.indexOf(c), 1); render(); toast('Could not send. Please try again.', true); });
    }
  }

  /* ---------- PDF ---------- */
  function exportPdf() {
    closePop(); setMode(false);
    var imgs = Array.prototype.slice.call(document.images);
    imgs.forEach(function (i) { if (i.loading === 'lazy') i.loading = 'eager'; });
    toast('Preparing PDF… choose “Save as PDF” in the print window');
    var waits = imgs.filter(function (i) { return !i.complete; }).map(function (i) { return new Promise(function (r) { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }); });
    Promise.race([Promise.all(waits), new Promise(function (r) { setTimeout(r, 8000); })]).then(function () { setTimeout(function () { window.print(); }, 300); });
  }

  /* ---------- wiring ---------- */
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.id === 'kinc-add') setMode(b.getAttribute('aria-pressed') !== 'true');
    if (b.id === 'kinc-toggle') { showPins = !showPins; lsSet('kinc-show', showPins ? '1' : '0'); closePop(); render(); }
    if (b.id === 'kinc-pdf') exportPdf();
  });
  document.addEventListener('click', function (e) {
    var q = e.target.closest && e.target.closest('[data-q]:not([data-q-row])');
    if (!q || isOurs(q)) return;
    e.preventDefault(); e.stopPropagation(); setMode(false);
    var a = anchorFor(q.closest('[data-screen-label]') || q.parentElement), r = docRect(a.el), qr = docRect(q);
    var px = qr.left + Math.min(qr.width, 24), py = qr.top + qr.height / 2;
    var qid = q.getAttribute('data-q'), qt = q.getAttribute('data-qt') || '';
    compose({ anchor: a.key, section: sectionName(a.el), area: (qid + ' · ' + qt).slice(0, 180), clicked: 'Owner question ' + qid, question: qid + ' · ' + qt, topic: q.getAttribute('data-topic') || '',
      x: +((px - r.left) / r.width).toFixed(4), y: +((py - r.top) / r.height).toFixed(4) }, px, py);
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMode(false); closePop(); } });
  document.addEventListener('click', function (e) { if (openPop && !openPop.contains(e.target) && !e.target.closest('.kinc-pin') && !e.target.closest('#kinc-bar')) closePop(); });
  addEventListener('resize', function () { render(); });
  addEventListener('hashchange', focusFromHash);
  addEventListener('kin:navigate', function () { closePop(); setMode(false); comments = []; render(); setTimeout(load, 300); });

  function start() {
    mount(); render(); load();
    new MutationObserver(function () { if (!st.isConnected || !bar.isConnected || !layer.isConnected) mount(); }).observe(document.documentElement, { childList: true, subtree: false });
    new MutationObserver(function () { if (!st.isConnected || !bar.isConnected) mount(); }).observe(document.head || document.documentElement, { childList: true });
    // layouts settle late (fonts, images, React) — re-place pins a few times
    [800, 2000, 4000, 8000].forEach(function (t) { setTimeout(function () { mount(); render(); }, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

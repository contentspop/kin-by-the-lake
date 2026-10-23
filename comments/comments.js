/* KIN by the Lake — comments, answers and Export PDF
   - Document pages: a comment thread at the end of every section (long text, links, up to 6 pictures).
   - Website and Social previews: pinned comments on the exact spot.
   - Questionnaire chips: answers shown under each question, on every page.
   Backend: Google Apps Script bridge → Notion (see apps-script.gs). Endpoint in comments-config.js.
   With no endpoint, comments stay in this browser (preview mode). */
(function () {
  if (window.__kinComments) return;
  window.__kinComments = true;

  var ENDPOINT = (window.KIN_COMMENTS_ENDPOINT || '').trim();
  var PREVIEW = !ENDPOINT;
  var BRASS = '#B38A45', LAKE = '#1E3D5A', OFF = '#F3EFE6', RED = '#A8412E';
  var MAX_IMAGES = 6, MAX_SIDE = 1600;

  /* ---------- helpers ---------- */
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g, function (u) { return '<a href="' + u + '" target="_blank" rel="noopener">' + u + '</a>'; })
      .replace(/(^|[\s(])(www\.[^\s<]+[^\s<.,;:!?)\]'"])/g, function (m, p, u) { return p + '<a href="https://' + u + '" target="_blank" rel="noopener">' + u + '</a>'; });
  }
  function fmtDate(ts) { try { return new Date(ts).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function clean(t, n) { return String(t || '').replace(/\s+/g, ' ').trim().slice(0, n || 90); }

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
    if (/^strategy\//.test(p)) return 'Strategy & Activation';
    if (/^benchmark\//.test(p)) return 'Benchmark · Longrain';
    if (/^photography\//.test(p)) return 'Photography Guideline';
    if (/ui_kits\/social/.test(p)) return 'Social';
    if (/ui_kits\/website/.test(p)) return 'Website' + (window.KIN_SCREEN ? ' · ' + window.KIN_SCREEN.charAt(0).toUpperCase() + window.KIN_SCREEN.slice(1) : '');
    if (/^guidelines\//.test(p)) return 'Guideline · ' + p.replace(/^guidelines\//, '').replace(/\.html$/, '');
    if (/^components\//.test(p)) return 'Components · ' + p.split('/')[1];
    return p;
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

  var PIN_MODE = /ui_kits\/(website|social)\//.test(relPath());
  var SECTION_MODE = !PIN_MODE && !/^(index\.html|questionnaire\/)/.test(relPath());

  /* ---------- anchoring ---------- */
  function isOurs(el) { return !!(el && el.closest && el.closest('#kinc-bar,#kinc-layer,.kinc-pop,#kinc-shield,#kinc-hint,#kinc-toast,.kins,.kinc-compose,.kinq-ans')); }
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
      if (top > py + 6) continue;
      var dy = Math.max(0, py - bottom);
      var inCol = px >= left - 40 && px <= left + Math.max(r.width, 560);
      var score = dy + (inCol ? 0 : 700) - (isHead ? 40 : 0);
      if (dy > 1600) continue;
      if (score < bestScore) { bestScore = score; best = t; }
    }
    return best || '';
  }
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

  /* ---------- transport ---------- */
  function jsonp(params) {
    return new Promise(function (resolve, reject) {
      var cb = '__kinc' + Date.now() + Math.floor(Math.random() * 1e6);
      var s = document.createElement('script');
      var t = setTimeout(function () { cleanup(); reject(new Error('timeout')); }, 25000);
      function cleanup() { clearTimeout(t); try { delete window[cb]; } catch (e) { window[cb] = undefined; } s.remove(); }
      window[cb] = function (data) { cleanup(); resolve(data); };
      params.callback = cb;
      var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k] == null ? '' : params[k]); }).join('&');
      s.src = ENDPOINT + (ENDPOINT.indexOf('?') >= 0 ? '&' : '?') + q;
      s.onerror = function () { cleanup(); reject(new Error('network')); };
      document.head.appendChild(s);
    });
  }
  function post(payload) {
    // text/plain keeps this a "simple" request (no CORS preflight); Apps Script answers with JSON
    return fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(payload), redirect: 'follow' })
      .then(function (r) { return r.json(); });
  }
  function previewStore() { try { return JSON.parse(lsGet('kinc-preview', '[]')); } catch (e) { return []; } }
  function fetchComments() {
    if (PREVIEW) return Promise.resolve(previewStore().filter(function (c) { return c.page === pageKey(); }));
    return jsonp({ action: 'list', page: pageKey() }).then(function (r) { if (!r.ok) throw new Error(r.error || 'error'); return r.comments || []; });
  }
  function saveComment(c, images) {
    var payload = { action: 'add', page: c.page, section: c.section, area: c.area, clicked: c.clicked, topic: c.topic || pageTopic(), anchor: c.anchor, x: c.x || 0, y: c.y || 0,
      name: c.name, comment: c.comment, url: c.url || pageUrl(), type: c.type || 'Comment',
      images: (images || []).map(function (im) { return { name: im.name, type: im.type, data: im.data }; }) };
    if (PREVIEW) {
      var all = previewStore(); c.id = 'p' + Date.now(); c.ts = new Date().toISOString();
      var keep = JSON.parse(JSON.stringify(c)); delete keep._sending; delete keep.images; all.push(keep); lsSet('kinc-preview', JSON.stringify(all));
      return Promise.resolve({ ok: true, id: c.id, ts: c.ts });
    }
    return post(payload).then(function (r) { if (!r || !r.ok) throw new Error((r && r.error) || 'error'); return r; }, function (err) {
      // fallback for browsers that block the POST: short text-only comments can still go through
      if (payload.images.length || payload.comment.length > 1500) throw err;
      delete payload.images;
      return jsonp(payload).then(function (r) { if (!r.ok) throw new Error(r.error || 'error'); return r; });
    });
  }

  /* ---------- images ---------- */
  function shrink(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onerror = reject;
      fr.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          var s = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
          var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.naturalWidth * s)); c.height = Math.max(1, Math.round(img.naturalHeight * s));
          var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
          var url = c.toDataURL('image/jpeg', 0.82);
          resolve({ name: (file.name || 'image').replace(/\.[^.]+$/, '') + '.jpg', type: 'image/jpeg', data: url.split(',')[1], url: url });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ---------- styles ---------- */
  var F = 'Montserrat,system-ui,sans-serif';
  var css = '' +
    '#kinc-bar{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;gap:6px;font:500 11px/1 ' + F + ';letter-spacing:.14em;text-transform:uppercase}' +
    '#kinc-bar button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:11px 14px;background:' + LAKE + ';color:' + OFF + ';box-shadow:0 6px 20px rgba(15,37,56,.28);border:1px solid rgba(243,239,230,.18)}' +
    '#kinc-bar button:hover{background:#16304A}#kinc-bar button[aria-pressed="true"]{background:' + BRASS + ';color:#0F2538}' +
    '#kinc-bar svg{width:15px;height:15px;flex:none}' +
    '#kinc-layer{position:absolute;left:0;top:0;width:0;height:0;z-index:2147482000}' +
    '.kinc-pin{position:absolute;width:28px;height:28px;margin:-28px 0 0 0;border-radius:50% 50% 50% 0;background:' + BRASS + ';color:#0F2538;border:2px solid ' + OFF + ';box-shadow:0 3px 10px rgba(15,37,56,.35);font:600 12px/24px ' + F + ';text-align:center;cursor:pointer;transition:transform .15s}' +
    '.kinc-pin:hover{transform:scale(1.12)}.kinc-pin.sending{opacity:.6}.kinc-pin.pulse{animation:kincpulse 1s ease-in-out 4}' +
    '@keyframes kincpulse{0%,100%{box-shadow:0 0 0 0 rgba(179,138,69,.7)}50%{box-shadow:0 0 0 16px rgba(179,138,69,0)}}' +
    '#kinc-shield{position:fixed;inset:0;z-index:2147482500;cursor:crosshair;background:rgba(30,61,90,.06)}' +
    '#kinc-hint{position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:2147483001;background:' + LAKE + ';color:' + OFF + ';padding:10px 16px;font:500 11px/1.4 ' + F + ';letter-spacing:.12em;text-transform:uppercase;box-shadow:0 6px 20px rgba(15,37,56,.28)}' +
    '.kinc-pop{position:absolute;z-index:2147482800;width:min(380px,calc(100vw - 32px));max-height:80vh;overflow:auto;background:#FBF9F4;color:' + LAKE + ';border:1px solid #D9D3C6;box-shadow:0 16px 48px rgba(15,37,56,.28);padding:14px;font:400 13px/1.55 ' + F + '}' +
    '.kinc-pop .kinc-meta{font:600 10px/1.4 ' + F + ';letter-spacing:.16em;text-transform:uppercase;color:' + BRASS + ';margin-bottom:6px}' +
    '.kinc-pop .kinc-body{white-space:pre-wrap;word-wrap:break-word}' +
    '.kinc-row{display:flex;gap:8px;justify-content:flex-end;align-items:center;flex-wrap:wrap}' +
    '.kinc-row button,.kins-add{all:unset;cursor:pointer;padding:9px 13px;font:600 10px/1 ' + F + ';letter-spacing:.16em;text-transform:uppercase}' +
    '.kinc-row .kinc-go{background:' + LAKE + ';color:' + OFF + '}.kinc-row .kinc-x{color:' + LAKE + '}.kinc-row .kinc-go[disabled]{opacity:.5;cursor:wait}' +
    '.kinc-note{font:400 11px/1.4 ' + F + ';color:#6B7A88;margin-right:auto}' +
    '#kinc-toast{position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:2147483001;background:' + LAKE + ';color:' + OFF + ';padding:10px 16px;font:500 11px/1.4 ' + F + ';letter-spacing:.1em;box-shadow:0 6px 20px rgba(15,37,56,.28)}' +
    '#kinc-toast.err{background:' + RED + '}' +
    /* composer */
    '.kinc-compose{box-sizing:border-box;display:flex;flex-direction:column;gap:8px;margin:10px 0;padding:14px;background:#FBF9F4;border:1px solid #D9D3C6;color:' + LAKE + ';font:400 14px/1.55 ' + F + ';text-align:left;text-transform:none;letter-spacing:0;max-width:760px}' +
    '.kinc-pop .kinc-compose{margin:0;padding:0;border:0;background:none}' +
    '.kinc-compose .kc-t{font:600 10px/1.4 ' + F + ';letter-spacing:.16em;text-transform:uppercase;color:' + BRASS + '}' +
    '.kinc-compose input[type=text],.kinc-compose textarea{box-sizing:border-box;width:100%;border:1px solid #D9D3C6;background:#fff;padding:9px 11px;font:400 14px/1.55 ' + F + ';color:' + LAKE + ';outline:none;border-radius:0}' +
    '.kinc-compose input[type=text]:focus,.kinc-compose textarea:focus{border-color:' + BRASS + '}' +
    '.kinc-compose textarea{min-height:120px;resize:vertical}' +
    '.kc-imgs{display:flex;flex-wrap:wrap;gap:8px}.kc-imgs:empty{display:none}' +
    '.kc-th{position:relative;width:76px;height:76px;background:#eee center/cover no-repeat;border:1px solid #D9D3C6}' +
    '.kc-th button{all:unset;cursor:pointer;position:absolute;right:-7px;top:-7px;width:20px;height:20px;border-radius:50%;background:' + LAKE + ';color:' + OFF + ';font:600 12px/20px ' + F + ';text-align:center}' +
    '.kc-pic{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:8px 11px;border:1px dashed ' + BRASS + ';color:' + LAKE + ';font:600 10px/1 ' + F + ';letter-spacing:.14em;text-transform:uppercase}' +
    /* section threads */
    '.kins{box-sizing:border-box;margin:36px 0 0;padding:14px 18px 12px;border:1px solid rgba(179,138,69,.7);background:rgba(251,249,244,.75);color:' + LAKE + ';font:400 14px/1.6 ' + F + ';text-align:left;text-transform:none;letter-spacing:0;width:100%;max-width:820px;border-radius:2px}' +
    '.kins-h{font:600 10.5px/1.4 ' + F + ';letter-spacing:.18em;text-transform:uppercase;color:' + BRASS + ';margin-bottom:8px}' +
    '.kins-add{color:' + LAKE + ';padding:6px 0}.kins-add:hover{color:' + BRASS + '}' +
    '.kins-sub{margin:12px 0 2px;padding:6px 10px;border:1px dashed rgba(179,138,69,.75);background:transparent;max-width:100%;font-size:13px;width:auto;display:block}' +
    '.kins-sub .kins-add{padding:3px 0;font-size:9.5px;color:' + BRASS + '}.kins-sub.has{background:rgba(251,249,244,.75);padding:10px 12px}' +
    '.kins-sub .kinc-it{padding:9px 11px}.kins-sub .kinc-it-g a{width:84px;height:84px}' +
    '.kins-dark{background:rgba(243,239,230,.06);border-color:rgba(207,174,114,.75);color:' + OFF + '}.kins-dark .kins-h,.kins-dark .kins-add{color:#CFAE72}.kins-dark.has{background:rgba(243,239,230,.08)}' +
    '.kins-add[hidden]{display:none}' +
    '.kinc-it.long .kinc-it-b{max-height:10.5em;overflow:hidden;-webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent)}.kinc-it.long.open .kinc-it-b{max-height:none;-webkit-mask-image:none;mask-image:none}' +
    '.kinc-more{all:unset;cursor:pointer;margin-top:6px;font:600 10px/1 ' + F + ';letter-spacing:.14em;text-transform:uppercase;color:' + BRASS + '}' +
    '.kinc-it{padding:12px 14px;background:#FBF9F4;border:1px solid #E4DED1;border-left:3px solid ' + BRASS + ';margin:0 0 10px;color:' + LAKE + '}' +
    '.kinc-it.sending{opacity:.55}.kinc-it.flash{animation:kincflash 1.2s ease-in-out 3}' +
    '@keyframes kincflash{0%,100%{box-shadow:0 0 0 0 rgba(179,138,69,0)}50%{box-shadow:0 0 0 6px rgba(179,138,69,.35)}}' +
    '.kinc-it-m{display:block;font:600 10px/1.4 ' + F + ';letter-spacing:.14em;text-transform:uppercase;color:' + BRASS + ';margin-bottom:4px}' +
    '.kinc-it-b{white-space:pre-wrap;word-wrap:break-word;font:400 14px/1.6 ' + F + '}' +
    '.kinc-it-b a,.kinq-ans a{color:inherit;text-decoration:underline;text-decoration-color:' + BRASS + ';word-break:break-all}' +
    '.kinc-it-g{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}' +
    '.kinc-it-g a{display:block;width:120px;height:120px;background:#eee;border:1px solid #D9D3C6;overflow:hidden}' +
    '.kinc-it-g img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.kins-dark{color:' + OFF + '}.kins-dark .kins-h,.kins-dark .kins-add{color:#CFAE72}' +
    /* answers */
    '.kinq-done{background:#E3EEDF!important;color:#3F6B35!important;border-color:#B9D3AE!important}' +
    '.kinq-ans{display:block;box-sizing:border-box;margin:8px 0 6px;padding:10px 12px;background:#EEF5EB;border-left:3px solid #3F6B35;color:#1E3D5A;font:400 13.5px/1.6 ' + F + ';letter-spacing:0;text-transform:none;text-align:left;word-wrap:break-word;max-width:760px}' +
    '.kinq-ans .kinc-it{background:none;border:0;padding:0;margin:0}.kinq-ans .kinc-it+.kinc-it{margin-top:8px;padding-top:8px;border-top:1px solid #CFE0C8}' +
    '.kinq-ans .kinc-it-m{color:#3F6B35}.kinq-ans .kinc-it-b{font-size:13.5px}' +
    '#kinc-draft{position:fixed;left:16px;bottom:16px;z-index:2147483000;background:#A8412E;color:#F3EFE6;font:600 10px/1 ' + F + ';letter-spacing:.22em;text-transform:uppercase;padding:9px 12px;box-shadow:0 6px 20px rgba(15,37,56,.22);pointer-events:none}' +
    '@media print{#kinc-draft{position:fixed;left:auto;right:12px;top:12px;bottom:auto;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}}' +
    '@media print{#kinc-bar,#kinc-layer,#kinc-shield,#kinc-hint,#kinc-toast,.kinc-pop,.kins,.kinc-compose{display:none!important}}';
  var st = document.createElement('style'); st.id = 'kinc-style'; st.textContent = css; document.head.appendChild(st);

  /* ---------- UI shell ---------- */
  var ICON_CMT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/></svg>';
  var ICON_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>';
  var ICON_PDF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/></svg>';
  var ICON_PIC = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 6-6 4 4 3-3 3 3"/></svg>';

  var bar = document.createElement('div'); bar.id = 'kinc-bar';
  bar.innerHTML = (PIN_MODE ?
    '<button type="button" id="kinc-add" aria-pressed="false" title="Click anywhere on the screen to leave a comment">' + ICON_CMT + '<span>Comment</span></button>' +
    '<button type="button" id="kinc-toggle" aria-pressed="true" title="Show or hide comment pins">' + ICON_EYE + '<span id="kinc-count">0</span></button>' : '') +
    '<button type="button" id="kinc-pdf" title="Save this page as PDF">' + ICON_PDF + '<span>PDF</span></button>';
  var layer = document.createElement('div'); layer.id = 'kinc-layer';
  var draft = document.createElement('div'); draft.id = 'kinc-draft'; draft.textContent = 'Draft · for review';

  function mount() { if (!st.isConnected) (document.head || document.documentElement).appendChild(st); if (!bar.isConnected) document.body.appendChild(bar); if (PIN_MODE && !layer.isConnected) document.body.appendChild(layer); if (!draft.isConnected) document.body.appendChild(draft); }

  var pulseId = null, comments = [], globalAnswers = [], showPins = lsGet('kinc-show', '1') === '1', openPop = null;

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

  function isAnswer(c) { return /^Q\d+\b/.test(String(c.area || '')) || c.type === 'Answer'; }
  function itemHtml(c, label) {
    var imgs = (c.images || []).map(function (u) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener"><img src="' + esc(u) + '" alt="" loading="lazy"></a>'; }).join('');
    var long = String(c.comment || '').length > 700 || (String(c.comment || '').match(/\n/g) || []).length > 8;
    return '<div class="kinc-it' + (long ? ' long' : '') + (c._sending ? ' sending' : '') + '" data-cid="' + esc(c.id || '') + '"><span class="kinc-it-m">' + (label ? label + ' · ' : '') + esc(c.name || 'Guest') + (c.ts ? ' · ' + esc(fmtDate(c.ts)) : (c._sending ? ' · sending…' : '')) + '</span>' +
      (c.comment ? '<div class="kinc-it-b">' + linkify(c.comment) + '</div>' : '') + (long ? '<button type="button" class="kinc-more">Read more</button>' : '') + (imgs ? '<div class="kinc-it-g">' + imgs + '</div>' : '') + '</div>';
  }

  /* ---------- composer (shared by sections, answers and pins) ---------- */
  function composer(opts) {
    var box = document.createElement('div'); box.className = 'kinc-compose';
    box.innerHTML = '<div class="kc-t">' + esc(opts.title || 'New comment') + '</div>' +
      '<input type="text" maxlength="120" placeholder="Your name" value="' + esc(lsGet('kinc-name', '')) + '">' +
      '<textarea placeholder="' + esc(opts.placeholder || 'Write as much as you like. Paste links too.') + '"></textarea>' +
      '<div class="kc-imgs"></div>' +
      '<div class="kinc-row"><button type="button" class="kc-pic">' + ICON_PIC + 'Add pictures</button><span class="kinc-note">Up to ' + MAX_IMAGES + ' pictures · links are clickable</span>' +
      '<button type="button" class="kinc-x" data-act="cancel">Cancel</button><button type="button" class="kinc-go" data-act="send">Send</button></div>' +
      '<input type="file" accept="image/*" multiple hidden>';
    var name = box.querySelector('input[type=text]'), txt = box.querySelector('textarea'), file = box.querySelector('input[type=file]'), grid = box.querySelector('.kc-imgs'), go = box.querySelector('.kinc-go');
    var pics = [], busy = 0;
    function draw() {
      grid.innerHTML = '';
      pics.forEach(function (p, i) {
        var th = document.createElement('div'); th.className = 'kc-th'; th.style.backgroundImage = 'url(' + p.url + ')';
        var x = document.createElement('button'); x.type = 'button'; x.textContent = '×'; x.title = 'Remove';
        x.addEventListener('click', function () { pics.splice(i, 1); draw(); });
        th.appendChild(x); grid.appendChild(th);
      });
    }
    box.querySelector('.kc-pic').addEventListener('click', function () { file.click(); });
    file.addEventListener('change', function () {
      var list = Array.prototype.slice.call(file.files || []).filter(function (f) { return /^image\//.test(f.type); });
      var room = MAX_IMAGES - pics.length;
      if (list.length > room) toast('Up to ' + MAX_IMAGES + ' pictures per comment', true);
      list.slice(0, Math.max(0, room)).forEach(function (f) {
        busy++; go.disabled = true;
        shrink(f).then(function (p) { pics.push(p); draw(); }, function () { toast('Could not read ' + f.name, true); })
          .then(function () { busy--; if (!busy) go.disabled = false; });
      });
      file.value = '';
    });
    function grow() { txt.style.height = 'auto'; txt.style.height = Math.min(Math.max(120, txt.scrollHeight + 2), 520) + 'px'; }
    txt.addEventListener('input', grow);
    box.addEventListener('click', function (e) {
      var act = e.target.closest && e.target.closest('[data-act]'); act = act && act.getAttribute('data-act');
      if (act === 'cancel') { box.remove(); if (opts.onCancel) opts.onCancel(); }
      if (act === 'send') send();
    });
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(); });
    function send() {
      if (busy) return;
      var text = txt.value.replace(/\s+$/, '').replace(/^\s*\n/, '');
      if (!text.trim() && !pics.length) { txt.focus(); return; }
      var nm = name.value.trim() || 'Guest'; lsSet('kinc-name', nm);
      opts.onSend({ name: nm, comment: text, images: pics.slice() });
      box.remove();
    }
    setTimeout(function () { (name.value ? txt : name).focus(); }, 30);
    return box;
  }

  function submit(c, images) {
    c.images = images.map(function (p) { return p.url; }); c._sending = true;
    comments.push(c); render();
    saveComment(c, images).then(function (r) {
      c.id = r.id; c.ts = r.ts || new Date().toISOString(); c._sending = false; render();
      toast(PREVIEW ? 'Saved in this browser (preview mode)' : (r.failed ? 'Sent, but ' + r.failed + ' picture(s) did not upload' : 'Sent. Thank you!'), !!r.failed);
    }).catch(function () {
      comments.splice(comments.indexOf(c), 1); render(); toast('Could not send. Please try again.', true);
    });
  }

  /* ---------- section threads ---------- */
  function sectionList() {
    return Array.prototype.filter.call(document.querySelectorAll('section[data-screen-label]'), function (s) {
      return s.id !== 'questions' && !s.closest('.kins') && !s.parentElement.closest('section[data-screen-label]');
    });
  }
  function keyOf(sec) { return 'label:' + sec.getAttribute('data-screen-label'); }
  function hostOf(sec) {
    var f = sec.firstElementChild;
    return f && f.tagName === 'DIV' && sec.children.length <= 2 ? f : sec;
  }
  function isDark(el) {
    try { var c = getComputedStyle(el).backgroundColor.match(/\d+/g); if (!c || (c[3] !== undefined && +c[3] === 0)) return false; return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) < 110; } catch (e) { return false; }
  }
  /* subtopics: every h3/h4 inside a section */
  var subReg = {};
  function subList(sec) {
    var label = sec.getAttribute('data-screen-label'), seen = {}, out = [];
    var heads = Array.prototype.slice.call(sec.querySelectorAll('h3,h4,.card > .label:first-child'));
    heads = heads.filter(function (h) { return !(h.classList.contains('label') && h.parentElement.querySelector('h3,h4')); });
    heads.forEach(function (h) {
      if (isOurs(h) || h.closest('table,[data-q],figure,nav,header,.qneed') || h.closest('section[data-screen-label]') !== sec) return;
      var t = clean(h.textContent, 60); if (t.length < 2) return;
      var k = 'sub:' + label + '>' + t; seen[k] = (seen[k] || 0) + 1; if (seen[k] > 1) k += ' (' + seen[k] + ')';
      out.push({ h: h, key: k, title: t });
    });
    return out;
  }
  function subHost(h, sec) {
    var card = h.parentElement, main = hostOf(sec);
    if (!card || card === main || card === sec) return { el: h, mode: 'after' };
    return { el: card, mode: 'append' };
  }
  function threadKeyFor(c, keys, secs) {
    if (c.anchor && keys[c.anchor]) return c.anchor;
    var m = String(c.anchor || '').match(/^sub:(.*?)>/);
    if (m && keys['label:' + m[1]]) return 'label:' + m[1];
    var el = resolveAnchor(c.anchor);
    var sct = el && el !== document.body ? (el.closest('section[data-screen-label]') || null) : null;
    if (sct && secs.indexOf(sct) >= 0) return keyOf(sct);
    return secs.length ? keyOf(secs[secs.length - 1]) : '';
  }
  function makeThread(o) {
    var th = document.createElement('div');
    th.className = 'kins' + (o.sub ? ' kins-sub' : '') + (o.dark ? ' kins-dark' : ''); th.setAttribute('data-kins', o.key);
    th.innerHTML = '<div class="kins-h"></div><div class="kins-list"></div><button type="button" class="kins-add">' + (o.sub ? '＋ Comment on this' : '＋ Comment on this section') + '</button>';
    th.querySelector('.kins-add').addEventListener('click', function () {
      if (th.querySelector('.kinc-compose')) { th.querySelector('.kinc-compose textarea').focus(); return; }
      var add = th.querySelector('.kins-add'); add.hidden = true;
      var box = composer({ title: 'Comment · ' + o.title, onCancel: function () { add.hidden = false; }, onSend: function (v) {
        add.hidden = false;
        submit({ page: pageKey(), section: (pageName() + ' · ' + o.label + (o.sub ? ' › ' + o.title : '')).slice(0, 180), area: o.title, clicked: o.sub ? 'Subtopic comment' : 'Section comment',
          topic: pageTopic(), anchor: o.key, x: 0, y: 0, type: 'Comment', url: pageUrl() + (o.id ? '#' + o.id : ''), name: v.name, comment: v.comment }, v.images);
      } });
      th.insertBefore(box, add);
    });
    return th;
  }
  function fillThread(th, list, o) {
    list = list.slice().sort(function (a, b) { return String(a.ts || '9').localeCompare(String(b.ts || '9')); });
    var sig = list.map(function (c) { return (c.id || 'x') + (c._sending ? 's' : '') + (c.images ? c.images.length : 0); }).join(',');
    if (th.getAttribute('data-sig') === sig) return;
    th.setAttribute('data-sig', sig);
    var h = th.querySelector('.kins-h');
    if (o.sub) { h.hidden = !list.length; h.textContent = 'Comments · ' + list.length; }
    else { h.hidden = false; h.textContent = 'Comments on this section' + (list.length ? ' · ' + list.length : ''); }
    th.classList.toggle('has', list.length > 0);
    th.querySelector('.kins-list').innerHTML = list.map(function (c) { return itemHtml(c); }).join('');
  }
  function renderThreads() {
    if (!SECTION_MODE) return;
    var secs = sectionList(); if (!secs.length) return;
    var plan = [], keys = {};
    secs.forEach(function (sec) {
      var label = sec.getAttribute('data-screen-label'), dark = isDark(sec);
      plan.push({ key: keyOf(sec), sec: sec, label: label, title: label, dark: dark, id: sec.id });
      subList(sec).forEach(function (sb) {
        var e = sb.h.parentElement, bg = dark; while (e && e !== sec) { if (hasBg(e)) { bg = isDark(e); break; } e = e.parentElement; }
        plan.push({ key: sb.key, sec: sec, h: sb.h, label: label, title: sb.title, sub: true, dark: bg, id: sec.id });
      });
    });
    plan.forEach(function (o) { keys[o.key] = 1; });
    var by = {};
    comments.filter(function (c) { return !isAnswer(c); }).forEach(function (c) { var k = threadKeyFor(c, keys, secs); (by[k] = by[k] || []).push(c); });
    plan.forEach(function (o) {
      var th = subReg[o.key];
      if (!th || !th.isConnected) {
        th = makeThread(o); subReg[o.key] = th;
        if (o.sub) { var hs = subHost(o.h, o.sec); if (hs.mode === 'append') hs.el.appendChild(th); else hs.el.insertAdjacentElement('afterend', th); }
        else hostOf(o.sec).appendChild(th);
      }
      fillThread(th, by[o.key] || [], o);
    });
    // drop copies left behind when a page re-renders its own markup
    Array.prototype.forEach.call(document.querySelectorAll('.kins'), function (t) { if (subReg[t.getAttribute('data-kins')] !== t) t.remove(); });
  }
  function hasBg(el) {
    try { var c = getComputedStyle(el).backgroundColor.match(/\d+/g); return !!(c && !(c[3] !== undefined && +c[3] === 0)); } catch (e) { return false; }
  }

  /* ---------- answers under questions ---------- */
  function markAnswered() {
    var by = {}, seen = {};
    comments.concat(globalAnswers).forEach(function (c) { if (c.id && seen[c.id]) return; if (c.id) seen[c.id] = 1; var m = String(c.area || '').match(/^(Q\d+)\b/); if (m) (by[m[1]] = by[m[1]] || []).push(c); });
    var keep = [];
    document.querySelectorAll('[data-q]').forEach(function (el) {
      var q = el.getAttribute('data-q'), list = by[q] || [], n = list.length;
      el.classList.toggle('kinq-done', n > 0);
      var stt = el.querySelector('.kinq-st'); if (stt) stt.textContent = n ? '✓ Answered' + (n > 1 ? ' ×' + n : '') + ' · add' : 'Answer →';
      var isRow = el.hasAttribute('data-q-row');
      if (!n || (!isRow && el.closest('[data-q-row]'))) return;
      list.sort(function (a, b) { return String(a.ts || '9').localeCompare(String(b.ts || '9')); });
      var html = list.map(function (c) { return itemHtml(c, 'Answer'); }).join('');
      var host = isRow ? (el.children[1] || el) : null;
      var old = host ? host.querySelector('.kinq-ans') : (el.nextElementSibling && el.nextElementSibling.classList.contains('kinq-ans') ? el.nextElementSibling : null);
      var sig = q + ':' + list.map(function (c) { return (c.id || 'x') + (c._sending ? 's' : ''); }).join(',');
      if (old && old.getAttribute('data-sig') === sig) { keep.push(old); return; }
      if (old) old.remove();
      var box = document.createElement('div'); box.className = 'kinq-ans'; box.setAttribute('data-sig', sig); box.innerHTML = html;
      if (host) host.appendChild(box); else el.insertAdjacentElement('afterend', box);
      keep.push(box);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.kinq-ans'), function (n) { if (keep.indexOf(n) < 0) n.remove(); });
    var tot = document.querySelectorAll('[data-q-row]').length, ans = document.querySelectorAll('[data-q-row].kinq-done').length;
    var cnt = document.getElementById('kinq-count'); if (cnt) cnt.textContent = ans + ' of ' + tot + ' answered';
    document.querySelectorAll('[data-qcount]').forEach(function (el) {
      var t = el.getAttribute('data-qcount');
      var rows = Array.prototype.filter.call(document.querySelectorAll('[data-q-row]'), function (r) { return t === 'all' || r.getAttribute('data-topic') === t; });
      var d = rows.filter(function (r) { return r.classList.contains('kinq-done'); }).length;
      el.textContent = d + ' of ' + rows.length + ' answered';
    });
  }
  function openAnswer(q) {
    var qid = q.getAttribute('data-q'), qt = q.getAttribute('data-qt') || '';
    var row = q.closest('[data-q-row]');
    var host = row ? (row.children[1] || row) : null;
    var existing = (host || q.parentElement).querySelector('.kinc-compose[data-for="' + qid + '"]');
    if (existing) { existing.querySelector('textarea').focus(); return; }
    var sec = q.closest('[data-screen-label]');
    var a = anchorFor(sec || q.parentElement);
    var box = composer({ title: 'Answer · ' + qid, placeholder: qt || 'Your answer', onSend: function (v) {
      submit({ page: pageKey(), section: (pageName() + (sec ? ' · ' + sec.getAttribute('data-screen-label') : '')).slice(0, 180), area: (qid + ' · ' + qt).slice(0, 180),
        clicked: 'Owner question ' + qid, topic: q.getAttribute('data-topic') || pageTopic(), anchor: a.key, x: 0, y: 0, type: 'Answer',
        url: pageUrl(), name: v.name, comment: v.comment }, v.images);
    } });
    box.setAttribute('data-for', qid);
    if (host) host.appendChild(box);
    else { var after = q.nextElementSibling && q.nextElementSibling.classList.contains('kinq-ans') ? q.nextElementSibling : q; after.insertAdjacentElement('afterend', box); }
  }

  /* ---------- pins (Website and Social previews) ---------- */
  function pinPos(c) {
    var a = resolveAnchor(c.anchor), r = docRect(a);
    return { x: r.left + (+c.x || 0) * r.width, y: r.top + (+c.y || 0) * r.height };
  }
  function renderPins() {
    if (!PIN_MODE) return;
    layer.innerHTML = '';
    layer.style.display = showPins ? '' : 'none';
    var pins = comments.filter(function (c) { return !isAnswer(c); });
    var cnt = document.getElementById('kinc-count'); if (cnt) cnt.textContent = String(pins.length);
    var tg = document.getElementById('kinc-toggle'); if (tg) tg.setAttribute('aria-pressed', String(showPins));
    pins.forEach(function (c, i) {
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
    pop.innerHTML = '<div class="kinc-meta">#' + (i + 1) + (c.section || c.area ? ' · ' + esc([c.section, c.area].filter(Boolean).join(' · ')) : '') + '</div>' + itemHtml(c) +
      '<div class="kinc-row" style="margin-top:10px">' + (c.id && !PREVIEW ? '<button type="button" class="kinc-x" data-act="link">Copy link</button>' : '') +
      '<button type="button" class="kinc-go" data-act="close">Close</button></div>';
    pop.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-act');
      if (a === 'close') closePop();
      if (a === 'link') { var u = location.href.split('#')[0] + (window.KIN_SCREEN ? '#screen=' + window.KIN_SCREEN + '&' : '#') + 'pin=' + c.id; (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function () { toast('Link copied'); }, function () { prompt('Copy link', u); }); }
    });
    placePop(pop, p.x, p.y);
  }
  var shield = null, hint = null;
  function setMode(on) {
    var b = document.getElementById('kinc-add'); if (!b) return;
    b.setAttribute('aria-pressed', String(on));
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
    closePop();
    var pop = document.createElement('div'); pop.className = 'kinc-pop';
    var base = { anchor: a.key, x: +((px - r.left) / r.width).toFixed(4), y: +((py - r.top) / r.height).toFixed(4) };
    pop.appendChild(composer({ title: 'New comment' + (area || sec ? ' · ' + (area || sec) : ''), onCancel: closePop, onSend: function (v) {
      closePop(); showPins = true;
      submit({ page: pageKey(), section: (pageName() + (sec ? ' · ' + sec : '')).slice(0, 180), area: area, clicked: clicked, topic: pageTopic(), anchor: base.anchor, x: base.x, y: base.y, type: 'Pin',
        url: pageUrl(), name: v.name, comment: v.comment }, v.images);
    } }));
    placePop(pop, px, py);
  }

  /* ---------- render / load ---------- */
  function render() {
    try { markAnswered(); } catch (e) {}
    try { renderThreads(); } catch (e) {}
    try { renderPins(); } catch (e) {}
  }
  function loadGlobalAnswers() {
    if (PREVIEW) return;
    jsonp({ action: 'list', answers: 1 }).then(function (r) {
      if (r && r.ok) { globalAnswers = (r.comments || []).filter(function (c) { return /^Q\d+\b/.test(String(c.area || '')); }); render(); }
    }).catch(function () {});
  }
  function load() {
    loadGlobalAnswers();
    return fetchComments().then(function (list) { comments = list; render(); focusFromHash(); })
      .catch(function () { comments = []; render(); });
  }
  function focusFromHash() {
    var m = location.hash.match(/pin=([\w-]+)/); if (!m) return;
    var hit = comments.concat(globalAnswers).filter(function (c) { return String(c.id) === m[1]; })[0]; if (!hit) return;
    function scrollToEl(el) { if (!el) return; var r = el.getBoundingClientRect(); scrollTo({ top: Math.max(0, r.top + scrollY - innerHeight / 3), behavior: 'smooth' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 4000); }
    if (isAnswer(hit)) {
      var q = String(hit.area).match(/^(Q\d+)/);
      setTimeout(function () { scrollToEl(document.querySelector('.kinc-it[data-cid="' + hit.id + '"]') || (q && document.querySelector('[data-q="' + q[1] + '"]'))); }, 500);
      return;
    }
    if (SECTION_MODE) { setTimeout(function () { render(); scrollToEl(document.querySelector('.kins .kinc-it[data-cid="' + hit.id + '"]')); }, 500); return; }
    if (!PIN_MODE) return;
    var pins = comments.filter(function (c) { return !isAnswer(c); }), idx = pins.indexOf(hit);
    showPins = true; pulseId = m[1]; setTimeout(function () { pulseId = null; }, 9000); render();
    var p = pinPos(hit); scrollTo({ top: Math.max(0, p.y - innerHeight / 2), behavior: 'smooth' });
    setTimeout(function () { render(); showComment(hit, idx, pinPos(hit)); }, 700);
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
    e.preventDefault(); e.stopPropagation(); setMode(false); closePop();
    openAnswer(q);
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMode(false); closePop(); } });
  document.addEventListener('click', function (e) { var m = e.target.closest && e.target.closest('.kinc-more'); if (!m) return; var it = m.closest('.kinc-it'); it.classList.toggle('open'); m.textContent = it.classList.contains('open') ? 'Show less' : 'Read more'; });
  document.addEventListener('click', function (e) { if (openPop && !openPop.contains(e.target) && !e.target.closest('.kinc-pin') && !e.target.closest('#kinc-bar')) closePop(); });
  addEventListener('resize', function () { renderPins(); });
  addEventListener('hashchange', focusFromHash);
  addEventListener('kin:navigate', function () { closePop(); setMode(false); comments = []; render(); setTimeout(load, 300); });

  function start() {
    mount(); render(); load();
    new MutationObserver(function () { if (!st.isConnected || !bar.isConnected || (PIN_MODE && !layer.isConnected)) mount(); }).observe(document.documentElement, { childList: true, subtree: false });
    new MutationObserver(function () { if (!st.isConnected || !bar.isConnected) mount(); }).observe(document.head || document.documentElement, { childList: true });
    // some pages render late (bundles, fonts, React): re-apply a few times
    [800, 2000, 4000, 8000].forEach(function (t) { setTimeout(function () { mount(); render(); }, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* KIN hub · site-wide navigation (three tiers: brand bar, sections, pages) */
(function () {
  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/comments\/nav\.js.*$/, '') : '/';
  function here() { return location.href.replace(ROOT, '').split('?')[0]; }

  var MENU = [
    { label: 'Foundations', items: [
      ['share/KIN-Brand-Book.html', 'Brand & Story'],
      ['menu/', 'Menu & Offer'],
      ['strategy/', 'Strategy & Activation'],
      ['benchmark/', 'Benchmark · Longrain']
    ] },
    { label: 'Design System', items: [
      ['share/KIN-Design-System.html#overview', 'Overview'],
      ['share/KIN-Design-System.html#logo', 'Logo'],
      ['share/KIN-Design-System.html#type', 'Typography'],
      ['share/KIN-Design-System.html#colour', 'Colour'],
      ['share/KIN-Design-System.html#pattern', 'Pattern & Graphics'],
      ['share/KIN-Design-System.html#photo', 'Photography'],
      ['share/KIN-Design-System.html#digital', 'Layout & Digital'],
      ['share/KIN-Design-System.html#apps', 'Applications']
    ] },
    { label: 'Guidelines', items: [
      ['photography/', 'Photography Guideline']
    ] },
    { label: 'Previews', items: [
      ['ui_kits/website/index.html', 'Website'],
      ['ui_kits/social/index.html', 'Social Media'],
      ['ui_kits/collateral/index.html', 'Collateral']
    ] }
  ];

  function matches(href) {
    var h = here(), page = h.split('#')[0], hash = (h.split('#')[1] || ''), hp = href.split('#')[0], hh = href.split('#')[1];
    if (!(page === hp || (hp.slice(-1) === '/' && page.indexOf(hp) === 0))) return false;
    if (!hh) return true;
    var sub = ['shared', 'ornamental', 'illustrated', 'brushwork', 'together'];
    if (sub.indexOf(hash) >= 0) hash = 'pattern';
    return (hash || 'overview') === hh;
  }
  function activeSection() { for (var i = 0; i < MENU.length; i++) if (MENU[i].items.some(function (it) { return it[0].split('#')[0] && matches(it[0].split('#')[0]); })) return i; return -1; }

  var F = 'Montserrat, "Helvetica Neue", Arial, sans-serif';
  var css = document.createElement('style');
  css.textContent =
    '#kinnav-sp{height:134px;background:var(--kinsp,#1E3D5A)}' +
    '#kinnav{--fg:#F3EFE6;--line:rgba(243,239,230,.22);--bg:transparent;--hov:#CFAE72;position:fixed;top:0;left:0;right:0;z-index:2147482000;background:var(--bg);color:var(--fg);font-family:' + F + ';transition:background .25s,box-shadow .25s}' +
    '#kinnav.light{--fg:#1E3D5A;--line:#D9D3C6;--hov:#B38A45}' +
    '#kinnav.solid{--fg:#1E3D5A;--line:#D9D3C6;--bg:rgba(243,239,230,.97);--hov:#B38A45;box-shadow:0 6px 24px rgba(15,34,51,.14);backdrop-filter:blur(6px)}' +
    '#kinnav *{box-sizing:border-box}' +
    '#kinnav a{color:inherit;text-decoration:none}' +
    '#kinnav .r1{height:76px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 clamp(16px,3vw,40px);border-bottom:1px solid var(--line);overflow:hidden;transition:height .25s}' +
    '#kinnav.solid .r1{height:0;border-bottom:0}' +
    '#kinnav .menu{all:unset;cursor:pointer;display:flex;align-items:center;gap:16px;font:400 15px/1 ' + F + ';letter-spacing:.06em;justify-self:start;color:var(--fg)}' +
    '#kinnav .menu i{display:block;width:26px;height:1.5px;background:var(--fg);box-shadow:0 -8px 0 var(--fg),0 8px 0 var(--fg)}' +
    '#kinnav .menu.open i{background:transparent;box-shadow:none;position:relative}' +
    '#kinnav .menu.open i::before,#kinnav .menu.open i::after{content:"";position:absolute;left:0;top:0;width:26px;height:1.5px;background:var(--fg);transform:rotate(45deg)}' +
    '#kinnav .menu.open i::after{transform:rotate(-45deg)}' +
    '#kinnav .logo img{height:46px;width:auto;display:block}' +
    '#kinnav .logo .lg-d{display:none}#kinnav.light .logo .lg-l,#kinnav.solid .logo .lg-l{display:none}#kinnav.light .logo .lg-d,#kinnav.solid .logo .lg-d{display:block}' +
    '#kinnav .cta{justify-self:end;border:1px solid var(--fg);color:var(--fg);padding:14px 22px;font:400 14px/1 ' + F + ';letter-spacing:.08em;transition:background .2s,color .2s}' +
    '#kinnav .cta:hover{background:var(--fg);color:#1E3D5A}#kinnav.light .cta:hover,#kinnav.solid .cta:hover{color:#F3EFE6}' +
    '#kinnav .bar{position:relative;border-bottom:1px solid var(--line)}' +
    '#kinnav.solid .bar{border-bottom:0}' +
    '#kinnav .r2,#kinnav .r3{display:flex;justify-content:center;align-items:stretch;gap:clamp(18px,2.4vw,34px);overflow-x:auto;scrollbar-width:none;padding:0 20px}' +
    '#kinnav .r2::-webkit-scrollbar,#kinnav .r3::-webkit-scrollbar{display:none}' +
    '#kinnav .r2{height:58px}' +
    '#kinnav .mini,#kinnav .cta2{position:absolute;top:0;height:58px;display:none;align-items:center;gap:14px}' +
    '#kinnav .mini{left:clamp(16px,3vw,40px)}#kinnav .cta2{right:clamp(16px,3vw,40px)}' +
    '#kinnav.solid .mini,#kinnav.solid .cta2{display:flex}' +
    '#kinnav .mini .menu{gap:0}#kinnav .mini .menu i{width:22px}#kinnav .mini img{height:30px;display:block}' +
    '#kinnav .cta2 a{background:#1E3D5A;color:#F3EFE6;padding:11px 16px;font:400 12.5px/1 ' + F + ';letter-spacing:.08em}' +
    '#kinnav .r3{height:58px;position:absolute;left:0;right:0;top:100%;background:#F3EFE6;color:#1E3D5A;border-bottom:1px solid #D9D3C6;box-shadow:0 18px 30px rgba(15,34,51,.14);display:none}' +
    '#kinnav.drop .r3{display:flex}' +
    '#kinnav .crumb{display:flex;align-items:center;gap:10px;font:500 13px/1 Cinzel,Georgia,serif;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}' +
    '#kinnav.solid .crumb{display:none}' +
    '#kinnav .crumb b{width:7px;height:7px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg);opacity:.7}' +
    '#kinnav .t{all:unset;cursor:pointer;display:flex;align-items:center;white-space:nowrap;font:400 15px/1 ' + F + ';letter-spacing:.06em;border-bottom:1.5px solid transparent}' +
    '#kinnav .t:hover,#kinnav .r2 .t.hov{color:var(--hov)}' +
    '#kinnav .r2 .t.on{border-bottom-color:var(--fg)}' +
    '#kinnav .r3 .t:hover{color:#B38A45}#kinnav .r3 .t.on{border-bottom-color:#1E3D5A}' +
    '#kinnav .r3 .t{font-size:14.5px}' +
    '#kinnav .panel{display:none;position:absolute;left:0;right:0;top:76px;background:#F3EFE6;color:#1E3D5A;border-bottom:1px solid #D9D3C6;box-shadow:0 24px 40px rgba(15,34,51,.14);padding:34px clamp(16px,6vw,96px) 40px;max-height:calc(100vh - 76px);overflow:auto}' +
    '#kinnav.solid .panel{top:58px}' +
    '#kinnav.open .panel{display:block}' +
    '#kinnav .panel .row{display:grid;grid-template-columns:200px 1fr;align-items:baseline;gap:10px 30px;padding:16px 0;border-top:1px solid #D9D3C6}' +
    '#kinnav .panel .row > div{display:flex;flex-wrap:wrap;gap:4px 30px}' +
    '#kinnav .panel h4{margin:0;font:500 12px/1.3 ' + F + ';letter-spacing:.24em;text-transform:uppercase;color:#B38A45}' +
    '#kinnav .panel a{display:block;padding:6px 0;font:400 18px/1.3 Cinzel,Georgia,serif;letter-spacing:.03em}' +
    '#kinnav .panel a:hover{color:#B38A45}' +
    '#kinnav .panel .home{font:500 12px/1 ' + F + ';letter-spacing:.24em;text-transform:uppercase;padding:0 0 16px}' +
    '.tabs{top:58px !important}' +
    '@media (max-width:760px){#kinnav-sp{height:122px}#kinnav .r1{height:64px}#kinnav .r1 .menu span{display:none}#kinnav .logo img{height:36px}#kinnav .cta{padding:11px 12px;font-size:11px;letter-spacing:.06em}#kinnav .panel{top:64px}#kinnav .panel .row{grid-template-columns:1fr}' +
    '#kinnav .r2,#kinnav .r3{justify-content:flex-start}#kinnav .crumb{display:none}#kinnav .t{font-size:14px}#kinnav.solid .r2{padding-left:64px;padding-right:20px}#kinnav .mini img,#kinnav .cta2{display:none !important}}' +
    '@media print{#kinnav,#kinnav-sp{display:none}}';

  var nav = document.createElement('nav');
  nav.id = 'kinnav'; nav.setAttribute('aria-label', 'KIN hub');
  var sp = document.createElement('div'); sp.id = 'kinnav-sp'; sp.setAttribute('aria-hidden', 'true');

  function render(hover) {
    var act = activeSection(), sec = hover != null ? hover : act;
    var r2 = '<a class="crumb" href="' + ROOT + 'index.html">KIN by the Lake<b></b></a>' + MENU.map(function (m, i) { return '<button type="button" class="t' + (i === act ? ' on' : '') + (hover != null && i === hover ? ' hov' : '') + '" data-s="' + i + '">' + m.label + '</button>'; }).join('');
    var items = sec >= 0 ? MENU[sec].items : MENU.map(function (m) { return m.items[0]; });
    var r3 = items.map(function (it) { return '<a class="t' + (matches(it[0]) ? ' on' : '') + '" href="' + ROOT + it[0] + '">' + it[1] + '</a>'; }).join('');
    nav.querySelector('.r2').innerHTML = r2;
    nav.querySelector('.r3').innerHTML = r3;
  }
  var LOGO = '<img class="lg-l" src="' + ROOT + 'assets/logo/logo-reversed.png" alt="KIN by the Lake"><img class="lg-d" src="' + ROOT + 'assets/logo/logo-primary.png" alt="KIN by the Lake">';
  nav.innerHTML = '<div class="r1"><button class="menu" type="button" aria-expanded="false"><i></i><span>Menu</span></button>' +
    '<a class="logo" href="' + ROOT + 'index.html" aria-label="KIN hub">' + LOGO + '</a>' +
    '<a class="cta" href="' + ROOT + 'questionnaire/">Questionnaire</a></div>' +
    '<div class="bar"><div class="mini"><button class="menu" type="button" aria-label="Menu"><i></i></button><a href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/logo/logo-primary.png" alt="KIN"></a></div><div class="r2"></div><div class="cta2"><a href="' + ROOT + 'questionnaire/">Questionnaire</a></div><div class="r3"></div></div>' +
    '<div class="panel"><a class="home" href="' + ROOT + 'index.html">← Project hub</a>' + MENU.map(function (m) { return '<div class="row"><h4>' + m.label + '</h4><div>' + m.items.map(function (it) { return '<a href="' + ROOT + it[0] + '">' + it[1] + '</a>'; }).join('') + '</div></div>'; }).join('') +
    '<div class="row"><h4>Answer</h4><div><a href="' + ROOT + 'questionnaire/">Questionnaire</a></div></div></div>';
  render();

  function closeMenu() { nav.classList.remove('open'); Array.prototype.forEach.call(nav.querySelectorAll('.menu'), function (m) { m.classList.remove('open'); m.setAttribute('aria-expanded', 'false'); }); }
  var hoverT;
  function drop(i) { clearTimeout(hoverT); render(i); nav.classList.add('drop'); }
  function undrop() { nav.classList.remove('drop'); render(); }
  nav.addEventListener('mouseover', function (e) { var b = e.target.closest('.r2 .t'); if (b) drop(+b.dataset.s); else if (e.target.closest('.r1')) { clearTimeout(hoverT); undrop(); } });
  nav.addEventListener('mouseleave', function () { hoverT = setTimeout(undrop, 250); });
  nav.addEventListener('mouseenter', function () { clearTimeout(hoverT); });
  nav.addEventListener('click', function (e) {
    var b = e.target.closest('.r2 .t');
    if (b) { var i = +b.dataset.s; if (nav.classList.contains('drop') && nav.querySelector('.r2 .t.hov[data-s="' + i + '"]')) undrop(); else drop(i); return; }
    var m = e.target.closest('.menu');
    if (m) { var o = !nav.classList.contains('open'); closeMenu(); if (o) { nav.classList.add('open'); m.classList.add('open'); m.setAttribute('aria-expanded', 'true'); } undrop(); return; }
    if (e.target.closest('.panel a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { undrop(); closeMenu(); } });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) { undrop(); if (nav.classList.contains('open')) closeMenu(); } });
  window.addEventListener('hashchange', function () { render(); });
  var lastHash = location.hash; setInterval(function () { if (location.hash !== lastHash) { lastHash = location.hash; render(); } }, 400);

  // blend with the page header: take the colour just below the bar; turn solid once scrolled
  function lum(c) { var m = c.match(/\d+(\.\d+)?/g); if (!m) return 1; return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255; }
  function blend() {
    if (!sp.isConnected) return;
    var r = sp.getBoundingClientRect(), y = r.bottom + 6;
    if (y < 0 || y > innerHeight) return;
    var el = document.elementFromPoint(innerWidth / 2, y), bg = '', img = false;
    while (el && el !== document.documentElement) {
      if (el === nav || nav.contains(el)) { el = null; break; }
      var cs = getComputedStyle(el);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && cs.backgroundImage.indexOf('gradient') < 0) img = true;
      var c = cs.backgroundColor; var a = c.match(/rgba\([^)]*,\s*([\d.]+)\)/);
      if (c && c !== 'transparent' && !(a && +a[1] === 0)) { bg = c; break; }
      el = el.parentElement;
    }
    if (img && (!bg || lum(bg) > .6)) bg = '#1E3D5A';
    if (!bg) bg = getComputedStyle(document.body).backgroundColor || '#F3EFE6';
    sp.style.setProperty('--kinsp', bg);
    nav.classList.toggle('light', lum(bg) > .6);
  }
  function onScroll() { nav.classList.toggle('solid', scrollY > (sp.offsetHeight || 134) - 30); }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', blend);
  [0, 300, 900, 2000, 4000].forEach(function (t) { setTimeout(function () { blend(); onScroll(); }, t); });

  function mount() {
    if (!css.isConnected) (document.head || document.documentElement).appendChild(css);
    if (document.body && !sp.isConnected) document.body.insertBefore(sp, document.body.firstChild);
    if (document.body && !nav.isConnected) document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  // bundled pages can re-render their body; put the bar back if it is removed
  new MutationObserver(function () { if (!nav.isConnected || !sp.isConnected || !css.isConnected) { mount(); blend(); } }).observe(document.documentElement, { childList: true, subtree: true });
})();

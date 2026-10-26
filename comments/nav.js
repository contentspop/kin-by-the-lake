/* KIN hub · site-wide top navigation with dropdowns (injected on every main page) */
(function () {
  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/comments\/nav\.js.*$/, '') : '/';
  var path = location.href.replace(ROOT, '').split('#')[0].split('?')[0];

  var MENU = [
    { label: 'Foundations', items: [
      ['share/KIN-Brand-Book.html', 'Brand & Story', 'Story, essence, positioning, values, voice'],
      ['menu/', 'Menu & Offer', 'Two kitchens, dishes, sets and packages'],
      ['strategy/', 'Strategy & Activation', '60/40, a day at KIN, USPs, compset'],
      ['benchmark/', 'Benchmark · Longrain', 'What to learn from a sharing-table restaurant']
    ] },
    { label: 'Design System', items: [
      ['share/KIN-Design-System.html#overview', 'Overview', 'The identity board and what we propose'],
      ['share/KIN-Design-System.html#logo', '1 · Logo', ''],
      ['share/KIN-Design-System.html#type', '2 · Typography', ''],
      ['share/KIN-Design-System.html#colour', '3 · Colour', ''],
      ['share/KIN-Design-System.html#pattern', '4 · Pattern & graphics', 'Reflection line and three graphic systems'],
      ['share/KIN-Design-System.html#photo', '5 · Photography', ''],
      ['share/KIN-Design-System.html#digital', '6 · Layout & digital', ''],
      ['share/KIN-Design-System.html#apps', '7 · Applications', '']
    ], cols: 2 },
    { label: 'Guidelines', items: [
      ['photography/', 'Photography Guideline', 'Light, food, people, shot list']
    ] },
    { label: 'Previews', items: [
      ['ui_kits/website/index.html', 'Website Preview', 'Home, Menu, Story, Reserve'],
      ['ui_kits/social/index.html', 'Social Media Preview', 'Instagram, Facebook, LINE OA'],
      ['ui_kits/collateral/index.html', 'Collateral Preview', 'Menus and materials, print, packaging, signage']
    ] }
  ];

  function isActive(href) { var h = href.split('#')[0]; return h && (path === h || (h.slice(-1) === '/' && path.indexOf(h) === 0)); }

  var F = 'Montserrat, "Helvetica Neue", Arial, sans-serif';
  var css = document.createElement('style');
  css.textContent =
    '#kinnav{position:sticky;top:0;z-index:2147482000;background:#0F2233;color:#F3EFE6;font-family:' + F + ';box-shadow:0 1px 0 rgba(207,174,114,.35)}' +
    '#kinnav *{box-sizing:border-box}' +
    '#kinnav .kn-in{max-width:1240px;margin:0 auto;padding:0 clamp(14px,3vw,40px);height:54px;display:flex;align-items:center;gap:6px}' +
    '#kinnav .kn-logo{display:flex;align-items:center;gap:10px;color:#F3EFE6;text-decoration:none;margin-right:auto;font:600 10px/1 ' + F + ';letter-spacing:.22em;text-transform:uppercase}' +
    '#kinnav .kn-logo img{height:26px;width:auto;display:block}' +
    '#kinnav .kn-logo span{opacity:.7}' +
    '#kinnav .kn-list{display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0}' +
    '#kinnav .kn-item{position:relative}' +
    '#kinnav .kn-top{all:unset;cursor:pointer;display:flex;align-items:center;gap:6px;height:54px;padding:0 12px;font:600 10.5px/1 ' + F + ';letter-spacing:.18em;text-transform:uppercase;color:#F3EFE6}' +
    '#kinnav .kn-top:hover,#kinnav .kn-item.open .kn-top,#kinnav .kn-top.on{color:#CFAE72}' +
    '#kinnav .kn-top i{width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-2px) rotate(45deg)}' +
    '#kinnav .kn-drop{position:absolute;top:54px;left:0;min-width:300px;background:#F8F5EE;color:#1E3D5A;border-top:2px solid #B38A45;box-shadow:0 18px 40px rgba(15,34,51,.25);padding:10px;display:none}' +
    '#kinnav .kn-item.open .kn-drop{display:grid}' +
    '#kinnav .kn-drop.c2{grid-template-columns:1fr 1fr;min-width:480px}' +
    '#kinnav .kn-drop a{display:block;padding:10px 12px;text-decoration:none;color:#1E3D5A}' +
    '#kinnav .kn-drop a:hover,#kinnav .kn-drop a.on{background:#ECE6DA}' +
    '#kinnav .kn-drop b{display:block;font:500 15px/1.25 Cinzel,Georgia,serif;letter-spacing:.04em}' +
    '#kinnav .kn-drop small{display:block;margin-top:3px;font:400 11.5px/1.4 ' + F + ';color:#52708F}' +
    '#kinnav .kn-q{margin-left:8px;text-decoration:none;background:#B38A45;color:#fff;padding:11px 14px;font:600 10px/1 ' + F + ';letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}' +
    '#kinnav .kn-q:hover{background:#9C7738}' +
    '#kinnav .kn-burger{all:unset;cursor:pointer;display:none;width:40px;height:40px;align-items:center;justify-content:center}' +
    '#kinnav .kn-burger span{display:block;width:20px;height:1.5px;background:#F3EFE6;box-shadow:0 6px 0 #F3EFE6,0 -6px 0 #F3EFE6}' +
    '@media (max-width:900px){' +
    '#kinnav .kn-burger{display:flex}' +
    '#kinnav .kn-list{display:none;position:absolute;top:54px;left:0;right:0;flex-direction:column;align-items:stretch;background:#0F2233;padding:6px 0 14px;max-height:calc(100vh - 54px);overflow:auto}' +
    '#kinnav.mob .kn-list{display:flex}' +
    '#kinnav .kn-top{height:46px;padding:0 20px;justify-content:space-between;width:100%}' +
    '#kinnav .kn-drop,#kinnav .kn-drop.c2{position:static;min-width:0;grid-template-columns:1fr;box-shadow:none;margin:0 12px}' +
    '#kinnav .kn-q{margin:10px 20px 0;text-align:center}' +
    '#kinnav .kn-logo span{display:none}}' +
    '.tabs{top:54px !important}@media print{#kinnav{display:none}}';

  var nav = document.createElement('nav');
  nav.id = 'kinnav'; nav.setAttribute('aria-label', 'KIN hub');
  nav.innerHTML = '<div class="kn-in"><a class="kn-logo" href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/logo/logo-reversed.png" alt="KIN by the Lake"><span>Project hub</span></a>' +
    '<button class="kn-burger" type="button" aria-label="Menu"><span></span></button>' +
    '<ul class="kn-list">' + MENU.map(function (m, i) {
      var on = m.items.some(function (it) { return isActive(it[0]); });
      return '<li class="kn-item"><button class="kn-top' + (on ? ' on' : '') + '" type="button" data-i="' + i + '">' + m.label + '<i></i></button><div class="kn-drop' + (m.cols === 2 ? ' c2' : '') + '">' +
        m.items.map(function (it) { return '<a href="' + ROOT + it[0] + '"' + (isActive(it[0]) && it[0].indexOf('#') < 0 ? ' class="on"' : '') + '><b>' + it[1] + '</b>' + (it[2] ? '<small>' + it[2] + '</small>' : '') + '</a>'; }).join('') + '</div></li>';
    }).join('') + '<li><a class="kn-q" href="' + ROOT + 'questionnaire/">Questionnaire</a></li></ul></div>';

  nav.addEventListener('click', function (e) {
    var t = e.target.closest('.kn-top');
    if (t) { var li = t.parentNode, was = li.classList.contains('open'); Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { x.classList.remove('open'); }); if (!was) li.classList.add('open'); return; }
    if (e.target.closest('.kn-burger')) { nav.classList.toggle('mob'); return; }
    if (e.target.closest('.kn-drop a')) { nav.classList.remove('mob'); Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { x.classList.remove('open'); }); }
  });
  if (window.matchMedia && matchMedia('(hover:hover) and (min-width:901px)').matches) {
    nav.addEventListener('mouseover', function (e) { var li = e.target.closest('.kn-item'); if (!li) return; Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { if (x !== li) x.classList.remove('open'); }); li.classList.add('open'); });
    nav.addEventListener('mouseleave', function () { Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { x.classList.remove('open'); }); });
  }
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { x.classList.remove('open'); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { nav.classList.remove('mob'); Array.prototype.forEach.call(nav.querySelectorAll('.kn-item.open'), function (x) { x.classList.remove('open'); }); } });

  function mount() {
    if (!css.isConnected) (document.head || document.documentElement).appendChild(css);
    if (document.body && !nav.isConnected) document.body.insertBefore(nav, document.body.firstChild);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  // pages that re-render their body (bundled documents) can detach the bar; put it back
  new MutationObserver(function () { if (!nav.isConnected || !css.isConnected) mount(); }).observe(document.documentElement, { childList: true, subtree: true });
})();

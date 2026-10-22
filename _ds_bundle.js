/* @ds-bundle: {"format":4,"namespace":"KINByTheLakeDesignSystem_006565","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"ReflectionDevice","sourcePath":"components/brand/ReflectionDevice.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"DataTable","sourcePath":"components/content/DataTable.jsx"},{"name":"Dialog","sourcePath":"components/content/Dialog.jsx"},{"name":"MenuItem","sourcePath":"components/content/MenuItem.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"ba4217ae8c54","components/brand/ReflectionDevice.jsx":"1ed15357b45b","components/content/Card.jsx":"66090b0c894b","components/content/DataTable.jsx":"5001354dc882","components/content/Dialog.jsx":"39b1c1424588","components/content/MenuItem.jsx":"7644b4d01e32","components/core/Button.jsx":"8c83476f9ee3","components/core/Chip.jsx":"989feaea740b","components/core/Icon.jsx":"966f2c521138","components/core/Tag.jsx":"ac522bc0f367","components/core/TextLink.jsx":"aee5c1371513","components/forms/Checkbox.jsx":"9621df277cf5","components/forms/Radio.jsx":"fc95cf9cf1bc","components/forms/SegmentedControl.jsx":"73505216531d","components/forms/Select.jsx":"127ba9ee3a0b","components/forms/TextField.jsx":"e66c7cab9ab6","components/navigation/NavBar.jsx":"b2499051bdf3","ui_kits/website/home.jsx":"7de29f40a602","ui_kits/website/menu.jsx":"8b1719cf2ab2","ui_kits/website/reserve.jsx":"3f4376c1bab0","ui_kits/website/shell.jsx":"8def8e0a83ca","ui_kits/website/story.jsx":"3f7da5c9692c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KINByTheLakeDesignSystem_006565 = window.KINByTheLakeDesignSystem_006565 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
const FILES = {
  primary: 'logo-primary.png',
  reversed: 'logo-reversed.png',
  brass: 'logo-brass.png',
  black: 'logo-black.png',
  grey: 'logo-grey.png'
};
/** Locked KIN lockup (master PNG artwork). variant 'icon' = reversed lockup in a Lake Blue circle. Never recolour or redraw. */
function Logo({
  variant = 'primary',
  width = 160,
  assetBase = 'assets/logo/',
  alt = 'KIN by the lake',
  style
}) {
  if (variant === 'icon') {
    return /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": alt,
      style: {
        width,
        height: width,
        borderRadius: '50%',
        background: 'var(--lake-600)',
        display: 'inline-grid',
        placeItems: 'center',
        flex: 'none',
        ...style
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: assetBase + FILES.reversed,
      alt: "",
      style: {
        width: '72%',
        display: 'block'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("img", {
    src: assetBase + (FILES[variant] || FILES.primary),
    alt: alt,
    style: {
      width,
      minWidth: 94,
      height: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/ReflectionDevice.jsx
try { (() => {
const FILES = {
  'lake-blue': 'reflection-lake-blue.png',
  'off-white': 'reflection-off-white.png',
  brass: 'reflection-brass.png'
};
/** The five reflection strokes extracted from the logo — the only water in the system. One per layout, never with the full logo. */
function ReflectionDevice({
  color = 'lake-blue',
  width = 120,
  reveal = false,
  assetBase = 'assets/logo/',
  style
}) {
  const [shown, setShown] = React.useState(!reveal);
  React.useEffect(() => {
    if (reveal) {
      const t = setTimeout(() => setShown(true), 60);
      return () => clearTimeout(t);
    }
  }, [reveal]);
  return /*#__PURE__*/React.createElement("img", {
    src: assetBase + (FILES[color] || FILES['lake-blue']),
    alt: "",
    "aria-hidden": "true",
    style: {
      width: Math.max(48, width),
      height: 'auto',
      display: 'block',
      clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 50% 0 50%)',
      transition: 'clip-path var(--motion-slow) var(--motion-ease)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { ReflectionDevice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ReflectionDevice.jsx", error: String((e && e.message) || e) }); }

// components/content/DataTable.jsx
try { (() => {
/** Hairline table — events, wine lists, allergen matrices. No vertical rules, no zebra. First column Cinzel; numeric columns right-aligned tabular. */
function DataTable({
  columns = [],
  rows = [],
  style
}) {
  const tmpl = columns.map((c, i) => i === 0 ? 'minmax(160px,2fr)' : 'minmax(90px,1fr)').join(' ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: tmpl,
      font: '300 14px/1.4 var(--font-body)',
      color: 'var(--lake-600)'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: 'h' + i,
    style: {
      padding: '12px 0',
      borderBottom: '1px solid var(--lake-600)',
      font: '500 10px/1.4 var(--font-text-latin)',
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      textAlign: c.align || 'left'
    }
  }, c.label)), rows.map((r, ri) => columns.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: ri + '-' + i,
    style: {
      padding: '14px 0',
      borderBottom: '1px solid var(--stone-300)',
      textAlign: c.align || 'left',
      fontVariantNumeric: 'tabular-nums',
      ...(i === 0 ? {
        font: '400 16px/1.3 var(--font-display)',
        letterSpacing: '.06em'
      } : {})
    }
  }, r[c.key])))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/content/Dialog.jsx
try { (() => {
/** Modal dialog. Lake Blue 55% backdrop, overlay shadow, Esc + backdrop close. */
function Dialog({
  open = true,
  onClose,
  children,
  inline = false,
  width = 380,
  style
}) {
  React.useEffect(() => {
    if (!open || !onClose) return;
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: inline ? 'relative' : 'fixed',
      inset: inline ? undefined : 0,
      zIndex: 100,
      padding: inline ? '40px 24px' : 24,
      background: 'var(--color-scrim)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--stone-50)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'center',
      textAlign: 'center',
      color: 'var(--lake-600)',
      boxSizing: 'border-box',
      ...style
    }
  }, children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/content/MenuItem.jsx
try { (() => {
const ALLERGENS = {
  G: 'Gluten',
  N: 'Nuts',
  D: 'Dairy',
  S: 'Shellfish',
  V: 'Vegetarian',
  VG: 'Vegan'
};
/** Dish line. Original name (Cinzel) → Thai-script name (Taviraj, Thai/Peranakan only) → EN → TH → markers → whole-baht price. */
function MenuItem({
  name,
  nameTh,
  description,
  descriptionTh,
  price,
  spice = 0,
  allergens = [],
  share,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '4px 24px',
      color: 'var(--lake-600)',
      padding: '18px 0',
      borderBottom: '1px solid var(--stone-300)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'baseline',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 20px/1.3 var(--font-display-latin)',
      letterSpacing: '.08em'
    }
  }, name), nameTh ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 20px/1.3 var(--font-display-thai)'
    }
  }, nameTh) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 18px/1.3 var(--font-text-latin)',
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'right'
    }
  }, price), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 14px/1.6 var(--font-text-latin)',
      gridColumn: 1
    }
  }, description) : null, descriptionTh ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 14px/1.7 var(--font-read-thai)',
      gridColumn: 1
    }
  }, descriptionTh) : null, spice || allergens.length || share ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 1,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      paddingTop: 4,
      font: '500 10px/1 var(--font-text-latin)',
      letterSpacing: '.18em'
    }
  }, spice ? /*#__PURE__*/React.createElement("span", {
    "aria-label": 'Spice ' + spice + ' of 3',
    style: {
      display: 'flex',
      gap: 3
    }
  }, Array.from({
    length: spice
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--kin-lantern-red)'
    }
  }))) : null, allergens.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    title: ALLERGENS[a],
    style: {
      minWidth: 20,
      height: 20,
      padding: '0 4px',
      border: '1px solid var(--lake-600)',
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      fontSize: 9,
      letterSpacing: '.04em',
      boxSizing: 'border-box'
    }
  }, a)), share ? /*#__PURE__*/React.createElement("span", null, "SHARE \xB7 ", share) : null) : null);
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MenuItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Pill choice chip — dayparts, areas, filters. */
function Chip({
  selected = false,
  disabled = false,
  onClick,
  children,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    "aria-pressed": selected,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      height: 36,
      padding: '0 16px',
      borderRadius: 999,
      border: '1px solid var(--lake-600)',
      cursor: disabled ? 'default' : 'pointer',
      background: selected ? 'var(--lake-600)' : h ? 'var(--lake-50)' : 'transparent',
      color: selected ? 'var(--stone-50)' : 'var(--lake-600)',
      font: '400 12px/1 var(--font-ui)',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--motion-base) var(--motion-ease)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const ICONS = {
  "good-food": {
    "vb": "0 0 32 32",
    "inner": "<circle cx=\"16\" cy=\"16\" r=\"8\"></circle><circle cx=\"16\" cy=\"16\" r=\"5\"></circle><line x1=\"5\" y1=\"7\" x2=\"5\" y2=\"25\"></line><line x1=\"3.5\" y1=\"7\" x2=\"3.5\" y2=\"11.5\"></line><line x1=\"6.5\" y1=\"7\" x2=\"6.5\" y2=\"11.5\"></line><line x1=\"27\" y1=\"7\" x2=\"27\" y2=\"25\"></line>"
  },
  "good-people": {
    "vb": "0 0 32 32",
    "inner": "<circle cx=\"16\" cy=\"11\" r=\"3.5\"></circle><circle cx=\"8\" cy=\"13\" r=\"2.8\"></circle><circle cx=\"24\" cy=\"13\" r=\"2.8\"></circle><path d=\"M10 25c0-4 2.7-7 6-7s6 3 6 7\"></path><path d=\"M3.5 24c0-3 2-5.5 4.5-5.5\"></path><path d=\"M28.5 24c0-3-2-5.5-4.5-5.5\"></path>"
  },
  "good-moments": {
    "vb": "0 0 32 32",
    "inner": "<line x1=\"4\" y1=\"13\" x2=\"28\" y2=\"13\"></line><line x1=\"9\" y1=\"17\" x2=\"23\" y2=\"17\"></line><line x1=\"12\" y1=\"21\" x2=\"20\" y2=\"21\"></line><line x1=\"14.5\" y1=\"25\" x2=\"17.5\" y2=\"25\"></line>"
  },
  "menu": {
    "vb": "0 0 32 32",
    "inner": "<rect x=\"8\" y=\"5\" width=\"16\" height=\"22\" rx=\"1\"></rect><line x1=\"12\" y1=\"11\" x2=\"20\" y2=\"11\"></line><line x1=\"12\" y1=\"15\" x2=\"20\" y2=\"15\"></line><line x1=\"12\" y1=\"19\" x2=\"17\" y2=\"19\"></line>"
  },
  "reserve": {
    "vb": "0 0 32 32",
    "inner": "<rect x=\"6\" y=\"8\" width=\"20\" height=\"18\" rx=\"1\"></rect><line x1=\"6\" y1=\"13\" x2=\"26\" y2=\"13\"></line><line x1=\"11\" y1=\"5\" x2=\"11\" y2=\"10\"></line><line x1=\"21\" y1=\"5\" x2=\"21\" y2=\"10\"></line><circle cx=\"16\" cy=\"19.5\" r=\"2\"></circle>"
  },
  "lantern": {
    "vb": "0 0 32 32",
    "inner": "<line x1=\"12\" y1=\"8\" x2=\"20\" y2=\"8\"></line><path d=\"M14 8V5.5h4V8\"></path><rect x=\"11\" y=\"10\" width=\"10\" height=\"13\" rx=\"4\"></rect><path d=\"M16 14.5c1.2 1.4 1.2 3 0 4.5-1.2-1.5-1.2-3.1 0-4.5z\"></path><line x1=\"10\" y1=\"26\" x2=\"22\" y2=\"26\"></line>"
  },
  "pavilion": {
    "vb": "0 0 32 32",
    "inner": "<path d=\"M4 15 16 7l12 8\"></path><line x1=\"8\" y1=\"15\" x2=\"8\" y2=\"23\"></line><line x1=\"16\" y1=\"15\" x2=\"16\" y2=\"23\"></line><line x1=\"24\" y1=\"15\" x2=\"24\" y2=\"23\"></line><line x1=\"4\" y1=\"23\" x2=\"28\" y2=\"23\"></line><line x1=\"9\" y1=\"27\" x2=\"23\" y2=\"27\"></line>"
  },
  "pier": {
    "vb": "0 0 32 32",
    "inner": "<path d=\"M3 12c2 6 7 8 13 8s9-1 12-4\"></path><line x1=\"24\" y1=\"17\" x2=\"29\" y2=\"22\"></line><line x1=\"7\" y1=\"25\" x2=\"25\" y2=\"25\"></line>"
  },
  "wine": {
    "vb": "0 0 32 32",
    "inner": "<path d=\"M11 5h10v5a5 5 0 0 1-10 0z\"></path><line x1=\"16\" y1=\"15\" x2=\"16\" y2=\"25\"></line><line x1=\"11\" y1=\"25\" x2=\"21\" y2=\"25\"></line>"
  },
  "sunset": {
    "vb": "0 0 32 32",
    "inner": "<path d=\"M9 19a7 7 0 0 1 14 0\"></path><line x1=\"4\" y1=\"19\" x2=\"28\" y2=\"19\"></line><line x1=\"9\" y1=\"23\" x2=\"23\" y2=\"23\"></line><line x1=\"13\" y1=\"27\" x2=\"19\" y2=\"27\"></line>"
  },
  "events": {
    "vb": "0 0 32 32",
    "inner": "<circle cx=\"16\" cy=\"16\" r=\"6\"></circle><circle cx=\"16\" cy=\"16\" r=\"2.5\"></circle><circle cx=\"16\" cy=\"5.5\" r=\"2\"></circle><circle cx=\"16\" cy=\"26.5\" r=\"2\"></circle><circle cx=\"5.5\" cy=\"16\" r=\"2\"></circle><circle cx=\"26.5\" cy=\"16\" r=\"2\"></circle>"
  },
  "find-us": {
    "vb": "0 0 32 32",
    "inner": "<path d=\"M16 28s8-8 8-14a8 8 0 0 0-16 0c0 6 8 14 8 14z\"></path><circle cx=\"16\" cy=\"14\" r=\"3\"></circle>"
  },
  "share": {
    "vb": "0 0 32 32",
    "inner": "<circle cx=\"12\" cy=\"16\" r=\"7\"></circle><circle cx=\"20\" cy=\"16\" r=\"7\"></circle>"
  },
  "kids": {
    "vb": "0 0 32 32",
    "inner": "<circle cx=\"16\" cy=\"9\" r=\"3\"></circle><path d=\"M11 27v-8a5 5 0 0 1 10 0v8\"></path>"
  },
  "chevron-down": {
    "vb": "0 0 16 16",
    "inner": "<path d=\"M3 6l5 5 5-5\"></path>"
  },
  "check": {
    "vb": "0 0 16 16",
    "inner": "<path d=\"M3 8l3.5 3.5L13 5\"></path>"
  }
};
/** KIN line icon — extends the brand board's Good Food / Good People / Good Moments set. 32-grid, round caps, no fills. */
function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth,
  label,
  style
}) {
  const def = ICONS[name];
  if (!def) return null;
  const small = def.vb === '0 0 16 16';
  const sw = strokeWidth ?? (small ? 1.6 : Math.min(2, 1.25 * (32 / size) * 0.85));
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: def.vb,
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: def.inner
    }
  });
}
const ICON_NAMES = ["good-food", "good-people", "good-moments", "menu", "reserve", "lantern", "pavilion", "pier", "wine", "sunset", "events", "find-us", "share", "kids", "chevron-down", "check"];
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  md: {
    h: 48,
    px: 24,
    fs: 12
  },
  sm: {
    h: 40,
    px: 18,
    fs: 11
  }
};
/** KIN button. One primary per view. On Lake Blue grounds pass inverse. */
function Button({
  variant = 'primary',
  size = 'md',
  inverse = false,
  disabled = false,
  icon,
  lang = 'en',
  full = false,
  children,
  onClick,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const blue = 'var(--lake-600)',
    ow = 'var(--stone-50)';
  const base = inverse ? ow : blue,
    ink = inverse ? blue : ow;
  const act = inverse ? press ? 'var(--stone-200)' : hover ? 'var(--stone-100)' : ow : press ? 'var(--lake-800)' : hover ? 'var(--lake-700)' : blue;
  let bg, fg, border;
  if (variant === 'primary') {
    bg = act;
    fg = ink;
    border = '1px solid ' + act;
  } else {
    const on = hover || press;
    bg = on ? press ? inverse ? 'var(--stone-200)' : 'var(--lake-700)' : base : 'transparent';
    fg = on ? ink : base;
    border = '1px solid ' + base;
  }
  const th = lang === 'th';
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      height: s.h,
      padding: '0 ' + s.px + 'px',
      border,
      borderRadius: 2,
      background: bg,
      color: fg,
      font: th ? '400 14px/1 var(--font-text-thai)' : '500 ' + s.fs + 'px/1 var(--font-text-latin)',
      letterSpacing: th ? 0 : '.2em',
      textTransform: th ? 'none' : 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      width: full ? '100%' : undefined,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.38 : 1,
      transition: 'background var(--motion-base) var(--motion-ease), color var(--motion-base) var(--motion-ease)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const V = {
  editorial: {
    background: 'var(--lake-600)',
    color: 'var(--stone-50)',
    border: '1px solid var(--lake-600)'
  },
  kitchen: {
    background: 'transparent',
    color: 'var(--lake-600)',
    border: '1px solid var(--lake-600)'
  },
  seasonal: {
    background: 'var(--kin-honey)',
    color: 'var(--lake-700)',
    border: '1px solid var(--kin-honey)'
  },
  status: {
    background: 'var(--stone-200)',
    color: 'var(--lake-600)',
    border: '1px solid var(--stone-200)'
  }
};
/** Square-cornered label. Max two per card. Never brass or red. */
function Tag({
  variant = 'kitchen',
  lang = 'en',
  children,
  style
}) {
  const th = lang === 'th';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      height: 26,
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      ...V[variant],
      font: th ? '400 12px/1 var(--font-text-thai)' : '500 10px/1 var(--font-text-latin)',
      letterSpacing: th ? 0 : '.18em',
      textTransform: th ? 'none' : 'uppercase',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
/** Tracked caps text link with brass underline. */
function TextLink({
  href = '#',
  inverse = false,
  children,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      font: '500 12px/1 var(--font-text-latin)',
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: inverse ? 'var(--stone-50)' : h ? 'var(--lake-700)' : 'var(--lake-600)',
      textDecoration: 'underline',
      textDecorationColor: h ? inverse ? 'var(--stone-50)' : 'var(--lake-600)' : 'var(--kin-brass)',
      textDecorationThickness: h ? 2 : 1,
      textUnderlineOffset: 8,
      transition: 'all var(--motion-base) var(--motion-ease)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/content/Card.jsx
try { (() => {
/** Content card. variant 'event' = raised off-white, square image; 'story' = Lake Blue with arch-cropped image. Radius 0. */
function Card({
  variant = 'event',
  image,
  eyebrow,
  title,
  body,
  cta,
  onCta,
  style
}) {
  if (variant === 'story') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--lake-600)',
        color: 'var(--stone-50)',
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        textAlign: 'center',
        ...style
      }
    }, image ? /*#__PURE__*/React.createElement("div", {
      style: {
        width: '70%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        borderRadius: '999px 999px 0 0'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    })) : null, eyebrow ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 10px/1.4 var(--font-text-latin)',
        letterSpacing: '.24em',
        textTransform: 'uppercase',
        color: 'var(--brass-300)'
      }
    }, eyebrow) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 22px/1.25 var(--font-display)',
        letterSpacing: '.04em'
      }
    }, title), body ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: '300 14px/1.6 var(--font-body)'
      }
    }, body) : null, cta ? /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
      inverse: true,
      onClick: e => {
        e.preventDefault();
        onCta && onCta();
      }
    }, cta) : null);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--stone-0)',
      border: '1px solid var(--stone-300)',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--lake-600)',
      ...style
    }
  }, image ? /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 10px/1.4 var(--font-text-latin)',
      letterSpacing: '.24em',
      textTransform: 'uppercase'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 22px/1.25 var(--font-display)',
      letterSpacing: '.04em'
    }
  }, title), body ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 14px/1.6 var(--font-body)'
    }
  }, body) : null, cta ? /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    onClick: e => {
      e.preventDefault();
      onCta && onCta();
    },
    style: {
      fontSize: 11
    }
  }, cta)) : null));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Square checkbox, 1px Lake Blue; filled with off-white check when on. */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      font: '300 14px/1.4 var(--font-body)',
      color: 'var(--lake-600)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      border: '1px solid var(--lake-600)',
      background: checked ? 'var(--lake-600)' : 'transparent',
      display: 'grid',
      placeItems: 'center',
      flex: 'none',
      boxSizing: 'border-box'
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 12,
    color: "var(--stone-50)"
  }) : null), children);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio row — 20px circle, 1px Lake Blue line. */
function Radio({
  checked = false,
  onChange,
  disabled = false,
  name,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      font: '300 14px/1.4 var(--font-body)',
      color: 'var(--lake-600)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: () => onChange && onChange(true),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '1px solid var(--lake-600)',
      display: 'grid',
      placeItems: 'center',
      flex: 'none',
      boxSizing: 'border-box'
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--lake-600)'
    }
  }) : null), children);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/** Segmented control — language toggle, kitchen tabs. options: {value,label,lang?}[] */
function SegmentedControl({
  options = [],
  value,
  onChange,
  inverse = false,
  style
}) {
  const ink = inverse ? 'var(--stone-50)' : 'var(--lake-600)',
    ground = inverse ? 'var(--lake-600)' : 'var(--stone-50)';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      border: '1px solid ' + ink,
      borderRadius: 2,
      width: 'fit-content',
      ...style
    }
  }, options.map((o, i) => {
    const on = o.value === value;
    const th = o.lang === 'th';
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        height: 40,
        padding: '0 18px',
        border: 0,
        borderLeft: i ? '1px solid ' + ink : 0,
        background: on ? ink : 'transparent',
        color: on ? ground : ink,
        cursor: 'pointer',
        font: th ? '400 13px/1 var(--font-text-thai)' : '500 11px/1 var(--font-text-latin)',
        letterSpacing: th ? 0 : '.18em',
        textTransform: th ? 'none' : 'uppercase'
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Native select styled as a KIN field. options: string[] | {value,label}[] */
function Select({
  label,
  value,
  defaultValue,
  options = [],
  onChange,
  disabled = false,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      font: '500 10px/1.4 var(--font-text-latin)',
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--lake-600)',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 48,
      borderRadius: 2,
      border: focus ? '2px solid var(--kin-brass)' : '1px solid var(--lake-600)',
      padding: '0 40px 0 ' + (focus ? 13 : 14) + 'px',
      background: 'var(--stone-0)',
      color: 'var(--lake-600)',
      font: '300 15px var(--font-body)',
      outline: 'none',
      cursor: 'pointer'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: 17,
      pointerEvents: 'none',
      color: 'var(--lake-600)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labelled text input / textarea. Label always above; never placeholder-only. */
function TextField({
  label,
  value,
  defaultValue,
  placeholder,
  onChange,
  error,
  hint,
  disabled = false,
  multiline = false,
  rows = 3,
  type = 'text',
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const border = error ? '1px solid var(--color-border-error)' : focus ? '2px solid var(--kin-brass)' : '1px solid var(--lake-600)';
  const pad = focus && !error ? 13 : 14;
  const common = {
    value,
    defaultValue,
    placeholder,
    disabled,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      border,
      borderRadius: 2,
      outline: 'none',
      background: disabled ? 'var(--stone-100)' : 'var(--stone-0)',
      color: 'var(--lake-600)',
      font: '300 15px/1.5 var(--font-body)',
      padding: multiline ? pad - 2 + 'px ' + pad + 'px' : '0 ' + pad + 'px',
      height: multiline ? undefined : 48,
      resize: 'vertical'
    }
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      font: '500 10px/1.4 var(--font-text-latin)',
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--lake-600)',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, label, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, common)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 11px/1.4 var(--font-text-latin)',
      letterSpacing: 0,
      textTransform: 'none',
      color: error ? 'var(--color-text-error)' : 'var(--color-text-muted)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/** Site nav. Five links max, Reserve always last and filled. inverse = over hero photography / night. */
function NavBar({
  links = ['Menu', 'Story', 'Pavilion', 'Events', 'Visit'],
  active,
  onNavigate,
  onReserve,
  inverse = false,
  lang,
  onLangChange,
  assetBase = 'assets/logo/',
  compact = false,
  style
}) {
  const ink = inverse ? 'var(--stone-50)' : 'var(--lake-600)';
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      height: compact ? 56 : 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: compact ? '0 20px' : '0 clamp(20px,4vw,56px)',
      background: inverse ? 'transparent' : 'var(--stone-50)',
      borderBottom: inverse ? '1px solid rgba(243,239,230,.18)' : '1px solid var(--stone-300)',
      color: ink,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: inverse ? 'reversed' : 'primary',
    width: compact ? 94 : 112,
    assetBase: assetBase
  })), compact ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, links.slice(0, 5).map(l => {
    const on = active === l.toLowerCase();
    return /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(l.toLowerCase());
      },
      style: {
        font: '500 10px/1 var(--font-text-latin)',
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: ink,
        textDecoration: 'none',
        paddingBottom: 6,
        borderBottom: on ? '1px solid var(--kin-brass)' : '1px solid transparent'
      }
    }, l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, lang && !compact ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onLangChange && onLangChange(lang === 'en' ? 'th' : 'en'),
    style: {
      background: 'none',
      border: 0,
      color: ink,
      cursor: 'pointer',
      font: '500 10px var(--font-text-latin)',
      letterSpacing: '.2em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: lang === 'en' ? 1 : 0.55
    }
  }, "EN"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-text-thai)',
      letterSpacing: 0,
      opacity: lang === 'th' ? 1 : 0.55
    }
  }, "\u0E44\u0E17\u0E22")) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    inverse: inverse,
    onClick: onReserve,
    style: {
      height: 38,
      fontSize: 10
    }
  }, "Reserve")));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/home.jsx
try { (() => {
function HomeScreen({
  go,
  lang
}) {
  const {
    Button,
    TextLink,
    ReflectionDevice,
    Card,
    MenuItem,
    Tag
  } = KS;
  const th = lang === 'th';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 640,
      height: '88vh',
      color: 'var(--stone-50)',
      marginTop: -72,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + 'pavilion-sunset.png',
    alt: "The bamboo pavilion on the lake at dusk",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(30,61,90,.55) 0%, rgba(30,61,90,0) 32%, rgba(30,61,90,0) 52%, rgba(30,61,90,.8) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 'clamp(48px,8vh,96px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18,
      textAlign: 'center',
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "Lunch \xB7 Sunset \xB7 Dinner"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: th ? '300 clamp(40px,6vw,64px)/1.35 var(--font-display-thai)' : '400 clamp(40px,6vw,72px)/1.05 var(--font-display)',
      letterSpacing: th ? 0 : '.04em'
    }
  }, th ? 'สองครัว หนึ่งโต๊ะ' : 'Two kitchens. One table.'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: th ? '300 16px/1.4 var(--font-text-latin)' : '300 20px/1.4 var(--font-display-thai)',
      letterSpacing: th ? '.08em' : 0
    }
  }, th ? 'Two kitchens. One table.' : 'สองครัว หนึ่งโต๊ะ'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      paddingTop: 10,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    onClick: () => go('reserve')
  }, th ? 'จองโต๊ะ' : 'Reserve'), /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    variant: "secondary",
    onClick: () => go('menu')
  }, th ? 'ดูเมนู' : 'View menu')))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22,
      textAlign: 'center',
      maxWidth: 640,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "Kin \xB7 \u0E01\u0E34\u0E19"), /*#__PURE__*/React.createElement("h2", {
    style: kinH2
  }, "Eat as kin."), /*#__PURE__*/React.createElement(ReflectionDevice, {
    width: 110,
    assetBase: A_LOGO,
    reveal: true
  }), /*#__PURE__*/React.createElement("p", {
    style: kinBody
  }, "In Thai, kin means to eat. In English, it means family. We cook from two kitchens \u2014 Phuket-Peranakan and Italian \u2014 each with its own character, and bring them to the same round table."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      font: '300 16px/1.75 var(--font-read-thai)'
    }
  }, "\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E2A\u0E2D\u0E07\u0E04\u0E23\u0E31\u0E27 \u0E20\u0E39\u0E40\u0E01\u0E47\u0E15-\u0E40\u0E1B\u0E2D\u0E23\u0E32\u0E19\u0E32\u0E01\u0E31\u0E19\u0E41\u0E25\u0E30\u0E2D\u0E34\u0E15\u0E32\u0E40\u0E25\u0E35\u0E22\u0E19 \u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F\u0E1A\u0E19\u0E42\u0E15\u0E4A\u0E30\u0E01\u0E25\u0E21\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19"))), /*#__PURE__*/React.createElement(Section, {
    bg: "var(--stone-100)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "editorial"
  }, "Signature")), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Mee Hokkien",
    nameTh: "\u0E2B\u0E21\u0E35\u0E48\u0E2E\u0E01\u0E40\u0E01\u0E35\u0E49\u0E22\u0E19",
    price: 360,
    description: "Wok-fried yellow noodles, prawn, squid, egg.",
    allergens: ['G', 'S']
  }), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Gaeng Poo",
    nameTh: "\u0E41\u0E01\u0E07\u0E1B\u0E39\u0E43\u0E1A\u0E0A\u0E30\u0E1E\u0E25\u0E39",
    price: 690,
    description: "Phuket crab curry, betel leaf, khanom jeen.",
    spice: 2,
    allergens: ['S']
  }), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Tagliolini al Limone",
    price: 560,
    description: "Fresh egg pasta, lemon, butter, parmigiano.",
    allergens: ['G', 'D'],
    style: {
      borderBottom: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    onClick: e => {
      e.preventDefault();
      go('menu');
    }
  }, "See the full menu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + 'dining-hall.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 20,
      flexWrap: 'wrap',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "At the lake"), /*#__PURE__*/React.createElement("h2", {
    style: kinH2
  }, "Time well spent")), /*#__PURE__*/React.createElement(TextLink, {
    onClick: e => {
      e.preventDefault();
      go('events');
    }
  }, "All events")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Every Sunday \xB7 12\u20134 pm",
    title: "The Long Lunch",
    body: "Four courses from both kitchens, passed round the table.",
    cta: "Reserve",
    onCta: () => go('reserve'),
    image: A_PH + 'terrace-dusk.png'
  }), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Daily \xB7 from 5:30 pm",
    title: "Aperitivo by the lake",
    body: "Spritz, small plates and the light going gold over the water.",
    cta: "Reserve",
    onCta: () => go('reserve'),
    image: A_PH + 'lantern.png'
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "story",
    title: "Porcelain Stories",
    body: "The blue-and-white that links Phuket to the Italian coast.",
    cta: "Our story",
    onCta: () => go('story'),
    image: A_PH + 'toile-chair.png'
  }))), /*#__PURE__*/React.createElement(Section, {
    bg: "var(--lake-800)",
    color: "var(--stone-50)",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...kinEyebrow,
      color: 'var(--brass-300)'
    }
  }, "Tonight"), /*#__PURE__*/React.createElement("h2", {
    style: kinH2
  }, "Lanterns lit at 6:15."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      maxWidth: 460
    }
  }, "Pavilion tables from 8 guests. Longtail arrival from the pier on request."), /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    onClick: () => go('reserve')
  }, "Reserve a table"))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/menu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const KIN_MENU = {
  phuket: {
    title: 'Phuket & Peranakan',
    th: 'ครัวภูเก็ต · เปอรานากัน',
    items: [{
      name: 'Moo Hong',
      nameTh: 'หมูฮ้อง',
      price: 420,
      description: 'Braised pork belly, black pepper, garlic, star anise.',
      descriptionTh: 'หมูสามชั้นตุ๋นพริกไทยดำ กระเทียม โป๊ยกั๊ก สูตรภูเก็ต',
      allergens: ['G'],
      share: '2–4'
    }, {
      name: 'Gaeng Poo',
      nameTh: 'แกงปูใบชะพลู',
      price: 690,
      description: 'Phuket crab curry, betel leaf, khanom jeen.',
      descriptionTh: 'แกงปูใบชะพลู เสิร์ฟกับขนมจีน',
      spice: 2,
      allergens: ['S']
    }, {
      name: 'Mee Hokkien',
      nameTh: 'หมี่ฮกเกี้ยน',
      price: 360,
      description: 'Wok-fried yellow noodles, prawn, squid, egg.',
      descriptionTh: 'หมี่เหลืองผัด กุ้ง ปลาหมึก ไข่',
      allergens: ['G', 'S']
    }]
  },
  italia: {
    title: 'Italia',
    th: 'ครัวอิตาเลียน',
    items: [{
      name: 'Burrata e Pomodori',
      price: 520,
      description: 'Burrata, heirloom tomatoes, basil, olive oil.',
      descriptionTh: 'ชีสบูราต้า มะเขือเทศ โหระพาอิตาเลียน',
      allergens: ['D', 'V']
    }, {
      name: 'Tagliolini al Limone',
      price: 560,
      description: 'Fresh egg pasta, lemon, butter, parmigiano.',
      descriptionTh: 'เส้นพาสต้าสด เลมอน เนย พาร์มิจาโน',
      allergens: ['G', 'D']
    }, {
      name: 'Branzino al Sale',
      price: '1,450',
      description: 'Whole salt-baked sea bass, carved at the table.',
      descriptionTh: 'ปลากะพงอบเกลือทั้งตัว แล่ที่โต๊ะ',
      share: '3–5'
    }]
  },
  drinks: {
    title: 'Drinks',
    th: 'เครื่องดื่ม',
    items: [{
      name: 'Aperitivo',
      price: 320,
      description: 'House spritz, Thai-botanical bitter, soda.'
    }, {
      name: 'Nebbiolo',
      price: '480 / 2,400',
      description: 'Langhe, Piedmont · glass / bottle.'
    }, {
      name: 'Cha Yen Zero',
      price: 180,
      description: 'Smoked Thai tea, oat milk, palm sugar. Zero-proof.'
    }]
  }
};
function MenuScreen({
  go
}) {
  const {
    SegmentedControl,
    MenuItem,
    ReflectionDevice,
    Button
  } = KS;
  const [tab, setTab] = React.useState('phuket');
  const k = KIN_MENU[tab];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "Menu \xB7 \u0E40\u0E21\u0E19\u0E39"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...kinH2,
      fontSize: 'clamp(36px,4.4vw,48px)'
    }
  }, "A journey, never a mix"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      maxWidth: 520
    }
  }, "Start in Phuket, travel to Italy. Order a few, pass them round, then order a few more."), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: tab,
    onChange: setTab,
    options: [{
      value: 'phuket',
      label: 'Phuket'
    }, {
      value: 'italia',
      label: 'Italia'
    }, {
      value: 'drinks',
      label: 'Drinks'
    }],
    style: {
      marginTop: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '64px auto 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...kinH2,
      fontSize: 28
    }
  }, k.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 18px/1.4 var(--font-display-thai)'
    }
  }, k.th), /*#__PURE__*/React.createElement(ReflectionDevice, {
    width: 90,
    assetBase: A_LOGO,
    key: tab,
    reveal: true
  })), k.items.map(it => /*#__PURE__*/React.createElement(MenuItem, _extends({
    key: it.name
  }, it))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '28px 0 0',
      font: '400 12px/1.5 var(--font-text-latin)',
      letterSpacing: '.02em',
      textAlign: 'center',
      color: 'var(--lake-500)'
    }
  }, "Prices in Thai baht, subject to 10% service charge and 7% VAT \xB7 Please tell us about allergies"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('reserve')
  }, "Reserve")))));
}
window.MenuScreen = MenuScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/menu.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/reserve.jsx
try { (() => {
function ReserveScreen({
  go
}) {
  const {
    TextField,
    Select,
    Chip,
    Radio,
    Checkbox,
    Button,
    Dialog,
    ReflectionDevice,
    DataTable
  } = KS;
  const [daypart, setDaypart] = React.useState('Sunset 5:30');
  const [area, setArea] = React.useState('terrace');
  const [guests, setGuests] = React.useState('6 guests');
  const [phone, setPhone] = React.useState('');
  const [err, setErr] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [extras, setExtras] = React.useState({
    chair: false,
    boat: false
  });
  const submit = () => {
    if (phone.replace(/\D/g, '').length < 9) {
      setErr('Please enter a full number.');
      return;
    }
    setErr('');
    setDone(true);
  };
  const areaName = {
    hall: 'Dining Hall',
    terrace: 'Lantern Terrace',
    pavilion: 'Pavilion'
  }[area];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))',
      gap: 'clamp(32px,6vw,96px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "Reservations \xB7 \u0E08\u0E2D\u0E07\u0E42\u0E15\u0E4A\u0E30"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...kinH2,
      fontSize: 'clamp(34px,4vw,48px)'
    }
  }, "Your table is waiting"), /*#__PURE__*/React.createElement("p", {
    style: kinBody
  }, "Long lunches, dinners that linger. Tell us when, and who is coming."), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      overflow: 'hidden',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + 'terrace-night.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 's',
      label: 'Space'
    }, {
      key: 'a',
      label: 'Seated'
    }, {
      key: 'b',
      label: 'Standing'
    }],
    rows: [{
      s: 'Pavilion',
      a: 14,
      b: 20
    }, {
      s: 'Lantern Terrace',
      a: 40,
      b: 70
    }, {
      s: 'Dining Hall',
      a: 80,
      b: 120
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      background: 'var(--stone-0)',
      border: '1px solid var(--stone-300)',
      padding: 'clamp(20px,3vw,36px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Date",
    defaultValue: "Saturday, 14 November"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Guests",
    value: guests,
    onChange: setGuests,
    options: ['2 guests', '4 guests', '6 guests', '8 guests', '10+ guests']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ['Lunch', 'Sunset 5:30', 'Dinner 7:30'].map(d => /*#__PURE__*/React.createElement(Chip, {
    key: d,
    selected: daypart === d,
    onClick: () => setDaypart(d)
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 10px/1.4 var(--font-text-latin)',
      letterSpacing: '.22em'
    }
  }, "SEATING"), /*#__PURE__*/React.createElement(Radio, {
    name: "area",
    checked: area === 'hall',
    onChange: () => setArea('hall')
  }, "Dining hall"), /*#__PURE__*/React.createElement(Radio, {
    name: "area",
    checked: area === 'terrace',
    onChange: () => setArea('terrace')
  }, "Lantern terrace"), /*#__PURE__*/React.createElement(Radio, {
    name: "area",
    checked: area === 'pavilion',
    onChange: () => setArea('pavilion')
  }, "Pavilion (8\u201314 guests)"), area === 'pavilion' && parseInt(guests) < 8 ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px/1.5 var(--font-text-latin)',
      color: 'var(--color-text-error)'
    }
  }, "The pavilion seats 8\u201314. Please choose another area.") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: extras.chair,
    onChange: v => setExtras({
      ...extras,
      chair: v
    })
  }, "High chair"), /*#__PURE__*/React.createElement(Checkbox, {
    checked: extras.boat,
    onChange: v => setExtras({
      ...extras,
      boat: v
    })
  }, "Longtail boat arrival")), /*#__PURE__*/React.createElement(TextField, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Phone",
    placeholder: "+66",
    value: phone,
    onChange: setPhone,
    error: err
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Occasion / notes",
    multiline: true,
    placeholder: "A birthday, a table near the water\u2026"
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    icon: "reserve",
    onClick: submit
  }, "Reserve")))), /*#__PURE__*/React.createElement(Dialog, {
    open: done,
    onClose: () => setDone(false)
  }, /*#__PURE__*/React.createElement(ReflectionDevice, {
    width: 56,
    assetBase: A_LOGO
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 22px/1.25 var(--font-display)',
      letterSpacing: '.04em'
    }
  }, "Your table is held"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '300 14px/1.6 var(--font-body)'
    }
  }, "Saturday 14 November \xB7 ", daypart, " \xB7 ", guests, ", ", areaName, ". We'll send a confirmation on LINE."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary"
  }, "Add to calendar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => {
      setDone(false);
      go('home');
    }
  }, "Done"))));
}
window.ReserveScreen = ReserveScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/reserve.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shell.jsx
try { (() => {
const KS = window.KINByTheLakeDesignSystem_006565;
const A_LOGO = '../../assets/logo/',
  A_PH = '../../assets/photos/';
const kinEyebrow = {
  font: '500 11px/1.4 var(--font-text-latin)',
  letterSpacing: '.28em',
  textTransform: 'uppercase'
};
const kinH2 = {
  margin: 0,
  font: '400 clamp(28px,3.4vw,40px)/1.15 var(--font-display)',
  letterSpacing: '.05em'
};
const kinBody = {
  margin: 0,
  font: '300 16px/1.7 var(--font-body)'
};
function Section({
  children,
  bg,
  color,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      color,
      padding: 'clamp(64px,8vw,112px) clamp(20px,5vw,56px)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, children));
}
function Footer({
  onNavigate
}) {
  const {
    Logo,
    Icon
  } = KS;
  const col = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    font: '300 14px/1.6 var(--font-body)'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--lake-600)',
      color: 'var(--stone-50)',
      padding: '72px clamp(20px,5vw,56px) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "reversed",
    width: 150,
    assetBase: A_LOGO
  }), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...kinEyebrow,
      fontSize: 10,
      color: 'var(--brass-300)'
    }
  }, "Visit"), /*#__PURE__*/React.createElement("span", null, "[Lake address], Phuket"), /*#__PURE__*/React.createElement("span", null, "Open daily 11:30\u201323:00")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...kinEyebrow,
      fontSize: 10,
      color: 'var(--brass-300)'
    }
  }, "Talk to us"), /*#__PURE__*/React.createElement("span", null, "Tel 076 523 126"), /*#__PURE__*/React.createElement("span", null, "WhatsApp 089 728 3336"), /*#__PURE__*/React.createElement("span", null, "LINE kinbythelake")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...col,
      flexDirection: 'row',
      gap: 18,
      alignItems: 'flex-start'
    }
  }, ['good-food', 'good-people', 'good-moments'].map(n => /*#__PURE__*/React.createElement(Icon, {
    key: n,
    name: n,
    size: 32,
    color: "var(--kin-brass)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '56px auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(243,239,230,.18)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      ...kinEyebrow,
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "Eat well. Laugh often. Stay close."), /*#__PURE__*/React.createElement("span", null, "\xA9 KIN by the Lake")));
}
Object.assign(window, {
  KS,
  A_LOGO,
  A_PH,
  kinEyebrow,
  kinH2,
  kinBody,
  Section,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/story.jsx
try { (() => {
function StoryScreen({
  go
}) {
  const {
    ReflectionDevice,
    TextLink
  } = KS;
  const arch = {
    aspectRatio: '3/4',
    overflow: 'hidden',
    borderRadius: '999px 999px 0 0'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
      gap: 'clamp(32px,6vw,96px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...arch,
      maxWidth: 440,
      width: '100%',
      justifySelf: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + 'toile-chair.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "Our story"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...kinH2,
      fontSize: 'clamp(34px,4vw,48px)'
    }
  }, "Porcelain links two shores"), /*#__PURE__*/React.createElement(ReflectionDevice, {
    width: 100,
    assetBase: A_LOGO,
    reveal: true
  }), /*#__PURE__*/React.createElement("p", {
    style: kinBody
  }, "Peranakan porcelain and Italian maiolica speak the same blue. Both kitchens care about exceptional ingredients, expressive flavour and the pleasure of a long table."), /*#__PURE__*/React.createElement("p", {
    style: kinBody
  }, "So we keep them apart on the menu and together at the table. Moo Hong the way Phuket grandmothers make it. Tagliolini the way it is made in Amalfi. Both passed round."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      font: '300 16px/1.75 var(--font-read-thai)'
    }
  }, "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E25\u0E32\u0E22\u0E04\u0E23\u0E32\u0E21\u0E40\u0E1B\u0E2D\u0E23\u0E32\u0E19\u0E32\u0E01\u0E31\u0E19\u0E01\u0E31\u0E1A\u0E21\u0E32\u0E22\u0E2D\u0E25\u0E34\u0E01\u0E32\u0E2D\u0E34\u0E15\u0E32\u0E40\u0E25\u0E35\u0E22\u0E19\u0E1E\u0E39\u0E14\u0E20\u0E32\u0E29\u0E32\u0E2A\u0E35\u0E04\u0E23\u0E32\u0E21\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19")))), /*#__PURE__*/React.createElement(Section, {
    bg: "var(--stone-100)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
      gap: 'clamp(32px,6vw,96px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: kinEyebrow
  }, "The room"), /*#__PURE__*/React.createElement("h2", {
    style: kinH2
  }, "Slow down. Settle in."), /*#__PURE__*/React.createElement("p", {
    style: kinBody
  }, "A dining space where timeless patterns meet the warmth of nature. Indigo botanical fabrics, rich wood grains, and softly glowing lanterns come together beneath a canopy of greenery. Gentle curves and tactile materials create a sense of understated elegance, inviting guests to slow down, settle in, and enjoy the moment."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      font: '300 16px/1.75 var(--font-read-thai)'
    }
  }, "\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E30\u0E17\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1C\u0E2A\u0E32\u0E19\u0E40\u0E2A\u0E19\u0E48\u0E2B\u0E4C\u0E02\u0E2D\u0E07\u0E25\u0E27\u0E14\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E19\u0E37\u0E2D\u0E01\u0E32\u0E25\u0E40\u0E27\u0E25\u0E32\u0E40\u0E02\u0E49\u0E32\u0E01\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2D\u0E1A\u0E2D\u0E38\u0E48\u0E19\u0E02\u0E2D\u0E07\u0E18\u0E23\u0E23\u0E21\u0E0A\u0E32\u0E15\u0E34 \u0E1C\u0E49\u0E32\u0E25\u0E32\u0E22\u0E1E\u0E24\u0E01\u0E29\u0E32\u0E2A\u0E35\u0E04\u0E23\u0E32\u0E21 \u0E25\u0E32\u0E22\u0E44\u0E21\u0E49 \u0E41\u0E25\u0E30\u0E41\u0E2A\u0E07\u0E15\u0E30\u0E40\u0E01\u0E35\u0E22\u0E07\u0E19\u0E38\u0E48\u0E21\u0E19\u0E27\u0E25\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E19\u0E20\u0E32\u0E22\u0E43\u0E15\u0E49\u0E23\u0E48\u0E21\u0E40\u0E07\u0E32\u0E02\u0E2D\u0E07\u0E15\u0E49\u0E19\u0E44\u0E21\u0E49 \u0E40\u0E2A\u0E49\u0E19\u0E2A\u0E32\u0E22\u0E42\u0E04\u0E49\u0E07\u0E21\u0E19\u0E41\u0E25\u0E30\u0E1C\u0E34\u0E27\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E02\u0E2D\u0E07\u0E27\u0E31\u0E2A\u0E14\u0E38\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E04\u0E27\u0E32\u0E21\u0E2B\u0E23\u0E39\u0E2B\u0E23\u0E32\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E07\u0E48\u0E32\u0E22 \u0E40\u0E0A\u0E37\u0E49\u0E2D\u0E40\u0E0A\u0E34\u0E0D\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E21\u0E32\u0E40\u0E22\u0E37\u0E2D\u0E19\u0E04\u0E48\u0E2D\u0E22 \u0E46 \u0E1C\u0E48\u0E2D\u0E19\u0E04\u0E25\u0E32\u0E22 \u0E41\u0E25\u0E30\u0E14\u0E37\u0E48\u0E21\u0E14\u0E48\u0E33\u0E01\u0E31\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E15\u0E23\u0E07\u0E2B\u0E19\u0E49\u0E32")), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + 'dining-hall.png',
    alt: "The dining hall: indigo toile chairs, rattan pendants, lantern light",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/React.createElement(Section, {
    bg: "var(--lake-600)",
    color: "var(--stone-50)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
      gap: 40
    }
  }, [['The lake', 'Arrive by the stepping-stone path or by longtail from the pier.', 'garden-path'], ['The pavilion', 'A round bamboo room on the water, lit by red-tasselled lanterns.', 'pavilion-sunset'], ['The table', 'An oil lantern on every table, and every dish set down to share.', 'lantern']].map(([t, b, p]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A_PH + p + '.png',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 22px/1.25 var(--font-display)',
      letterSpacing: '.04em'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      ...kinBody,
      fontSize: 14
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    inverse: true,
    onClick: e => {
      e.preventDefault();
      go('reserve');
    }
  }, "Come and stay a while"))));
}
window.StoryScreen = StoryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/story.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.ReflectionDevice = __ds_scope.ReflectionDevice;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.NavBar = __ds_scope.NavBar;

})();

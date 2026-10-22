# Website UI kit — kinbythelake.com

Click-through recreation of the website spec in the KIN brand book (section 09). No production site was supplied, so screens follow the documented nav/hero/menu/story/reservation rules exactly.

- `index.html` — app shell: sticky NavBar (reversed over hero, solid Off-White after 80px), footer, fixed 60px mobile Reserve bar below 768px.
- `shell.jsx` — Section wrapper, Footer, shared type styles.
- `home.jsx` — hero (pavilion at dusk, Lake Blue scrim), brand idea, signature dishes, event/story cards, "Tonight" band.
- `menu.jsx` — kitchen tabs (Phuket · Italia · Drinks), never mixed.
- `story.jsx` — arch image, porcelain heritage, place triptych.
- `reserve.jsx` — reservation form with validation + confirmation Dialog.

All primitives come from the design-system bundle (`window.KINByTheLakeDesignSystem_006565`).

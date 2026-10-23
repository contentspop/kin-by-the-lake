# KIN by the Lake — Project Hub

> **Status: DRAFT for review.** Nothing in this repo is approved by the owners yet.

> **Live site:** https://contentspop.github.io/kin-by-the-lake/ — start at the Questionnaire or the Brand Book.
> Raw source uploads (identity board, interior reference, architecture PDF) are kept out of this public repo.

A lakeside dining destination in Phuket where the vibrant flavours of Phuket and its Peranakan heritage meet the generosity of the Italian table. Two kitchens, each with its own character, served to one round table — **never fusion**. Designed for sharing: long lunches, dinners that linger, time well spent together.

- **Name insight:** “Kin” = กิน (to eat) in Thai, and family in English.
- **Brand line:** Eat well. Laugh often. Stay close.
- **Values:** Simple. Natural. Timeless. — Good food · Good people · Good moments
- **Creative direction:** “Lanterns on the Water”. Lake Blue + Warm Off-White carry the brand; Aged Brass is the lantern glint; the logo’s reflection strokes are the signature graphic.
- **Open placeholders:** location/lake name, price per head, core guest mix, final dayparts, billboard size, address/email — shown as `[brackets]` wherever they appear.

## Contact
- Tel: 076 523 126 (international +66 76 523 126)
- WhatsApp: 089 728 3336 (+66 89 728 3336)
- LINE: kinbythelake

## Sources
- `uploads/839785.jpg` — logo & identity board (primary/reversed/black/grey logos, colours, type, clear space, min size, social icon, applications, Good Food/People/Moments icons).
- `uploads/837569630_…_n.jpg` — interior mood reference (toile tub chair, round table, oil lantern, encaustic tile). The “DULANTA” wordmark on it is a third-party interior studio, not part of KIN.
- `uploads/KIN Design System - Standalone.html` — earlier draft KIN brand book (Oct 2026), used as the starting point for rules, copy, values and component specs; its master logo PNGs, photography, fonts, icons and patterns were extracted programmatically into this project.
- `uploads/KIN by the lake_presented_LR.pdf` — architecture/interior presentation (site plan, pavilion, terrace, hall renders). Renders used here came via the standalone brand book.
- Brief pasted by the user (role, locked assets, palette, guardrails, touchpoints).

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `fonts/` — self-hosted woff2 subsets (Cinzel, Montserrat, Taviraj, Kanit, IBM Plex Sans Thai Looped)
- `assets/logo/` — master logo PNGs (primary, reversed, brass, black, grey) + extracted reflection strokes (lake-blue, off-white, brass)
- `assets/icons/` — 14 brand line icons + chevron/check (SVG)
- `assets/patterns/` — Porcelain Lattice (lake-blue / off-white), paper grain
- `assets/photos/` — pavilion, terrace (dusk/night), dining hall, garden path, lantern, toile chair, blade sign, menu cover, napkin ring, site plan
- `guidelines/*.html` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (see below), each with `.d.ts` + `.prompt.md` and one card per folder
- `ui_kits/website/` — kinbythelake.com click-through (Home, Menu, Story, Reserve)
- `templates/brand-book/BrandBook.dc.html` — full brand book: principles → foundations → components → applications (social, website, signage, collateral, menu, billboard) → one-page quick reference
- `SKILL.md` — agent skill entry

## Components
- **core/** — `Button`, `TextLink`, `Tag`, `Chip`, `Icon` (+ `ICON_NAMES`)
- **forms/** — `TextField`, `Select`, `Radio`, `Checkbox`, `SegmentedControl`
- **navigation/** — `NavBar`
- **content/** — `Card` (event / story-arch), `MenuItem`, `DataTable`, `Dialog`
- **brand/** — `Logo`, `ReflectionDevice`

Inventory follows the brand book’s “07 Components” section. Intentional additions: `Logo` and `ReflectionDevice` (wrap the master PNG artwork so nobody redraws it), `Icon` (wraps the extracted line-icon set), `MenuItem` (encodes the documented dish-name hierarchy).

Logo/ReflectionDevice take `assetBase` (path to `assets/logo/` from the consuming page).

---

## CONTENT FUNDAMENTALS
**Voice:** a host at the table, not a brochure. “We” and “you”. Short sentences. Full stops, never exclamation marks. One idea per line.
- Name the ingredient, the place, the person. Talk about time — long lunches, the light, the next course.
- Banned words: exquisite, curated, fusion, paradise, quick, hurry.
- **Casing:** Sentence case for headlines in Cinzel (Cinzel’s small-caps forms do the work); tracked ALL-CAPS only for Montserrat eyebrows, labels and buttons. Thai has no caps — hierarchy by size/weight.
- **Emoji:** never. Unicode used only for · separators, – ranges, × dimensions.
- **Bilingual:** one language per headline; the second sits beneath, smaller. Thai market: Thai leads, English at 60%. International: English leads, Thai at 75%. Thai is written in Thai, never translated word-for-word; ค่ะ/ครับ only in direct service messages.
- **Dish names:** original language first (Mee Hokkien, Moo Hong · หมูฮ้อง, Tagliolini al Limone), then EN, then TH description. No italics for foreign words. Keep accents (caffè, più). One cuisine per dish name — never “Tom Yum Risotto”. Max one Italian word per social post (“Aperitivo by the lake”). Explain Peranakan words once, plainly.
- **Prices:** whole baht, no ฿, no decimals, tabular, right-aligned.

Personality — **Generous** (is abundant, warm, inclusive · is not excessive, loud, showy) · **Rooted** (is heritage-literate, specific · is not nostalgic kitsch, folkloric, “fusion”) · **Unhurried** (is calm, lingering · is not sleepy, precious).

Sample lines — EN: Eat well. Laugh often. Stay close. / Two kitchens. One table. / Lunch that turns into sunset. / The lanterns are lit. Your table is ready. / Pass it round. That’s the point.
TH: สองครัว หนึ่งโต๊ะ / มื้อกลางวันที่ยาวไปจนพระอาทิตย์ตก / ตะเกียงจุดแล้ว โต๊ะของคุณพร้อมแล้ว / ส่งต่อกันรอบโต๊ะ นั่นแหละคือการกิน / กินดี หัวเราะบ่อย อยู่ใกล้กัน

## VISUAL FOUNDATIONS
**The room · interior mood (guiding statement)**
> A dining space where timeless patterns meet the warmth of nature. Indigo botanical fabrics, rich wood grains, and softly glowing lanterns come together beneath a canopy of greenery. Gentle curves and tactile materials create a sense of understated elegance, inviting guests to slow down, settle in, and enjoy the moment.
>
> พื้นที่รับประทานอาหารที่ผสานเสน่ห์ของลวดลายเหนือกาลเวลาเข้ากับความอบอุ่นของธรรมชาติ ผ้าลายพฤกษาสีคราม ลายไม้ และแสงตะเกียงนุ่มนวลอยู่ร่วมกันภายใต้ร่มเงาของต้นไม้ เส้นสายโค้งมนและผิวสัมผัสของวัสดุสร้างความหรูหราอย่างเรียบง่าย เชื้อเชิญให้ผู้มาเยือนค่อย ๆ ผ่อนคลาย และดื่มด่ำกับช่วงเวลาตรงหน้า

Translation into the system: indigo botanical fabric → Porcelain Indigo + Porcelain Lattice; lantern glow → Aged Brass; rattan/woven → Bamboo Honey; gentle curves → circle, arch, 0/2px corners kept soft by generous space (no sharp graphic angles); tactile materials → real linen, cloth-bound covers, uncoated cotton stock. Wood grain and greenery live in photography only — never drawn as graphics. Use the statement as the test for any layout: does it make a guest slow down?

- **Colour:** Warm Off-White ground (50–60% of any layout), Lake Blue for text/nav/covers/night, Aged Brass as glint only (foil, hairlines, icons on blue — never text on light, 2.8:1). Supporting ≤15% combined: Porcelain Indigo (pattern, link hover), Slate Charcoal (stone, posts, uniform), Bamboo Honey (kraft, seasonal), Lantern Red ≤1% (spice dots, error, one tassel). No pure white anywhere; Stone ramp replaces grey.
- **Never:** Santorini blue-on-white, Italian tricolore, red+gold fields (CNY), red-checked cloth, palm-leaf graphics, extra wave icons, kebaya-lace overload, fusion visuals.
- **Type:** Cinzel 400 (display) + Taviraj 300 (Thai display, 112%); Montserrat 300/400/500 (text/UI) + Kanit 300 (Thai UI, 94%) + IBM Plex Sans Thai Looped (long Thai, 104%). Signature tracking +0.32em echoes “by the lake”. Never letter-space Thai; Thai line-height ≥1.6.
- **Backgrounds:** flat Off-White or Lake Blue. No gradients — except photo scrims (Lake Blue 0 → max 55% for logo zones, 85% for text, never black). Optional paper grain overlay 4–6% multiply on print-like surfaces, never on UI controls.
- **Graphic language (priority order, 1–2 per layout):** reflection device (extracted, horizontal, one per layout, never with the full logo) → circle (pavilion, round tables, icon) → Porcelain Lattice (hairline quatrefoil, 12–18% opacity, ≤30% of a surface, never behind logo/text/photo) → line icons. Shophouse arch used as a photo window, one per page.
- **Imagery:** golden hour → blue hour, lanterns always lit, lake in frame for wides, hands sharing round the table, one cuisine per frame. Warm highlights / cool Lake Blue shadows, lifted blacks, −8 saturation, greens to olive, 2% grain. Never flash, midday sun, teal-orange or HDR.
- **Layout:** generous margins, centred brand moments, a horizon line at 42% height. 8pt spacing (4–16 inside components, 24–48 between, 96–128 between sections). Max content 1200. Default stack: eyebrow → headline → device → body → CTA.
- **Corners:** 0 for cards/images, 2px for buttons/inputs, arch for story photos, round for chips/icons.
- **Cards:** raised off-white (#FBF9F4) with 1px Stone hairline, or solid Lake Blue; no rounded corners, no coloured left borders.
- **Borders:** 1px Lake Blue for controls, 1px Stone-300 hairlines for separation, 1px brass for active nav underline.
- **Shadows:** three levels only — flat, raise, overlay — always tinted Lake Blue.
- **Motion:** one ease `cubic-bezier(.2,.6,.2,1)`; 240ms for state, 600ms for the reflection reveal (horizontal wipe). No bounce, never a wave animation.
- **Hover:** darken one step (#16304A); secondary buttons fill. **Press:** #0F2538. **Focus:** 2px brass ring, 3px offset. **Disabled:** 38–45%. Selection: Honey 60%.
- **Transparency/blur:** only the Lake Blue 55% dialog scrim and photo scrims. No glassmorphism.
- **Fixed elements:** nav sticky (transparent over hero, solid Off-White after 80px); fixed 60px Reserve bar on mobile.

## ICONOGRAPHY
- Own line-icon set extending the board’s Good Food / Good People / Good Moments icons: 32-unit grid, 1.25 stroke at 32px, round caps/joins, open forms, no fills. 14 glyphs in `assets/icons/` (good-food, good-people, good-moments, menu, reserve, lantern, pavilion, pier, wine, sunset, events, find-us, share, kids) + chevron-down, check. Use via `<Icon name="…" />`.
- Colour: brass on Lake Blue or Lake Blue on Off-White — never brass on off-white. Sizes 16 inline · 24 UI · 32 feature · 56 highlight; 18px in buttons with 8–10px gap.
- Menu markers: Lantern Red spice dots (1–3) and allergen letters G · N · D · S · V · VG in a 1px circle.
- No icon font, no emoji, no CDN icon library. No wave, water, leaf or palm icons — the reflection strokes are the only water.

## Fonts
All five families are Google Fonts (OFL), self-hosted from the subsets embedded in the earlier draft brand book. No substitutions were needed.

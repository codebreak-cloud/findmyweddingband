# Boujee Music Matchmaker — Design System

## What this is

**Boujee Music** is a premium wedding-band agency. This design system covers **The Wedding Band Matchmaker**, an 11-question quiz lead magnet: an engaged couple lands on a marketing page, clicks into the quiz, answers questions about atmosphere and songs, hands over contact details, gets a personalised band match, and books a call. It's optimised for **booked calls, not completions** — the design should feel considered, editorial and daydream-like, never like filling in a form.

Two surfaces are covered:
- **Landing page** — hero, problem, how-it-works, band teaser, testimonials, FAQ, final CTA.
- **Quiz** — its own URL, 11 questions plus a DJ soft-exit branch, ending in a single-page staged results reveal (match %, band, the Boujee sell, and an inline booking call-to-action).

## Sources

This system was built from four documents, no codebase or Figma file attached:
- `uploads/Boujee Music - Wedding Band Matchmaker - Build Spec.md` — question flow, scoring logic, results-page structure
- `uploads/Boujee-Matchmaker-Design-Brief-v2.md` — current visual direction (supersedes v1: real fonts, real palette, bolder scale)
- `uploads/The Wedding Band Matchmaker - Landing Page Copy.pdf` — confirmed landing page and DJ soft-exit copy
- `uploads/Copy of Boujee_Song_List.pdf` — confirmed song list and tagging for the signature multi-select question
- `uploads/montserrat/`, `uploads/amsterdam-signature/` — real brand font files, self-hosted into `assets/fonts/`

No existing UI kit, brand guideline PDF, or logo file was supplied, so components below are a standard set sized to the brief's needs, not a recreation of an existing library.

## Components

- `components/core/Button.jsx` — primary/secondary/ghost CTA with press feedback
- `components/forms/Input.jsx` — labelled text field with focus/error states
- `components/forms/OptionCard.jsx` — single-select question answer row
- `components/forms/SongRow.jsx` — the signature piano-key multi-select song row
- `components/forms/HeartToggle.jsx` — the shared fine-line heart selection mark
- `components/feedback/ProgressRing.jsx` — the closing-ring progress indicator
- `components/feedback/MatchBadge.jsx` — the closed ring framing the script match percentage
- `components/feedback/LoadingBeat.jsx` — the Stage 1 "calculating your match" beat

## UI kits

- `ui_kits/landing/` — full landing page, real confirmed copy
- `ui_kits/quiz/` — interactive click-through: Q1 → DJ soft exit (with door back in) → time-of-day branch → atmosphere → signature song multi-select → partner taste → timeline → venue/date → lead capture → loading → staged results reveal. Scoring follows the build spec (Option 1: overlap songs are personalisation-only, single-tag picks decide the band; floor 80% / ceiling 97%, atmosphere-agreement bonus).

## Intentional additions

- `HeartToggle` and `ProgressRing`/`MatchBadge` are new — they're the brief's two named motifs (heart-as-selection, ring-as-progress), not present in any prior UI, so they're authored as first-class components rather than one-off markup.

## Version 2 — what changed

The first pass came out flat ("could be a quiz about anything"). Per the v2 brief (`uploads/Boujee-Matchmaker-Design-Brief-v2.md`), the fixes:
- **Real fonts, corrected.** The brand fonts are **Montserrat** and **Amsterdam Signature** — not the "Ellipsis"/"Amsterdam One Cursive" names in the old CSS stack. Both are now self-hosted from the supplied `.ttf` files (see `tokens/fonts.css`), full Montserrat weight range Thin→Black plus italics.
- **Real palette.** Three confirmed brand colours, used as fields, not hairlines: violet `#26004D`, coral `#EFB0A1`, ice `#EEF7F7`, on a barely-warm paper `#FFFDFB`. Coral is a fill only — never body text on a light ground.
- **Violent type scale.** Montserrat Black at 44–110px for every question headline; Regular for body; Medium letterspaced uppercase for labels and the `01 / 11` track numbering. No mid-weight, mid-size "generic" type.
- **Alternating grounds + full bleed.** No screen sits on one flat background throughout the flow — violet → ice → duotone photo → coral → paper cycles through the quiz and landing page. At least one element bleeds off-edge on every screen.
- **Duotone photography.** Shadows map to violet, highlights to coral/ice, unifying photography and tying every image to the palette; full colour is reserved for the results-page band reveal, where the shift IS the reveal.
- **Four disciplined motifs** (up from two): the keyboard setlist with a coral "Your setlist" panel, the heart selection mark, the closing ring, and Montserrat-Medium track numbering (`01 / 11`).

## Content fundamentals

- **Voice**: warm, direct, a little wry — "After the fifth Instagram reel, they all blur into one." Speaks to "you" throughout, addresses the bride-to-be directly, never the wedding party or "couples" in the abstract until summarising.
- **Honesty over sales pressure**: the brief and copy both insist on this repeatedly — "we'd rather tell you that now than waste your time," "no pressure," "the Boujee team will check availability... and be in touch," never a fabricated instant confirmation.
- **No filler enthusiasm**: copy earns its claims with specifics ("no dead air between sets," "liaising directly with the venue on logistics") rather than adjectives like "amazing" or "incredible."
- **Casing**: sentence case throughout, including headings and buttons — no title case, no all-caps except small uppercase metadata labels (question counters, form labels) which use letter-spacing, not weight, for emphasis.
- **No emoji, anywhere.** The brand's warmth comes from specificity and tone, not iconography.
- **The DJ exit is deliberately blunt**, not apologetic: "Boujee is a live band agency through and through... we don't offer DJs." Plain refusal, softened only by a genuine door back in.

## Visual foundations

- **Colour**: three confirmed brand colours used as full fields and blocks, never hairlines — violet `#26004D` (ink, primary CTA, large fields), coral `#EFB0A1` (warmth/energy fills, selected states), ice `#EEF7F7` (cool alternate ground). Paper `#FFFDFB` is for reading surfaces only. Coral is a fill, never body text on a light ground — enforced pairing rules live in `guidelines/colors-semantic-states.html`.
- **Type**: Montserrat at the extremes — Black (900) for every display/question headline at violent scale (44–110px), Regular (400) for body only, Medium (500) letterspaced uppercase for labels and track numbering. Amsterdam Signature appears in exactly three places system-wide: the match percentage, the band name at reveal, "Matchmaker" in the hero. Never in body, buttons or labels; never below 40px.
- **Spacing**: 4px base scale (4 → 128), generous margins.
- **Backgrounds**: alternating grounds (violet → ice → duotone photo → coral → paper) — no screen is flat throughout, no three consecutive screens share a ground. At least one element bleeds off-edge per screen.
- **Photography**: duotone throughout the quiz (shadows → violet, highlights → coral/ice via CSS blend modes over the `<image-slot>` placeholders) — full colour reserved for the results-page band reveal, where the shift to colour is the reveal itself. Crowd/dancefloor silhouettes are meant to be derived from real photography, never vector clip-art party people — no such imagery is bundled here (see Assets).
- **Motion**: characterful, tactile, 150–250ms — press-and-settle on selection, directional slide on question transitions, an animating (not jumping) ring, a designed stage-light-wash loading beat instead of a spinner. `prefers-reduced-motion` fallback baked into the motion tokens.
- **Hover/press states**: primary button darkens toward `--action-primary-bg-hover`; `onInk` variant (coral fill) dims slightly on hover for CTAs sitting on violet grounds; press states scale down slightly (0.97) rather than changing colour.
- **Borders & shadows**: hairlines are structural only (`--border-hairline`, a low-opacity violet), never the primary way colour appears; shadows are soft and rare (`--shadow-card`/`--shadow-lifted`), reserved for genuinely raised surfaces.
- **Corner radii**: modest — 4px small controls, 8px cards/inputs, 14px larger panels. No pill buttons.
- **Transparency/blur**: not used, aside from the duotone photo blend layers.

## Iconography

No icon font, SVG icon set, or emoji is used anywhere in this system. The brief specifies exactly two motifs, both built as components, not icons:
- **The heart** (`HeartToggle`) — the universal selection mark, replacing ticks/checkmarks system-wide.
- **The ring** (`ProgressRing` / `MatchBadge`) — quiz progress, closing into the frame around the match percentage at reveal.

No other iconography (arrows, chevrons, social icons) was specified by the brief; if navigation controls need icons later, match the fine-line, single-weight style of the heart mark rather than introducing an icon font.

## Assets

No logo file was supplied. Per the design brief and build instructions, **no logo has been drawn or approximated** — `guidelines/brand-wordmark.html` renders "Boujee Music" in Montserrat Black wherever a mark would go. No photography is bundled; `<image-slot>` placeholders mark every image position in both UI kits, ready for the user's real duotone-treated wedding/band photography.

## Fonts — resolved in v2

Real brand fonts are now self-hosted (`.ttf`, in `assets/fonts/`): **Montserrat** (Thin through Black, plus italics) and **Amsterdam Signature** (regular + italic). No substitution is in use — `tokens/fonts.css` declares all `@font-face` rules the type scale references.

## Open items from the brief (unresolved, flagged to the user)

- Photography coverage across all four bands, especially The Velvet Saints (not on the current Boujee website) — no photography is bundled in this system; `<image-slot>` placeholders mark every position, ready for the real art-directed duotone treatment.
- The DJ-exit copy contradicts Boujee's current homepage, which lists a DJ service — needs a decision before build.
- All-day results layout (two separate matches vs one combined vibe) — built here as two separate matches per the build spec.
- Crowd/dancefloor silhouette imagery — the brief requires these derived from real photography; none was supplied, so they're not yet built (would need the real photo library to knock out to silhouette/duotone).

## Index

```
styles.css                 → global stylesheet entry (imports tokens/ + base.css)
base.css                   → resets and global element styles
tokens/colors.css          → ink, functional and warm-neutral palette
tokens/typography.css      → font stack, type scale, weights
tokens/spacing.css         → spacing scale, radii, shadows, containers
tokens/motion.css          → easings, durations, prefers-reduced-motion
components/core/           → Button
components/forms/          → Input, OptionCard, SongRow, HeartToggle
components/feedback/       → ProgressRing, MatchBadge, LoadingBeat
guidelines/                → foundation specimen cards (colour, type, spacing, motion, motifs, brand)
ui_kits/landing/           → landing page UI kit
ui_kits/quiz/              → interactive quiz UI kit
thumbnail.html             → project homepage tile
SKILL.md                   → Claude Code / Agent Skills–compatible skill file
```

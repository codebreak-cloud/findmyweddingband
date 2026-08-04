# Design brief — Boujee Music: The Wedding Band Matchmaker

**For:** Claude Design
**Deliverable:** key screens + a design system covering two surfaces — a landing page and a standalone quiz
**Companion docs:** the build spec (question logic, scoring, results copy) and the confirmed song list. This brief covers look, feel and interaction only. Where the two disagree, the build spec wins on logic and this brief wins on design.

---

## 1. What this is

An 11-question quiz that matches an engaged couple to a style of wedding band, then to the specific Boujee band that delivers it. It's a lead magnet. Traffic arrives on a landing page, clicks through to the quiz on its own URL, answers, hands over contact details, gets a personalised match, and books a call.

**Optimise for booked calls, not completions.** This is the single most important line in the brief. A shorter list of the right people booking calls beats a long list of low-intent finishers. Design decisions that would raise completion rate at the cost of intent — speeding people through, hiding the contact form, making the result feel automatic — are the wrong call here. The quiz should feel considered, not frictionless.

## 2. Who's on the other end

A woman, roughly 28–38, getting married in the next two to three years, with the budget for a premium service. Picture her on the sofa on a Tuesday night, phone in hand, half-watching something, tapping through this after an Instagram ad. She's a few months into supplier admin and mildly sick of it. She may not know what kind of band she wants — that's the point of the quiz.

So: **mobile-first, genuinely.** Design the phone screen first and let desktop be the adaptation, not the other way round. And the tone she needs is *daydream*, not *form*. This should feel closer to flicking through a wedding magazine than filling in an enquiry.

## 3. Visual direction

**Light and editorial. Premium print, not premium nightclub.**

Boujee's current website is black, silver and video-led — handsome, but it's also what every band agency looks like. Going light is the differentiator, and it suits the daytime half of the offer far better.

### The trap to avoid

"Light, editorial, wedding" has a default output: cream background, warm blush accent, high-contrast serif, gold foil flourishes, a script font used for everything. It is instantly recognisable and it makes a premium supplier look like a Canva template. **Do not produce that.**

Specifically, avoid:
- Cream or warm off-white backgrounds (`#FDFBF7` and neighbours)
- Blush pink, sage green, champagne gold
- Playfair Display, Cormorant, or any borrowed wedding serif
- Foil textures, floral dividers, ampersand monograms, "&" as decoration
- Script type used as body copy or UI labels
- **Cupid, in any form.** It's the one romance motif that can't be done premium — it lands as clip art or as a Renaissance ceiling, and neither is right. See "The matchmaker motifs" below for what to do instead.

The brand's own colour is a deep violet, and its metal is silver, not gold. Lean into that — it's cooler and less expected than the category default, and it's actually theirs.

### Colour

The brand colour is **`#26004D`**, a deep violet. It's too dark to be an accent — at that value it's an ink. Use it as the darkest structural colour: headings, the primary button fill, the selected state.

Silver/pewter is the secondary, matching the silver iconography on the existing site. **One caution:** silver cannot carry functional state. Silver-on-white doesn't have the contrast to signal "this option is selected" accessibly. So split the two jobs:

- **Silver is decorative and structural** — hairlines, rules, metadata, small metallic detailing, the quiet frame around things
- **`#26004D` is functional** — selected states, focus, progress, the primary CTA

Starting values, to be tuned against the real brand hexes (only `#26004D` is confirmed — treat the rest as proposals):

| Role | Value | Use |
|---|---|---|
| Ink | `#26004D` | Headings, primary button, selected state |
| Body | `#2E2A26` | Long-form text — softer than the brand violet at paragraph length |
| Paper | `#FBF9F6` | Page background. Warm off-white. **Not cream** — no yellow in it. |
| Surface | `#F5F1EC` | Cards, raised panels |
| Stone | `#8F8578` | Hairlines, metadata, captions |
| Sand | `#DFD8CE` | Rules, dividers, inactive states |
| Tint | `#EFE8E0` | Selected-option fill behind the violet border |
| Focus | `#6B4A96` | Focus rings — derived from the brand hue, lightened for visibility |

**A note on why these are warm, having started cool.** The first version of this brief tinted every neutral toward the violet. That's technically tidy — the whole page harmonises — but violet is a cool hue, so the page went cold before the silver even arrived, and cold is wrong for a wedding.

The fix isn't to warm everything. It's to warm the *neutrals* and leave the violet as the only saturated colour on the page. One colour, doing all the work, against warm stone and warm paper. That restraint is most of what makes it read as expensive rather than decorated.

**Silver survives, but demoted.** It still ties back to the existing site's iconography, but it's now a small metallic detail — a hairline, a rule, a mark — sitting against warm neutrals rather than setting the page temperature. Cool metal on warm paper reads as jewellery. Cool metal on cool paper reads as an office.

**And the photography is the real warmth.** Real wedding shots are golden hour, skin tones, warm venue light. A cool-to-neutral structure holding warm imagery is an old editorial trick and it beats warming the whole page uniformly — because if everything is already warm, the photographs stop doing any work. Warm the neutrals just enough to remove the chill, then let the pictures carry the rest.

### Typography

Brand stack, in order:

```
'Ellipsis', 'Gothic A1', sans-serif
'Amsterdam One Cursive', Helvetica, Arial, sans-serif
```

**Ellipsis is not a Google font.** The `.woff2` files must be supplied or the design will silently fall back to Gothic A1 and look wrong. Same for Amsterdam One Cursive. Flagged as a blocker below.

Because the stack is sans-led with a script, the editorial feel has to come from **scale, space and restraint**, not from a serif. That means: large question type, generous line-height, wide margins, small confident metadata, and a real jump between display size and body size. A sans-led editorial page lives or dies on the size contrast.

**Script rules — enforce these strictly.** Amsterdam One Cursive appears in exactly three places:
1. The match percentage on the results page
2. The band name at the moment of reveal
3. Optionally, the word "Matchmaker" in the landing page hero

Never in body copy, never in buttons, never in form labels, never below 32px. One script moment per screen, maximum. Overused script is the fastest route to the template look described above.

### Photography

**Framed, one image per question.** Real wedding photography of the bands, cropped tight, sitting above or beside the question rather than behind it. Text never sits on top of a photo in the quiz — it's a contrast fight across eleven screens and it will lose somewhere.

The full-bleed moment is saved for the **results page reveal**, where it earns its impact.

Note the asset load: roughly 11 quiz images plus a landing hero plus band photography for the results page. If images run short, treatment degrades gracefully to type-and-space rather than repeating photos.

### The matchmaker motifs

It's called the Matchmaker, so romance should be present. The question is how, and the failure mode is obvious: hearts and rings scattered as decoration, which is exactly what a template does.

**The rule: two motifs, maximum.** One for music, one for romance. Piano keys *and* hearts *and* rings *and* cupid *and* petals is a mood board, not a design. Everything below is the same two motifs reused, never a third.

**The heart is the selection mark.** When she picks a song, it marks with a fine-line heart rather than a tick. This works because it's doing a job rather than decorating, because it's small enough to stay premium, and because it's literally what the question asks — which of these would you *love* to hear. Use the same mark consistently for every selection in the quiz, not just songs.

**The ring is the progress indicator.** A circle that closes as she moves through the eleven questions. Quieter than a bar, on-theme without announcing itself, and it sets up the payoff.

**The reveal is the ring closing.** At the results page, the ring she's been completing all the way through finally closes — and becomes the frame around the match percentage, set in Amsterdam One Cursive. That's the illustrated moment, and it costs nothing extra because it's the resolution of a device already in play. One continuous idea, paid off. Far stronger than introducing confetti or a wax seal at the last screen.

Everything else — the framed photography, the keyboard setlist, the type — carries the romance through tone rather than symbol.

*Palette route and motif treatment above are recommendations, applied so the design can proceed. Both are cheap to change now.*

### Motion

**Characterful — real, tactile micro-interactions**, not just fades. This is the fun in an otherwise admin-shaped task. Things to get right:

- Selecting an option should feel physically acknowledged — a press, a settle, not just a colour swap
- Question transitions carry direction: forward moves left, back moves right
- The progress indicator animates, it doesn't jump
- The loading moment (Stage 1) is a designed beat, not a spinner
- Everything respects `prefers-reduced-motion` — supply the reduced variant for each

Keep individual transitions short (150–250ms). Characterful means *well-crafted*, not *slow*.

---

## 4. The signature element: the song question

Q4 and Q6 are the heart of the quiz — 12 songs, multi-select, "which of these would you love to hear?" This is where a boring quiz becomes a fun one, and it deserves the most design attention.

**Two hard constraints before anything else:**
- **No album artwork.** Using real cover art for these tracks is a licensing problem. Rules out the album-tile grid.
- **No audio previews.** Master and sync licensing. Rules out play buttons.

So the answer has to be typographic and tactile. The direction to develop:

### The keyboard setlist

Each song is a full-width horizontal row — title and artist — behaving like a piano key. Tapping presses it: the row depresses, shifts slightly, and a band of `#26004D` appears along the leading edge like the felt under a key. Releasing settles it into the selected state.

Why this rather than a grid of tiles:
- Twelve full-width rows work beautifully on a phone; twelve tiles are cramped
- Song titles and artist names need horizontal room
- It reads as *music* without being literal about it
- Multi-select is legible at a glance down a vertical list

The selected state is marked with the **fine-line heart** described above, sitting at the trailing edge of the row — outline when unselected in a quiet sand tone, filled in violet once picked. The heart and the pressed key land together as one gesture.

Then the payoff: selected songs accumulate into **"Your setlist"** — a persistent count or small stack that builds as she picks. This is the one idea worth protecting, because it's true to the actual product. Boujee sells personalised setlists; the quiz has her building one. It also sets up the results page, which quotes her picks back to her by name.

Carry the music motif into the **loading moment** — keys playing a short run while the match calculates. Note that the progress indicator is the ring, not a key strip: the two-motif rule means music owns the song question and the loading beat, romance owns progress and the reveal. Don't let both compete for the same slot.

If this doesn't land, the fallback is vinyl-sleeve tiles in a two-column grid with the record sliding out of the sleeve on selection — but develop the keyboard first.

---

## 5. Screens to design

**Landing page**
1. Hero — headline, positioning, primary CTA through to the quiz
2. Sell section — what the quiz does and why it's worth two minutes
3. CTA block — the handoff to the quiz

**Quiz** (own URL, arrived at from the landing page)

4. Standard question — single select, with framed photo (use Q1)
5. Soft exit — the DJ answer, plus the "actually, show me live bands" door back in
6. Song multi-select — the signature screen (Q4/Q6)
7. Question with free-text — Q7's partner name field
8. Date picker — Q10, mobile-native behaviour
9. Lead capture gate — Q11, name/email/phone, shown before the reveal
10. Loading moment — Stage 1, 2–3 seconds
11. Results page, single band — the full staged scroll: reveal → percentage → band + video → the Boujee sell → booking embed
12. Results page, all-day variant — two matches, two bands, one page

**Design system**
13. Tokens (colour, type scale, spacing, radius, motion), component states (default/hover/pressed/selected/focus/error), button hierarchy, form fields, plus the two motif components: the heart selection mark in all its states, and the ring progress indicator from empty through to its closed reveal state

Also specify, even if not as full screens: back navigation, form validation errors, and the desktop adaptation of the question screen.

---

## 6. Continuity across the join

The landing page and quiz are separate pages on separate surfaces, and that boundary is where people leave. Design against it:

- The click from landing CTA into the quiz should feel like **entering**, not **reloading**. Carry the hero image or a colour field across so the first quiz screen is visibly the same world.
- Q1 should be visible without scrolling on the quiz page. No second intro screen, no "here's how it works" — the landing page did that job.
- One shared design system across both, so a Divi-built landing page and a separately built quiz don't drift into looking like two different suppliers.

**On the lead gate (Q11):** it sits before the reveal, deliberately. Design it to feel like the last step rather than a toll booth — progress at 11 of 11, and a visible sense that the result is right behind it. That's the single highest-value screen for the actual business goal.

**On the results page:** it's one continuous page, not a reveal followed by a click. Everything from percentage to booking embed happens in one staged scroll. No pricing appears anywhere.

---

## 7. Technical constraints

- Mobile-first; the majority of traffic is paid social on phones
- Fast LCP — paid traffic bounces on slow loads, and treatment B is image-heavy. Photography needs an art-directed crop and a size budget per screen
- Results page embeds four YouTube videos (one per band) and a booking scheduler (Acuity) inline — design the container for both, including a loading state for the embed
- GDPR consent line at the point of capture
- WCAG AA contrast throughout, keyboard navigable, visible focus states
- Analytics events to design around: landing view, quiz start, per-question progress, lead capture, result view, call booked

---

## 8. Open items

Design can proceed on most of these, but they need answers before build.

**Blocking the design:**
1. **Font files.** Ellipsis and Amsterdam One Cursive `.woff2` files, pulled from the site's theme folder. Without these the design is wrong from the first screen.
2. **Brand hexes beyond `#26004D`** — the silver, and any secondary brand values that exist.
3. **Photography** — confirm coverage across all four bands, especially The Velvet Saints.

**Needs a decision, but not blocking:**

4. **Palette temperature.** Warm neutrals applied as recommended. The alternative considered was a warm apricot accent alongside the violet — livelier, but it means art-directing every photograph to sit with a second colour. Flag if you want to see it.
5. **Motif scope.** Heart-as-selection-mark and ring-as-progress applied. Confirm before the system is built out, since both appear on every screen.

**Content and logic, for the client:**

6. **The DJ exit contradicts the live website.** The quiz says Boujee is "a live band agency through and through… we don't offer DJs." The homepage lists "Sax and DJ" and "DJ Service", and a testimonial thanks them for "the fantastic band & DJ." One of these needs to change.
7. **The Velvet Saints isn't on the website.** If it's a new act, check what assets exist.
8. **Percentage denominator.** Scoring is Option 1 — overlap songs are personalisation only, they don't move the tally. The percentage calculation must therefore exclude overlap picks from the denominator too. Otherwise picking three single-tag songs and three overlaps reads as a 50% match and floors at 80%, when it should be near the ceiling.
9. **Soloist/Duo songs on the daytime-only path.** Two songs are tagged Soloist/Duo, but that band only appears on the all-day path. On a daytime-only run those picks score nothing. Either hide them on that path or reassign them.
10. **All-day results layout** (build spec §7) — confirmed as two separate matches. Design accordingly, but flag if this shifts to one combined vibe, because it changes the page.

---

## 9. What good looks like

She's on the sofa, half-watching TV. She opens it expecting a form and finds something that feels like it was made for her wedding specifically. She picks four songs and enjoys picking them. She hands over her email without hesitating, because by that point the result feels worth having. She reads a match that quotes her own choices back at her and thinks *yes, that's it*. She books the call that night.

That's the job. Everything above serves it.

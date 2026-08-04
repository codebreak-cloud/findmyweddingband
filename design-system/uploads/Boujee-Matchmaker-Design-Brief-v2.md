# Design brief v2 — Boujee Music: The Wedding Band Matchmaker

**For:** Claude Design
**Deliverable:** key screens + a design system covering two surfaces — a landing page and a standalone quiz
**Supersedes:** design brief v1
**Companion docs:** the build spec (question logic, scoring, results copy) and the confirmed song list. This brief covers look, feel and interaction only.

---

## 0. Why this is version two

Version one was built and it came out flat — "it could be a quiz about anything." Three causes, all fixable, all worth stating so they don't recur:

1. **The brief was mostly prohibitions.** It listed what to avoid — cream, cupid, script fonts, decoration, clichés — and gave very little instruction on what to actually *do*. Faithfully followed, that produces something safe and empty. This version leads with what to make.
2. **It confused restraint with quality.** Restraint is right for a law firm. This is a product that sells dancefloors. The corrective is not tasteful minimalism; it's confident, high-contrast, unmistakably-about-weddings-and-music design.
3. **The fonts were wrong.** V1 specified Ellipsis and "Amsterdam One Cursive" from the site's CSS stack. The real fonts are Montserrat and Amsterdam Signature. Corrected below.

The imagery was not the problem — real band photography is already in the build. So the flatness came from palette, type scale and composition, and that's where the fixes land.

---

## 1. What this is

An 11-question quiz that matches an engaged couple to a style of wedding band, then to the specific Boujee band that delivers it. Traffic lands on a landing page, clicks to the quiz on its own URL, answers, gives contact details, gets a personalised match, books a call.

**Optimise for booked calls, not completions.** A shorter list of the right people booking calls beats a long list of low-intent finishers. Don't design to rush people through.

## 2. Who's on the other end

A woman, roughly 28–38, marrying in the next two to three years, with budget for a premium service. She's on the sofa on a Tuesday night with her phone, half-watching TV, a few months into supplier admin and mildly sick of it. She may not know what kind of band she wants.

**Mobile-first, genuinely.** Design the phone screen first; desktop adapts from it.

The feeling to aim for is *daydream*, not *form*. Closer to flicking through a wedding magazine than filling in an enquiry.

---

## 3. The bar: it must be unmistakable

**Acceptance test.** Screenshot any screen. Delete every word. You should still be able to tell it's about a wedding with a live band. If a screenshot with the words removed could belong to an insurance quiz, it has failed — and that is exactly what happened in v1.

This is the primary quality bar for the whole project. Apply it to every screen.

---

## 4. Colour

Three confirmed brand colours. All three get used properly — this is not a one-colour design with grey around it.

| Token | Value | Role |
|---|---|---|
| Violet | `#26004D` | Ink, large colour fields, primary CTA, duotone shadow |
| Coral | `#EFB0A1` | The warmth and the energy. Large fills, selected states, duotone highlight |
| Ice | `#EEF7F7` | Cool pale ground for alternating sections, keeps it fresh |
| Paper | `#FFFDFB` | Barely-warm white, for reading surfaces only |
| Ink text | `#26004D` | Headings |
| Body text | `#2E2A32` | Long-form copy |

**Violet and coral together is the whole idea.** Deep violet against soft coral is high-contrast, warm, modern and nothing like the blush-and-gold wedding default. It's also genuinely theirs. Ice sits between them as a palate cleanser.

Contrast rules, non-negotiable:
- Violet on coral, and violet on ice — both excellent, use freely at any size
- White on violet — excellent
- Coral on violet — passes at all sizes, good for accents and secondary type
- **Coral on white or paper fails.** Never set coral text on a light ground. Coral is a *fill*, not a text colour.

### The rule that fixes the dullness

**Colour appears as fields and blocks, not as hairlines and thin borders.** V1 used violet as a 3px edge and a hairline rule, on a beige page. That's why it died. Instead: full-bleed panels, half-screen colour blocks, type reversed out of solid violet, a coral field behind the setlist.

**Alternate the ground.** No page should have one background colour throughout, and no three consecutive screens should share a ground. Cycle: violet → ice → photography → coral → paper. That alternation is most of what separates an editorial page from a form.

---

## 5. Typography

Real brand fonts, supplied as woff2 alongside this brief:

```
Display + UI:  Montserrat  (Thin → Black, plus italics)
Script accent: Amsterdam Signature
```

Montserrat is also on Google Fonts if a CDN is preferred. Amsterdam Signature must be self-hosted from the supplied file.

### How to stop Montserrat looking generic

Montserrat is one of the most-used typefaces on the web and it has a default appearance: Regular and SemiBold, 16–20px, moderate line-height, everything roughly the same size. That is the anonymous look, and it is what v1 produced.

Use the extremes instead:

- **Display** — Montserrat **Black** (900). Question type at **44–56px on mobile**, 80–110px on desktop. Tracking tight and negative, around `-0.03em`. Leading tight, `0.95`–`1.05`. This is the bravery lever; use it on every question screen.
- **Body** — Montserrat Regular (400), 16–17px, line-height 1.6. Never heavier for body.
- **Labels and metadata** — Montserrat Medium (500), **uppercase, letterspaced `+0.12em`**, 11–12px. This is where Montserrat is genuinely elegant, and it does most of the editorial work.
- **Avoid** SemiBold at mid sizes for everything. That single habit is the generic look.

**The size jump has to be violent.** A 52px Black headline above an 11px letterspaced label above 16px body reads as designed. 24px / 18px / 16px reads as a form. If the display type doesn't feel slightly too big, it isn't big enough.

### Amsterdam Signature

Three uses only, and never below 40px:
1. The match percentage on the results page
2. The band name at the moment of reveal
3. The word "Matchmaker" in the landing hero

Never in body, buttons, labels or form fields. One script moment per screen maximum. Script is the seasoning; Montserrat Black is the meal.

---

## 6. Photography

Real band photography is available for all four bands and is already in the build. The job now is treating it so it looks art-directed rather than dropped in.

**Duotone everything.** Map the shadows to violet and the highlights to coral (or to ice for daytime-path imagery). This does three things at once: it unifies photography shot by different people in different venues, it makes mixed-quality images look deliberate, and it ties every photo to the palette so the page reads as one design.

**Reserve one or two full-colour images** for the results page band reveal, where the shift from duotone to full colour becomes the reveal itself. That contrast is free drama.

**Crowd silhouettes as a recurring device.** This is the right instinct and the right way to signal "party" without decoration. Two conditions:
- They must be **derived from real crowd and dancefloor photography** — knocked to true silhouette or heavy duotone
- **Not vector clip-art party people.** Drawn silhouettes of dancers with their arms up are the single fastest way to make this look cheap

Use them as a band along the bottom of question screens, as a section break, and behind the loading moment.

**Bleed.** At least one element should run off the edge of every screen — an image, a colour field, or oversized type. Nothing on this site should sit politely inside a box with margin on all four sides.

---

## 7. Music and wedding theming

V1 held this to "two motifs, maximum." That was over-tight and it's a large part of why the result felt generic. The revised rule:

**Discipline the number of distinct metaphors, not the frequency of use.** Four devices, used often and confidently, riding on top of a bold ground rather than substituting for one.

**1 — The keyboard setlist (the signature screen).** Q4 and Q6 ask her to pick songs she'd love to hear. Twelve songs, multi-select. Each song is a full-width row behaving like a piano key: tapping presses it, the row depresses and shifts, and a band of violet appears along the leading edge like felt under a key.

Two hard constraints: **no album artwork and no audio previews** — both are licensing problems. So this has to be typographic and tactile, which is why the key mechanic is the answer rather than a grid of album tiles.

Selected songs accumulate into **"Your setlist"** on a coral field — a running list that builds as she picks. Protect this. It's true to the product (Boujee sells personalised setlists), and it sets up the results page, which quotes her picks back by name.

**2 — The heart as selection mark.** Every selection in the quiz marks with a heart rather than a tick. It's literally what the question asks — which of these would you *love* to hear. Outline when unselected, solid violet when picked.

**3 — The ring as progress.** A circle closing across the eleven questions. At the results page it completes and becomes the frame around the match percentage, set in Amsterdam Signature. One continuous device, paid off — worth more than introducing confetti at the end.

**4 — Setlist numbering.** Number the questions like a track listing: `01 / 11` in letterspaced uppercase Montserrat Medium. Costs nothing, reads as music immediately.

Texture options on top of these: a waveform used as a section divider instead of a straight rule; stage-light colour washes across photography.

**Still off the table: cupid.** It's the one romance motif that can't be done premium — it lands as clip art or Renaissance ceiling.

---

## 8. Motion

Characterful, tactile micro-interactions — this is the fun in an otherwise admin-shaped task.

- Selecting an option is physically acknowledged: a press, a settle, not a colour swap
- Question transitions carry direction — forward moves left, back moves right
- The ring animates, it never jumps
- The loading moment (2–3s) is a designed beat with silhouettes and stage-light wash, not a spinner
- Everything respects `prefers-reduced-motion`; supply the reduced variant for each

Keep individual transitions to 150–250ms. Characterful means well-crafted, not slow.

---

## 9. Screens to design

**Landing page**
1. Hero — headline in Montserrat Black over duotone crowd imagery, "Matchmaker" in Amsterdam Signature, primary CTA to the quiz
2. Sell section — what the quiz does, why it's worth two minutes
3. CTA block — the handoff

**Quiz** (own URL, arrived at from the landing page)

4. Standard question — single select, full-bleed duotone image, display type at 52px (use Q1)
5. Soft exit — the DJ answer, plus the "actually, show me live bands" door back in
6. **Song multi-select — the signature screen** (Q4/Q6), keyboard rows plus the coral setlist panel
7. Question with free-text — Q7's partner name field
8. Date picker — Q10, mobile-native behaviour
9. Lead capture gate — Q11, name/email/phone, before the reveal
10. Loading moment — silhouettes, stage light, the ring closing
11. Results page, single band — full staged scroll: ring closes → percentage in Amsterdam Signature → band, full-colour photo and video → the Boujee sell → booking embed
12. Results page, all-day variant — two matches, two bands, one page

**Design system**
13. Colour tokens and their permitted pairings, the Montserrat type scale with the extremes shown, spacing, radius, motion tokens, component states (default / hover / pressed / selected / focus / error), button hierarchy, form fields, the heart mark in all states, the ring from empty to closed, and the duotone photography recipe

Also specify: back navigation, validation errors, and the desktop adaptation of the question screen.

---

## 10. Continuity, and the lead gate

The landing page and quiz are separate pages, and that boundary is where people leave. Carry the hero image or colour field across so the first quiz screen is visibly the same world. Q1 should be visible without scrolling — the landing page already did the explaining, so no second intro screen.

**Q11 sits before the reveal, deliberately.** Design it as the last step rather than a toll booth: ring nearly closed, `11 / 11`, and a visible sense that the result is right behind it. It's the highest-value screen for the actual business goal.

**The results page is one continuous page**, not a reveal then a click. No pricing appears anywhere in the quiz or results.

---

## 11. Technical constraints

- Mobile-first; most traffic is paid social on phones
- Fast LCP — duotone imagery on every screen needs an art-directed crop and a per-screen size budget
- Results page embeds four YouTube videos and a booking scheduler (Acuity) inline — design both containers, including embed loading states
- GDPR consent line at the point of capture
- WCAG AA throughout, keyboard navigable, visible focus states. Note the coral-on-light restriction in §4
- Analytics events: landing view, quiz start, per-question progress, lead capture, result view, call booked

---

## 12. Open items

**For the client:**

1. **The DJ exit contradicts the live website.** The quiz says Boujee is "a live band agency through and through… we don't offer DJs." The homepage lists "Sax and DJ" and "DJ Service", and a testimonial thanks them for "the fantastic band & DJ." One of these needs to change.
2. **The Velvet Saints isn't on the website.** If it's a new act, confirm what assets exist.
3. **Percentage denominator.** Scoring is Option 1 — overlap songs are personalisation only and don't move the tally. The percentage must therefore exclude overlap picks from its denominator too. Otherwise three single-tag songs plus three overlaps computes as a 50% match and floors at 80%, when it should be near the ceiling.
4. **Soloist/Duo songs on the daytime-only path.** Two songs are tagged Soloist/Duo, but that band only appears on the all-day path. On a daytime-only run those picks score nothing. Either hide them on that path or reassign them.
5. **All-day results layout** (build spec §7) — confirmed as two separate matches. Flag if this shifts to one combined vibe, because it changes the page.

---

## 13. What good looks like

She's on the sofa, half-watching TV. She opens it expecting a form and gets a full-bleed dancefloor and a question set in type big enough to feel like a magazine spread. She picks four songs and enjoys picking them, watching her setlist build. She hands over her email without hesitating, because by then the result feels worth having. She reads a match that quotes her own choices back at her and thinks *yes, that's it*.

She books the call that night.

If a screen doesn't serve that, cut it. If a screen could belong to any other quiz, redesign it.

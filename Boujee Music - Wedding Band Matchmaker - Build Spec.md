# The Wedding Band Matchmaker
### Boujee Music quiz lead magnet, build spec for Claude Code

**Tagline:** The quiz that helps you discover the perfect style of band to suit your wedding vibe, and make it an unforgettable night.

---

## 1. Positioning and goals

- **Ideal customer:** a woman getting married in the next 2 to 3 years who wants live music at her wedding (roaming band, show band, jazz duo etc.) and has the budget for a premium service. She is not necessarily set on Boujee yet, and may not know what type of band she wants.
- **What we're optimising for:** call bookings, not lead volume and not quiz completion rate. A shorter list of the right people booking calls beats a long list of low-intent completions.
- **Boujee only offers live bands.** This matchmaker is specifically for couples who want, or are open to, live music at their wedding, it isn't a general entertainment quiz. Couples who are set on a DJ are told plainly this isn't the right fit for them rather than being pursued as leads, see section 5.
- **The result should have standalone value even if they never book Boujee.** Every result names a genre/style of band ("you're a match for an indie-rock band"), not just "book The Velvet Saints." The specific Boujee band is then introduced as the exclusive way to get that experience.
- **The results page sells Boujee as a service, not just a band.** Boujee organise the whole flow of the day (no dead air between sets, playlist built around momentum, liaising with the venue on logistics), and their bands are exclusive to Boujee, not available to book anywhere else. This needs to come through on the results page, not just the video and a book-a-call button.

---

## 2. Question flow

Order is deliberately emotive-first. The time-of-day split has to come early because it's the master branch, but it's framed as a feeling, not logistics.

### Q1 - What are you picturing for your wedding entertainment?
- Live music that gets everyone up and dancing → continue, standard flow, flagged as "party"
- Live music that sets a relaxed, feel-good atmosphere → continue, standard flow, flagged as "relaxed"
- A mix of the two → continue, standard flow, flagged as "mix"
- Not sure yet, but we love the idea of live music → continue, standard flow, flagged as "undecided"
- A DJ, no live music → **soft exit**, no further questions, no data captured

*Per Tim's feedback: the previous two "live band" options were too similar to each other and offered nothing for someone leaning daytime/background. These four now give a genuine spread. "Party," "relaxed" and "mix" are just different flavours of confident enthusiasm and get identical Stage 4 sell copy, "undecided" gets a softer lead into the sell. This question doesn't drive band routing, that's Q2 onward, it's purely an emotional opener and a light flag for Stage 4 tone. The DJ answer remains a genuine exit, not a continue, per Tim's feedback that couples already set on a DJ are very rarely swayed and aren't worth the time or cost of following up. No email or contact details are captured for this group. See section 5 for the exit copy and an optional door back in.*

### Q2 - Which part of your day are you dreaming of filling with live music?
- Daytime (ceremony, drinks, wedding breakfast) → run Daytime path only
- Evening party → run Evening path only
- All day → run BOTH paths, two results

*This is the master branch, functionally identical to Q2 in the WhatsApp logic, just reframed emotionally.*

### Q3 (Daytime path only) - What atmosphere are you picturing?
- Start relaxed and let the energy build through the day → leans Rock & Strollers
- Full, fun energy from the off → leans Rock & Strollers
- Relaxed and elegant, a beautiful backdrop while everyone eats and chats → leans Miles High (or Soloist/Duo on all-day path)
- Sophisticated and classy, something that feels effortlessly chic → leans Miles High (or Soloist/Duo on all-day path)

*Per Tim's feedback, the first two options previously said the same thing two ways. Both are replaced with a genuine contrast, since Rock & Strollers can authentically deliver either a building energy set or high energy from the start, both still route to the same band.*

### Q4 (Daytime path only) - Which of these songs would you love to hear? *(select all that appeal)*
Multi-select, not single-choice. A list of individual songs spanning both daytime styles, each tagged internally to a band:
- Tagged to Rock & Strollers: "Ho Hey" (The Lumineers), "Sweet Caroline" (Neil Diamond), "Valerie" (Amy Winehouse), "Can't Stop the Feeling" (Justin Timberlake)
- Tagged to Miles High: "Fly Me to the Moon" (Sinatra), "L-O-V-E" (Nat King Cole), "Come Away With Me" (Norah Jones), "The Way You Look Tonight" (Sinatra)
- On the all-day path, Soloist/Duo shares Miles High's song tags for scoring purposes, since it sits in the same easy-listening space, flag if Tim wants distinct songs for that option

*Per Tim's feedback, moving from a single "pick one bundle" answer to a longer list where the person can select multiple songs they genuinely like, this keeps the music choice fun without forcing every song in a bundle to resonate for it to feel like a fit. Scoring: tally how many selected songs are tagged to each band, whichever band has the most tagged selections wins the daytime match. This tally also feeds the match percentage, see section 4.*

*Reframed from a plain genre pick to specific songs, so it's fun to answer and gives us concrete details to echo back in the result. **All songs listed here are placeholders for the build**, chosen to illustrate the vibe, not confirmed against what these bands actually perform. Tim has offered to send a full song list spanning all relevant genres and bands (e.g. "September" for disco, "Can't Stop the Feeling" for pop, "Mr Brightside" for indie), tagged to the correct band, once received this replaces the placeholder list above.*

### Q5 (Evening path only) - Picture the dancefloor at its best moment, what does that look like?
- A party that builds gradually until everyone's dancing by the end of the night → leans Uptown Showdown
- Full-on party energy from the very first song → leans Uptown Showdown
- A dancefloor that feels more like a gig, everyone jumping and singing every word → leans The Velvet Saints
- High energy but a bit edgier, indie anthems that get the whole room moving → leans The Velvet Saints

*Per Tim's feedback, same fix as Q3, the first two options previously said the same thing two ways, now a genuine contrast (building energy vs full energy from the start), both still route to Uptown Showdown.*

### Q6 (Evening path only) - Which of these songs would you love to hear? *(select all that appeal)*
Multi-select, not single-choice. A list of individual songs spanning both evening styles, each tagged internally to a band:
- Tagged to Uptown Showdown: "Dancing Queen" (ABBA), "September" (Earth, Wind & Fire), "Uptown Funk" (Bruno Mars), "I Wanna Dance with Somebody" (Whitney Houston)
- Tagged to The Velvet Saints: "Mr Brightside" (The Killers), "Sex on Fire" (Kings of Leon), "Somebody Told Me" (The Killers), "Chelsea Dagger" (The Fratellis)

*Same multi-select mechanic and scoring as Q4: tally selections per band, most tagged selections wins the evening match, feeds the match percentage. Songs listed are placeholders, Tim to confirm or send his own list, as above.*

**Combining the atmosphere question with the song tally (Q3/Q5 with Q4/Q6):** now that the song question is a tally rather than a single confirming answer, the song tally is the primary evidence (it's more data points than one atmosphere answer), and decides the band. The atmosphere answer (Q3/Q5) only acts as the tie-breaker on a genuine tie in the song tally, or as a signal if no songs were selected in that path at all. On the all-day path, this runs independently for each half, so the daytime and evening results are each decided by their own tally.

### Q7 - You and your partner's music taste is...
- Pretty much identical, we love all the same stuff
- Pretty close, just a few different favourites
- Total opposites, but somehow it works
- Still figuring out where we overlap!

*Followed by a partner's name field on every answer, not just the non-identical ones, per Tim's feedback, since the partner should be involved in the process and the decision regardless of how aligned their taste is. Used to personalise the result and the call.*

### Q8 - How far off is the big day?
*New question, not in the original WhatsApp logic. Captures urgency for Tim's team to prioritise, and reinforces to the user this is a real, active decision.*
- Date not booked yet → skip Q9 and Q10 entirely, go straight to Q11
- Within the next year
- 1 to 2 years away
- Still very early days

*Per Tim's feedback, "already booked a date" previously overlapped with the other options, since a booked date could just as easily sit within the next year or 1 to 2 years away. Replaced with "date not booked yet," which now also skips the venue and date questions, since there's nothing to ask about yet.*

### Q9 - Have you booked your venue?
*Skipped entirely if Q8 = "Date not booked yet".*
- Yes → free text: venue name
- Still looking

### Q10 (only if venue booked) - So we can check availability, what's your wedding date?
*Also skipped if Q8 = "Date not booked yet".*
- Date picker → captured purely for Tim's team to follow up on manually, see the honesty note on availability in section 4.

### Q11 - Where should we send your result?
- Name, email, phone. This is the lead capture gate, shown just before the reveal.

---

## 3. Band reference (for build)

| Band | Slot | Style | Notes | Video |
|---|---|---|---|---|
| Uptown Showdown | Evening | Flagship show band, high-energy crowd-pleasing mix (80s/90s, disco, soul, R&B, singalongs) | Default evening pick on a tie | https://youtu.be/Y0oHz4SKayU |
| The Velvet Saints | Evening | Smaller line-up, high-energy indie/rock edge | Heavier/alternative taste | https://youtu.be/2psnhMdF_X0 |
| The Rock & Strollers | Daytime | Roaming acoustic, chilled-to-building, guest-to-guest singalongs | Fully acoustic/unplugged, works with venue sound limits | https://youtu.be/Rrp-nPo6ULA |
| Miles High | Daytime | Jazz/swing, sophisticated background music | Ceremony, drinks, dinner | https://youtu.be/BjbAbgVjQfQ |
| Soloist / Duo | Daytime | Pared-back ceremony/drinks music, acoustic guitar, piano, sax, or duo with vocals | All-day path only, paired with an evening band, not a standalone booking | no video |

No pricing appears anywhere in the quiz or results, matching how Tim handles pricing manually, holding it back until the call.

---

## 4. Results page (one page: reveal, sell, and book)

This is a single page, not a reveal page followed by a separate results page. Splitting it in two would mean either a jarring navigation right after the exciting moment, or making the person click through just to reach the sell copy and booking button. Instead, everything below happens as one continuous, staged reveal on the same page, either animating in sequentially or as a scroll, not as separate page loads.

**Stage 1 - Loading moment:** after Q11 (contact details) is submitted, show a short "Calculating your match..." loading animation (2 to 3 seconds). Per Tim's feedback, this needed to be honestly framed rather than pretending to check a live calendar, and now it genuinely is a calculation, since the match percentage below is real, not fabricated. Availability itself is addressed later, honestly, in the Stage 5 CTA copy.

**Stage 2 - Match reveal:** the percentage and headline animate in.

**Match percentage:** genuinely calculated, not fabricated. Per Tim's feedback, a random or fixed-flavour number risked being "rumbled" if someone retook the quiz with different answers and got an inconsistent read, which would undermine credibility. The calculation:
- **Floor of 80%, ceiling of 97%.** Nobody sees a low number or a suspicious 100%, since anyone who finishes the quiz will be a genuine fit for one of the bands, this range is a deliberate design choice, not a fabrication, the number underneath it is real.
- **Primary input:** the proportion of their selected songs (Q4/Q6) that are tagged to the winning band, out of their total selections in that path. Scale that ratio into the 80 to 97 range, e.g. near-total agreement across their song picks maps close to 97%, a bare majority maps closer to 80%.
- **Secondary input:** a small bonus (a few percentage points) if the atmosphere answer (Q3/Q5) agrees with the winning band from the song tally, since that's corroborating evidence from a second, independent question.
- **All-day path:** each half (daytime and evening) is calculated independently, using its own song tally and atmosphere answer, so the two percentages shown can genuinely differ from one another.

**The explanation text under the percentage is personalised to their actual answers**, referencing the specific things they picked (atmosphere, standout songs, partner's taste). This is the part that needs to feel earned. Since Q4/Q6 are now multi-select, reference two or three of their song picks by name rather than just one ("you picked Mr Brightside and Sex on Fire as must-plays...").

**Stage 3 - Band reveal:** the specific Boujee band, video and a short explanation appear next.

Example structure for a single-band result (evening-only lead):

> **You're a 92% match with an Indie-Rock Band**
> You picked "Mr Brightside" and "Sex on Fire" as must-plays, and that high-energy, indie/rock edge is exactly the vibe you and [partner] are picturing for your evening. Here's why that suits you: [reference their other answers, e.g. dancefloor moment, atmosphere].
>
> The band that delivers this for us: **The Velvet Saints**
> [video embed]
> [1 to 2 lines on the band]

For the **all-day path**, two separate matches are shown (one daytime style, one evening style), each with its own short explanation and band, rather than one blended vibe, since the two bands genuinely serve different parts of the day.

**Stage 4 - The Boujee sell:** this is what makes it a results page and not just a match reveal. Directly beneath the band reveal, on the same page:
- **These bands are exclusive to Boujee** and can't be booked anywhere else, this is a genuinely differentiating fact and should be stated plainly.
- **What Boujee actually does beyond "a band that turns up"**: no dead air between sets, a playlist built to keep the momentum of the day going, liaising directly with the venue on logistics and timings. This is the case for booking Boujee as a service, not just booking a band.

*This copy varies slightly by the Q1 entertainment flag, see section 5.*

**Stage 5 - CTA:** Book your call, embedded directly on this same page (not a link off to a separate scheduler page).

CTA supporting copy:

> Based on your answers, [Band] is a great fit for your [evening party / daytime]. The best next step is a quick call, you can talk me through your day and plans, then I'll walk you through the band, and tailor everything around your venue, vibe and guests.

For all-day (two bands):

> Based on your answers, [Daytime band] is a great fit for your daytime and [Evening band] for your evening party. The best next step is a quick call, you can talk me through your plans, then I'll walk you through how both bands work together across your day.

Keep "quick call" / "quick 15-minute chat" language to lower the perceived cost of booking, lead with the value first, then the time commitment.

**Availability, honestly framed:** per Tim's feedback, don't pretend an automated check has happened. Include a line near the CTA along these lines: "The Boujee team will check availability for your date and be in touch very shortly." This is exactly what happens with the real manual follow-up process, and reads as more exclusive than a fake instant confirmation, not less.

---

## 5. Entertainment preference (band flavours continue, DJ exits)

Tim's feedback: couples already set on a DJ very rarely change their mind and book a live band, whether that's down to budget or simply not valuing live music, so capturing their details and following up isn't worth the time or cost. Q1 reflects that directly:

- **"Live music that gets everyone up and dancing," "Live music that sets a relaxed, feel-good atmosphere," and "A mix of the two"** are just different flavours of confident enthusiasm, flagged internally as party / relaxed / mix, and all get the same, full Stage 4 sell copy.
- **"Not sure yet, but we love the idea of live music"** continues into the exact same quiz and gets a genuine, personalised match too, just with a softer lead into Stage 4, something like "even if you're still deciding, here's why a live band could make your day," rather than assuming they're already sold.
- **"A DJ, no live music"** exits immediately after Q1. No further questions, no data captured, no nurture sequence. Exit copy:

> Boujee is a live band agency through and through, every band we work with is exclusive to us, and we don't offer DJs. If a DJ's what you're picturing, we're probably not the right fit for your day, but if live music is even a small part of the dream, that's exactly what this quiz is for.

Include a soft door back in, a button reading something like "Actually, show me what live band could suit us," that lets someone opt back into the standard flow if they reconsider. Nothing is captured or followed up on unless they choose to go back in and complete the quiz themselves, so there's no cost to Tim's team either way.

---

## 6. Data captured per lead

- Entertainment preference flag (party / relaxed / mix / undecided, from Q1). DJ answers exit before any data is captured.
- Time of day preference (daytime / evening / all day)
- Style/atmosphere answers (tie-breaker for the match, see section 4)
- Song selections per path (multi-select, the primary driver of both the match and the percentage, see section 4)
- Partner's music taste + name (now captured on every answer, not just non-identical ones)
- Timeframe (how far off the wedding is)
- Venue booked y/n + venue name (skipped if "date not booked yet" at Q8)
- Wedding date (skipped if "date not booked yet" at Q8)
- Name, email, phone
- Assigned band(s) and genuinely calculated match percentage shown

This gives Tim's team the same discovery info they'd normally gather over several WhatsApp messages, upfront, before the call even happens.

---

## 7. Open item to confirm before build

All-day path currently spec'd as **two separate style matches** (one daytime, one evening), each with its own explanation and band. Flagged in case the preference is actually one single combined-day vibe instead, easy to change before build but harder after, since it affects the results page layout.

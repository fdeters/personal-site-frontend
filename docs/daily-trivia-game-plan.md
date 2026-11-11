# Daily tabletop trivia game: plan

This document outlines an incremental plan for a daily trivia and guessing tool
about Dungeons & Dragons rules and lore. It is a product and implementation
starting point, not a commitment to unresolved game or content choices.

## Proposed first version

- Add a daily game page to the existing Tools area.
- Present one curated question per day, with a clear way to submit an answer and
  reveal the correct answer and a short explanation.
- Show a source for each answer so players can check the rules or lore.
- Keep the question schedule deterministic: all players see the same question
  for a given game date.
- Start without accounts or a backend. Curated questions can ship with the
  site; optional streak or completion data can be stored in the player's
  browser. Explain that browser storage is local to that browser and can be
  cleared.

Multiple choice is a practical first format because it is easy to use with a
keyboard and screen reader and does not require guessing how to normalize free
text. Whether answers allow retries, hints, or a free-text guess is still a
product decision.

## Incremental delivery

1. **Settle the game rules and content approach.** Decide on the answer format,
   attempts and hints, daily reset time, and acceptable source material. Draft a
   small set of reviewed questions before building a large question bank.
2. **Build the daily question experience.** Add a route and Tools-directory
   entry, render the selected question, accept an answer, and show feedback,
   explanation, and source. Make it work without saved progress.
3. **Add reliable daily selection and progress.** Select a question using an
   explicit game date and stable schedule; avoid selecting by an unstable
   random value on each render. If streaks or completion are included, persist
   the minimum required state locally and handle missing, malformed, or
   unavailable browser storage gracefully.
4. **Polish and validate.** Test date boundaries, question-data validation,
   answer feedback, and progress rollover. Check responsive layouts, keyboard
   use, screen-reader announcements, and light/dark themes alongside the
   existing site.

## Content and data

Keep question data separate from presentation. Each entry should have a stable
identifier, prompt, answer options if applicable, correct answer, explanation,
category or difficulty if used, and a source reference. Validate that entries
have a unique identifier, a valid answer, and the fields required by their
format. Avoid exposing the answer in the question UI before submission, while
recognizing that client-shipped content is visible to anyone inspecting the
site.

Use original wording and verify facts against authoritative sources. Do not copy
rulebook or setting text or imply the tool is official. Review the applicable
license and attribution requirements before including SRD-derived material;
setting-specific lore and other material should be included only after its
rights and source have been reviewed.

## Technical fit

The site uses SvelteKit and already has a Tools directory and a client-side tool
pattern. A first version can follow those conventions, with a route under
`src/routes/(app)/tools/` and a small data module under `src/lib/`. A static
question bank and local-only progress avoid adding infrastructure or
dependencies. Revisit server-side storage only if cross-device progress,
accounts, leaderboards, or user-submitted questions become requirements.

Daily selection needs a documented timezone and date boundary. UTC gives every
player one shared daily question but may roll over at an inconvenient local
time; a chosen local timezone makes the reset predictable for its intended
audience but not for all visitors. Compute the game date consistently and test
immediately before and after the boundary, including daylight-saving changes
if using a local timezone.

## Accessibility and privacy

Use semantic form controls and visible labels, do not rely on color alone for
correct/incorrect feedback, and announce the result after submission without
moving focus unexpectedly. Ensure the entire game can be completed by keyboard.
If progress is stored, keep it to the minimum needed, do not send it to a
server, and explain how local storage affects it.

## Open product decisions

1. Should answers be multiple choice, free text, or a mix? How many attempts,
   and should players receive hints?
2. What topics count as rules and lore, and which editions or settings should
   be in scope? Is an SRD-based question set acceptable, with applicable
   attribution and licensing, or is other content sourcing preferred?
3. What is the daily reset timezone and intended audience?
4. Should a correct answer, a completed question, or a streak be saved? Is
   browser-local persistence sufficient, or is cross-device progress important?
5. Should the game have difficulty levels, categories, or a shareable result?
6. Who will author and review questions, and how should corrections to a
   previously published answer be handled?

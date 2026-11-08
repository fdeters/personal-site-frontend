# Shareable ranked-choice elections: research

This document records implementation findings for [issue #12](https://github.com/fdeters/personal-site-frontend/issues/12). It is intended as a reference for the broader feature work; unresolved product questions are listed at the end.

## Current implementation

The ranked-choice tool is a client-side Svelte page. It saves one election and up to five tally-history entries in the browser's `localStorage`. Ballots are anonymous and identified by their position in the list. The ballot and election models perform ranking and IRV tallying in memory. There is no shared-election API or database integration in the repository.

The existing ballot and tally UI can be reused, but the persistence and identity model must change. In particular, ballot rankings currently refer to in-memory candidate objects, so shared records should use stable option identifiers instead.

## In-app requirements

- Add an election setup flow with options and a setting to lock or allow option changes. Do not enable sharing until at least one valid option is set.
- Create a durable election record and an unguessable share URL.
- Let participants add named ballots and edit existing ballots without requiring accounts, as specified in issue #12.
- Store ballots against stable option IDs. Track option changes and show which ballots are out of date; preserve existing rankings where possible when options change.
- Replace the current immediate “Tally votes” action with a “Votes are in!” action. Before finalizing, confirm with the current ballot count and names.
- Finalize from a consistent server-side snapshot, calculate results on the server, and retain the original result independently of later ballot or option edits.
- Refactor the page's local-storage state and in-memory model coupling to distinguish elections, options, ballots, option versions, and immutable result snapshots.
- Handle simultaneous writes and finalization with transactions or version checks so stale updates cannot silently replace newer election state.
- Preserve accessible labels, keyboard focus handling, and status announcements in the new setup and confirmation flows.
- Clear or otherwise distinguish displayed results when live election data changes. The current page can retain a displayed tally after adding an option or ballot.

## External requirements

Sharing across devices and participants requires server-side API endpoints and durable storage; browser `localStorage` cannot provide either. The repository currently deploys with the Vercel adapter, but has no election backend or database integration. Select a persistence option compatible with the deployment environment and add the required server-side integration. No account or authentication provider is required by the issue.

## Security and abuse considerations

- Treat an unguessable share URL as a bearer capability: anyone who obtains it may have access. Prevent IDs from being enumerable, avoid exposing full URLs to analytics or logs, and set a restrictive referrer policy where compatible.
- Validate all election, option, ballot, and ranking data on the server. Enforce payload size, field length, option count, ballot count, and request frequency limits.
- Render participant-supplied names and option labels as text, never trusted HTML.
- Calculate and persist results on the server from the finalized election snapshot. Do not trust a client-supplied tally or a client-only hidden/disabled control to enforce finalization.
- Use atomic writes or optimistic version checks for concurrent edits and finalization.
- If cookie-based or other ambient credentials are used by the API, protect state-changing requests against CSRF, restrict CORS, and configure cookie attributes appropriately.
- Tell participants what ballot names and rankings are visible and to whom. Define deletion and retention behavior; anonymous ballot names are not verified identities.

## Abuse and rate-overuse recommendations

Apply per-election and per-request quotas, with bounded ballot and option counts to limit storage use and tally computation. Rate-limit election creation and writes, and monitor unusual request volume. Consider a challenge such as CAPTCHA only when election creation patterns indicate abuse. If the product supports it, provide expiration and deletion to limit abandoned data.

## Product decisions and clarifying questions

1. Does “anyone can edit an existing ballot” mean all link-holders can edit every ballot, or should participants edit only their own? Without accounts or another identity mechanism, ownership cannot be reliably verified.
2. Are ballot names and rankings visible to other link-holders before finalization? Does “results are only shown” hide only the tally, or also individual ballots?
3. Can “Votes are in!” be activated repeatedly? Should each activation create a retained result snapshot, and how should original and later snapshots be presented?
4. Can options be renamed and removed as well as added? Which changes mark ballots out of date, and how should removal affect existing rankings?
5. Who may change options when they are unlocked? Without accounts, how is the election creator distinguished from other link-holders?
6. Should elections expire, and who can delete them? What retention period applies to elections and result snapshots?
7. Should participants be able to submit a ballot before sharing is enabled, or must setup be complete before voting starts?
8. Is an opaque share link sufficient access control when anyone who obtains it may view and potentially edit the election?

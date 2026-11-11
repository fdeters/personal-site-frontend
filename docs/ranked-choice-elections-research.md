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

## Decision record

The product decisions below are taken from the owner-authored [parent issue #12](https://github.com/fdeters/personal-site-frontend/issues/12). The owner also confirmed in [a comment on issue #12](https://github.com/fdeters/personal-site-frontend/issues/12#issuecomment-6802877176) that a Supabase project with the Data API is available for this feature.

| Topic                       | Decision                                                                                                                                                                                        | Approval                            |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Accounts and ballot editing | No login is required. Anyone with the election link can add ballots and edit any existing ballot; the service cannot verify ballot ownership.                                                   | Owner-approved in issue #12         |
| Setup and options           | The setup creator supplies options and chooses whether to lock them. At least one option must exist before the election is shareable.                                                           | Owner-approved in issue #12         |
| Option changes              | Changes do not invalidate ballots. Existing ballots are updated to reflect the option set and marked out of date. Stable option IDs preserve rankings across edits.                             | Owner-approved in issue #12         |
| Finalization                | Show a confirmation with the ballot count and names. Finalization may happen again after edits; retain the first result and each later result alongside the current tally.                      | Owner-approved in issue #12         |
| Persistence                 | Use the existing Supabase project and its Data API.                                                                                                                                             | Owner-approved in issue #12 comment |
| Ballot visibility           | Whether names and rankings are visible to link-holders before finalization is not specified.                                                                                                    | Owner approval needed               |
| Unlocked options            | Whether every link-holder may change unlocked options, and who may lock or unlock them after setup, is not specified. Without accounts, link-based access cannot distinguish the setup creator. | Owner approval needed               |
| Rename and removal          | Rename/removal behavior and their effect on rankings and stale warnings are not specified.                                                                                                      | Owner approval needed               |
| Retention and deletion      | Expiration, deletion authority, and retention duration are not specified.                                                                                                                       | Owner approval needed               |

### Supabase Data API design

- Keep all database access behind SvelteKit server endpoints. The share URL is a bearer capability; use a high-entropy random token, store only its hash, avoid putting it in logs or analytics, and return restrictive referrer handling. Do not expose a Supabase service-role key to the browser.
- Use the Data API with server-side authorization and database constraints. Enable row-level security on every exposed table and deny direct anonymous table access. A narrowly scoped server-only database role or RPC should perform authorized operations; it must validate the election capability and never trust client-supplied election IDs as proof of access.
- Model elections, options, ballots, and result snapshots separately. Give options stable IDs and an election option-set version. Store ballot rankings as ordered option IDs, and track the option-set version each ballot last acknowledged. Retain removed options as inactive records rather than reusing IDs; tally only active options. Any option-set change marks affected ballots out of date while preserving their existing ranking data.
- Validate and bound names, labels, ranking references, option and ballot counts, payload sizes, and request rates at the server boundary, with database constraints for invariants. Treat names and labels as plain text.
- Use optimistic versions for ballot and option edits so stale writes fail explicitly. Perform finalization in one database transaction: lock or compare the election version, read a consistent set of active options and ballots, calculate the result from that set, and insert a snapshot with its input version and timestamp. Make snapshots append-only and distinguish the first (original) result, later finalized results, and the live tally.
- Enforce per-election quotas and creation/write rate limits. Keep retention and deletion policy configurable until the owner decides those product rules; apply deletion to election data and snapshots consistently.

The table/role/RPC details and the unresolved product rules above should be confirmed before migrations are implemented. The decisions here do not imply that the owner has approved those remaining choices.

## Implementation sub-issue drafts

These are phased, issue-ready scopes for the parent feature. Implement them in order; phases that depend on the unresolved decisions above should not start until those decisions are approved.

### 1. Add Supabase election schema and server access

Create migrations for elections, options, ballots, and append-only result snapshots. Add server-only Supabase Data API access, capability validation, row-level security or narrowly scoped server RPCs, input constraints, optimistic versions, and safe error responses. Keep all privileged credentials server-side.

**Acceptance criteria:** Direct anonymous table access is denied; server operations require a valid election capability; invalid or stale writes are rejected; constraints bound stored data; no secret is included in client bundles.

### 2. Build election setup and share links

Add setup for a named election, one or more options, and the initial option-lock choice. Persist the election and provide its share link only after valid setup. Show clear bearer-link access information.

**Acceptance criteria:** An election without a valid option cannot be shared; generated links are unguessable and not enumerable; option lock state is persisted; accessible setup and copy-link feedback are provided.

### 3. Add shared ballot and option editing

Replace local-only persistence for shared elections with server-backed ballots and options. Let link-holders add and edit named ballots, synchronize ballots to option-set changes without losing existing rankings, and display out-of-date status. Apply approved visibility and unlocked-option permissions.

**Acceptance criteria:** Ballots use stable option IDs; concurrent stale edits fail visibly instead of overwriting newer data; option changes preserve rankings and mark affected ballots out of date; values are validated and rendered as text.

### 4. Add atomic finalization and result history

Add the “Votes are in!” confirmation, server-side tallying, atomic immutable result snapshots, and presentation of original, subsequent finalized, and current results.

**Acceptance criteria:** Confirmation lists the current ballot count and names; finalization operates on a consistent server snapshot; repeating finalization preserves prior snapshots; later edits affect the current tally but do not alter saved results.

### 5. Apply retention, deletion, and abuse controls

After the owner approves expiration and deletion behavior, implement that policy alongside election and request quotas, rate limits, and operational handling for expired or deleted share links.

**Acceptance criteria:** Retention and deletion behavior is documented and applied consistently to ballots and snapshots; bounded resource and request limits are enforced server-side; expired/deleted capabilities no longer grant access.

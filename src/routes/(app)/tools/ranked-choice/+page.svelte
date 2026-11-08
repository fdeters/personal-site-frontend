<script>
  import { onMount, tick } from 'svelte';
  import IconPlus from '~icons/mdi/plus';
  import IconTrash from '~icons/mdi/trash-can-outline';
  import BallotForm from './components/Ballot.svelte';
  import Results from './components/Results.svelte';
  import Ballot from './models/Ballot';
  import Candidate from './models/Candidate';
  import Election from './models/Election';

  const STORAGE_KEY = 'rcv_state';
  const HISTORY_KEY = 'rcv_history';
  const MAX_HISTORY = 5;

  /**
   * @typedef {{
   *   candidates: string[],
   *   ballots?: Array<{ ranking: Array<string | null> }>
   * }} SavedState
   */

  /**
   * @typedef {{
   *   date: string,
   *   candidates: string[],
   *   ballotCount: number,
   *   winner: string | null,
   *   rounds: Array<{
   *     counts: Array<{ name: string, votes: number }>,
   *     eliminated: string[]
   *   }>
   * }} HistoryEntry
   */

  // ── State ────────────────────────────────────────────────────────────────
  let newOptionName = '';
  let optionError = '';
  /** @type {HTMLInputElement} */
  let optionInput;
  /** @type {HTMLButtonElement | undefined} */
  let addBallotButton;
  /** @type {HTMLDivElement | undefined} */
  let ballotContainer;
  /** @type {Candidate[]} */
  let candidates = [];
  /** @type {Ballot[]} */
  let ballots = [];
  /** @type {ReturnType<Election['tally']> | null} */
  let result = null;
  let tallyCount = 0;
  /** @type {HistoryEntry[]} */
  let history = [];
  let showHistory = false;
  let confirmingClearSavedData = false;
  /** @type {HTMLButtonElement | undefined} */
  let clearSavedDataButton;
  /** @type {HTMLButtonElement | undefined} */
  let clearSavedDataConfirmationButton;
  let showResetConfirmation = false;
  /** @type {HTMLButtonElement | undefined} */
  let resetConfirmationButton;

  // ── Persistence helpers ──────────────────────────────────────────────────
  function saveState() {
    try {
      if (candidates.length === 0 && ballots.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const data = {
        candidates: candidates.map((c) => c.name),
        ballots: ballots.map((b) => b.toJSON()),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      /** @type {SavedState} */
      const data = JSON.parse(raw);
      if (!Array.isArray(data.candidates)) return;

      candidates = data.candidates.map((n) => new Candidate(n));
      ballots = (data.ballots ?? []).map((saved) => {
        const b = new Ballot(candidates);
        (saved.ranking ?? []).forEach((name, idx) => {
          if (name) {
            try {
              b.rankCandidate(name, idx + 1);
            } catch (_) {}
          }
        });
        return b;
      });
    } catch (_) {}
  }

  /** @param {ReturnType<Election['tally']>} electionResult */
  function saveHistory(electionResult) {
    try {
      const entry = {
        date: new Date().toISOString(),
        candidates: candidates.map((c) => c.name),
        ballotCount: ballots.length,
        winner: electionResult.winner?.name ?? null,
        rounds: electionResult.rounds.map((r) => ({
          counts: [...r.counts.entries()].map(([c, n]) => ({
            name: c.name,
            votes: n,
          })),
          eliminated: r.eliminated.map((c) => c.name),
        })),
      };
      const prev = loadHistoryRaw();
      const updated = [entry, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      history = updated;
    } catch (_) {}
  }

  /** @returns {HistoryEntry[]} */
  function loadHistoryRaw() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
    } catch (_) {
      return [];
    }
  }

  async function requestClearSavedData() {
    confirmingClearSavedData = true;
    await tick();
    clearSavedDataConfirmationButton?.focus();
  }

  async function clearSavedData() {
    confirmingClearSavedData = false;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    candidates = [];
    ballots = [];
    result = null;
    history = [];
    await tick();
    clearSavedDataButton?.focus();
  }

  async function cancelClearSavedData() {
    confirmingClearSavedData = false;
    await tick();
    clearSavedDataButton?.focus();
  }

  onMount(() => {
    loadState();
    history = loadHistoryRaw();
  });

  // ── Reactivity ───────────────────────────────────────────────────────────
  let mounted = false;
  onMount(() => {
    mounted = true;
  });

  $: if (mounted) {
    candidates;
    ballots;
    saveState();
  }

  // ── Option management ────────────────────────────────────────────────────
  const addOption = () => {
    const name = newOptionName.trim();
    if (!name) {
      optionError = 'Enter an option name.';
      optionInput.focus();
      return;
    }
    if (candidates.some((candidate) => candidate.name === name)) {
      optionError = 'That option has already been added.';
      optionInput.focus();
      return;
    }
    optionError = '';
    const candidate = new Candidate(name);
    candidates = [...candidates, candidate];
    ballots = ballots.map((b) => {
      b.addCandidate(candidate);
      return b;
    });
    newOptionName = '';
  };

  /** @param {Candidate} candidate */
  const removeOption = async (candidate) => {
    candidates = candidates.filter((c) => c !== candidate);
    ballots = ballots.map((b) => {
      b.removeCandidate(candidate);
      return b;
    });
    result = null;
    await tick();
    optionInput.focus();
  };

  // ── Ballot management ────────────────────────────────────────────────────
  const addBallot = async () => {
    ballots = [...ballots, new Ballot(candidates)];
    await tick();
    ballotContainer
      ?.querySelectorAll('fieldset')
      .item(ballots.length - 1)
      ?.querySelector('select')
      ?.focus();
  };

  /** @param {number} index */
  const removeBallot = async (index) => {
    ballots = ballots.filter((_, i) => i !== index);
    result = null;
    await tick();
    addBallotButton?.focus();
  };

  const requestReset = async () => {
    showResetConfirmation = true;
    await tick();
    resetConfirmationButton?.focus();
  };

  const cancelReset = async () => {
    showResetConfirmation = false;
    await tick();
    resetButton?.focus();
  };

  /** @type {HTMLButtonElement | undefined} */
  let resetButton;

  const resetSession = async () => {
    candidates = [];
    ballots = [];
    result = null;
    newOptionName = '';
    optionError = '';
    showResetConfirmation = false;
    saveState();
    await tick();
    optionInput?.focus();
  };

  // ── Tallying ─────────────────────────────────────────────────────────────
  const tally = () => {
    const election = new Election(ballots, candidates);
    tallyCount += 1;
    result = election.tally();
    saveHistory(result);
  };

  $: canTally = candidates.length >= 2 && ballots.length > 0;
</script>

<svelte:head>
  <title>Ranked Choice Voting – forrestdeters.com</title>
</svelte:head>

<main class="voting-tool mx-auto max-w-xl" id="tool-main" tabindex="-1">
  <p class="tool-kicker">Forrest Deters / Tools</p>
  <h1>Ranked Choice Voting</h1>
  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
    Can't decide where to eat or what to do? Add your options, have everyone
    fill out a ballot, and let ranked-choice voting pick a winner.
  </p>

  <!-- ── Options ─────────────────────────────────────────────────────────── -->
  <section class="mt-6">
    <h2 class="text-lg font-semibold">Options</h2>
    {#if candidates.length === 0}
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        No options yet. Add some below.
      </p>
    {:else}
      <ul class="mt-2 flex flex-col gap-1">
        {#each candidates as candidate (candidate.name)}
          <li class="flex items-center gap-2">
            <span class="flex-1">{candidate.name}</span>
            <button
              type="button"
              title="Remove {candidate.name}"
              class="text-gray-600 dark:text-gray-400"
              on:click={() => removeOption(candidate)}
            >
              <IconTrash />
              <span class="sr-only">Remove {candidate.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}

    <form class="mt-3" on:submit|preventDefault={addOption}>
      <label for="new-option-name" class="block text-sm font-medium"
        >New option name</label
      >
      <div class="mt-1 flex gap-2">
        <input
          type="text"
          name="new-option-name"
          id="new-option-name"
          placeholder="Add an option…"
          aria-invalid={optionError ? 'true' : undefined}
          aria-describedby={optionError ? 'option-error' : undefined}
          class="dark:border-darkmixed-300 dark:bg-dark-500 flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          bind:this={optionInput}
          bind:value={newOptionName}
          on:input={() => (optionError = '')}
        />
        <button
          type="submit"
          title="Add option"
          class="bg-primary-600 hocus:bg-yellow-800 rounded px-2 py-1 text-white"
        >
          <IconPlus />
          <span class="sr-only">Add option</span>
        </button>
      </div>
      <p id="option-error" class="option-error mt-1 text-sm" role="status">
        {optionError}
      </p>
    </form>
  </section>

  <!-- ── Ballots ─────────────────────────────────────────────────────────── -->
  <section class="mt-6">
    <h2 class="text-lg font-semibold">Ballots</h2>

    {#if candidates.length < 2}
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Add at least 2 options to start voting.
      </p>
    {:else if ballots.length === 0}
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Add a ballot to start voting.
      </p>
    {:else}
      <div class="mt-2 flex flex-col gap-3" bind:this={ballotContainer}>
        {#each ballots as ballot, i (i)}
          <div class="flex gap-2">
            <div class="min-w-0 flex-1">
              <BallotForm
                {ballot}
                ballotNumber={i + 1}
                on:change={() => (ballots = ballots)}
              />
            </div>
            <button
              type="button"
              title="Remove ballot {i + 1}"
              class="self-start text-gray-600 dark:text-gray-400"
              on:click={() => removeBallot(i)}
            >
              <IconTrash />
              <span class="sr-only">Remove ballot {i + 1}</span>
            </button>
          </div>
        {/each}
      </div>
    {/if}

    {#if candidates.length >= 2}
      <button
        type="button"
        bind:this={addBallotButton}
        class="dark:border-darkmixed-300 mt-3 rounded border border-gray-300 px-3 py-1 text-sm"
        on:click={addBallot}
      >
        + Add ballot
      </button>
    {/if}
  </section>

  <!-- ── Actions ─────────────────────────────────────────────────────────── -->
  <div class="mt-6 flex flex-wrap gap-3">
    <button
      type="button"
      disabled={!canTally}
      class="bg-primary-600 hocus:bg-yellow-800 rounded px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      on:click={tally}
    >
      Tally votes
    </button>
    <button
      type="button"
      bind:this={resetButton}
      class="dark:border-darkmixed-300 rounded border border-gray-300 px-4 py-2 text-sm"
      on:click={requestReset}
    >
      Reset
    </button>
  </div>
  {#if showResetConfirmation}
    <div
      class="dark:border-darkmixed-300 mt-3 rounded border border-gray-300 p-3 text-sm"
      role="group"
      aria-label="Confirm reset"
    >
      <p>
        Are you sure you want to start a new election? This removes the current
        options and ballots.
      </p>
      <div class="mt-2 flex gap-2">
        <button
          type="button"
          bind:this={resetConfirmationButton}
          class="bg-primary-600 hocus:bg-yellow-800 rounded px-3 py-1 text-white"
          on:click={resetSession}
        >
          Start over
        </button>
        <button
          type="button"
          class="dark:border-darkmixed-300 rounded border border-gray-300 px-3 py-1"
          on:click={cancelReset}
        >
          Cancel
        </button>
      </div>
    </div>
  {/if}

  <!-- ── Results ─────────────────────────────────────────────────────────── -->
  <p class="sr-only" role="status" aria-atomic="true">
    {#if result}
      {result.winner
        ? `Tally ${tallyCount} complete. Winner: ${result.winner.name}.`
        : `Tally ${tallyCount} complete. No winner; all remaining options were tied.`}
    {/if}
  </p>
  <Results {result} />

  <!-- ── History & storage ───────────────────────────────────────────────── -->
  <section class="dark:border-darkmixed-300 mt-8 border-t pt-4">
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="text-sm text-gray-600 underline dark:text-gray-400"
        aria-expanded={showHistory}
        aria-controls="election-history"
        on:click={() => (showHistory = !showHistory)}
      >
        {showHistory ? 'Hide' : 'Show'} election history ({history.length})
      </button>
      <button
        type="button"
        bind:this={clearSavedDataButton}
        class="danger-text text-sm underline"
        aria-expanded={confirmingClearSavedData}
        aria-controls="clear-saved-data-confirmation"
        on:click={requestClearSavedData}
      >
        Clear all saved data
      </button>
    </div>

    {#if confirmingClearSavedData}
      <div
        id="clear-saved-data-confirmation"
        class="dark:border-darkmixed-300 mt-3 rounded border border-gray-300 p-3 text-sm"
        role="group"
        aria-label="Confirm clearing saved data"
      >
        <p>
          Are you sure? This will permanently delete your saved elections and
          history.
        </p>
        <div class="mt-2 flex gap-2">
          <button
            type="button"
            bind:this={clearSavedDataConfirmationButton}
            class="bg-primary-600 hocus:bg-yellow-800 rounded px-3 py-1 text-white"
            on:click={clearSavedData}
          >
            Clear saved data
          </button>
          <button
            type="button"
            class="dark:border-darkmixed-300 rounded border border-gray-300 px-3 py-1"
            on:click={cancelClearSavedData}
          >
            Cancel
          </button>
        </div>
      </div>
    {/if}

    <div id="election-history" hidden={!showHistory}>
      {#if showHistory}
        {#if history.length === 0}
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No past elections saved.
          </p>
        {:else}
          <div class="mt-3 flex flex-col gap-4">
            {#each history as entry}
              <div
                class="dark:border-darkmixed-300 rounded border border-gray-200 p-3 text-sm"
              >
                <p class="font-medium">
                  {new Date(entry.date).toLocaleString()} ·
                  {entry.ballotCount} ballot{entry.ballotCount === 1 ? '' : 's'}
                </p>
                <p class="mt-1">
                  {#if entry.winner}
                    🎉 Winner: <strong>{entry.winner}</strong>
                  {:else}
                    No winner (tie)
                  {/if}
                </p>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                  Options: {entry.candidates.join(', ')}
                </p>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  </section>
</main>

<script>
  import { onMount } from 'svelte';
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

  // ── State ────────────────────────────────────────────────────────────────
  let newOptionName = '';
  let candidates = [];
  let ballots = [];
  let result = null;
  let history = [];
  let showHistory = false;

  // ── Persistence helpers ──────────────────────────────────────────────────
  function saveState() {
    try {
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

  function loadHistoryRaw() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
    } catch (_) {
      return [];
    }
  }

  function clearSavedData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    candidates = [];
    ballots = [];
    result = null;
    history = [];
  }

  onMount(() => {
    loadState();
    history = loadHistoryRaw();
  });

  // ── Reactivity ───────────────────────────────────────────────────────────
  let mounted = false;
  onMount(() => { mounted = true; });

  $: if (mounted) { candidates; ballots; saveState(); }

  // ── Option management ────────────────────────────────────────────────────
  const addOption = () => {
    const name = newOptionName.trim();
    if (!name) return;
    const candidate = new Candidate(name);
    candidates = [...candidates, candidate];
    ballots = ballots.map((b) => { b.addCandidate(candidate); return b; });
    newOptionName = '';
  };

  const removeOption = (candidate) => {
    candidates = candidates.filter((c) => c !== candidate);
    ballots = ballots.map((b) => { b.removeCandidate(candidate); return b; });
    result = null;
  };

  // ── Ballot management ────────────────────────────────────────────────────
  const addBallot = () => {
    ballots = [...ballots, new Ballot(candidates)];
  };

  const removeBallot = (index) => {
    ballots = ballots.filter((_, i) => i !== index);
    result = null;
  };

  const resetSession = () => {
    ballots = [];
    result = null;
    saveState();
  };

  // ── Tallying ─────────────────────────────────────────────────────────────
  const tally = () => {
    const election = new Election(ballots, candidates);
    result = election.tally();
    saveHistory(result);
  };

  $: canTally = candidates.length >= 2 && ballots.length > 0;
</script>

<svelte:head>
  <title>Ranked Choice Voting – forrestdeters.com</title>
</svelte:head>

<main class="mx-auto max-w-xl">
  <h1 class="text-2xl font-bold">Ranked Choice Voting</h1>
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
    Can't decide where to eat or what to do? Add your options, have everyone fill
    out a ballot, and let ranked-choice voting pick a winner.
  </p>

  <!-- ── Options ─────────────────────────────────────────────────────────── -->
  <section class="mt-6">
    <h2 class="text-lg font-semibold">Options</h2>
    {#if candidates.length === 0}
      <p class="mt-1 text-sm text-gray-400">No options yet. Add some below.</p>
    {:else}
      <ul class="mt-2 flex flex-col gap-1">
        {#each candidates as candidate (candidate.name)}
          <li class="flex items-center gap-2">
            <span class="flex-1">{candidate.name}</span>
            <button
              type="button"
              title="Remove {candidate.name}"
              class="text-gray-400 hocus:text-red-500"
              on:click={() => removeOption(candidate)}
            >
              <IconTrash />
              <span class="sr-only">Remove {candidate.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}

    <form class="mt-3 flex gap-2" on:submit|preventDefault={addOption}>
      <input
        type="text"
        name="new-option-name"
        id="new-option-name"
        aria-label="New option name"
        placeholder="Add an option…"
        class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm dark:border-darkmixed-300 dark:bg-dark-500"
        bind:value={newOptionName}
      />
      <button
        type="submit"
        title="Add option"
        class="rounded bg-primary-500 px-2 py-1 text-white hocus:bg-primary-600"
      >
        <IconPlus />
        <span class="sr-only">Add option</span>
      </button>
    </form>
  </section>

  <!-- ── Ballots ─────────────────────────────────────────────────────────── -->
  <section class="mt-6">
    <h2 class="text-lg font-semibold">Ballots</h2>

    {#if candidates.length < 2}
      <p class="mt-1 text-sm text-gray-400">Add at least 2 options to start voting.</p>
    {:else if ballots.length === 0}
      <p class="mt-1 text-sm text-gray-400">Add a ballot to start voting.</p>
    {:else}
      <div class="mt-2 flex flex-col gap-3">
        {#each ballots as ballot, i (i)}
          <div class="flex gap-2">
            <div class="flex-1">
              <BallotForm {ballot} ballotNumber={i + 1} />
            </div>
            <button
              type="button"
              title="Remove ballot {i + 1}"
              class="self-start text-gray-400 hocus:text-red-500"
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
        class="mt-3 rounded border border-gray-300 px-3 py-1 text-sm hocus:border-primary-500 dark:border-darkmixed-300"
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
      class="rounded bg-primary-500 px-4 py-2 font-medium text-white hocus:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
      on:click={tally}
    >
      Tally votes
    </button>
    <button
      type="button"
      class="rounded border border-gray-300 px-4 py-2 text-sm hocus:border-red-400 hocus:text-red-500 dark:border-darkmixed-300"
      on:click={resetSession}
    >
      Reset ballots
    </button>
  </div>

  <!-- ── Results ─────────────────────────────────────────────────────────── -->
  <Results {result} />

  <!-- ── History & storage ───────────────────────────────────────────────── -->
  <section class="mt-8 border-t pt-4 dark:border-darkmixed-300">
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="text-sm text-gray-500 underline hocus:text-gray-700 dark:text-gray-400"
        on:click={() => (showHistory = !showHistory)}
      >
        {showHistory ? 'Hide' : 'Show'} election history ({history.length})
      </button>
      <button
        type="button"
        class="text-sm text-red-400 underline hocus:text-red-600"
        on:click={clearSavedData}
      >
        Clear all saved data
      </button>
    </div>

    {#if showHistory}
      {#if history.length === 0}
        <p class="mt-2 text-sm text-gray-400">No past elections saved.</p>
      {:else}
        <div class="mt-3 flex flex-col gap-4">
          {#each history as entry}
            <div class="rounded border border-gray-200 p-3 text-sm dark:border-darkmixed-300">
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
              <p class="mt-1 text-gray-400">Options: {entry.candidates.join(', ')}</p>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </section>
</main>

<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {import('../models/Ballot.js').default} */
  export let ballot;
  /** @type {number} */
  export let ballotNumber;

  const dispatch = createEventDispatcher();

  // Trigger Svelte reactivity (locally and in the parent) when ballot internals mutate.
  function refresh() {
    ballot = ballot;
    dispatch('change');
  }

  /**
   * @param {Event & { currentTarget: HTMLSelectElement }} event
   * @param {number} rank
   */
  function selectCandidate(event, rank) {
    const name = event.currentTarget.value;
    if (!name) {
      // User chose the placeholder — clear that slot.
      ballot.unrankCandidate(rank);
    } else {
      ballot.rankCandidate(name, rank);
    }
    refresh();
  }

  // How many rank slots to show: all filled slots plus one open slot (if any
  // unranked candidates remain), but only if the previous slot is filled.
  $: visibleRanks = (() => {
    const filled = ballot.ranking.filter((r) => r !== null).length;
    const hasMore = ballot.unrankedCandidates.length > 0;
    return hasMore ? filled + 1 : filled;
  })();
</script>

<fieldset
  class="dark:border-darkmixed-300 min-w-0 rounded border border-gray-300 p-3"
>
  <legend class="px-1 font-medium">Ballot {ballotNumber}</legend>
  <div class="flex flex-col gap-2">
    {#each { length: visibleRanks } as _, i (i)}
      {@const ranked = ballot.ranking[i] ?? null}
      <label class="flex items-center gap-2">
        <span class="w-16 shrink-0 text-base text-gray-600 dark:text-gray-400"
          >#{i + 1}</span
        >
        <select
          class="dark:border-darkmixed-300 dark:bg-dark-500 max-w-full min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-base"
          value={ranked?.name ?? ''}
          on:change={(e) => selectCandidate(e, i + 1)}
        >
          <option value="">— Select an option —</option>
          {#each ballot.unrankedCandidates as candidate (candidate.name)}
            <option value={candidate.name}>{candidate.name}</option>
          {/each}
          {#if ranked}
            <option value={ranked.name} selected>{ranked.name}</option>
          {/if}
        </select>
      </label>
    {/each}
  </div>
</fieldset>

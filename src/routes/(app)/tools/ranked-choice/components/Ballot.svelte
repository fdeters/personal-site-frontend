<script>
  export let ballot;
  export let ballotNumber;

  // Trigger Svelte reactivity when ballot internals mutate.
  let tick = 0;
  function refresh() {
    tick++;
    ballot = ballot;
  }

  function selectCandidate(event, rank) {
    const name = event.target?.value;
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

<fieldset class="rounded border border-gray-300 p-3 dark:border-darkmixed-300">
  <legend class="px-1 font-medium">Ballot {ballotNumber}</legend>
  <div class="flex flex-col gap-2">
    {#each { length: visibleRanks } as _, i (i)}
      {@const ranked = ballot.ranking[i] ?? null}
      <label class="flex items-center gap-2">
        <span class="w-16 text-sm text-gray-500 dark:text-gray-400">#{i + 1}</span>
        <select
          class="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-darkmixed-300 dark:bg-dark-500"
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

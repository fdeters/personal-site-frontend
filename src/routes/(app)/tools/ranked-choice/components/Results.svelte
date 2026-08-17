<script>
  /** @type {{ winner: import('../models/Candidate').default | null, rounds: Array<{ counts: Map<any, number>, eliminated: any[] }> }} */
  export let result;
</script>

{#if result}
  <section class="mt-6">
    <h2 class="text-xl font-semibold">Results</h2>

    {#if result.winner}
      <p class="mt-2 rounded bg-primary-100 px-4 py-2 text-lg font-bold dark:bg-primary-600">
        🎉 Winner: {result.winner.name}
      </p>
    {:else}
      <p class="mt-2 rounded bg-gray-100 px-4 py-2 text-gray-600 dark:bg-dark-400 dark:text-gray-300">
        No winner — all remaining options were tied.
      </p>
    {/if}

    <div class="mt-4 flex flex-col gap-4">
      {#each result.rounds as round, i}
        <div>
          <h3 class="font-medium">Round {i + 1}</h3>
          <table class="mt-1 w-full text-sm">
            <thead>
              <tr class="border-b text-left text-gray-500 dark:border-darkmixed-300 dark:text-gray-400">
                <th class="pb-1 pr-4">Option</th>
                <th class="pb-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {#each [...round.counts.entries()].sort((a, b) => b[1] - a[1]) as [candidate, count]}
                {@const isEliminated = round.eliminated.includes(candidate)}
                {@const isWinner = result.winner === candidate && i === result.rounds.length - 1}
                <tr
                  class="border-b dark:border-darkmixed-300"
                  class:text-red-500={isEliminated}
                  class:font-bold={isWinner}
                >
                  <td class="py-1 pr-4">
                    {candidate.name}
                    {#if isEliminated}<span class="text-xs">(eliminated)</span>{/if}
                    {#if isWinner}<span class="text-xs text-primary-600">✓</span>{/if}
                  </td>
                  <td class="py-1">{count}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    </div>
  </section>
{/if}

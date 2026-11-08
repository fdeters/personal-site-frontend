<script>
  /** @type {ReturnType<import('../models/Election.js').default['tally']> | null} */
  export let result;
</script>

{#if result}
  <section class="mt-6">
    <h2 class="text-xl font-semibold">Results</h2>

    {#if result.winner}
      <p class="winner mt-2 rounded px-4 py-2 text-lg font-bold">
        🎉 Winner: {result.winner.name}
      </p>
    {:else}
      <p
        class="dark:bg-dark-400 mt-2 rounded bg-gray-100 px-4 py-2 text-gray-600 dark:text-gray-300"
      >
        No winner — all remaining options were tied.
      </p>
    {/if}

    <div class="mt-4 flex flex-col gap-4">
      {#each result.rounds as round, i}
        <div>
          <h3 class="font-medium">Round {i + 1}</h3>
          <table class="mt-1 w-full text-sm">
            <thead>
              <tr
                class="dark:border-darkmixed-300 border-b text-left text-gray-600 dark:text-gray-400"
              >
                <th scope="col" class="pr-4 pb-1">Option</th>
                <th scope="col" class="pb-1">Votes</th>
              </tr>
            </thead>
            <tbody>
              {#each [...round.counts.entries()].sort((a, b) => b[1] - a[1]) as [candidate, count]}
                {@const isEliminated = round.eliminated.includes(candidate)}
                {@const isWinner =
                  result.winner === candidate && i === result.rounds.length - 1}
                <tr
                  class="dark:border-darkmixed-300 border-b"
                  class:danger-text={isEliminated}
                  class:font-bold={isWinner}
                >
                  <td class="py-1 pr-4">
                    {candidate.name}
                    {#if isEliminated}<span class="text-xs">(eliminated)</span
                      >{/if}
                    {#if isWinner}<span class="text-xs">✓</span>{/if}
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

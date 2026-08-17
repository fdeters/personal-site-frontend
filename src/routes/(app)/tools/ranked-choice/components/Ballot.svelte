<script>
  export let ballot;
  export let ballotNumber;

  function selectCandidate(event, rank) {
    const name = event.target?.selectedOptions[0].value;
    if (!name) return;

    ballot.rankCandidate(name, rank);
  }
</script>

<fieldset>
  <legend>Ballot {ballotNumber}</legend>
  <div class="flex flex-col">
    {#each ballot.ranking as ranked, i}
      <label>
        Rank {i + 1}
        <select on:change={(e) => selectCandidate(e, i + 1)}>
          <option value="" selected>Select a candidate</option>
          {#each ballot.unrankedCandidates as candidate}
            <option value={candidate.name}>{candidate.name}</option>
          {/each}
        </select>
      </label>
    {/each}
  </div>
</fieldset>

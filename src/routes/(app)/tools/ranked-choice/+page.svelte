<script>
  let numCandidates = 2;
  let numBallots = 2;
</script>

<h1>Ranked choice voting</h1>

<h2>Candidates</h2>
<button
  on:click={() => numCandidates += 1}
>
  Add candidate
</button>

<h2>Ballots</h2>
<button
  on:click={() => numBallots += 1}
>
  Add ballot
</button>
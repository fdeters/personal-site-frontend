<script>
  import IconPlus from '~icons/mdi/plus';
  import BallotForm from './components/Ballot.svelte';
  import Ballot from './models/Ballot';
  import Candidate from './models/Candidate';

  let newCandidateName = '';

  // let candidates = [];
  // let ballots = [];
  let candidates = [new Candidate('Sanders'), new Candidate('Harris')];
  let ballots = [new Ballot(candidates)];

  $: ballots = Array(ballots.length).fill(new Ballot(candidates));

  const addCandidate = () => {
    if (newCandidateName) {
      const newCandidate = new Candidate(newCandidateName);
      candidates = [...candidates, newCandidate];
      newCandidateName = '';
    }
  };
  const addBallot = () => {
    ballots = [...ballots, new Ballot(candidates)];
  };
</script>

<h1>Ranked choice voting</h1>

<h2 class="mt-4">Candidates</h2>
<ul>
  {#each candidates as candidate}
    <li>{candidate.name}</li>
  {/each}
</ul>
<form>
  <h3>Add new candidate</h3>
  <input
    type="text"
    name="new-candidate-name"
    id="new-candidate-name"
    aria-label="Name"
    placeholder="Enter a name"
    bind:value={newCandidateName}
  />
  <button
    type="submit"
    title="Add candidate"
    on:click|preventDefault={addCandidate}
  >
    <IconPlus class="translate-y-0.5" />
    <span class="sr-only">Add candidate</span>
  </button>
</form>

<h2 class="mt-4">Ballots</h2>
{#if candidates.length > 1}
  <form>
    {#each ballots as ballot, i}
      <BallotForm {ballot} ballotNumber={i+1} />
    {:else}
      <p class="text-gray-400">Add a ballot to start voting</p>
    {/each}
  </form>
{:else}
  <p class="text-gray-400">Add some candidates to get started</p>
{/if}
<button on:click={addBallot}>Add ballot</button>

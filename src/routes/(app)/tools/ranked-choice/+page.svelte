<script>
  import IconPlus from '~icons/mdi/plus';
  import Candidate from './models/Candidate';

  let newCandidateName = '';
  let candidates = [];

  const addCandidate = () => {
    if (newCandidateName) {
      const newCandidate = new Candidate(newCandidateName);
      candidates = [...candidates, newCandidate];
      newCandidateName = '';
    }
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
<button on:click={() => (numBallots += 1)}> Add ballot </button>

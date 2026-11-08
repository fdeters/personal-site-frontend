export default class Ballot {
  constructor(candidates) {
    this._candidates = [...candidates];
    this._ranking = Array(candidates.length).fill(null);
    this._unrankedCandidates = [...candidates];
  }

  get candidates() {
    return this._candidates;
  }

  get ranking() {
    return this._ranking;
  }

  get unrankedCandidates() {
    return this._unrankedCandidates;
  }

  /** Number of filled (non-null) ranking slots. */
  get filledCount() {
    return this._ranking.filter((r) => r !== null).length;
  }

  /**
   * Assign `name` to `rank` (1-based). If the slot was already filled, the
   * previous candidate is returned to the unranked pool.
   */
  rankCandidate(name, rank) {
    if (rank < 1 || rank > this._candidates.length) {
      throw new Error(`Invalid rank: must be between 1 and ${this._candidates.length}`);
    }

    const match = this._candidates.find((c) => c.name === name);
    if (!match) {
      throw new Error(`No candidate with name "${name}"`);
    }

    // Return the previously ranked candidate at this slot to the unranked pool.
    const previous = this._ranking[rank - 1];
    let unranked = previous
      ? [...this._unrankedCandidates, previous]
      : [...this._unrankedCandidates];

    // Remove the newly ranked candidate from the unranked pool.
    unranked = unranked.filter((c) => c !== match);

    this._unrankedCandidates = unranked;
    this._ranking = [
      ...this._ranking.slice(0, rank - 1),
      match,
      ...this._ranking.slice(rank),
    ];
  }

  /**
   * Clear the slot at `rank` (1-based), returning its candidate to the
   * unranked pool and shifting higher ranks down.
   */
  unrankCandidate(rank) {
    if (rank < 1 || rank > this._candidates.length) return;
    const removed = this._ranking[rank - 1];
    if (!removed) return;

    // Shift filled slots above this rank downward.
    const newRanking = [
      ...this._ranking.slice(0, rank - 1),
      ...this._ranking.slice(rank),
      null,
    ];

    this._ranking = newRanking;
    this._unrankedCandidates = [...this._unrankedCandidates, removed];
  }

  /**
   * Add a new candidate to this ballot's pool without disturbing existing rankings.
   */
  addCandidate(candidate) {
    this._candidates = [...this._candidates, candidate];
    this._ranking = [...this._ranking, null];
    this._unrankedCandidates = [...this._unrankedCandidates, candidate];
  }

  /**
   * Remove a candidate from this ballot. If they were ranked, shift higher
   * ranks down to fill the gap.
   */
  removeCandidate(candidate) {
    this._candidates = this._candidates.filter((c) => c !== candidate);
    this._unrankedCandidates = this._unrankedCandidates.filter((c) => c !== candidate);

    const rankedIndex = this._ranking.indexOf(candidate);
    if (rankedIndex !== -1) {
      // Shift down: remove the slot and drop the trailing null.
      this._ranking = [
        ...this._ranking.slice(0, rankedIndex),
        ...this._ranking.slice(rankedIndex + 1),
      ];
    } else {
      // Just shrink the array by one null slot.
      const lastNull = this._ranking.lastIndexOf(null);
      this._ranking = [
        ...this._ranking.slice(0, lastNull),
        ...this._ranking.slice(lastNull + 1),
      ];
    }
  }

  /**
   * Serialize to a plain object for storage.
   */
  toJSON() {
    return {
      ranking: this._ranking.map((c) => c?.name ?? null),
    };
  }
}

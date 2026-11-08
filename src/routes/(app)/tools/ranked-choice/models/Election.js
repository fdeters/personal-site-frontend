/**
 * Instant-Runoff Voting (IRV) implementation.
 *
 * Ties at the bottom are broken by eliminating ALL tied last-place candidates
 * simultaneously.
 */
export default class Election {
  /**
   * @param {import('./Ballot').default[]} ballots
   * @param {import('./Candidate').default[]} candidates
   */
  constructor(ballots, candidates) {
    this.ballots = ballots;
    this.candidates = candidates;
  }

  /**
   * Run the election and return round-by-round results.
   *
   * @returns {{
   *   winner: import('./Candidate').default | null,
   *   rounds: Array<{
   *     counts: Map<import('./Candidate').default, number>,
   *     eliminated: import('./Candidate').default[]
   *   }>
   * }}
   */
  tally() {
    const rounds = [];
    let remaining = [...this.candidates];

    while (remaining.length > 0) {
      const counts = this._countRound(remaining);
      const total = [...counts.values()].reduce((a, b) => a + b, 0);

      // Check for a majority winner (> 50%).
      const winner = remaining.find((c) => (counts.get(c) ?? 0) / total > 0.5);
      if (winner) {
        rounds.push({ counts, eliminated: [] });
        return { winner, rounds };
      }

      // Find the minimum vote count.
      const minVotes = Math.min(...remaining.map((c) => counts.get(c) ?? 0));

      // Eliminate all candidates tied at the minimum (batch elimination).
      const eliminated = remaining.filter((c) => (counts.get(c) ?? 0) === minVotes);

      rounds.push({ counts, eliminated });
      remaining = remaining.filter((c) => !eliminated.includes(c));

      // Guard: if everyone is eliminated simultaneously, it's a full tie.
      if (remaining.length === 0) {
        return { winner: null, rounds };
      }
    }

    return { winner: null, rounds };
  }

  /**
   * Count the top-ranked non-eliminated candidate for every ballot.
   *
   * @param {import('./Candidate').default[]} remaining
   * @returns {Map<import('./Candidate').default, number>}
   */
  _countRound(remaining) {
    const counts = new Map(remaining.map((c) => [c, 0]));

    for (const ballot of this.ballots) {
      // Walk the ballot ranking from first preference down, skipping nulls and
      // already-eliminated candidates.
      const choice = ballot.ranking.find(
        (c) => c !== null && remaining.includes(c)
      );
      if (choice) {
        counts.set(choice, (counts.get(choice) ?? 0) + 1);
      }
    }

    return counts;
  }
}

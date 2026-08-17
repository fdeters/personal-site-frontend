export default class Ballot {
  constructor(candidates, ranking) {
    this.ranking = ranking;

    this.candidates = candidates;
    this._unrankedCandidates = candidates;
  }

  get candidates() {
    return this._candidates;
  }

  set candidates(val) {
    this.ranking = Array(val.length).fill(null);
    this._candidates = val;
  }

  get unrankedCandidates() {
    return this._unrankedCandidates;
  }

  rankCandidate(name, rank) {
    if (rank < 1 || rank > this.candidates.length) {
      throw Error(
        `Invalid rank: must be between 1 and ${this.candidates.length}`
      );
    }

    const match = this.candidates.find((c) => c.name === name);
    if (!match) {
      throw Error('No candidate with name', name);
    }

    // overwriting an existing candidate rank
    if (this.ranking[rank - 1] !== null) {
      this._unrankedCandidates = [
        ...this._unrankedCandidates,
        this.ranking[rank - 1],
      ];
    }

    // rank the candidate
    console.log(this.unrankedCandidates);

    const index = this._unrankedCandidates.indexOf(match);
    this._unrankedCandidates = [
      ...this._unrankedCandidates.slice(0, index),
      ...this._unrankedCandidates.slice(
        index + 1,
        this._unrankedCandidates.length
      ),
    ];
    console.log(this.unrankedCandidates);

    this.ranking[rank - 1] = match;
  }
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import Ballot from './Ballot.js';
import Candidate from './Candidate.js';
import Election from './Election.js';

const make = (names) => names.map((n) => new Candidate(n));
const vote = (cands, order) => {
  const b = new Ballot(cands);
  order.forEach((n, i) => b.rankCandidate(n, i + 1));
  return b;
};

test('first-round majority winner', () => {
  const cands = make(['A', 'B', 'C']);
  const ballots = [
    vote(cands, ['A', 'B', 'C']),
    vote(cands, ['A', 'C', 'B']),
    vote(cands, ['B', 'A', 'C']),
  ];
  const { winner, rounds } = new Election(ballots, cands).tally();
  assert.equal(winner, cands[0]);
  assert.equal(rounds.length, 1);
  assert.deepEqual(rounds[0].eliminated, []);
});

test('redistributes votes after elimination', () => {
  const cands = make(['A', 'B', 'C']);
  const [A, B, C] = cands;
  const ballots = [
    vote(cands, ['A', 'B', 'C']),
    vote(cands, ['A', 'B', 'C']),
    vote(cands, ['B', 'C', 'A']),
    vote(cands, ['B', 'C', 'A']),
    vote(cands, ['C', 'B', 'A']),
  ];
  const { winner, rounds } = new Election(ballots, cands).tally();
  assert.equal(winner, B);
  assert.deepEqual(rounds[0].eliminated, [C]);
  assert.equal(rounds[1].counts.get(B), 3);
  assert.equal(rounds[1].counts.get(A), 2);
});

test('full tie yields no winner', () => {
  const cands = make(['A', 'B']);
  const ballots = [vote(cands, ['A', 'B']), vote(cands, ['B', 'A'])];
  const { winner, rounds } = new Election(ballots, cands).tally();
  assert.equal(winner, null);
  assert.equal(rounds[0].eliminated.length, 2);
});

test('partial ballots are supported', () => {
  const cands = make(['A', 'B', 'C']);
  const ballots = [
    vote(cands, ['A']),
    vote(cands, ['A']),
    vote(cands, ['B', 'C']),
  ];
  assert.equal(new Election(ballots, cands).tally().winner, cands[0]);
});

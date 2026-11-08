import { test } from 'node:test';
import assert from 'node:assert/strict';
import Ballot from './Ballot.js';
import Candidate from './Candidate.js';

/** @returns {{ a: Candidate, b: Candidate, c: Candidate, ballot: Ballot }} */
const setup = () => {
  const [a, b, c] = ['A', 'B', 'C'].map((n) => new Candidate(n));
  return { a, b, c, ballot: new Ballot([a, b, c]) };
};

test('starts with empty ranking and all candidates unranked', () => {
  const { ballot, a, b, c } = setup();
  assert.deepEqual(ballot.ranking, [null, null, null]);
  assert.deepEqual(ballot.unrankedCandidates, [a, b, c]);
});

test('rankCandidate fills slot, replaces previous, and replaces by new array', () => {
  const { ballot, a, b } = setup();
  const before = ballot.ranking;
  ballot.rankCandidate('A', 1);
  assert.notEqual(ballot.ranking, before);
  assert.equal(ballot.ranking[0], a);
  ballot.rankCandidate('B', 1);
  assert.equal(ballot.ranking[0], b);
  assert.ok(ballot.unrankedCandidates.includes(a));
  assert.ok(!ballot.unrankedCandidates.includes(b));
});

test('rankCandidate validates input', () => {
  const { ballot } = setup();
  assert.throws(() => ballot.rankCandidate('A', 0));
  assert.throws(() => ballot.rankCandidate('A', 4));
  assert.throws(() => ballot.rankCandidate('Z', 1));
});

test('unrankCandidate shifts later ranks up', () => {
  const { ballot, a, b, c } = setup();
  ballot.rankCandidate('A', 1);
  ballot.rankCandidate('B', 2);
  ballot.rankCandidate('C', 3);
  ballot.unrankCandidate(1);
  assert.deepEqual(ballot.ranking, [b, c, null]);
  assert.deepEqual(ballot.unrankedCandidates, [a]);
});

test('addCandidate keeps existing rankings', () => {
  const { ballot, a } = setup();
  ballot.rankCandidate('A', 1);
  const d = new Candidate('D');
  ballot.addCandidate(d);
  assert.equal(ballot.ranking.length, 4);
  assert.equal(ballot.ranking[0], a);
  assert.ok(ballot.unrankedCandidates.includes(d));
});

test('removeCandidate shifts rankings up (ranked) or shrinks (unranked)', () => {
  const { ballot, a, b, c } = setup();
  ballot.rankCandidate('A', 1);
  ballot.rankCandidate('B', 2);
  ballot.removeCandidate(a);
  assert.deepEqual(ballot.ranking, [b, null]);
  ballot.removeCandidate(c);
  assert.deepEqual(ballot.ranking, [b]);
  assert.deepEqual(ballot.candidates, [b]);
});

test('toJSON serializes names', () => {
  const { ballot } = setup();
  ballot.rankCandidate('B', 1);
  assert.deepEqual(JSON.parse(JSON.stringify(ballot)), {
    ranking: ['B', null, null],
  });
});

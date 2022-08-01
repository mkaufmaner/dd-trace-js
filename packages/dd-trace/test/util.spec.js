'use strict'

const { expect } = require('chai')
const { isTrue, isFalse, parseRules } = require('../src/util')

const TRUES = [
  1,
  true,
  'true',
  'TRUE',
  'tRuE'
]
const FALSES = [
  0,
  false,
  'false',
  'FALSE',
  'fAlSe'
]

const GOOD_RULES = [
  `[
    {"service": "usersvc", "name": "healthcheck", "sampleRate": 0.0},
    {"service": "usersvc", "sampleRate": 0.5},
    {"service": "authsvc", "sampleRate": 1.0},
    {"sampleRate": 0.1}
  ]`,
  [
    { 'service': 'usersvc', 'name': 'healthcheck', 'sampleRate': 0.0 },
    { 'service': 'usersvc', 'sampleRate': 0.5 },
    { 'service': 'authsvc', 'sampleRate': 1.0 },
    { 'sampleRate': 0.1 }
  ]
]

const BAD_RULES = [
  `{}`, // not an array
  `[{a}]`, // invalid internal json
  5 // not an array, not a string
]

describe('util', () => {
  it('isTrue works', () => {
    TRUES.forEach((v) => {
      expect(isTrue(v)).to.equal(true)
      expect(isTrue(String(v))).to.equal(true)
    })
    FALSES.forEach((v) => {
      expect(isTrue(v)).to.equal(false)
      expect(isTrue(String(v))).to.equal(false)
    })
  })

  it('isFalse works', () => {
    FALSES.forEach((v) => {
      expect(isFalse(v)).to.equal(true)
      expect(isFalse(String(v))).to.equal(true)
    })
    TRUES.forEach((v) => {
      expect(isFalse(v)).to.equal(false)
      expect(isFalse(String(v))).to.equal(false)
    })
  })

  it.only('parseRules works', () => {
    const goodExpected = [
      { 'service': 'usersvc', 'name': 'healthcheck', 'sampleRate': 0.0 },
      { 'service': 'usersvc', 'sampleRate': 0.5 },
      { 'service': 'authsvc', 'sampleRate': 1.0 },
      { 'sampleRate': 0.1 }
    ]
    GOOD_RULES.forEach(rules => {
      expect(parseRules(rules)).to.eql(goodExpected)
    })

    const badExpected = []
    BAD_RULES.forEach(rules => {
      expect(parseRules(rules)).to.eql(badExpected)
    })
  })
})

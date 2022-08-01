'use strict'

function isTrue (str) {
  str = String(str).toLowerCase()
  return str === 'true' || str === '1'
}

function isFalse (str) {
  str = String(str).toLowerCase()
  return str === 'false' || str === '0'
}

function isError (value) {
  if (value instanceof Error) {
    return true
  }
  if (value && value.message && value.stack) {
    return true
  }
  return false
}

function parseRules (rules) {
  if (Array.isArray(rules)) return rules
  if (typeof rules !== 'string') return []
  try {
    const parsed = JSON.parse(rules)

    if (!Array.isArray(parsed)) return []
    else return parsed
  } catch (e) { return [] }
}

module.exports = {
  isTrue,
  isFalse,
  isError,
  parseRules
}

export const validateWord = (rawInput, { letterCounts = {}, submitted = new Set(), dictionary }) => {
  const normalized = rawInput.trim().toUpperCase()

  if (!normalized) {
    return { ok: false, reason: 'empty' }
  }

  if (!/^[A-Z]+$/.test(normalized)) {
    return { ok: false, reason: 'invalid-chars', normalized }
  }

  if (submitted.has(normalized)) {
    return { ok: false, reason: 'duplicate', normalized }
  }

  const usage = {}

  for (const letter of normalized) {
    const available = letterCounts[letter] || 0
    usage[letter] = (usage[letter] || 0) + 1

    if (available === 0) {
      return { ok: false, reason: 'missing-letter', normalized, letter }
    }

    if (usage[letter] > available) {
      return { ok: false, reason: 'letter-limit', normalized, letter }
    }
  }

  if (dictionary && dictionary.size && !dictionary.has(normalized)) {
    return { ok: false, reason: 'not-in-dictionary', normalized }
  }

  return { ok: true, normalized }
}

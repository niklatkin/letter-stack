import { validateWord } from './validate'

const MAX_LENGTH = 7
const MAX_CONSONANT_RUN = 3
const UNCOMMON_ENDINGS = ['UM', 'AE', 'US']
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U'])

const buildCounts = (letters) =>
  letters.reduce((map, letter) => {
    map[letter] = (map[letter] || 0) + 1
    return map
  }, {})

const hasLongConsonantRun = (word) => {
  let run = 0
  for (const ch of word) {
    if (VOWELS.has(ch)) {
      run = 0
    } else {
      run += 1
      if (run > MAX_CONSONANT_RUN) return true
    }
  }
  return false
}

const passesHeuristics = (word) => {
  if (word.length > MAX_LENGTH) return false
  if (UNCOMMON_ENDINGS.some((ending) => word.endsWith(ending))) return false
  if (hasLongConsonantRun(word)) return false
  return true
}

export const findPossibleWords = (letters, dictionarySet) => {
  if (!letters || !letters.length || !dictionarySet || dictionarySet.size === 0) {
    return []
  }

  const letterCounts = buildCounts(letters)
  const submitted = new Set()
  const possibles = []

  for (const word of dictionarySet) {
    const upperWord = word.toUpperCase()
    if (!passesHeuristics(upperWord)) continue

    const result = validateWord(upperWord, { letterCounts, submitted, dictionary: dictionarySet })
    if (result.ok) {
      possibles.push(result.normalized)
    }
  }

  return possibles
}

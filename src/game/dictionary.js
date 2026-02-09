import wordList from '../data/words.txt?raw'

let dictionarySet

const MIN_LENGTH = 3

const buildDictionary = (raw) =>
  new Set(
    raw
      .split(/\r?\n/)
      .map((line) => line.trim().toUpperCase())
      .filter((word) => word.length >= MIN_LENGTH && /^[A-Z]+$/.test(word)),
  )

export const getDictionarySet = () => {
  if (!dictionarySet) {
    dictionarySet = buildDictionary(wordList)
  }
  return dictionarySet
}

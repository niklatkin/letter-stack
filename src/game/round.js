const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const LETTER_COUNT = 10

const randomIndex = (max) => Math.floor(Math.random() * max)

const pickRandom = (array) => array[randomIndex(array.length)]

const shuffle = (letters) => {
  const copy = [...letters]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const pickBaseWord = (dictionarySet) => {
  if (!dictionarySet || dictionarySet.size === 0) {
    return null
  }

  const allWords = Array.from(dictionarySet)
  const sized = allWords.filter((word) => word.length >= 3 && word.length <= LETTER_COUNT)
  const source = sized.length ? sized : allWords.filter((word) => word.length <= LETTER_COUNT)

  return pickRandom(source)
}

export const startNewRound = (dictionarySet) => {
  const baseWord = pickBaseWord(dictionarySet)

  if (!baseWord) {
    const fallback = 'CROSSPLAY' // 9 letters; will be padded below
    const letters = fallback.split('')
    while (letters.length < LETTER_COUNT) {
      letters.push(pickRandom(ALPHABET))
    }
    return { letters: shuffle(letters), baseWord: fallback }
  }

  const letters = baseWord.split('')

  while (letters.length < LETTER_COUNT) {
    letters.push(pickRandom(ALPHABET))
  }

  return {
    letters: shuffle(letters),
    baseWord,
  }
}

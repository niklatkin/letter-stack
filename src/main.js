import './style.css'
import { getDictionarySet } from './game/dictionary'
import { startNewRound } from './game/round'
import { findPossibleWords } from './game/solver'
import { createTimer } from './game/timer'
import { validateWord } from './game/validate'

const ROUND_DURATION = 120
const dictionary = getDictionarySet()
const ROUND_MODES = {
  TIMED: 'timed',
  ENDLESS: 'endless',
}
const ROUND_MODE_DEFAULT = ROUND_MODES.TIMED

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="game">
    <header class="game__header">
      <p class="pill">Local prototype</p>
      <h1>Letter Stack</h1>
      <p class="lede">Build any word you like using the letters below. No scoring—just explore the mechanic.</p>
    </header>

    <section class="board" aria-label="Available letters">
      <div class="board__header">
        <div class="round-stats">
          <div class="mode-select">
            <label for="mode-select">Mode</label>
            <select id="mode-select" name="mode">
              <option value="${ROUND_MODES.TIMED}">Timed (2:00)</option>
              <option value="${ROUND_MODES.ENDLESS}">Endless</option>
            </select>
          </div>
          <p class="stat" id="timer-stat">Time: <span id="timer-display">${ROUND_DURATION}</span>s</p>
          <p class="stat">Found: <span id="round-word-count">0</span></p>
        </div>
        <div class="round-actions">
          <button type="button" id="end-round" class="button-secondary" hidden>End round</button>
          <button type="button" id="new-round" class="button-secondary">New round</button>
        </div>
      </div>
      <div id="letter-board" class="board__tiles"></div>
    </section>

    <form id="word-form" class="entry" autocomplete="off">
      <label class="entry__label" for="word-input">Type a word</label>
      <div class="entry__controls">
        <input
          id="word-input"
          name="word"
          type="text"
          required
          spellcheck="false"
          maxlength="16"
          placeholder="letters only"
        />
        <button type="submit">Submit</button>
      </div>
      <p class="hint">Use each letter no more than it appears above.</p>
      <p class="status" id="status" role="status" aria-live="polite"></p>
    </form>

    <section class="words" aria-live="polite">
      <div class="words__header">
        <h2>Submitted words</h2>
        <p class="count"><span id="word-count">0</span> saved</p>
      </div>
      <p class="summary" id="round-summary"></p>
      <ul id="word-list" class="word-list" aria-label="Submitted words"></ul>
      <div class="missed" id="missed-section" hidden>
        <p class="missed__title">Words you didn’t enter this round:</p>
        <div id="missed-list" class="missed__list"></div>
      </div>
    </section>
  </main>
`

const form = document.querySelector('#word-form')
const input = document.querySelector('#word-input')
const status = document.querySelector('#status')
const list = document.querySelector('#word-list')
const wordCount = document.querySelector('#word-count')
const letterBoard = document.querySelector('#letter-board')
const newRoundButton = document.querySelector('#new-round')
const endRoundButton = document.querySelector('#end-round')
const timerStat = document.querySelector('#timer-stat')
const timerDisplay = document.querySelector('#timer-display')
const roundWordCount = document.querySelector('#round-word-count')
const submitButton = form.querySelector('button[type="submit"]')
const roundSummary = document.querySelector('#round-summary')
const missedSection = document.querySelector('#missed-section')
const missedList = document.querySelector('#missed-list')
const modeSelect = document.querySelector('#mode-select')

let currentLetters = []
let letterCounts = {}
let roundActive = false
let roundMode = ROUND_MODE_DEFAULT
const submitted = new Set()
const roundWords = new Set()
let possibleWords = []
const usedTileIndices = new Set()

const roundTimer = createTimer({
  duration: ROUND_DURATION,
  onTick: (remaining) => {
    if (!roundActive || roundMode !== ROUND_MODES.TIMED) return
    timerDisplay.textContent = remaining
  },
  onDone: () => {
    if (roundMode !== ROUND_MODES.TIMED) return
    endRound()
  },
})

const updateStatus = (message, isError = false) => {
  status.textContent = message
  status.dataset.state = isError ? 'error' : 'ok'
}

const setInputsEnabled = (enabled) => {
  input.disabled = !enabled
  submitButton.disabled = !enabled
}

const clearSummary = () => {
  if (roundSummary) {
    roundSummary.textContent = ''
  }
  if (missedSection) {
    missedSection.hidden = true
  }
  if (missedList) {
    missedList.innerHTML = ''
  }
}

const isTimedMode = () => roundMode === ROUND_MODES.TIMED

const updateModeUI = () => {
  const timed = isTimedMode()
  if (timerStat) timerStat.hidden = !timed
  if (endRoundButton) endRoundButton.hidden = timed
  if (modeSelect) modeSelect.value = roundMode
}

const renderSummary = () => {
  if (!roundSummary) return
  const total = possibleWords.length
  const found = roundWords.size
  if (total === 0) {
    roundSummary.textContent = 'No valid words available for this set.'
    return
  }
  const percent = Math.round((found / total) * 100)
  roundSummary.textContent = `You found ${found} of ${total} possible words (${percent}%).`

  const missed = possibleWords.filter((word) => !submitted.has(word))
  if (missedSection && missedList) {
    missedSection.hidden = false
    missedList.innerHTML = missed
      .map((word) => `<span class="chip">${word}</span>`)
      .join('') || '<p class="missed__empty">You found them all. Nice!</p>'
  }
}

const computeLetterCounts = (letters) =>
  letters.reduce((map, letter) => {
    map[letter] = (map[letter] || 0) + 1
    return map
  }, {})

const renderBoard = () => {
  letterBoard.innerHTML = currentLetters
    .map(
      (letter, index) =>
        `<span class="tile tile--enter" data-index="${index}" style="animation-delay:${index * 70}ms" aria-label="letter ${letter}">${letter}</span>`,
    )
    .join('')
}

const setLetters = (letters) => {
  currentLetters = letters
  letterCounts = computeLetterCounts(letters)
  usedTileIndices.clear()
  renderBoard()
}

const clearSubmissions = () => {
  submitted.clear()
  list.innerHTML = ''
  wordCount.textContent = '0'
}

const resetRoundWords = () => {
  roundWords.clear()
  roundWordCount.textContent = '0'
}

const endRound = () => {
  if (!roundActive) return
  roundActive = false
  roundTimer.stop()
  setInputsEnabled(false)
  updateStatus('Round finished.', true)
  renderSummary()
}

const setRoundMode = (mode) => {
  const next = mode === ROUND_MODES.ENDLESS ? ROUND_MODES.ENDLESS : ROUND_MODES.TIMED
  if (next === roundMode) return
  roundTimer.stop()
  roundMode = next
  updateModeUI()
  startRound({ resetSubmissions: true })
}

const startRound = ({ resetSubmissions = false } = {}) => {
  roundTimer.stop()
  const { letters } = startNewRound(dictionary)
  setLetters(letters)
  possibleWords = findPossibleWords(letters, dictionary)
  resetRoundWords()
  if (resetSubmissions) {
    clearSubmissions()
  }
  usedTileIndices.clear()
  input.value = ''
  setInputsEnabled(true)
  roundActive = true
  updateModeUI()
  if (isTimedMode()) {
    roundTimer.start(ROUND_DURATION)
    timerDisplay.textContent = ROUND_DURATION
    updateStatus('New round ready.', false)
  } else {
    timerDisplay.textContent = '—'
    updateStatus('Round running (manual end).', false)
  }
  clearSummary()
}

const addWord = (word) => {
  submitted.add(word)
  roundWords.add(word)
  const item = document.createElement('li')
  item.className = 'word'
  item.textContent = word
  list.prepend(item)
  wordCount.textContent = submitted.size
  roundWordCount.textContent = roundWords.size
}

const reasonToMessage = (result) => {
  switch (result.reason) {
    case 'empty':
      return 'Enter a word first.'
    case 'invalid-chars':
      return 'Letters A–Z only.'
    case 'duplicate':
      return 'Already saved.'
    case 'missing-letter':
      return `Uses unavailable letters (${result.letter}).`
    case 'letter-limit':
      return `Too many ${result.letter}s for this set.`
    case 'not-in-dictionary':
      return 'Word not allowed in current dictionary.'
    default:
      return 'Try again.'
  }
}

const resetUsedTiles = () => {
  usedTileIndices.clear()
  letterBoard.querySelectorAll('.tile').forEach((tile) => tile.classList.remove('tile--used'))
}

const handleTileClick = (event) => {
  const tile = event.target.closest('.tile')
  if (!tile || !roundActive) return

  const index = Number(tile.dataset.index)
  if (Number.isNaN(index) || usedTileIndices.has(index)) return

  usedTileIndices.add(index)
  tile.classList.add('tile--used')
  input.value += tile.textContent
  input.focus()
}

startRound({ resetSubmissions: true })

newRoundButton.addEventListener('click', () => {
  startRound({ resetSubmissions: true })
})

endRoundButton.addEventListener('click', () => {
  endRound()
})

letterBoard.addEventListener('click', handleTileClick)

modeSelect.addEventListener('change', (event) => {
  setRoundMode(event.target.value)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (!roundActive) {
    updateStatus('Round finished. Start a new round.', true)
    return
  }

  const result = validateWord(input.value, {
    letterCounts,
    submitted,
    dictionary,
  })

  if (!result.ok) {
    updateStatus(reasonToMessage(result), true)
    return
  }

  addWord(result.normalized)
  input.value = ''
  resetUsedTiles()
  updateStatus('Saved', false)
  input.focus()
})

input.addEventListener('input', () => {
  if (input.value.length === 0) {
    resetUsedTiles()
  }
})

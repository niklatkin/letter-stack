export const createTimer = ({ duration = 60, onTick = () => {}, onDone = () => {} } = {}) => {
  let remaining = duration
  let timerId = null

  const clear = () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
  }

  const tick = () => {
    remaining = Math.max(remaining - 1, 0)
    onTick(remaining)
    if (remaining <= 0) {
      clear()
      onDone()
    }
  }

  const start = (seconds = duration) => {
    clear()
    remaining = seconds
    onTick(remaining)
    timerId = setInterval(tick, 1000)
  }

  const stop = () => {
    clear()
  }

  const reset = (seconds = duration) => {
    clear()
    remaining = seconds
    onTick(remaining)
  }

  const getRemaining = () => remaining

  return { start, stop, reset, getRemaining }
}

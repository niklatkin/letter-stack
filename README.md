# Letter Stack

Letter Stack is a minimalist word game focused on discovery, flow, and experimentation.

It invites players to explore language by building as many valid words as possible from a fixed set of letters — without scoring pressure, competition, or artificial constraints.

This project is both:
- a personal exploration of word-game mechanics and UX
- a foundation for future experimentation and expansion

---

## Why Letter Stack Exists

Most word games optimize for:
- scores
- competition
- speed
- optimization

Letter Stack is intentionally different.

The core idea is **exploration**:
- finding words you didn’t know
- seeing what you missed
- learning through play rather than pressure

It’s designed to be calm, focused, and flexible — closer to a thinking toy than a traditional game.

---

## Core Game Mechanics

### Letters
- Each round starts with a fixed number of letters (currently **10**).
- Letters are randomly generated.
- Each letter can only be used as many times as it appears in the pool.

### Words
- Words must be valid English dictionary words.
- Validation is dictionary-based, not hardcoded.
- Duplicate words are not allowed.

If a word can be formed but is not present in the dictionary, the game responds with:

> **“Word not allowed in current dictionary.”**

This keeps validation strict and transparent.

---

## Game Modes

### Timed Mode (Default)
- Duration: **2 minutes (120 seconds)**
- The round ends automatically when the timer reaches zero.
- Best suited for focused, high-energy play.

### Endless Mode
- No timer.
- The player controls when the round ends.
- An **“End round”** button is available.
- Designed for relaxed exploration and learning.

Mode selection is available before starting a new round.

---

## Round Completion & Feedback

When a round ends, the game shows:

- Words you found
- Words you didn’t find
- Total number of possible valid words
- Your completion percentage

This turns each round into a feedback loop rather than a win/lose outcome.

---

## Controls

- Type a word and press **Submit**
- Start a new round with **New round**
- End a round manually in endless mode

(Planned improvement: building words by clicking letters.)

---

## Design Philosophy

- No ads
- No accounts
- No persistence
- No dark patterns
- No artificial difficulty scaling

The focus is:
- clarity
- responsiveness
- mechanic-first design

---

## Current Status

Letter Stack is a **local prototype**.

What it already does well:
- Stable core mechanic
- Dictionary-based validation
- Clear UX feedback
- Flexible round structure

What is intentionally out of scope (for now):
- Multiplayer
- Scoring systems
- Progression or leveling
- Monetization

---

## Tech Stack

- Frontend: modern JavaScript (Vite-based setup)
- No backend
- Runs fully in the browser
- Zero external services

---

## Local Development

### Requirements
- Node.js (latest LTS recommended)

### Install dependencies
```bash
npm install

### Run locally

npm run dev
# Letter Stack

Letter Stack is a minimalist word game focused on discovery, flow, and experimentation.

It invites players to explore language by building as many valid words as possible from a fixed set of letters, without scoring pressure, competition, or artificial constraints.

This project is both:
- a personal exploration of word-game mechanics and UX
- a foundation for future experimentation and expansion

---

## Why Letter Stack Exists

Most word games optimize for:
- scores
- competition
- speed
- optimization

Letter Stack is intentionally different.

The core idea is exploration:
- finding words you did not know
- seeing what you missed
- learning through play rather than pressure

It is designed to be calm, focused, and flexible, closer to a thinking toy than a traditional game.

---

## Core Game Mechanics

### Letters
- Each round starts with a fixed number of letters (currently 10).
- Letters are randomly generated.
- Each letter can only be used as many times as it appears in the pool.

### Words
- Words must be valid English dictionary words.
- Validation is dictionary-based, not hardcoded.
- Duplicate words are not allowed.

If a word can be formed but is not present in the dictionary, the game responds with:

> Word not allowed in current dictionary.

This keeps validation strict and transparent.

---

## Game Modes

### Timed Mode (Default)
- Duration: 2 minutes (120 seconds)
- The round ends automatically when the timer reaches zero.
- Best suited for focused, high-energy play.

### Endless Mode
- No timer.
- The player controls when the round ends.
- An "End round" button is available.
- Designed for relaxed exploration and learning.

Mode selection is available before starting a new round.

---

## Round Completion and Feedback

When a round ends, the game shows:
- Words you found
- Words you did not find
- Total number of possible valid words
- Your completion percentage

This turns each round into a feedback loop rather than a win or lose outcome.

---

## Controls

- Type a word and press Submit
- Start a new round with New round
- End a round manually in endless mode

Planned improvement: building words by clicking letters.

---

## Design Philosophy

- No ads
- No accounts
- No persistence
- No dark patterns
- No artificial difficulty scaling

The focus is on clarity, responsiveness, and mechanic-first design.

---

## Current Status

Letter Stack is a local prototype.

What it already does well:
- Stable core mechanic
- Dictionary-based validation
- Clear UX feedback
- Flexible round structure

What is intentionally out of scope for now:
- Multiplayer
- Scoring systems
- Progression or leveling
- Monetization

---

## Tech Stack

- Frontend: modern JavaScript with a Vite-based setup
- No backend
- Runs fully in the browser
- Zero external services

---

## Local Development

### Requirements
- Node.js (latest LTS recommended)

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

Then open:
```
http://localhost:5173
```

---

## Future Ideas (Not Commitments)

- Click-to-build words from letters
- Adaptive letter generation
- Language switching
- Mobile-first layout
- Daily challenge mode
- Word explanations or definitions

---

## About the Project

Letter Stack was built as part of a personal "build often, build small" workflow using AI-assisted development.

The goal is not perfection. It is momentum, clarity, and learning through iteration.

If you enjoy word games that respect your time and attention, this project is for you.
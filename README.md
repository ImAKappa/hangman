# Hangman

Hangman Game, playable in a web browser.

This version of Hangman is exactly like the pencil-and-paper game (local multiplayer), just made into a webapp.
See the [Hangman Wikipedia article](https://en.wikipedia.org/wiki/Hangman_(game)) for more details.

> Note, this webapp has been designed for English alphabet

## Usage

### Game Menu

**Maximum Number of Guesses**: the maximum positive integer number of guesses before losing. Enter `0` for infinite lives.

**Word**: Words must be 30 characters or less. Punctuation, numbers, and special characters are allowed, but will not be hidden.

**Category**: Ideally, the chosen word should belong to the chosen category, however, this is not enforced by the webapp.

### Gameplay

Upon loading the game, players are presented with:

1. The hangman
2. Blanks corresponding to the letters in the hidden word/phrase (punctuation and whitespace shown)
3. Wrong letter guesses
4. Options for next letter guess

Players may then begin selecting letters.
The webapp will keep track of right and wrong guesses.
Try to save the hangman by guessing correctly before running out of tries!

## Feature Roadmap

- [ ] (Enhancement) **Safe For Work version**:
current version is a tad bit macabre...
- [ ] (Enhancement) **Audio & Music**:
some air vibrations could really help with the immersion

<details><summary><h2>Implementation Notes</h2></summary>

This is my first serious attempt to develop a fully-functioning, well-tested webapp using Svelte.
I figured implementing hangman was a good place to start,
but it turned out to be much more complicated than I thought.
Front-end webdev is a bizarre world, but I'm getting used to it.

**Hangman**: Instead of filling in the hangman as you would on pencil and paper,
the webapp indicates remaining attempts using a stack of boxes below the hangman's feet.
For each wrong guess, one box is removed, until eventually the hangman is suspended and dies (┬┬﹏┬┬)

**Tech Stack**: 
- [Svelte](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [PNpM](https://pnpm.io/)
- [MatterJS](https://brm.io/matter-js/)

</details>

---
Last update: June 30, 2022

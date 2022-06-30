import { writable } from 'svelte/store';

// Game state
export const gameMenu = writable(true);
export const gameOver = writable(false);
export const gameWon = writable(false);

// Game variables
export const category = writable("my category");
export const word = writable("my word");
export const maxGuesses = writable(6);
export const wrongGuesses = writable([]);

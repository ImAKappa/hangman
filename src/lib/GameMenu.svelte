<script lang="ts">
  import { gameOver, gameWon, category, word, maxGuesses, wrongGuesses, gameMenu } from "./store";
  
  const playGame = () => {
    console.info("playGame");
    // Reset game state
    // gameOver needs to be set to true to make all guessed letters in sync with $gameOver
    gameOver.set(true);
    gameOver.set(false);
    gameWon.set(false);
    // Clear wrong guesses
    wrongGuesses.set([]);
    // Clear category and word
    category.set("my category");
    word.set("my word");
    /* Reset remaining guesses - but a hacky way of doing it
     * Tried to convert remainingGuesses to a derived store, but they are not writable
     *    It was tough to init remainingGuesses with maxGuesses, but also let remainingGuesses update independent of maxGuesses
     * Plus, using `maxGuesses.set($maxGuesses)` did not technically change the maxGuesses value,
     *    so reaminingGuesses could not be updated that way either
     */
    maxGuesses.update(maxGuesses => maxGuesses - 1);
    maxGuesses.update(maxGuesses => maxGuesses + 1);
    // Exit menu
    gameMenu.set(false);
  }
</script>

<div>
    <h2>Game Settings</h2>

    <!-- Hangman restricts players to a limited number of guesses -->
    <h3>Enter maximum number of guesses:</h3>
    <!-- 0 remaining guesses means infinite guesses -->
    <input type="number" name="attempts" class="attempts" min="0" bind:value={$maxGuesses}>

    <!-- Category: It's up to the players to make sure their word belongs to the category -->
    <h3 class="category">Enter Category:</h3>
    <input type="text" name="category" class="category" bind:value={$category}>

    <!-- Word/phrase: 30 characters max is a bit arbitrary, 
        but it's included to limit players to guessable words/phrases -->
    <h3>Enter Word/Phrase:</h3>
    <!-- Transform text to uppercase using CSS -->
    <input type="text" name="word-phrase" class="word" maxlength="30" bind:value={$word}>

    <!-- Reset game, should only be enabled on gameOver -->
    <button class="play-game" on:click={playGame}>Play</button>
</div>
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
    // category.set("my category");
    // word.set("my word");
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

<!-- Game Menu -->
<div class="flex flex-col p-4 items-center self-stretch">
    <h2 class="text-2xl text-center font-bold">Game Settings</h2>

    <!-- Game Settings -->
    <div class="flex flex-col items-center m-0 p-0">
        <!-- Remaining Guesses -->
        <div class="flex flex-row items-center mt-4">
            <!-- 0 remaining guesses means infinite guesses -->
            <input type="number" name="attempts" class="text-center w-24 mr-2 outline outline-blue-500" min="0" bind:value={$maxGuesses}>
            <!-- Hangman restricts players to a limited number of guesses -->
            <h3 class="text-center">guesses maximum</h3>
        </div>

        <!-- Category: It's up to the players to make sure their word belongs to the category -->
        <div class="flex flex-col mt-4">
            <h3 class="text-center">The category is</h3>
            <input type="text" name="category" class="uppercase text-center outline outline-blue-500 m-1" bind:value={$category}>
        </div>

        <!-- Word/phrase: 30 characters max is a bit arbitrary, 
            but it's included to limit players to guessable words/phrases -->
        <div class="flex flex-col mt-4">
            <h3 class="text-center">The secret word/phrase is</h3>
            <!-- Transform text to uppercase using CSS -->
            <input type="text" name="word-phrase" class="uppercase text-center outline outline-blue-500 m-1" maxlength="30" bind:value={$word}>
        </div>
    </div>

    <!-- Reset game, should only be enabled on gameOver -->
    <button class="bg-amber-700 outline outline-amber-900 rounded-none text-white mt-4 px-4 py-2 w-24" on:click={playGame}>Play</button>
</div>
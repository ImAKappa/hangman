<script lang="ts">
    import { gameOver, gameWon, word, maxGuesses, wrongGuesses } from './store';
    import { replaceAt, allIndicesOf } from './helper-funcs';

    /* GuessHandler */
    // Inits alphabet
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    // Raw $word may be a mix of upper and lower case, so we process $word for consistency
    $: wordProcessed = $word.toUpperCase();
    $: hiddenWord = wordProcessed.replaceAll(/[A-Z]/g, '_');

    const revealLetter = (letter: string):void => {
        // Find indices of letter in word
        let indices = allIndicesOf(letter, wordProcessed);
        // Replace underscores in hiddenWord, at those same indices, with letter
        for (let i of indices) {
            hiddenWord = replaceAt(i, hiddenWord, letter);
        }
        return;
    }

    // Keeps track of maxGuesses, remainingGuesses, wrongGuesses, currentGuess
    $: remainingGuesses = $maxGuesses;
    let guess = "";

    const guessedRight = (guess: string):void => {
        revealLetter(guess);
        // Check if players won the game - no underscores mean all letters were revealed
        if (hiddenWord.indexOf('_') === -1) {
            gameWon.set(true);
            setGameOver();
        }
        return;
    }

    const guessedWrong = (guess: string):void => {
        console.info("Wrong!");
        // Update users on wrong guesses
        wrongGuesses.update(wrongGuesses => [...wrongGuesses, guess]);
        // 0 maxGuesses means infinite guesses
        if ($maxGuesses === 0) return;
        // Update users on how many remaining guesses
        remainingGuesses -= 1;
        // Check if players lost the game
        if (remainingGuesses <= 0) {
            gameWon.set(false);
            setGameOver();
        }
        return;
    }

    const checkGuess = (event: Event):void => {
        // Letters are stored as the button text
        guess = (event.currentTarget as HTMLButtonElement).innerText;
        console.log("checkGuess:", {guess});

        if (wordProcessed.includes(guess)) {
            guessedRight(guess);
        } else {
            guessedWrong(guess);
        }

        // Prevent player from guessing same letter again
        const node = event.currentTarget as HTMLButtonElement;
        // NOTE: Puts `disabled` button state out of sync with $gameOver! (Addressed in GameMenu.svelte) 
        node.disabled = true;
        return;
    }

    /**
     * For now the setGameOver function just modifies the gameOver variable,
     * so it seems unnecessary to have the function in the first place.
     * But later on I might want to dispatch events when the game is over. Who knows.
    */
    const setGameOver = ():void => {
        gameOver.set(true);
        console.log({$gameOver, $gameWon});
        return;
    }
</script>

<div class="flex flex-col items-center">
    <!-- Hidden Word/phrase 
        All (English) letters are hidden, but punctuation and numbers are shown
    -->
    <div>
        <h3 class="text-center font-bold my-2">Word/Phrase:</h3>
        <p class="text-center indent-[1em] tracking-[1em]">{hiddenWord}</p>
    </div>

    <!-- Wrong guesses -->
    <div>
        <h3 class="text-center font-bold my-2">Wrong guesses</h3>
        <p class="text-center">{$wrongGuesses}</p>
    </div>

    <!-- Remaining guesses -->
    <div>
        <h3 class="text-center font-bold my-2">Remaining Guesses</h3>
        <p class="text-center">{remainingGuesses}</p>
    </div>

    <!-- Next guess -->
    <div class="flex flex-col items-center">
        <h3 class="font-bold my-2">Next guess</h3>
        <!-- TODO: Convert to flex box to center-align dangling letters in last row -->
        <div class="grid grid-cols-8 gap-1"> 
        {#each alphabet as letter}
        <!-- User can only guess same letter once -->
        <button class="bg-amber-700 outline outline-amber-900 rounded-none text-white m-1 p-1 disabled:opacity-50" disabled={$gameOver} on:click={checkGuess}>{letter}</button>
        {/each}
        </div>
    </div>
</div>

<!-- <style>
    p.word-phrase {
        letter-spacing: 1.0em;
        word-spacing: 1em;
    }
</style> -->
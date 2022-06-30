<script lang="ts">
  import { gameOver, gameWon, gameMenu, category} from "./lib/store";
  import GameMenu from "./lib/GameMenu.svelte";
  import GuessHandler from "./lib/GuessHandler.svelte";
</script>

<main>
    <h1>Hangman</h1>
    <!-- The app should only ever be in Menu mode or Game (Guessing) mode -->
    {#if $gameMenu}
        <!-- Game Menu -->
        <GameMenu />
    {:else}
        <!-- Game -->
        <h2>Game</h2>
        <!-- Tell player if they won or lost -->
        {#if $gameOver}
            <p>You {$gameWon ? 'Won' : 'Lost'}!</p>
            <!-- Back to menu -->
            <button class="play-again" on:click="{() => gameMenu.set(true)}">Play Again</button>
        {/if}

        <!-- Show Players the category -->
        <h3>Category</h3>
        <p class="category">{$category}</p>

        <!-- Simulation of hangman with ragdoll physics and boxes -->
        <!-- <canvas class="hangman"></canvas> -->

        <!-- Core gameplay logic -->
        <GuessHandler />
    {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

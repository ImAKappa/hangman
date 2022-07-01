<script lang="ts">
    import "./app.css";
    import { gameOver, gameWon, gameMenu, category} from "./lib/store";
    import GameMenu from "./lib/GameMenu.svelte";
    import GuessHandler from "./lib/GuessHandler.svelte";
</script>

<main>
    <div class="bg-amber-900 p-0.5">
        <h1 class="my-4 text-3xl font-bold text-center">Hangman</h1>
    </div>
    <!-- The app should only ever be in Menu mode or Game (Guessing) mode -->
    {#if $gameMenu}
        <!-- Game Menu -->
        <GameMenu />
    {:else}
        <!-- Game -->
        <div class="flex flex-col items-center m-0 p-0">
            <!-- GameOver: Tell player if they won or lost -->
            {#if $gameOver}
            <div class="outline outline-blue-500">
                <p>You {$gameWon ? 'Won' : 'Lost'}!</p>
                <!-- Back to menu -->
                <button class="bg-amber-700 outline outline-amber-900 rounded-none text-white mt-4 px-4 py-2 w-24" on:click="{() => gameMenu.set(true)}">Play Again</button>
            </div>
            {/if}

            <!-- Show Players the category -->
            <div class="my-4">
                <h3 class="font-bold text-center">Category</h3>
                <p class="text-center uppercase">{$category}</p>
            </div>

            <!-- Simulation of hangman with ragdoll physics and boxes -->
            <!-- <canvas class="hangman"></canvas> -->

            <!-- Core gameplay logic -->
            <GuessHandler />
        </div>
    {/if}
</main>

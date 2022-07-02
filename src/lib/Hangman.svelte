<script lang="ts">
    import Matter from 'matter-js';
    import { onMount } from 'svelte';
    import { newRagdoll } from './ragdoll';

    let sceneElement;

    onMount(() => {
        createScene();
    });

    const newGallows = (x: number, y: number, sceneWidth: number, sceneHeight: number) => {
        const thiccness = 10;
        let verticalPost = Matter.Bodies.rectangle(x, y, thiccness, sceneHeight, {
            label: 'gallows-vertical-post',
            isStatic: true,
            render: {
                fillStyle: '#030303',
            }
        });
        let horizontalPost = Matter.Bodies.rectangle(x + (sceneWidth / 4), y  - (sceneHeight / 2), sceneWidth / 2 + thiccness, thiccness, {
            label: 'gallows-horizontal-post',
            isStatic: true,
            render: {
                fillStyle: '#030303',
            }
        });
        let dangle = Matter.Bodies.rectangle(x + (sceneWidth / 2), y + thiccness - (sceneHeight / 2), thiccness, thiccness, {
            label: 'gallows-dangle',
            isStatic: true,
            render: {
                fillStyle: '#030303',
            }
        });
        return [verticalPost, horizontalPost, dangle];
    }

    /**
     * Based on Matter js tutorial: https://github.com/liabru/matter-js/wiki/Getting-started#usage-example=
     */
    function createScene() {
        // check if DOM mounted
        console.log(sceneElement);

        // module alias
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let Runner = Matter.Runner;
        let Bodies = Matter.Bodies;
        let Composite = Matter.Composite;

        // create engine
        let engine = Engine.create();
        
        // create renderer
        const sceneWidth = 300;
        const sceneHeight = 250;
        let render = Render.create({
            element: sceneElement,
            engine: engine,
            options: {
                width: sceneWidth,
                height: sceneHeight,
                showAngleIndicator: true,
                pixelRatio: 1,
                background: 'rgba(0, 0, 0, 0)',
                hasBounds: false,
                wireframes: false,
                showSleeping: true,
            },
        });

        // gallows
        // let gallows = newGallows(0, sceneHeight / 2, sceneWidth, sceneHeight);
        // Composite.add(engine.world, gallows);

        Composite.add(engine.world, [newRagdoll(sceneWidth / 2, 0, 1.0)]);

        // create two boxes and a ground
        // let boxA = Bodies.rectangle(sceneWidth / 2, sceneHeight - 300, 40, 40);
        // let boxB = Bodies.rectangle(sceneWidth / 2, sceneHeight - 150, 40, 40);
        let ground = Bodies.rectangle(sceneWidth, sceneHeight, sceneWidth * 2, 10, { isStatic: true});

        // // add all of the bodies to the world
        Composite.add(engine.world, [ground]);

        // run the render
        Render.run(render);

        // create runner
        let runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    }
</script>

<div class="flex justify-center">
    <div  class="matter-js" bind:this={sceneElement}></div>
</div>
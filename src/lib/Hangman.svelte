<script>
    import Matter from 'matter-js';
    import { onMount } from 'svelte';

    let sceneElement;

    onMount(() => {
        createScene();
    });

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
        let sceneWidth = 300;
        let sceneHeight = 200;
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

        // create two boxes and a ground
        let boxA = Bodies.rectangle(sceneWidth / 2, sceneHeight - 300, 40, 40);
        let boxB = Bodies.rectangle(sceneWidth / 2, sceneHeight - 150, 40, 40);
        let ground = Bodies.rectangle(sceneWidth, sceneHeight, 810, 60, { isStatic: true});

        // add all of the bodies to the world
        Composite.add(engine.world, [boxA, boxB, ground]);

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
// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    background: "#fbfbfb"
  }
});

// create the fat boi
var fat_boi = Bodies.circle(window.innerWidth / 200, window.innerHeight / 1.5, 140, {
  render: {
    sprite: {
      texture: "./fat_boi.png",
      xScale: 0.7,
      yScale: 0.7,
    }
  },
});

fat_boi.friction = 1

// set size
render.canvas.height = window.innerHeight - window.innerHeight * 0.02;
render.canvas.width = window.innerWidth - window.innerWidth * 0.02;

// create the ground
var ground = Bodies.rectangle(
  100,
  (window.innerHeight / 10) * 9,
  render.canvas.width * 2,
  300,
  {
    isStatic: true,
    render: {
      fillStyle: "white",
      strokeStyle: 'black',
      lineWidth: 3
    }
  }
);

// add all of the bodies to the world
World.add(engine.world, [fat_boi, ground]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

World.add(engine.world, mouseConstraint);
render.mouse = mouse;

engine.world.gravity.x = .6
engine.world.gravity.y = 1

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

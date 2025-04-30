// Import Matter.js parts we need
const { Engine, World, Bodies } = Matter;

// Variables for physics engine and world
let engine;
let world;

// Variable for the ground body
let ground;

// List of words that will randomly fall
let words = [

  "APPLY TO JOBS",
  "MEDITATE",
  "REFINE PORTFOLIO",
  "WORKOUT",
  "YOGA",
  "HEALTHY FOOD",
  "WRITE MY WEEKLY SUBSTACK",
  "LEARN CODING",
  "MASTER AI TOOLS",
  "THERAPHY",
  "UPDATE MY PORTFOLIO",
  "START SIDE PROJECT",
  "FACETIME SHIVANI",
  "FACETIME PIA",
  "POST ON INSTAGRAM",
  "FINISH BOOK",
  "TRACK MY PROTEIN",
  "10K STEPS",
  "BREATH",

];

let font; // (Correct lowercase)

let fallingWords = []; // Array to store falling words

function preload() {
  font = loadFont("ITC Avant Garde Gothic Bold Condensed.otf");
}


let palette = [
  "#94B6EF",
  "#7AA590",
  "#0B3B39",
  "#C4B045",
  "#BF0200",
  "#8E1B52",
  "#F2A3CF",
  "#A584AC",
  
];





function setup() {
  createCanvas(1080, 600);
  textFont(font);

  // Setup Matter.js engine
  engine = Engine.create();
  world = engine.world;

  // Create static ground
  let options = {
    isStatic: true,
    friction: 1 // Optional: add ground friction
  };
  ground = Bodies.rectangle(width / 2, height - 10, width, 20, options);
  World.add(world, ground);
}

function draw() {
  background(255);
  Engine.update(engine);

  // Draw ground
  fill(255);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20);

  // Add a new word every 40 frames
  if (frameCount % 40 === 0) {
    let w = new FallingWord(random(width), -30);
    fallingWords.push(w);
  }

  // Show and update all falling words
  for (let i = fallingWords.length - 1; i >= 0; i--) {
    let fw = fallingWords[i];
    fw.show();

    // Remove fully faded words
    if (fw.opacity <= 0) {
      World.remove(world, fw.body);
      fallingWords.splice(i, 1);
    }
  }
}

// ------ FALLING WORD CLASS ------
class FallingWord {
  constructor(x, y) {
    this.text = random(words);

    textSize(30);
    let w = textWidth(this.text) + 10;
    let h = 30;

    let options = {
      restitution: 0.5, // Bounciness
      friction: 0.5,
      density: 0.001,
      frictionAir: 0.001
    };

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.color = color(random(palette));
    this.opacity = 255; // Start fully visible

    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(red(this.color), green(this.color), blue(this.color), this.opacity);
    noStroke();
    text(this.text, 0, 0);
    pop();

    // Fade out gradually
    this.opacity -= 0.4;
    this.opacity = max(0, this.opacity);
  }
}

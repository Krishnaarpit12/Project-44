//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas;
//create a sonic sprite
var sonic, s1, sf;
var backimg;
//create a ground sprite
var ground ;
//invisible Ground to support sonic
var invisibleGround ;
//create Obstacle Group
var ObstaclesGroup;
var ob;
var g, r;
//place gameOver and restart icon on the screen
var gameOver;
var restart;
//score
var count = 0;
//sounds
var sbong, scheckpoint, sgame, sdash;

function preload(){
  //Animation 
  s1 = loadAnimation("images/sonic.png", "images/runningw.png");
  //Images
  ob = loadImage("images/ob.png");
  sf = loadImage("images/sonic_falling.png");
  backimg = loadImage("images/sonic_bg.jpg");
  g = loadImage("images/s2.jpg");
  r = loadImage("images/s3.jpg");

  //Sounds
  sbong = loadSound("sounds/bong.mp3");
  scheckpoint = loadSound("sounds/checkpoint.mp3");
  sgame = loadSound("sounds/continue.mp3");
  sdash = loadSound("sounds/sonicdash.mp3");
}

function setup(){
  canvas =  createCanvas(800,400)

  sonic = createSprite(100,305,20,50);
  sonic.addAnimation("sonicisrunning", s1);
  sonic.addAnimation("collided", sf);
  sonic.scale = 0.3;
  sonic.setCollider("circle",0,0,250);
 
  ground = createSprite(400,330,800,20);
  ground.visible = false;

  invisibleGround = createSprite(400,335,800,5);
  invisibleGround.visible = false;

  ObstaclesGroup = new Group();
  
  gameOver = createSprite(400,100);
  restart = createSprite(400,250);
  
  gameOver.addImage(g);
  gameOver.scale = 0.7;
  
  restart.addImage(r);
  //restart.scale = 0.5;

  
  gameOver.visible = false;
  restart.visible = false;

  
  //set text
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);

  
}

function draw() {
  //set background to white
  background(backimg);

  strokeWeight(2);
  stroke("red")
  //display score
  text("Score: "+ count, 600, 100);
  
  
  //add gravity
 sonic.velocityY = sonic.velocityY + 0.8;

  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //scoring
    count = count + 1;
 
    text("Press Space Bar To Jump And Right Arrow to Dash And Left To Come Back", 50, 370);

    if (count>0 && count%100 === 0){
     //play sound
     scheckpoint.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") || keyDown("up")){
      sonic.velocityY = -12 ;
    }
    if(keyDown("right")){
      sonic.x = sonic.x + 10;
    }
    if(keyDown("left")){
      sonic.x = sonic.x - 10;
    }
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when sonic is touching the obstacle
    if(ObstaclesGroup.isTouching(sonic)){
      //play sound
      sbong.play();
      gameState = END;     
    }
  }
  
  else if(gameState === END) {
    
    gameOver.visible = true;
    restart.visible = true;
   


    strokeWeight(2);
    fill("blue");
    text("Click on FOR HIRE to restart", 300, 370);
    //set velcity of each game object to 0
    ground.velocityX = 0;

    sonic.velocityY = 0;

    ObstaclesGroup.setVelocityXEach(0);
    
    //change the sonic animation
   sonic.changeAnimation("collided", sf);
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
  
  } 
    
  
  
  if(mousePressedOver(restart)) {
    //Play sound
    sgame.play();

    reset();
  }
  //stop sonic from falling down
  sonic.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
 
 
  sonic.changeAnimation("sonicisrunning", s1);
  sonic.scale = 0.3;
  count = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,300,10,40);
    obstacle.velocityX = -6;
    obstacle.setCollider("circle",0,0,90);
    obstacle.addImage(ob);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 134;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}





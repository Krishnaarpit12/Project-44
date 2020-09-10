//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas;

//create a sonic sprite
var sonic, si; 


//create a ground sprite
var ground ;

//invisible Ground to support sonic
var invisibleGround ;

//create Obstacle Group
var ObstaclesGroup;


//place gameOver and restart icon on the screen
var gameOver;
var restart;
//score
var count = 0;
function preload(){
  si = loadAnimation("images/sonic.png","images/sonic1.png");


}

function setup(){
  canvas =  createCanvas(800,400)

  

  sonic = createSprite(300,350,20,50);
  
  sonic.addAnimation("sonicrunning", si);
 //sonic.scale = 0.5;

  ground = createSprite(400,355,800,20);
  //ground.x = ground.width /2;

  invisibleGround = createSprite(400,350,800,5);
  invisibleGround.visible = true;

  ObstaclesGroup = new Group();
  
  gameOver = createSprite(400,200);
  restart = createSprite(400,250);
  
  //gameOver.setAnimation("gameOver");
  //gameOver.scale = 0.5;
  
  //restart.setAnimation("restart");
  //restart.scale = 0.5;

  
  gameOver.visible = false;
  restart.visible = false;

  
  

  //set text
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);

  
}
//scale and position the sonic

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 450, 100);

  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //scoring
    count = count + 1;
    
    if (count>0 && count%100 === 0){
     //play sound
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
       
    //add gravity
    sonic.velocityY = sonic.velocityY + 0.5;
    
   
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when sonic is touching the obstacle
    if(ObstaclesGroup.isTouching(sonic)){
      //play sound
      gameState = END;
      //play sound
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;

    sonic.velocityY = 0;

    ObstaclesGroup.setVelocityXEach(0);
    
    
    //change the sonic animation

    //sonic.setAnimation("sonic_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
  
  } 
    
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(sonic.y);
  
  //stop sonic from falling down
  sonic.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
 
  //animation
 // sonic.setAnimation("sonic");
  
  count = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = random(1,6);
    //animation
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    obstacle.lifetime = 134;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}





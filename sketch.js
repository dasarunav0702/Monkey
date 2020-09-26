var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkry_collider;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var restart,restart_img,gameover,gameover_img;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collider= loadAnimation("collided.png");
  restart_img= loadImage("restart.png");
  gameover_img= loadImage("gameOver.png");
}



function setup() {
  createCanvas(400, 400);
  monkey=createSprite(80,315,20,20);
  
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collider);
  monkey.scale=0.1;
  ground=createSprite(400,350,900,10);
  
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(200,360,400,10);
  invisibleGround.visible = false;
  
  score=0;
  survivalTime=0;
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  //monkey.debug=true;
  monkey.setCollider("circle",0,0,300);
  
  restart= createSprite(200,200,10,10);
  restart.addImage(restart_img);
  restart.scale=0.5;
  restart.visible=false; 
  
  gameover= createSprite(200,230,10,10);
  gameover.addImage(gameover_img);
  gameover.scale=0.5;
  gameover.visible=false;
}
 

function draw() {
  background("white");
  survivalTime=survivalTime+ Math.round(getFrameRate()/60);
  
  if (gameState===PLAY){
    if(keyDown("space")){
      
    monkey.velocityY=-15;
  }
  monkey.velocityY=monkey.velocityY+1;
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    Banana();
    Obstacle();
    if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
  }console.log(monkey.y);
    
  
 
  if (monkey.isTouching(obstacleGroup)){
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     gameState=END;
  }
  }
  else if(gameState===END){
     ground.velocityX=0;
     FoodGroup.setVelocityXEach=0;
     obstacleGroup.setVelocityXEach=0;
     restart.visible=true;
     gameover.visible=true;
     ground.visible=false;
     monkey.visible=false;
     score=0;
     survivalTime=0;
    monkey.changeAnimation("collided",monkey_collider);
    if (mousePressedOver(restart)){
      Reset(); 
   }
  } 

  
  
  
 
  
  monkey.collide(ground);
  
  drawSprites();
  text("Score: "+score,330,50);
  text("SurvivalTime : "+survivalTime,300,30);
}
function Banana(){
  if (frameCount % 60 === 0) {
  banana=createSprite(400,200,20,20)
  banana.addImage(bananaImage);
  banana.velocityX=-8;
  banana.scale=0.1;
  banana.y = Math.round(random(80,250));
  FoodGroup.add(banana);
  }
  
}
function Obstacle(){
  if (frameCount%80===0){
  obstacle= createSprite(400,310,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-5;
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
  }
}
function Reset(){
    monkey.changeAnimation("moving",monkey_running);
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
    survivalTime=0;
    gameState=PLAY;
    restart.visible=false;
    gameover.visible=false;
    ground.visible=true;
    monkey.visible=true;
    
}




var player;
var cutter;
var trees;
var bullet;

var ground;
var cutterGroup;
var bulletGroup;
var treesGroup;

var playerImg;
var backgroundImg;
var bulletImg;
var treeImg;

var cutterImg;
var bulletImg;
var score;

var bg;

var invisibleground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restart;



function preload(){
  playerImg = loadImage("player.png.png");
 bgImg = loadImage("background1.png");
treeImg = loadImage("tree.png.png");
cutterImg = loadImage("woodcutter1 (2).png");
bulletImg = loadImage("bulletimg.png.png");



}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  player = createSprite(100,height-70,40,40);
  player.addImage(playerImg);
  player.scale = 0.08;
  
  score = 0;
  
   
  bg = createSprite(400,200,800,400);
  bg.addImage(bgImg);
  bg.x = bg.width/2;
  bg.scale = 2;

  cutterGroup = createGroup();
  bulletGroup = createGroup();
  treesGroup = createGroup();
invisibleground = createSprite(width,height,800,15);

restart = createSprite(250,200);

restart.visible = false;
}

function draw() {
  background("white"); 
  
 if(gameState===PLAY){
 

 

if (bg.x < 0){
  bg.x = bg.width/2;
}  

if(bulletGroup.isTouching(cutterGroup)){
  cutterGroup.destroyEach();
  bulletGroup.destroyEach();
  score = score + 50;
}
if(keyDown(RIGHT_ARROW)){
  changePosition(2,0);
}
if(keyDown(DOWN_ARROW)){
 changePosition(0,2);
}
if(keyDown(LEFT_ARROW)){
changePosition(-2,0);
}
if(keyDown("space")){
  createBullet();
}
if(cutterGroup.isTouching(player)){
  score = score - 30;
}

spawncutters();
spawntrees();

if(cutterGroup.collide(player)){
    gameState = END;

}
else if(gameState===END){

  restart.visible = true;
  treesGroup.destroyEach();

  
  
  cutterGroup.setVelocityXEach(0);
  treesGroup.setVelocityXEach(0);

  cutterGroup.setLifetimeEach(-1);
  treesGroup.setLifetimeEach(-1);


  if(mousePressedOver(restart)) {
    reset();
  }
}

}
 
 
  player.depth = bg.depth;
  player.depth = player.depth + 1;

  player.collide(cutterGroup);
  player.collide(invisibleground);
  drawSprites();
  text("Score: "+ score, width-400,height-700);
  score = score + Math.round(getFrameRate()/60);
  
}
function changePosition(x,y){
   player.x = player.x + x; 
   player.y = player.y + y;
}
function createBullet(){
  bullet = createSprite(player.x,player.y,10,5);
 bullet.addImage(bulletImg);
 bullet.scale = 0.1;
 bullet.velocityX = 8;
 bulletGroup.add(bullet);
}

function spawncutters(){
  if(World.frameCount % 120 == 0){
    var cutter = createSprite(random(400,700),height-75,40,40);
    cutter.addImage(cutterImg);
    cutter.scale = 0.11;
    cutter.velocityX = -4;
    cutter.lifetime = 200;
    cutterGroup.add(cutter);
   }
}

  function spawntrees(){
    if(World.frameCount % 30 == 0){
      var trees = createSprite(random(400,700),height-110,10,70);
      trees.addImage(treeImg);
      trees.scale = 0.7;
      trees.velocityX = -4;
      trees.lifetime = 200;
      treesGroup.add(trees);
    }
  
}

function reset(){
  gameState = PLAY;
  
  restart.visible = false;
  
  cutterGroup.destroyEach();
  treesGroup.destroyEach();
  
 score = 0;
  
}
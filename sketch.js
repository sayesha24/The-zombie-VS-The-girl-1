//to declare the variables 
var girl, girl1, girl_collided;
var ground; 
var girlScore, zombieScore;
var castle, castle1, castle2, castle3; 
var zombie, zombie1, zombie_collided; 
//var bow, bow1;
var zombie2, smallZombie, zombie2Group;
var obstacle, obstacleGroup; 
var rock1, rock2, rock3; 
var hit;
//var gamestate= "start";
var gamestate= "start";
//var gamestate= "end";
//var arrow, arrow1;
var skull
var skull_image, skullGroup;
var replay, replay1;

function preload(){

  //to load images and animations 
  girl1= loadAnimation("Screenshot_2021-01-31_at_7.19.40_PM-removebg-preview.png", "running image 2.png", "running_image_3.png", "running_image_4.png", "running_image_5.png");
  
   zombie1= loadAnimation("zombie_1-removebg-preview.png", "zombie_2-removebg-preview.png", "zombie_3_-removebg-preview.png", "zombie_4-removebg-preview.png", "zombie_5-removebg-preview.png", "zombie_6-removebg-preview.png", "zombie_7_-removebg-preview.png");

    zombie_collided= loadImage("zombie_1-removebg-preview.png");

    rock1= loadImage("obstacle 1.png");
    rock2= loadImage("obstacle 2.png");
    rock3= loadImage("obstacle 3.png");

    skull_image= loadImage("skull_for_game_-removebg-preview.png");

    castle1= loadImage("background image -1.jpg");

    girl_collided= loadImage("Screenshot_2021-01-31_at_7.19.40_PM-removebg-preview.png")

    smallZombie= loadImage("small_zombie-removebg-preview.png");

    //bow1= loadImage("bow image 1.png");

   // arrow1=loadImage("arrow_image-removebg-preview.png");

    replay1= loadImage("replay_-removebg-preview.png");

    castle2= loadImage("background 2.jpg");

    castle3= loadImage("background 3.jpg");
  }

  function setup() {

  //to create the canvas
  createCanvas(800, 600);

  //to create the zombie and the girl score 
  zombieScore= 0; 
  girlScore= 0;

  //to create the castle
  castle= createSprite(400, 300, 800, 600);
  castle.addImage(castle1);
  castle.scale= 2.2;
  castle.velocityX= -(2 + 3* girlScore/100);

  //to create the obstacle and skull group
  obstacleGroup= new Group();
  skullGroup= new Group();

  //to create the girl
  girl= createSprite(230, 500, 10, 10);
  girl.addAnimation("moving", girl1);
  girl.addAnimation("collided", girl_collided);
  girl.scale= 1.3;

  //to create the ground 
  ground= createSprite(10, 600, 800, 70);
   ground.velocityX= -2;
  //girl.debug= true;
    girl.setCollider("rectangle", 1, 1, 80, 100);

  //to create the zombie  
  zombie= createSprite(80, 510, 10, 10);
  zombie.addAnimation("moving", zombie1);
  zombie.addAnimation("collided", zombie_collided);
  zombie.scale= 2;
  zombie.setCollider("rectangle", 3, 1, 70, 100);

  //to enable the replay option  
  replay= createSprite(400, 330);
  replay.addImage(replay1);
  replay.scale= 1;


  }

  function draw () {


  //to set the background color  
  background(220);

  //to change the background image 
  if(frameCount% 600 === 0){

    var rand= Math.round(random(1,2));

      switch (rand){

        case 1: castle.addImage(castle2);
        break; 

        case 2: castle.addImage(castle1);
        break;
        default: break; 
      }

  }
  //to add some properties to the ground 
    ground.x= ground.width/2;
    ground.visible= false;

  //to make things collide with eachother
  girl.collide(ground);
  zombie.collide(ground);
  obstacleGroup.collide(girl);
  obstacleGroup.collide(ground);

  //to add gravity   
  zombie.velocityY= zombie.velocityY + 0.5;   girl.velocityY = girl.velocityY + 0.5;


  //to make the background image infinite/ repetitive  
   if(castle.x < 120){

   castle.x= castle.width/2; 
  }


  //to increase the score of the girl and the zombie  
    if(girl.isTouching(skullGroup)){

      skullGroup.destroyEach();
      girlScore= girlScore + 1;
    }

  if(zombie.isTouching(skullGroup)){

      skullGroup.destroyEach();
      zombieScore= zombieScore + 1;
    }


  //to display the sprites  
   drawSprites(); 

  //to add properties and functions to the gamestates 
    if(gamestate==="start"){

  //to set the score to 0
    girlScore= 0;
    zombieScore= 0;
    replay.visible= false;

      zombie.x= 80;

  //to show the rules
      fill("yellow");
      textSize(17);

      text("ROLE: YOU ARE THE GIRL AND YOU ARE WILLING TO DEFEND YOURSELF FROM THE ZOMBIE", 20, 270);

      text("GOAL: TO COLLECT AS MANY SKULLS AS POSSIBLE", 200, 300 );

      text("RULES: PRESS THE UP ARROW TO MAKE THE GIRL JUMP ", 200, 330);

      fill("red");
      textSize(20);

    text("PRESS SPACE TO BEGIN", 250, 200);

  //to change to gamestate play
  if(keyDown("SPACE")){

    gamestate= "play";
  }
  }


  if(gamestate=== "play"){

    //to make the girl jump  
       if(keyDown("UP_ARROW")&&(girl.y > 420)){

      girl.velocityY= -13;
       }
    castle.velocityX= -2;
    zombie.x= 80;
    girl.changeAnimation("moving", girl1);
    zombie.changeAnimation("moving", zombie1);
  //to show texts at different situations
    fill("red");
    textSize(20);

    if(girlScore - zombieScore === 2){

      text("I am coming closer to you - Zombie", 200, 250);
    }
      if(girlScore% 5 === 0 && girlScore > 1){

      text("WOHOO YOU HAVE COLLECTED " + girlScore, 200, 270);
    }

    if(zombieScore > girlScore){

      text("come on champ, you can defeat the zombie", 200, 200);
    }
     replay.visible= false;

  //to make the zombie jump    
      if(obstacleGroup.isTouching(zombie)){

      zombie.velocityY= -13;
    }
      Skulls();
      obstacles();

  //to change to gamestate end 
  if(girl.isTouching(obstacleGroup)){

  gamestate= "end";

  }
  }

    if(gamestate=== "end"){

  //to set the velocity
  ground.velocityX= 0; 
  obstacleGroup.setVelocityEach(0);
  castle.velocityX= 0;

  //to destroy   
  obstacleGroup.destroyEach();
  skullGroup.destroyEach();

      zombie.x= 215;

    replay.visible= true;

  //to change to gamestate start
  if(mousePressedOver(replay)){

        gamestate= "start";
      }

  //to change the animations   
  girl.changeAnimation("collided", girl_collided); 

  zombie.changeAnimation("collided", zombie_collided);

  //to show the text    
  fill("red");
  textSize(20);

  text("YOU GOT CAUGHT BY THE ZOMBIE", 200, 200);

  //to set the score to 0
  zombieScore= 0; 
  girlScore= 0;

  }

  //to display the scores 
    fill("red");
    textSize(20);

     text("girl's score: " + girlScore, 500, 50);
    text("zombie's score: "+ zombieScore, 70, 50);



  }


  //to create a function for the obstacles 
  function obstacles(){

  //to create the obstacles 
    if(frameCount% 140 === 0){

      obstacle= createSprite(500, 560);

  //to change the image of the obstacles
      var rand= Math.round(random(1,2));

      switch (rand){

        case 1: obstacle.addImage(rock1);
        break;

        case 2: obstacle.addImage(rock2);
        break; 

        case 3: obstacle.addImage(rock3);
        break;

        default: break;

      }
//to set properties to the obstacle
obstacle.velocityX= -(5 + 3* girlScore/100);
      
obstacle.scale= 0.7;
      obstacle.lifetime= 150;

  //to add the obstacles to the group
   obstacleGroup.add(obstacle);




    }


  }

  //to create a function for the skulls
  function Skulls(){

  //to create skulls  
    if(frameCount% 100===0){

      skull= createSprite(50, 200, 50, 50);
      skull.x= Math.round(random(200, 500));
      skull.y= Math.round(random(100, 400));
      skull.addImage(skull_image);

  //to add properties to the skull
    skull.scale= 0.2;
    skull.velocityX= -(3 + 3* girlScore/100);
    skull.lifetime= 300;

  //to add skull to its group
  skullGroup.add(skull);

    }


  }




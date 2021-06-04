var dog, happydog;
var foodS, foodStock;
var database;
var dogImage1,dogImage2;
var lastFed,foodStock;
var foodObj;

function preload()
{
	dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
}

function setup() {
	database = firebase.database();
  createCanvas(800, 800);
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImage1);
  dog.scale = 0.15;

  foodObj = new Food();

  button1 = createButton("Add Food");
  button1.position(700,95);
  button1.mousePressed(addFoods);

  button2 = createButton("Feed Food");
  button2.position(800,95);
  button2.mousePressed(FeedDog);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val();
  });
  fill(255,255,254);
  text(15);
  if (lastFed>=12) {
    text("LastFed :"+ lastFed%12 + "PM" ,350,30);
  }else if(lastFed == 0){
   text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }
  
  foodObj.show();

  drawSprites();
  textSize(30);
  text("reamianing Food " + foodS,100,100)
}

function readStock(data){
  foodS=data.val();
}

function writestock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  }
      )
}

 function FeedDog(){
   dog.addImage(dogImage1);

   foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime:hour()
   })
 }

 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }
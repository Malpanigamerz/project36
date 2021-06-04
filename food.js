class Food{
    constructor(){
    this.Image = loadImage("images/Milkbottle.png");
    this.lastFed;
    this.foodStock = 0;
    }
    show(){
    var x=80,y=100;

    imageMode(CENTER);
    image(this.Image,720,220,70,70)

    if(this.foodStock!=0) {
      for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
             x=80;
             y=y+50; 
          }
          image(this.Image,x,y,50,50)
          x=x+30;
      }
     }
    }
    
    getFoodStock(){
     return this.foodStock;
    }

    updateFoodStock(foodStock){
     this.foodStock = foodStock;
    }

    deductFood(){
    if(this.foodStock > 0){
        thhi.foodStock = this.foodStock = -1;
    }
    }
    
}
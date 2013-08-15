
 /*
  * Food Generation
  */
var foodGenerator = function(){
  // misc, vegetables, meats, grains, garbage
  this.ingredientList = [["Cheese", "Milk", "Sauce", "Spices"],
                         ["Carrot", "Tomato", "Potato", "Pumpkin"],
						 ["Turkey Leg", "Chicken", "Fish", "Pork"],
						 ["Pie", "Bread", "Tortilla", "Watermelon"],
						 ["Boot", "Plate", "Can", "Knife"]];
};

foodGenerator.prototype.init = function(){
  this.clock = new THREE.Clock(true);
  this.lastFruit = this.clock.getElapsedTime();
  this.foodArray = new Array();
};

foodGenerator.prototype.newOrder = function(){
 //cheer each time an order is made
  this.song = $('#yay')[0];
  this.song.loop = false;
  this.song.play();
  
  this.order = [[this.ingredientList[0][Math.floor(Math.random()*3)], Math.ceil(Math.random()*3)],
                [this.ingredientList[1][Math.floor(Math.random()*3)], Math.ceil(Math.random()*5)],
				[this.ingredientList[2][Math.floor(Math.random()*3)], Math.ceil(Math.random()*3)],
				[this.ingredientList[3][Math.floor(Math.random()*3)], Math.ceil(Math.random()*3)]];
  return this.order;
}

foodGenerator.prototype.update = function(){
  if((this.clock.getElapsedTime() - this.lastFruit) > .08){
    this.lastFruit = this.clock.getElapsedTime();
	this.newFood = new Food(Math.floor(Math.random()*19));
	this.foodArray.push(this.newFood);
	this.newFood.init();
  }
};
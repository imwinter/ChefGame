
 /*
  * Food Generation
  */
var foodGenerator = function(){
};

foodGenerator.prototype.init = function(){
  this.clock = new THREE.Clock(true);
  this.lastFruit = this.clock.getElapsedTime();
  this.foodArray = new Array();
};

//foodGenerator.prototype.createFruit = function(){
  
//};

foodGenerator.prototype.update = function(){
 // console.log(" Food gen update " + this.clock.getElapsedTime() + " " + this.lastFruit);
  if((this.clock.getElapsedTime() - this.lastFruit) > .08){
    this.lastFruit = this.clock.getElapsedTime();
	this.newFood = new Food(Math.floor(Math.random()*3));
	this.foodArray.push(this.newFood);
	this.newFood.init();
  }
};
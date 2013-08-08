/*
 * File for making food objects
 */
 
// Create Food Class
var Food = function(foodID){
  this.type = foodID; 
  this.figure = null;
  this.gravity = 4;
};


// Initialize the food
Food.prototype.init = function(){
   var that = this;
  /* 
   * Import Models
   * Made by Matt Scorca and Ian Winter
   */
   
  this.figure = null;
  var jsonLoader = new THREE.JSONLoader();
  switch(this.type){
    case 0: 
      jsonLoader.load('models/carrot.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(5, 5, 5);
	    that.figure.position.x = 250;
	    that.figure.position.y = 150 - (50 * Math.random());
		that.figure.type = 0;
        game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 1:
      jsonLoader.load('models/tomato.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(5, 5, 5);
	    that.figure.position.x = 250;
	    that.figure.position.y = 150 - (50 * Math.random());
        that.figure.type = 1;
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
    case 2:
      jsonLoader.load('models/plate.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(5, 5, 5);
		that.figure.rotation.y = .8;
	    that.figure.position.x = 250;
		that.figure.type = 2;
	    that.figure.position.y = 150 - (50 * Math.random());
        game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;	
  }
};

Food.prototype.update = function(t){
  if(this.figure && this.figure.position.x > -250){
    this.figure.position.x -= 4;
    this.gravity -= .075;
	this.figure.position.y += this.gravity; 
	this.figure.rotation.z += Math.random()*.1+.02;
  }
  else if(this.figure){
	//console.log(game.panes[game.panes.length - 1].foodGen.foodArray);
    game.panes[game.panes.length - 1].scene.remove(this.figure);
	game.panes[game.panes.length - 1].foodGen.foodArray.splice(game.panes[game.panes.length - 1].foodGen.foodArray.indexOf(this.figure)+1, 1);
	this.figure = null;
  }
};
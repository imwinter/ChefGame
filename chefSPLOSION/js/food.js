// instructions, lose state with panes, double sided models
// explosions, fire


/*
 * File for making food objects
 */
 
// Create Food Class
var Food = function(foodID){
  this.type = foodID; 
  this.figure = null;
  this.velocity = 5;
  this.gravity = .051 + ((Math.random() * 0.04));
  this.rotationSpeed = Math.random() * .1 + .02;
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
  // decides which food model to produce and load
  switch(this.type){
    case 0: 
      jsonLoader.load('models/carrot.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(6, 6, 6);
		that.figure.type = "Carrot";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 1:
      jsonLoader.load('models/tomato.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(14, 14, 14);
        that.figure.type = "Tomato";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
    case 2:
      jsonLoader.load('models/plate.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(6, 6, 6);
		that.figure.rotation.y = .8;
		that.figure.type = "Garbage";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 3:
      jsonLoader.load('models/cheese.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(8, 8, 8);
        that.figure.type = "Cheese";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 4:
      jsonLoader.load('models/milk.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(6, 6, 6);
        that.figure.type = "Milk";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 5:
      jsonLoader.load('models/sauce.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(12, 12, 12);
        that.figure.type = "Sauce";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 6:
      jsonLoader.load('models/spices.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(7, 7, 7);
        that.figure.type = "Spices";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 7:
      jsonLoader.load('models/potato.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(13, 13, 13);
        that.figure.type = "Potato";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 8:
      jsonLoader.load('models/pumpkin.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(16, 16, 16);
        that.figure.type = "Pumpkin";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 9:
      jsonLoader.load('models/turkey.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(6, 6, 6);
        that.figure.type = "Turkey Leg";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 10:
      jsonLoader.load('models/chicken.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(10, 10, 10);
        that.figure.type = "Chicken";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 11:
      jsonLoader.load('models/fish.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(9, 9, 9);
        that.figure.type = "Fish";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 12:
      jsonLoader.load('models/pig.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(12, 12, 12);
        that.figure.type = "Pork";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 13:
      jsonLoader.load('models/pie.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(7, 7, 7);
        that.figure.type = "Pie";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 14:
      jsonLoader.load('models/bread.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(10, 10, 10);
        that.figure.type = "Bread";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 15:
      jsonLoader.load('models/tortilla.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(25, 25, 25);
        that.figure.type = "Tortilla";
		that.figure.rotation.y += Math.PI/2;
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 16:
      jsonLoader.load('models/melon.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(20, 20, 20);
        that.figure.type = "Watermelon";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 17:
      jsonLoader.load('models/knife.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(7, 7, 7);
        that.figure.type = "Garbage";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
	case 18:
      jsonLoader.load('models/can.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(7, 7, 7);
        that.figure.type = "Garbage";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;
    case 19:
      jsonLoader.load('models/boot.js', function ( geometry, materials ) {
	    that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        that.figure.scale.set(10, 10, 10);
        that.figure.type = "Garbage";
		that.figure.position.x = 375;
		that.figure.position.y = 150 - (50 * Math.random());
		game.panes[game.panes.length - 1].scene.add(that.figure);
      }); break;	  
  }
 };

Food.prototype.update = function(t, dt){
  if(this.figure && this.figure.position.x > -350){
    this.figure.position.x -= 200 * dt ;
	this.figure.position.y += 50 * this.velocity * dt; 
	this.velocity -= 50 * this.gravity * dt;
	this.figure.rotation.z += this.rotationSpeed * dt * 50;
  }
  else if(this.figure){
    game.panes[game.panes.length - 1].scene.remove(this.figure);
	game.panes[game.panes.length - 1].foodGen.foodArray.splice(game.panes[game.panes.length - 1].foodGen.foodArray.indexOf(this.figure)+1, 1);
	this.figure = null;
  }
};
/**
 * BoringPane
 * Show a cube
 */
var menuPane = function() {
  this.camera = new THREE.PerspectiveCamera(75, 4.0/3.0, 1, 10000);
  this.camera.position.z += 1000;
  this.camera.position.x -= 1000;
  this.camera.position.y += 1000;
  var that = this;
  this.scene = new THREE.Scene();
  
  //Add Main Carrot
  this.carrot = null;
  var jsonLoader = new THREE.JSONLoader();
  jsonLoader.load('models/carrot.js', function ( geometry, materials ) {
	that.carrot =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    that.carrot.scale.set(200, 200, 200);
	that.carrot.position.y -= 400;
	that.carrot.rotation.y = Math.PI;
    that.scene.add(that.carrot);
  });
  this.knife = null;
  jsonLoader.load('models/knife.js', function ( geometry, materials ) {
	that.knife =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    that.knife.scale.set(200, 200, 200);
	that.knife.position.x += 300;
	that.knife.position.z += 500;
	that.knife.position.y -= 300;
    that.scene.add(that.knife);
  });
  this.turkey = null;
  jsonLoader.load('models/turkey.js', function ( geometry, materials ) {
	that.turkey =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    that.turkey.scale.set(150, 150, 150);
	that.turkey.position.x -= 300;
	that.turkey.position.z -= 900;
	that.turkey.position.y -= 900;
    that.scene.add(that.turkey);
  });
  // Add a light source
  var light = new THREE.PointLight(0xffffff,1);
  light.position.set(700, 1300, 1000);
  this.scene.add(light);
  
  // Look at cube
  this.camera.lookAt(this.scene.position);
};

/**
 * Update menuPane
 */
menuPane.prototype.update = function(t, renderer) {
  if(this.carrot){
	this.carrot.rotation.x += .01;
  }
  if(this.knife){
	this.knife.rotation.y -=.01;
  }
  if(this.turkey){
    this.turkey.rotation.z -=.01;
  }
};

/**
 * Handle input inside BoringPane
 * keyboard has method 'pressed'
 */
menuPane.prototype.handleInput = function(game) {
  $(function() {
    $(window).keypress(function(e) {
      var key = e.which;
      if(key === 13 &&game.panes.length<=1){
	    game.pushPane(new gamePane());
	  }
    });
  });
};

menuPane.prototype.overlay = function(ctx) {
  ctx.fillStyle = '#5a5a5a';
  ctx.fillRect(1280, 0, 400, 720);
  ctx.fillStyle = '#ff0000';
  ctx.font="70px Comic Sans";
  ctx.fillText("CHEF - SPLOSION",320,100);
  ctx.font="50px Comic Sans";
  ctx.fillText("PRESS ENTER TO COOK",330,650);
  ctx.fillText("INSTRUCTIONS: " , 1290, 100);
  ctx.font="25px Comic Sans";
  ctx.fillText("Click on the correct foods for", 1290, 180);
  ctx.fillText("the order", 1290, 220);
};
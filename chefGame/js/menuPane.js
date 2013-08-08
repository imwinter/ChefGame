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
	that.carrot.position.y -=400;
	that.carrot.rotation.y = Math.PI;
    that.scene.add(that.carrot);
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
  if(this.carrot)
  {
	  this.carrot.rotation.x+=.01;
	  //this.carrot.rotation.y+=.01;
	  this.carrot.rotation.z+=.01;
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
  ctx.fillStyle = '#ff0000';
  ctx.font="70px Comic Sans";
  ctx.fillText("CARROT SIMULATOR 2013",190,100);
  ctx.font="50px Comic Sans";
  ctx.fillText("PRESS ENTER TO PARTY",330,650);
};
/*
 * Game Pane
 */
var gamePane = function(){ 
  var that = this;
  // Create camera and set rotation
  this.camera = new THREE.PerspectiveCamera(30, 16.0/9.0, 100, 10000);
  this.camera.position.y = 300;
  this.camera.position.z = 430;
  this.camera.rotation.x = -(Math.PI)/8;
  
  this.score = 0;
  
  var vertexShaderText = $('#my-vertex-shader').text();
  var fragmentShaderText = $('#my-fragment-shader').text();
  
  this.myMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
  });
  this.scene = new THREE.Scene();

  
  /*
   * Create Spotlight and Shadow Effects
   *
   */
  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 100, 1000, 100 );

  spotLight.castShadow = true;

  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;

  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 30;

  this.scene.add( spotLight );
  
  
  /* 
   * Import Models
   * Made by Matt Scorca and Ian Winter
   */
  this.figure = null;
  var jsonLoader = new THREE.JSONLoader();
  jsonLoader.load('models/stove.js', function ( geometry, materials ) {
		that.figure =  new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    that.figure.scale.set(40, 40, 40);
	that.figure.rotation.y = Math.PI;
    that.scene.add(that.figure);
  });
  
  this.foodGen = new foodGenerator();
  this.foodGen.init();

  // For Raycasting in clickManager
  this.projector = new THREE.Projector();
  this.mouse = new THREE.Vector2();
  
}




// Handles input to leave pane
gamePane.prototype.handleInput = function(game){
  $(function() {
    $(window).keypress(function(e) {
      var key = e.which;
      if(key === 27){
	    game.popPane();
	  }
    });
  });
}

// Draws HUD elements
gamePane.prototype.overlay = function(ctx) {
  ctx.fillStyle = '#5a5a5a';
  ctx.fillRect(0, 0, 200, 100);
  ctx.font="20px Comic Sans";
  ctx.fillStyle = '#ffb6c1';
  ctx.fillText("SCORE: " + this.score,10,20);
};


// update function, updates food and foodgenerator
gamePane.prototype.update = function(t, renderer){
    this.foodGen.update();
	for(var i = 0; i < this.foodGen.foodArray.length; i++){
	  this.foodGen.foodArray[i].update(t);
	}
}
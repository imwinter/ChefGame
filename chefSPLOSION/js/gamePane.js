var loadFile = function(url) {
  var result = null;
  $.ajax({
    url: url,
	async: false
	}).done(function(data) {
	  result = data;
	});
	return result;
};

/*
 * Game Pane
 */
 
var gamePane = function(){ 
  var that = this;
  // Create camera and set rotation
  this.camera = new THREE.PerspectiveCamera(30, 16.0/9.0, 100, 10000);
  this.camera.position.y = 300;
  this.camera.position.z = 630;
  this.camera.rotation.x = -(Math.PI)/12;
  
  this.clock = new THREE.Clock();
  
  this.score = 0;
  
  var perlinText = loadFile('shaders/perlin.glsl');
  var explosionVertText = loadFile('shaders/explosion.vert');
  var explosionFragText = loadFile('shaders/explosion.frag');
  var flameVertText = loadFile('shaders/flame.vert');
  var flameFragText = loadFile('shaders/flame.frag');
  var woodFragText = loadFile('shaders/wood.frag');
  var woodVertText = loadFile('shaders/wood.vert');
  
  // for stove
  this.flameMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'uTime': { type: 'f', value: 0.0 },
    },
	transparent: true,
    vertexShader: perlinText + flameVertText,
    fragmentShader: perlinText + flameFragText
  });
  
  // explosion
  this.myMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
	uniforms: {
      'uTime': { type: 'f', value: Math.random() },
	},
	vertexShader: explosionVertText,
	fragmentShader: explosionFragText
  });
  
  //floor wood texture
  this.woodMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'uTime': { type: 'f', value: 0.0 },
    },
    vertexShader: perlinText + woodVertText,
    fragmentShader: perlinText + woodFragText
  });  
  
  this.scene = new THREE.Scene();

  this.splitFigure = null;
  
  // importing floor geo/texture
  //var floorTexture = THREE.ImageUtils.loadTexture('textures/hardwood-floor.jpg');
  //this.floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
  this.floor = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
	this.woodMaterial
  );
  this.floor.rotation.x -= Math.PI/2;
  this.floor.position.y -= 150;
  this.floor.position.z -= 1000;
  this.scene.add(this.floor);

  // importing wall geo/texture
  var wallTexture = THREE.ImageUtils.loadTexture('textures/wall.jpg');
  this.wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
  this.wall = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 1000),
	this.wallMaterial
  );
  this.wall.position.y += 440;
  this.wall.position.z -= 600;
  this.scene.add(this.wall);
  
  // make stove flames
  this.flames = new THREE.Mesh(
      new THREE.PlaneGeometry(130, 20),
      this.flameMaterial);
  this.flames.position.y += 100;
  this.flames.position.z += 115;
  this.scene.add(this.flames);
  
  /*
   * Create Spotlight and Shadow Effects
   *
   */
  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 100, 10000, 100 );

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
	that.figure.position.x += 100;
    that.scene.add(that.figure);
  });
  
  this.foodGen = new foodGenerator();
  this.foodGen.init();

  this.currOrder = this.foodGen.newOrder();
  
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


gamePane.prototype.explosion = function(intersects){
	var that = this;
	
	if(that.splitFigures){
	  _.each(that.splitFigures, function(fig) {
	    that.scene.remove(fig);
	  });
	}
	
    that.splitFigures = [];

	var origin = intersects[intersects.length - 1].object.position;
    var splitGeoms = this.splitGeometry(intersects[intersects.length - 1].object.geometry);
	
    _.each(splitGeoms, function(geom) {
      var fig = new THREE.Mesh(geom, that.myMaterial);
      fig.scale.set(10, 10, 10);
	  fig.position.x = origin.x;
	  fig.position.y = origin.y;
	  fig.position.z = origin.z;
      fig.velocity = new THREE.Vector3(0, 0, 0);
      fig.velocity.x = 100.0 * (Math.random() * 2.0 - 1.0);
      fig.velocity.y = 100.0 * (Math.random() * 2.0 - 0.0);
      fig.velocity.z = 100.0 * (Math.random() * 2.0 - 1.0);
      that.splitFigures.push(fig);
      that.scene.add(fig);
    });
    that.scene.remove(intersects[intersects.length - 1].object);
	that.foodGen.foodArray.splice(that.foodGen.foodArray.indexOf(intersects[intersects.length - 1].object, 1));
	intersects[intersects.length - 1].object = null;
}

// Draws HUD elements
gamePane.prototype.overlay = function(ctx) {
  ctx.fillStyle = '#5a5a5a';
  ctx.fillRect(1280, 0, 400, 720);
  ctx.font="65px Comic Sans";
  ctx.fillStyle = '#ffffff';
  ctx.fillText("Chef-Splosion", 1295, 60);
  ctx.font = "50px Comic Sans";
  ctx.fillText("Current Order", 1360, 140);
  // Lists all the ingredients required for current Order
  ctx.fillText(this.currOrder[0][0] + ": x" + this.currOrder[0][1], 1340, 205);
  ctx.fillText(this.currOrder[1][0] + ": x" + this.currOrder[1][1], 1340, 250);
  ctx.fillText(this.currOrder[2][0] + ": x" + this.currOrder[2][1], 1340, 295);
  ctx.fillText(this.currOrder[3][0] + ": x" + this.currOrder[3][1], 1340, 340);
  // score
  ctx.font = "42px Comic Sans";
  ctx.fillText("Customer Satisfaction: ", 1285, 600);
  ctx.fillText(Math.round(this.score), 1450, 650);
};

// function to create faces and split geom
gamePane.prototype.splitGeometry = function(geometry) {
  var result = [];
  _.each(geometry.faces, function(face) {
    var splitGeom = new THREE.Geometry();
    var verts = geometry.vertices;
    splitGeom.vertices.push(verts[face.a]);
    splitGeom.vertices.push(verts[face.b]);
    splitGeom.vertices.push(verts[face.c]);
    splitGeom.faces.push(new THREE.Face3(0, 1, 2));
    splitGeom.computeFaceNormals();
    result.push(splitGeom);
  });
  return result;
};



// update function, updates food and foodgenerator
gamePane.prototype.update = function(t, renderer){
    var dt = this.clock.getDelta();

	this.score -= dt;
	
	var that = this;
	if(this.score < -100){
	  alert("YOU DONE GOOFED");
      game.panes.pop();
	}
    if( (this.currOrder[0][1] === 0) &&  (this.currOrder[1][1] === 0) && (this.currOrder[2][1] === 0) && (this.currOrder[3][1] === 0) ){
	  this.score += 150;
      this.currOrder = this.foodGen.newOrder();
	}
	this.foodGen.update();
	for(var i = 0; i < this.foodGen.foodArray.length; i++){
	  this.foodGen.foodArray[i].update(t, dt);
	}
		
	that.myMaterial.uniforms['uTime'].value = Math.random();
	that.flameMaterial.uniforms['uTime'].value = t;
	that.woodMaterial.uniforms['uTime'].value = t;
	
	// makes shatter effect
	_.each(that.splitFigures, function(fig) {
      fig.position.x += fig.velocity.x * dt;
      fig.position.y += fig.velocity.y * dt;
      fig.position.z += fig.velocity.z * dt;
      if(fig.position.y < -500) {
        that.scene.remove(fig);
		
      } else {
        fig.velocity.y -= 200.0 * dt;
      }
    });
	
}
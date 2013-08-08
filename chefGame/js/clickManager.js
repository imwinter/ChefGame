/*
* Click Collision Manager
*/

// How to get intersection, how to math, how to organize
function onDocumentMouseDown( event ) {
  if(game.panes.length >= 2){
	  event.preventDefault();
	  var vector = new THREE.Vector3( game.panes[game.panes.length - 1].mouse.x, game.panes[game.panes.length - 1].mouse.y, 0.0 );
	  game.panes[game.panes.length - 1].projector.unprojectVector( vector, game.panes[game.panes.length - 1].camera );

	  //console.log("mouse x : "+ game.mouse.x + " mouse y: " + game.mouse.y);
	  
	  var raycaster = new THREE.Raycaster( game.panes[game.panes.length - 1].camera.position, vector.sub( game.panes[game.panes.length - 1].camera.position ).normalize() );
	  var figureArray = new Array();
	  for(var i = 0; i < game.panes[game.panes.length - 1].foodGen.foodArray.length; i ++ ){
		figureArray.push(game.panes[game.panes.length - 1].foodGen.foodArray[i].figure);
	  }
	  var intersects = raycaster.intersectObjects( figureArray );
	  if ( intersects.length > 0 ) {
		var clicked = intersects[intersects.length - 1].object.type;
		if(2 != clicked){
		  game.panes[1].score += 10;
		}
		else if(game.panes[1].score>=10)
		{
		 game.panes[1].score -= 10;
		}
	  }
  }
}

function onDocumentMouseMove( event ) {
  if(game.panes.length >= 2){
    event.preventDefault();
    var rect = game.renderer.domElement.getBoundingClientRect();

    game.panes[game.panes.length - 1].mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    game.panes[game.panes.length - 1].mouse.y = -(event.clientY - rect.top) / rect.height * 2 + 1;
  }
}
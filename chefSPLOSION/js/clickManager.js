/*
* Click Collision Manager
*/


/**
 * Return list of single triangle geometries that make up single input geometry
 */
// How to get intersection, how to math, how to organize
function onDocumentMouseDown( event ) {
  if(game.panes.length >= 2){
    this.song = $('#confirm')[0];
    this.song.loop = false;
	this.song2 = $('#bad')[0];
	this.song2.loop = false;
	  event.preventDefault();
	  var vector = new THREE.Vector3( game.panes[game.panes.length - 1].mouse.x, game.panes[game.panes.length - 1].mouse.y, 0.0 );
	  game.panes[game.panes.length - 1].projector.unprojectVector( vector, game.panes[game.panes.length - 1].camera );
	  
	  var raycaster = new THREE.Raycaster( game.panes[game.panes.length - 1].camera.position, vector.sub( game.panes[game.panes.length - 1].camera.position ).normalize() );
	  var figureArray = new Array();
	  // push all figures onto figure array
	  for(var i = 0; i < game.panes[game.panes.length - 1].foodGen.foodArray.length; i ++ ){
		figureArray.push(game.panes[game.panes.length - 1].foodGen.foodArray[i].figure);
	  }
	  var intersects = raycaster.intersectObjects( figureArray );
	  if ( intersects.length > 0 ) {
		var clicked = intersects[intersects.length - 1].object.type;
	     	
		switch(clicked){
          case game.panes[1].currOrder[0][0]: 
		    if(game.panes[1].currOrder[0][1] > 0){
			  game.panes[1].currOrder[0][1]--; 
			  game.panes[1].score += 25;
			  //Set up song playing
			  this.song.play();
			}
			break;
	      case game.panes[1].currOrder[1][0]: 
		    if(game.panes[1].currOrder[1][1] > 0){
		      game.panes[1].currOrder[1][1]--; 
			  game.panes[1].score += 25;
			  this.song.play();
			}
			break; 
		  case game.panes[1].currOrder[2][0]: 
		    if(game.panes[1].currOrder[2][1] > 0){
  			  game.panes[1].currOrder[2][1]--; 
			  game.panes[1].score += 25;
			  this.song.play();
			}
			break; 
		  case game.panes[1].currOrder[3][0]: 
		    if(game.panes[1].currOrder[3][1] > 0){
		      game.panes[1].currOrder[3][1]--; 
			  game.panes[1].score += 25;
			  this.song.play();
			}
			break;
		  case "Garbage":
		    if(game.panes[1].score >= -100){
		      game.panes[1].score -= 50;
			  this.song2.play();
			}
			else{
			  alert("YOU DONE GOOFED");
			  game.panes.pop();
			  this.song2.play();
			}
          default:
            if(game.panes[1].score >= -100){	  
              game.panes[1].score -= 15;
			  this.song2.play();			  
            }
			else{
			  alert("YOU DONE GOOFED");
			  game.panes.pop();
			}
		}
		game.panes[1].explosion(intersects);

	  }
  }
}


function onDocumentMouseMove( event ) {
  if(game.panes.length >= 2){
    event.preventDefault();
    var rect = game.renderer.domElement.getBoundingClientRect();
    // tracks mouse movement
    game.panes[game.panes.length - 1].mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    game.panes[game.panes.length - 1].mouse.y = -(event.clientY - rect.top) / rect.height * 2 + 1;
  }
}
uniform float uTime;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  vUv = vec2(uv.x - 0.5, uv.y - 0.5); // center vUv
  vec3 origin = vec3(0.0, 2.0, 0.0);
  vNormal = normalMatrix * normal;
  vec3 shiftPosition = position - origin;
  // newPosition is blown up around origin into ball
  vec3 newPosition = shiftPosition / length(shiftPosition) * 1.3;
  if(uTime>=30.85&&uTime<86.0){
    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(uBeat * newPosition + (1.0 - uBeat) * shiftPosition, 1.0);
  }
  else if(uTime>=87.0&&uTime<150.8){
    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(newPosition, 1.0);
  }
  else if(uTime>=150.8&&uTime<221.5){
    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(uBeat * newPosition + (1.0 - uBeat) * shiftPosition, 1.0);
  }
  else{
    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(newPosition, 1.0);
	}
}
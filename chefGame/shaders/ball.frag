varying vec3 vNormal;
uniform float uTime;
uniform float uBeatTime;
uniform float uBeat;
uniform float proficiency;
varying vec2 vUv;

void main() {
  float time = uBeat;
  float tileX = floor(vUv.x*10.0)+1.0;
  float tileY = floor(vUv.y*10.0)+1.0;
  if(uTime>=30.85&&uTime<86.0){
	gl_FragColor = vec4((sin((tileX*tileY)*uBeat)),proficiency,(tan((tileX*tileY)*uBeat)),proficiency);
  }
  else if(uTime>=87.0&&uTime<150.8){
	gl_FragColor = vec4(sin((tileX*tileY)*uTime),proficiency,(tan(tileX*tileY)*uTime),proficiency);
  }
  else if(uTime>=150.8&&uTime<221.5){
	gl_FragColor = vec4((sin((tileX*tileY)*uBeat)),proficiency,(tan((tileX*tileY)*uBeat)),proficiency);
  }
  else{
	gl_FragColor = vec4(sin((tileX*tileY)*uTime),proficiency,(tan(tileX*tileY)*uTime),proficiency);
  }
}
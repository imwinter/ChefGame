varying vec3 vNormal;
uniform float uTime;
uniform float uBeatTime;
uniform float uBeat;
uniform float proficiency;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalMatrix * vec3(normal);
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4((0.8 + 0.2 * (uBeat* proficiency)) * position, 1.0);
}

#define CURVE (20.0)
#define SPEED (6.0)
#define DENSITY (2.0)

uniform float uTime;
varying vec2 vUv;

void main() {
  float ang = atan(vUv.y, vUv.x);
  float dist = length(vUv) * CURVE;
  float t = ang * DENSITY + uTime * SPEED;
  gl_FragColor = vec4(abs(sin(t + dist)), abs(sin(uTime + t)), abs(cos(uTime + dist)), 1.0);
}
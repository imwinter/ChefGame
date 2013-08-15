varying vec3 vNormal;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vView;

/* Generate color from y position */
vec4 fireColor(float y) {
  y = clamp(y, 0.0, 1.0);
  // y is 0.5 to 1.0
  float t = 2.0 - 2.0 * y;
  // t is 1.0 to 0.0
  return vec4(0.0, 0.0, t, t);
}

/* Given position, return height from 0 to 1 */
float normalizeHeight(vec3 p) {
  return clamp(p.y * 0.005 + 0.1, -0.5, 0.5) + 0.5;
}

/* Sum copies of absolute Perlin noise to get fractal turbulence */
float sumAbsPerlin(vec3 p) {
  vec3 period = vec3(10.0, 10.0, 10.0);
  return abs(pnoise(p, period)) +
      0.5 * abs(pnoise(2.0 * p, period)) +
      0.25 * abs(pnoise(4.0 * p, period)) +
      0.125 * abs(pnoise(8.0 * p, period));
}

void main() {
  vec3 nvNormal = normalize(vNormal);
  vec3 light = normalize(vec3(1.0, 1.0, 2.0));
  vec4 noiseColor;
  
  // Right side
  vec3 samplePosition = vPosition * vec3(0.1, 0.02, 0.1);
  float noise = 0.3 * sumAbsPerlin(samplePosition + uTime * vec3(0.0, -5.0, -1.0));
  noiseColor = fireColor(normalizeHeight(vPosition) + noise);
  
  gl_FragColor = noiseColor;
}
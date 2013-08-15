uniform float uTime;
void main() {
  gl_FragColor = vec4( 1.0-uTime, sin(uTime), uTime, 1.0);
}
void main() {
  vUv = vec2(uv.x - 0.5, uv.y - 0.5); // center vUv
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
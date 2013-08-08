varying vec3 vNormal;
uniform sampler2D tTexture;

void main() {
  vec3 norm = normalize(vNormal);
  vec2 tpos = vec2(0.5 + norm.x * 0.49, 0.5 + norm.y * 0.49);
  vec4 tColor = texture2D(tTexture, tpos);
  gl_FragColor = vec4(tColor.rgb, 1.0);
}
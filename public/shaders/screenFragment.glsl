// Inspired by ChatGPT
uniform sampler2D screenTexture;
uniform sampler2D smudgesTexture;
uniform sampler2D staticTexture;
uniform float time;
varying vec2 vUv;

const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio

vec4 chromaticAberration(vec2 uv, float offset) {
    float r = texture2D(screenTexture, uv + vec2(offset, 0.0)).r;
    float g = texture2D(screenTexture, uv).g;
    float b = texture2D(screenTexture, uv - vec2(offset, 0.0)).b;
    return vec4(r, g, b, 1.0);
}

// Inspired by Henry Heffernan
float noise(vec2 uv, float seed) {
  return fract(tan(distance(uv * PHI, uv) * seed) * uv.x);
}

void main() {
    vec4 screenColor = chromaticAberration(vUv, 0.007);
    vec4 smudgesColor = texture2D(smudgesTexture, vUv);
    vec4 staticColor = texture2D(staticTexture, vUv);
    vec4 noise = vec4(noise(gl_FragCoord.xy, fract(time) + 1.0),
                      noise(gl_FragCoord.xy, fract(time) + 2.0),
                      noise(gl_FragCoord.xy, fract(time) + 3.0), 0.01);

    gl_FragColor = screenColor * 1.0 + staticColor * 0.6 + smudgesColor * 0.12 + noise * 0.2;
}
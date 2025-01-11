// Inspired by ChatGPT
varying vec2 vUv;

// Rotate UV coordinates
vec2 rotateUV(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    uv -= 0.5;
    uv = mat2(c, -s, s, c) * uv;
    uv += 0.5;
    return uv;
}

void main() {
    // vUv = rotateUV(uv, 1.5708);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
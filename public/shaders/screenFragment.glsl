// Shader inspired by ChatGPT
uniform float time;
varying vec2 vUv;

// Rounded rectangle mask with proper UV clamping
float roundedRectMask(vec2 uv, vec2 center, vec2 size, float radius) {
    vec2 halfSize = size * 0.5;
    vec2 dist = abs(uv - center) - halfSize + radius;
    dist = max(dist, 0.0); // Prevent negative values affecting the mask
    return 1.0 - smoothstep(0.0, radius, length(dist) - radius);
}

void main() {
    // Define screen area and rounded corners
    vec2 center = vec2(0.5, 0.492);  // Centered UV
    vec2 size = vec2(0.9, 0.83);     // Smaller size to create margins
    float radius = 0.015;             // Rounded corner size

    // Create mask with smooth edges
    float mask = roundedRectMask(vUv, center, size, radius);

    // Dark gray for the margins
    vec4 marginColor = vec4(0.05, 0.05, 0.05, 1.0); 

    // Blend based on the mask with a stronger cutoff
    gl_FragColor = mix(marginColor, vec4(0.0, 0.0, 0.0, 0.0), mask);
}
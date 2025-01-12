uniform sampler2D screenTexture;
uniform float time;
varying vec2 vUv;

const float PHI = 1.61803398874989484820459; // Golden Ratio

vec4 chromaticAberration(vec2 uv, float offset) {
    float r = texture2D(screenTexture, uv + vec2(offset, 0.0)).r;
    float g = texture2D(screenTexture, uv).g;
    float b = texture2D(screenTexture, uv - vec2(offset, 0.0)).b;
    return vec4(r, g, b, 1.0);
}

// Generate noise for the static effect
float noise(vec2 uv, float seed) {
    return fract(tan(distance(uv * PHI, uv) * seed) * uv.x);
}

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

    // Apply chromatic aberration and noise effects
    vec4 screenColor = chromaticAberration(vUv, 0.001);
    vec4 noise = vec4(noise(gl_FragCoord.xy, fract(time) + 1.0),
                      noise(gl_FragCoord.xy, fract(time) + 2.0),
                      noise(gl_FragCoord.xy, fract(time) + 3.0), 0.01);

    // Dark gray for the margins
    vec4 marginColor = vec4(0.05, 0.05, 0.05, 1.0); 

    // Blend based on the mask with a stronger cutoff
    gl_FragColor = mix(marginColor, screenColor + noise * 0.15, mask);
}
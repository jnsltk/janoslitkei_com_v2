/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./templates/*.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [
        require('daisyui')
    ],
}

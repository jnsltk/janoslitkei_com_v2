import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'full': '800px',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                mono: ['var(--font-jetbrains-mono)'],
            },
            colors: {
                'ultramarine': {
                    '50': '#f1f3ff',
                    '100': '#e6e9ff',
                    '200': '#d0d7ff',
                    '300': '#abb4ff',
                    '400': '#7b83ff',
                    '500': '#4647ff',
                    '600': '#2b20ff',
                    '700': '#1b0ef3',
                    '800': '#160bcc',
                    '900': '#120a8f',
                    '950': '#060471',
                },
                'foggy-gray': {
                    '50': '#f3f4f1',
                    '100': '#e5e8df',
                    '200': '#c9cebd',
                    '300': '#afb79f',
                    '400': '#939c7f',
                    '500': '#768062',
                    '600': '#5b654b',
                    '700': '#484f3c',
                    '800': '#3c4133',
                    '900': '#35392e',
                    '950': '#1a1d16',
                },
                'cinnabar': {
                    '50': '#fef4f2',
                    '100': '#fde7e3',
                    '200': '#fdd2cb',
                    '300': '#fab2a7',
                    '400': '#f58574',
                    '500': '#e94f37',
                    '600': '#d8412a',
                    '700': '#b53420',
                    '800': '#962e1e',
                    '900': '#7d2c1f',
                    '950': '#44130b',
                },
                'wild-blue-yonder': {
                    '50': '#f3f7fa',
                    '100': '#eaeff5',
                    '200': '#d9e3ec',
                    '300': '#c1cfe0',
                    '400': '#a7b8d2',
                    '500': '#91a1c3',
                    '600': '#6e7dab',
                    '700': '#67739b',
                    '800': '#555e7e',
                    '900': '#495166',
                    '950': '#2b2f3b',
                },

            }
        },
    },
    plugins: [],
} satisfies Config;

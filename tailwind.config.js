/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            'accent': '#F876D3',
            'background': {
                '1': '#281824',
                '2': '#331D2D',
                '3': '#45283D',
                'header-buttons': '#56304C'
            }
        },
        extend: {
            width: {
                // This w-[calc(100vw-2.125rem)] is too hacky. Probably because of the page layout configuration.
                'layout-width': 'calc(100vw - 2.125rem)'
            }
        },
    },
    plugins: [],
}

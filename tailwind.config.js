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
				'4': '#58304D',
                'header-buttons': '#56304C'
            }
        },
        extend: {
            width: {
                'content-width': '1080px',
                'layout-width': 'calc(100vw - 32px)'
            },
            transitionDuration: {
                '50': '50ms'
            }
        },
    },
    plugins: [],
}

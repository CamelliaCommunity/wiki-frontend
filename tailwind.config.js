/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
			'background': {
                '1': '#281824',
                '2': '#331D2D',
                '3': '#45283D',
				'4': '#58304D',
                'header-buttons': '#56304C'
            },
            'accent': '#F876D3',
			'accent-soft': '#F68384',
			'primary': '#F06C9B',
			'black': '#000',
			'white': "#FFF",
			'red': '#FF5555',
			'light-gray': 'rgba(255, 255, 255, 0.7)',
			'gray': 'rgba(255, 255, 255, 0.4)',
			'userfeedback': {
				'info': '#0044FF',
				'success': '#00FF00',
				'warning': '#FFDD00',
				'error': '#DD0000'
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

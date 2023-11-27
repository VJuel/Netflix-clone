/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './public/index.html',
        "./src/**/*.jsx"],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
            addVariant('svg-hover', '& > svg:hover');
        }
    ],
}

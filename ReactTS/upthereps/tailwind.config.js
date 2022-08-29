/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    colors: {
      'white': '#ffffff',
      'gray-lightest': '#f7f7f7',
      'gray-lighter': '#e3e3e3',
      'gray-light': '#d0d0d0',
      'gray': '#bdbdbd',
      'gray-dark': '#959595',
'gray-darker': '#6e6e6e',
'gray-darkest': '#474747',
'black': '#202020',

'brand-light': '#b9b9b9',
'brand': '#000000',
'brand-dark': '#000000',

'cta-light': '#b9b9b9',
'cta': '#000000',
'cta-dark': '#000000',

'info-light': '#d4eaf1',
'info': '#32acc6',
'info-dark': '#24535e',

'warning-light': '#f6e9c8',
'warning': '#c7ac14',
'warning-dark': '#605317',

'success-light': '#d3efcd',
'success': '#31ba39',
'success-dark': '#245922',

'danger-light': '#facec9',
'danger': '#c82e37',
'danger-dark': '#611f1f',
},
    extend: {},
  },
  plugins: [],
}

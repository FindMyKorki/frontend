/** @type {import('tailwindcss').Config} */
import { Colors } from './src/colors';
module.exports = {
  content: ['./app/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      spacing: {
        'def-y': '1rem',
        'def-x': '1.5rem',
      },
      colors: {
        primary: '#1A5100',
        background: '#ffffff',
        'background-alt': '#f1f1f1',
        'text-dark': '#000000',
        'text-medium': '#3d3d3d',
        'text-light': '#424242',
        'text-grey': '#656565',
        'border-gray': '#D9D9D9',
        'empty-image': '#999999',
      },
      fontSize: {
        '0.5rem': '0.5rem',
      },
    },
  },
  plugins: [],
};

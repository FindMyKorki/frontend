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
        primary: Colors.primary,
      },
    },
  },
  plugins: [],
};

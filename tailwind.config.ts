import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#101727',
        surface: '#19223a',
        accent: '#38bdf8',
        outline: '#23304d'
      }
    }
  },
  plugins: []
};

export default config;

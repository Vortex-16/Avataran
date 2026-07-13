/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind is installed but NOT the primary styling approach.
  // It's available for rapid utility use; CSS custom properties + modules are primary.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

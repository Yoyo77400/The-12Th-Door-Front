module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--color-primary"),
        secondary: withOpacity("--color-secondary"),
        accent: withOpacity("--color-accent"),
        background: withOpacity("--color-background"),
        text: withOpacity("--color-text"),
      },
    },
  },
  plugins: [],
};

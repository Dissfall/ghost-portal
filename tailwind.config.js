/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#003366",
  secondary: "#6699CC",
  accent: "#FF6B6B",
  background: "#121212",
  card: "#141414",
  text: "#ffffff",
};

module.exports = {
  content: ["./**/*.hbs", "partials/**/.hbs"],
  theme: {
    extend: {
      colors,
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: colors.text,
            h1: {
              color: colors.text,
            },
            h2: {
              color: colors.text,
            },
            h3: {
              color: colors.text,
            },
            h4: {
              color: colors.text,
            },
            h5: {
              color: colors.text,
            },
            h6: {
              color: colors.text,
            },
            strong: {
              color: colors.text,
            },
            italic: {
              color: colors.text,
            },
            a: {
              color: theme("colors.indigo.600"),
              "&:hover": {
                color: theme("colors.indigo.800"),
              },
            },
            img: {
              borderRadius: theme("borderRadius.lg"),
              boxShadow: theme("boxShadow.lg"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

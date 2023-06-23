/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-roboto-slab)"],
        sans: ["var(--font-dm-sans)"],
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:first-of-type::after": {
              content: "none",
            },
          },
        },
      },
      animation: {
        scrollX: "scrollOnX 15s linear infinite",
        scrollXInverse: "scrollOnXInverse 10s linear infinite",
        scrollY: "scrollOnY 30s linear infinite",
        scrollYInverse: "scrollOnYInverse 30s linear infinite",
      },

      keyframes: {
        scrollOnX: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scrollOnXInverse: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scrollOnY: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        scrollOnYInverse: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      boxShadow: ({ theme }) => ({
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        "surface-glass": `
				  inset 0.25px 1px 0 0 ${theme("colors.rose.200 / 3%")},
				  0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
				  0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
				  0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
				  0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
				  0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
				  0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
				  0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`,
        "surface-elevation-low": `
				  inset 0.25px 1px 1px 0 ${theme("colors.rose.200 / 1.5%")}, 
				  0.3px 0.5px 0.7px rgba(3, 2, 2, 0.2),
				  0.4px 0.8px 1px -1.2px rgba(3, 2, 2, 0.2),
				  1px 2px 2.5px -2.5px rgba(3, 2, 2, 0.2);`,
        "surface-elevation-medium": `
				  inset 0.25px 1px 1px 0 ${theme("colors.rose.200 / 3%")},
				  0.3px 0.5px 0.7px rgba(3, 2, 2, 0.1),
				  0.8px 1.6px 2px -0.8px rgba(3, 2, 2, 0.1),
				  2.1px 4.1px 5.2px -1.7px rgba(3, 2, 2, 0.1),
				  5px 10px 12.6px -2.5px rgba(3, 2, 2, 0.1)`,
      }),
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography")],
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				"primary-500": "#F97316",
				"primary-600": "#5D5FEF",
				"secondary-500": "#FFB620",
				"off-white": "#D0DFFF",
				red: "#FF5A5A",
				"dark-1": "#000000",
				"dark-2": "#212121",
				"dark-3": "#2c2c2c",
				"dark-4": "#373737",
				"dark-5": "424242",
				"dark-6": "4D4D4D",
				"light-1": "#FFFFFF",
				"light-2": "#EFEFEF",
				"light-3": "#7878A3",
				"light-4": "#5C5C7B",
				"light-white": {
					DEFAULT: "rgba(59,60,152,0.03)",
					100: "rgba(59,60,152,0.02)",
				},
			},
			screens: {
				xs: "480px",
			},
			width: {
				420: "420px",
				465: "465px",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

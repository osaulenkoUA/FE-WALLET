/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				orange: "#E4814B",
				beige: "#DDC2BB",
				green: "#69CA5D",
				red: "#9F042B",
				"black-v2": "#0D0D0D",
				blue: {
					light: "#85d7ff",
					DEFAULT: "#1fb6ff",
					dark: "#009eeb",
				},
				charcoal: {
					black: "#141311",
					dark: "#242424",
					medium: "#414141",
					smoke: "#D5D0CC",
					light: "#A4A4A4",
				},
				gray: {
					dark: "#ACA7A1",
					medium: "#D4D0CC",
					light: "#EBEAE8",
					extralight: "#FBFAF9",
					fog: "#FDFDFD",
					White_dark: "#F2F2F2",
					darker: "#E5E5E5",
				},
				blackRBGA: "rgba(255,255,255,0.8)",
				charcoalBlackA80: "rgba(20,19,17, 0.8)",
			},
			margin: {
				auto: "0 auto",
			},
			gridTemplateColumns: {
				col3: "1fr max-content 40px",
				col2: "1fr 40px",
			},
			screens: {
				lg: "1024px",
				"2xl": "1440px",
				"3xl": "1536px",
				xs: "319px",
				lgToXl: { min: "1024px", max: "1440px" },
				lg2ToXl: { min: "1280px", max: "1440px" },
				xlToXXl: { min: "1440px", max: "1500px" },
			},
		},
	},
	plugins: [],
};

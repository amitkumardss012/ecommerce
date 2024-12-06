/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	},
  	// screens: {
  	// 	xl: {
  	// 		max: '1279px'
  	// 	},
  	// 	lg: {
  	// 		max: '1023px'
  	// 	},
  	// 	md: {
  	// 		max: '767px'
  	// 	},
  	// 	sm: {
  	// 		max: '639px'
  	// 	}
  	// }
  },
  plugins: [require("tailwindcss-animate")],
}


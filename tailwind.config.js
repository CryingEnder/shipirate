module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", //'false', 'media' or 'class'
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      "desktop-big": "1440px",
    },
    extend: {
      colors: {
        yellow: {
          badge: "#ffdf89",
          pirate: "#fed053",
          "pirate-hover": "#fcca44",
          "pirate-ring": "#ffdd81",
          "pirate-hover-ring": "#fed568",
          "old-gold": "#ffdd81",
        },
        blue: {
          water: "#8af6d2",
          sky: {
            1: "#1ccbc4",
            2: "#53dbc7",
            3: "#1a9891",
            4: "#20a99c",
          },
          dark: "#16143b",
          "dark-hover": "#312d7a",
          bird: "#477b9e",
          grayish: "#9c9abf",
        },
        red: {
          faded: "#f48989",
        },
        gray: {
          25: "#fbfdff",
          30: "#edf5ff",
          cloud: "#5189a8",
          "bluegray-300": "#cbd5e1",
          "bluegray-500": "#475569",
        },
        white: {
          "faded-50": "rgba(255, 255, 255, 0.7)",
        },
      },
      fontFamily: {
        "pirate-gr": ["pirate_grungeregular"],
        "pirate-ir": ["pirate_inlineregular"],
        "pirate-igr": ["pirate_inline__grungeregular"],
        "pirate-rr": ["pirate_regularregular"],
        "pirate-sr": ["pirate_shadowregular"],
        "pirate-sgr": ["pirate_shadow_grungeregular"],
      },
      fontSize: {
        "1.5xl": ["1.375rem", { lineHeight: "1.875rem" }],
        "2.5xl": ["1.6875rem", { lineHeight: "2.125rem" }],
      },
      letterSpacing: {
        "wide-2": ".04em",
      },
      backgroundImage: (theme) => ({
        "checkbox-unchecked": "url('./src/css/images/checkbox-unchecked.svg')",
        "checkbox-checked": "url('./src/css/images/checkbox-checked.svg')",
      }),
      borderRadius: {
        x2: "3rem",
        "x1.5": "2.5rem",
      },
      borderWidth: {
        1: "1px",
        6: "6px",
        7: "7px",
      },
      fontWeight: {
        "less-medium": "450",
      },
      width: {
        "3/10": "30%",
      },
      inset: {
        "1/5": "20%",
        "3/20": "15%",
        "1/10": "10%",
        "1/20": "5%",
        "-18": "-4.5rem",
      },
      keyframes: {
        "opacity-slow": {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      animation: {
        "opacity-slow": "opacity-slow .2s ease-in-out",
      },
      scale: {
        70: ".7",
        115: "1.15",
        120: "1.2",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(10rem, 1fr))",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
      backgroundColor: ["focus", "checked"],
      backgroundImage: ["checked", "hover"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};

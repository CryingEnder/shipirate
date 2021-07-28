module.exports = {
  // mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", //'false', 'media' or 'class'
  theme: {
    screens: {
      "tablet-small": "500px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      "desktop-big": "1440px",
    },
    extend: {
      colors: {
        blue: {
          water: "#8af6d2",
          sky: {
            1: "#1ccbc4",
            2: "#53dbc7",
            3: "#1a9891",
            4: "#20a99c",
          },
          "night-water": "#48366a",
          "night-sky": { 1: "#121131", 2: "#212049", 3: "#2f2d65" },
          "night-dark": "#48366a",
          dark: "#16143b",
          "dark-hover": "#312d7a",
          light: { 1: "#b2e8e6", 2: "#87bab8" },
          check: "#89a0f4",
          bird: "#477b9e",
          grayish: "#9c9abf",
          whiteish: { 1: "#b0adff", 2: "#e6e6ff", 3: "#ccccff" },
        },
        gray: {
          25: "#fbfdff",
          30: "#edf5ff",
          cloud: "#5189a8",
          "bluegray-300": "#cbd5e1",
          "bluegray-500": "#475569",
        },
        green: {
          normal: "#02cc7b",
          hover: "#00c677",
          ring: "#00bc71",
          "hover-ring": "#00b56c",
        },
        purple: {
          light: {
            1: "#64548d",
            2: "#6d5b9b",
            3: "#d7d0ee",
            4: "#d3cbee",
            5: "#dcd7ee",
            6: "#4b3d96",
          },
        },
        red: {
          faded: "#f48989",
          "faded-dark": "#f0a3c7",
          sky: {
            1: "#803b67",
            2: "#b35290",
            3: "#6e3258",
            4: "#914375",
            error: "#e2809b",
          },
        },
        white: {
          "faded-50": "rgba(255, 255, 255, 0.7)",
        },
        yellow: {
          badge: "#ffdf89",
          pirate: "#fed053",
          "pirate-hover": "#fcca44",
          "pirate-ring": "#ffdd81",
          "pirate-hover-ring": "#fed568",
          "old-gold": "#ffdd81",
        },
      },
      fontFamily: {
        "pirate-gr": ["pirate_grungeregular"],
      },
      fontSize: {
        smallest: [".625rem", { lineHeight: ".75rem" }],
        "1.5xl": ["1.375rem", { lineHeight: "1.875rem" }],
        "2.5xl": ["1.6875rem", { lineHeight: "2.125rem" }],
      },
      letterSpacing: {
        "wide-2": ".04em",
      },
      backgroundImage: (theme) => ({
        "checkbox-unchecked": "url('./src/css/images/checkbox-unchecked.svg')",
        "checkbox-checked": "url('./src/css/images/checkbox-checked.svg')",
        "checkbox-unchecked-dark":
          "url('./src/css/images/checkbox-unchecked-dark.svg')",
        "checkbox-checked-dark":
          "url('./src/css/images/checkbox-checked-dark.svg')",
      }),
      borderRadius: {
        x2: "3rem",
        "x1.5": "2.5rem",
      },
      borderWidth: {
        0: "0px",
        1: "1px",
        3: "3px",
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
        4.5: "1.125rem",
        5.5: "1.375rem",
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
      backgroundColor: ["focus", "checked"],
      backgroundImage: ["checked", "hover"],
      borderColor: ["checked", "hover"],
      borderWidth: ["hover"],
      borderStyle: ["hover"],
      borderRadius: ["hover"],
      opacity: ["disabled"],
      pointerEvents: ["disabled"],
      ringColor: ["hover"],
      scale: ["active"],
    },
  },
  plugins: [],
};

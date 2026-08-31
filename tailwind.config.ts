import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        powder: {
          pink: "#F7C9D4",
          light: "#FDF4F6",
          dark: "#E8A5B6",
        },
        baby: {
          blue: "#CFE8F7",
          light: "#EFF7FC",
          dark: "#A3D2F0",
        },
        lavender: {
          soft: "#DDD3F5",
          light: "#F5F1FD",
          dark: "#BAA7EA",
        },
        cream: {
          DEFAULT: "#FFF9F3",
          50: "#FFFCF9",
          100: "#FFF9F3",
          200: "#FDF1E2",
        },
        warm: {
          beige: "#F3E8DC",
          light: "#F9F4EE",
          dark: "#DFCEBA",
        },
        cocoa: {
          deep: "#493B3B",
          DEFAULT: "#493B3B",
          light: "#6A5858",
          muted: "#8C7D7D",
        },
        sage: {
          green: "#A3C9A8",
          light: "#F0F7F1",
          dark: "#81AB87",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-nunito)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-dm-serif)", "Playfair Display", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(73, 59, 59, 0.07)",
        "soft-md": "0 14px 35px -10px rgba(73, 59, 59, 0.1)",
        "soft-lg": "0 20px 45px -12px rgba(73, 59, 59, 0.12)",
        "pastel-pink": "0 12px 30px -8px rgba(247, 201, 212, 0.5)",
        "pastel-blue": "0 12px 30px -8px rgba(207, 232, 247, 0.5)",
        "pastel-lavender": "0 12px 30px -8px rgba(221, 211, 245, 0.5)",
        float: "0 20px 40px -15px rgba(73, 59, 59, 0.15)",
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "float-delayed": "floatSlow 7s ease-in-out 2s infinite",
        "float-reverse": "floatReverse 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spinSlow 25s linear infinite",
        "sparkle-blink": "sparkleBlink 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "blob": "blob 10s infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(-2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        sparkleBlink: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

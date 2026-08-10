/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-disabled": "var(--color-text-disabled)",
        border: "var(--color-border)",
        copper: "var(--color-accent-copper)",
        terracotta: "var(--color-accent-terracotta)",
        ember: "var(--color-accent-ember)",
        crimson: "var(--color-accent-crimson)",
        teal: "var(--color-teal)",
        "on-accent": "var(--color-on-accent)",
        "surface-active": "var(--color-surface-active)",
      },
      borderRadius: {
        tiny: "var(--radius-tiny)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
        heading: ["General Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        hover: "180ms",
        press: "120ms",
        open: "220ms",
        success: "250ms",
      },
    },
  },
  plugins: [],
};

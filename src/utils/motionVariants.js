import { useReducedMotion } from "framer-motion";

// Helper to check media query natively in JS outside React lifecycle
const checkReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const isReduced = checkReducedMotion();

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: "var(--shadow-sm)" },
  hover: {
    y: isReduced ? 0 : -4,
    boxShadow: "var(--shadow-md)",
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

export const thumbnailScale = {
  rest: { scale: 1 },
  hover: {
    scale: isReduced ? 1 : 1.02,
    transition: { duration: 0.13, ease: [0.4, 0, 0.2, 1] },
  },
};

export const fadeSlideUp = {
  hidden: { opacity: 0, y: isReduced ? 0 : 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  },
};

export const dropdownVariant = {
  hidden: { opacity: 0, y: isReduced ? 0 : -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export const pressable = {
  rest: { scale: 1 },
  pressed: { scale: isReduced ? 1 : 0.98, transition: { duration: 0.12 } },
};

// React hook version for dynamic hook-based variants
export const useMotionVariants = () => {
  const shouldReduceMotion = useReducedMotion();
  return {
    cardHover: {
      rest: { y: 0, scale: 1, boxShadow: "var(--shadow-sm)" },
      hover: {
        y: shouldReduceMotion ? 0 : -4,
        boxShadow: "var(--shadow-md)",
        transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
      },
    },
    thumbnailScale: {
      rest: { scale: 1 },
      hover: {
        scale: shouldReduceMotion ? 1 : 1.02,
        transition: { duration: 0.13, ease: [0.4, 0, 0.2, 1] },
      },
    },
    fadeSlideUp: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
      },
    },
    dropdownVariant: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    },
    pressable: {
      rest: { scale: 1 },
      pressed: {
        scale: shouldReduceMotion ? 1 : 0.98,
        transition: { duration: 0.12 },
      },
    },
  };
};

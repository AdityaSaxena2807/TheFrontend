// Motion variants for consistent animations across the app
// Uses design token timing values

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: 'var(--shadow-sm)' },
  hover: {
    y: -4,
    boxShadow: 'var(--shadow-md)',
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

export const thumbnailScale = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.13, ease: [0.4, 0, 0.2, 1] } },
};

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } },
};

export const dropdownVariant = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export const pressable = {
  rest: { scale: 1 },
  pressed: { scale: 0.98, transition: { duration: 0.12 } },
};

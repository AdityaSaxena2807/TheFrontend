import React from "react";

const VARIANTS = {
  primary:
    "bg-terracotta hover:bg-ember active:bg-crimson text-text-primary rounded-sm px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-hover active:scale-[0.98] active:duration-press",
  secondary:
    "bg-surface hover:bg-surface-elevated text-text-primary rounded-sm px-4 py-2 transition-colors duration-hover",
  ghost:
    "bg-transparent hover:bg-surface-elevated/50 text-text-secondary rounded-sm px-3 py-1.5 transition-colors duration-hover",
  danger:
    "bg-crimson hover:bg-[#a53a28] text-white rounded-sm px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-hover active:scale-[0.98] active:duration-press",
  icon: "rounded-full p-2 hover:bg-surface-elevated transition-all duration-hover hover:shadow-sm",
};

function Button({
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

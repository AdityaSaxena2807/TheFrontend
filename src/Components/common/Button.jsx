import React from "react";

const VARIANTS = {
  primary:
    "bg-terracotta hover:bg-ember active:bg-crimson text-white rounded-sm px-4 py-2 font-medium shadow-sm hover:shadow-md",
  secondary:
    "bg-surface hover:bg-surface-elevated text-white rounded-sm px-4 py-2",
  ghost:
    "bg-transparent hover:bg-surface-elevated/50 text-gray-300 rounded-sm px-3 py-1.5",
  danger:
    "bg-crimson hover:bg-[#a53a28] text-white rounded-sm px-4 py-2 font-medium shadow-sm hover:shadow-md",
  icon: "rounded-full p-2 hover:bg-surface-elevated text-gray-300 hover:text-white",
};

function Button({
  variant = "primary",
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      disabled={disabled}
      className={`transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

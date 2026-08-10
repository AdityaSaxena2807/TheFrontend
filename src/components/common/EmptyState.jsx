import React from "react";

function EmptyState({ title, subtitle, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      {icon && <div className="text-text-disabled text-4xl mb-4">{icon}</div>}
      <p className="text-text-primary font-heading font-medium text-lg">
        {title}
      </p>
      {subtitle && (
        <p className="text-text-secondary text-sm mt-1 max-w-sm">{subtitle}</p>
      )}
    </div>
  );
}

export default EmptyState;

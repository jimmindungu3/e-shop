import React from "react";

const Loader = ({ text = "", color = "currentColor", size = "small" }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6"
  };

  return (
    <span className="flex items-center justify-center gap-1">
      {text && <span className="text-sm">{text}</span>}
      <span className="relative flex">
        <span 
          className={`absolute ${sizeClasses[size]} rounded-full border-2 border-t-transparent border-b-transparent animate-spin`} 
          style={{ borderColor: `${color} transparent ${color} transparent` }}
        />
        <span 
          className={`${sizeClasses[size]} rounded-full border-2 border-l-transparent border-r-transparent animate-pulse`} 
          style={{ borderColor: `transparent ${color} transparent ${color}` }}
        />
      </span>
    </span>
  );
};

export default Loader;
import React from "react";
import Duck from "../../assets/icons/Duck.gif";
// adjust the path according to where you store the image in your project

function Logo() {
  return (
    <div className="logo">
      <img src={Duck} alt="App Logo" className="w-16 h-16 object-contain" />
    </div>
  );
}

export default Logo;

import React from "react";
import { useUiStore } from "../../store/uiStore";
import { LOGO_MAP } from "../../utils/logoMap";
import option1 from "../../assets/icons/option1.png";
import option2 from "../../assets/icons/option2.png";
import option3 from "../../assets/icons/option3.png";
function Logo() {
  const selectedLogo = useUiStore((s) => s.selectedLogo);

  return (
    <div className="logo flex items-center gap-1 cursor-pointer group select-none">
      <img
        src={LOGO_MAP[selectedLogo]}
        alt="App Logo"
        className="w-14 h-14 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
      />

      <img
        src={option1}
        alt="Ducky"
        className="h-9 object-contain transition-transform duration-300 ease-out group-hover:scale-115"
      />
    </div>
  );
}

export default Logo;
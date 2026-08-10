import React from "react";
import { useUiStore } from "../../store/uiStore";
import { LOGO_MAP } from "../../utils/logoMap";
import { useNavigate } from "react-router-dom";
import option1 from "../../assets/icons/option1.png";
function Logo() {
  const selectedLogo = useUiStore((s) => s.selectedLogo);
  const navigate = useNavigate();

  return (
    <div
      className="logo flex items-center gap-1 cursor-pointer select-none"
      onClick={() => navigate("/")}
    >
      <img
        src={LOGO_MAP[selectedLogo]}
        alt="App Logo"
        className="w-9 h-9 sm:w-14 sm:h-14 object-contain"
      />

      <img src={option1} alt="Ducky" className="h-6 sm:h-9 object-contain" />
    </div>
  );
}

export default Logo;

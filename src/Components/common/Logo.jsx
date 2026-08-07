import React from "react";
import Duck from "../../assets/icons/Duck.gif";
import LuffyDuck from "../../assets/icons/LuffyDuck.gif";
import ZoroDuck from "../../assets/icons/ZoroDuck.gif";
import {useUiStore} from "../../store/uiStore";

const LOGO_MAP = { Duck, LuffyDuck, ZoroDuck };

function Logo() {
  const selectedLogo = useUiStore((s) => s.selectedLogo);
  return (
    <div className="logo">
      <img
        src={LOGO_MAP[selectedLogo]}
        alt="App Logo"
        className="w-16 h-16 object-contain"
      />
    </div>
  );
}

export default Logo;
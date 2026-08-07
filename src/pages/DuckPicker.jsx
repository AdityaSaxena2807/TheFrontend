import React from "react";
import Duck from "../assets/icons/Duck.gif";
import LuffyDuck from "../assets/icons/LuffyDuck.gif";
import ZoroDuck from "../assets/icons/ZoroDuck.gif";
import { useUiStore } from "../store/uiStore";

const LOGO_OPTIONS = [
  { name: "Duck", src: Duck },
  { name: "LuffyDuck", src: LuffyDuck },
  { name: "ZoroDuck", src: ZoroDuck },
];

function DuckPicker() {
  const { selectedLogo, setSelectedLogo } = useUiStore();

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Choose your logo</h2>
      <div className="flex gap-6 flex-wrap">
        {LOGO_OPTIONS.map((logo) => (
          <button
            key={logo.name}
            onClick={() => setSelectedLogo(logo.name)}
            className={`p-3 rounded-xl border-2 transition ${
              selectedLogo === logo.name
                ? "border-blue-500 bg-blue-50"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-20 h-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default DuckPicker;

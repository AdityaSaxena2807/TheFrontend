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
			<h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
				Choose your app logo
			</h2>
			<div className="flex gap-6 flex-wrap">
				{LOGO_OPTIONS.map((logo) => (
					<button
						key={logo.name}
						onClick={() => setSelectedLogo(logo.name)}
						className={`p-4 rounded-md border-2 transition-all duration-hover ${
							selectedLogo === logo.name
								? "border-terracotta bg-surface-elevated"
								: "border-border hover:border-terracotta/50 bg-surface"
						}`}
					>
						<img
							src={logo.src}
							alt={logo.name}
							className="w-24 h-24 object-contain"
						/>
						<p
							className={`text-sm font-body mt-2 text-center ${
								selectedLogo === logo.name
									? "text-text-primary font-medium"
									: "text-text-secondary"
							}`}
						>
							{logo.name}
						</p>
					</button>
				))}
			</div>
		</div>
	);
}

export default DuckPicker;

import React from "react";
import { useUiStore } from "../store/uiStore.js";
import { LOGO_MAP } from "../utils/logoMap.js";

const LOGO_OPTIONS = Object.entries(LOGO_MAP).map(([name, src]) => ({
	name,
	src,
}));

function DuckPicker() {
	const { selectedLogo, setSelectedLogo } = useUiStore();

	return (
		<div className="p-6 pb-16">
			<h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
				Choose your app logo
			</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
				{LOGO_OPTIONS.map((logo) => (
					<button
						key={logo.name}
						onClick={() => setSelectedLogo(logo.name)}
						className={`p-4 rounded-md border-2 transition-all duration-hover cursor-pointer ${
							selectedLogo === logo.name
								? "border-terracotta bg-surface-elevated"
								: "border-border hover:border-terracotta/50 bg-surface"
						}`}
					>
						<div className="w-24 h-24 flex items-center justify-center mx-auto">
							<img
								src={logo.src}
								alt={logo.name}
								loading="lazy"
								className="max-w-full max-h-full object-contain"
							/>
						</div>

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

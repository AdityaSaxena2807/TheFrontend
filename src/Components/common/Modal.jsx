import React from "react";
import Button from "./Button.jsx";

function Modal({
	open,
	title,
	children,
	onCancel,
	onOk,
	okText = "Confirm",
	cancelText = "Cancel",
}) {
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-100 flex items-center justify-center bg-bg/70"
			onClick={onCancel}
		>
			<div
				className="bg-surface-elevated text-text-primary rounded-lg shadow-lg w-full max-w-sm p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
					{title}
				</h2>
				<div className="text-sm text-text-secondary font-body mb-6">
					{children}
				</div>
				<div className="flex justify-end gap-3">
					<Button onClick={onCancel} variant="secondary" className="">
						{cancelText}
					</Button>
					<Button onClick={onOk} variant="danger" className="">
						{okText}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Modal;

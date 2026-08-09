import toast from "react-hot-toast";
const commonStyles = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
  },
  // Optional: Ensure error toasts stay longer if needed
  duration: 4000,
};
export const ToastError = (message) => {
  toast.error(message, commonStyles);
};

export const ToastSuccess = (message) => {
  toast.success(message, commonStyles);
};

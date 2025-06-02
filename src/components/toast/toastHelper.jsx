import { toast } from "react-toastify";

/**
 * Show a styled toast message
 * @param {"success" | "error" | "info" | "warn"} type
 * @param {string} message
 * @param {boolean} isDark - Optional, if not provided, uses system preference
 */
export const showToast = (type, message, isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches) => {
  const backgroundColor = isDark ? "#1f2937" : "#E0E0E0";
  const textColor = isDark ? "#8b949e" : "#1a237e";

  toast[type](message, {
    className: isDark ? "toast-dark" : "toast-light",
    style: {
      backgroundColor,
      color: textColor,
    },
    icon: false,
  });
};

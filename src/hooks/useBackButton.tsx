import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useBackButton = (path?: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const callback = () => {
      if (location.key !== "default") {
        const navigatePath = path || "-1";
        navigate(navigatePath);
      } else {
        const navigatePath = path || "/";
        navigate(navigatePath);
      }
    };
    if (window.Telegram?.WebApp?.BackButton) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(callback);
    }

    return () => {
      if (window.Telegram?.WebApp?.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(callback);
      }
    };
  }, [path, navigate, location.key]);

  return { BackButton: window.Telegram?.WebApp?.BackButton || {} };
};

export default useBackButton;

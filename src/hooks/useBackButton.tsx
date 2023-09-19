import { useEffect } from "react";
import { useNavigate } from "react-router";

const useBackButton = ({ path }: { path?: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const callback = () => {
      navigate(path || "/");
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
  }, [path, navigate]);

  return { BackButton: window.Telegram?.WebApp?.BackButton || {} };
};

export default useBackButton;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const callback = () => {
      if (location.key !== "default") {
        navigate(-1);
      } else {
        navigate("/");
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
  }, [navigate]);

  return { BackButton: window.Telegram?.WebApp?.BackButton || {} };
};

export default useBackButton;

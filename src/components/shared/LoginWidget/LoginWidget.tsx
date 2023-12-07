import React, { useEffect } from "react";

type LoginWidgetProps = {
  botName: string;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: string;
  usePic?: boolean;
  dataOnauth?: (user: any) => void;
  dataAuthUrl?: () => string;
  lang?: string;
  widgetVersion?: number;
};

const LoginWidget = (props: LoginWidgetProps) => {
  const {
    botName = "samplebot",
    buttonSize = "large",
    cornerRadius = 20,
    requestAccess = "write",
    usePic = true,
    dataOnauth = () => {},
    dataAuthUrl,
    lang = "en",
    widgetVersion = 22,
  } = props;

  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: (user: any) => dataOnauth(user),
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-userpic", usePic.toString());
    script.setAttribute("data-lang", lang);
    if (dataAuthUrl !== undefined) {
      script.setAttribute("data-auth-url", dataAuthUrl());
    } else {
      script.setAttribute(
        "data-onauth",
        "TelegramLoginWidget.dataOnauth(user)"
      );
    }
    script.async = true;
    document.getElementById("login-widget")?.appendChild(script);
  }, [
    botName,
    widgetVersion,
    buttonSize,
    cornerRadius,
    requestAccess,
    usePic,
    lang,
    dataOnauth,
    dataAuthUrl,
  ]);

  return <div id="login-widget" />;
};

export default LoginWidget;

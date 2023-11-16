export const getPlatformDesign = (): "apple" | "material" => {
  const platform = window.Telegram?.WebApp?.platform;
  if (platform) {
    return platform === "macos" || platform === "ios" ? "apple" : "material";
  } else if (
    navigator.userAgent.match(/iOS|iPhone OS|iPhone|iPod|iPad|Mac OS/i)
  ) {
    return "apple";
  } else {
    return "material";
  }
};

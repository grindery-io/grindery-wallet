declare global {
  interface Window {
    twq?: (...args: any[]) => void;
  }
}

interface TwitterEventTracker {
  exe?: ((...args: any[]) => void) | undefined;
  queue: any[];
  version: string;
}

export const initTwitter = (): void => {
  const head = document.querySelector("head")!;
  const addTwitterScript = (): void => {
    const twitterScript = document.createElement("script");
    twitterScript.type = "text/javascript";
    twitterScript.async = true;
    twitterScript.src = "https://static.ads-twitter.com/uwt.js";
    head.appendChild(twitterScript);
  };

  const initializeTwq = (
    windowObj: Window,
    documentObj: Document,
    elementType: string
  ): void => {
    const twitterEventTracker: TwitterEventTracker = {
      queue: [],
      version: "1.1",
    };
    if (!windowObj.twq) {
      windowObj.twq = (...args: any[]) => {
        twitterEventTracker.exe
          ? twitterEventTracker.exe.apply(twitterEventTracker, args)
          : twitterEventTracker.queue.push(args);
      };

      const twitterScriptElement: HTMLScriptElement = documentObj.createElement(
        elementType
      ) as HTMLScriptElement;
      twitterScriptElement.async = true;
      twitterScriptElement.src = "https://static.ads-twitter.com/uwt.js";
      const a = documentObj.getElementsByTagName(elementType)[0];
      a.parentNode!.insertBefore(twitterScriptElement, a);
    }
  };

  addTwitterScript();
  initializeTwq(window, document, "script");
  window.twq?.("config", "ofep3");
};

export const sendTwitterConversion = (eventId: string, params = {}) => {
  if (!window.twq) {
    console.error("sendTwitterConversion error: twq is undefined");
    return;
  }
  window.twq("event", eventId, params);
};

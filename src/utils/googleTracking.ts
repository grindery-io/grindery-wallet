declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const sendGoogleEvent = (params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(params);
};

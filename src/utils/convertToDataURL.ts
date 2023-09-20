export const convertToDataURL = async (bufferData: number[]) => {
  try {
    // Convert the buffer data array to an ArrayBuffer
    const buffer = new Uint8Array(bufferData).buffer;

    // Convert the ArrayBuffer to a base64 string
    const base64String = btoa(
      // @ts-ignore
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    );

    // Create a data URL for a PNG image
    const dataUrl = `data:image/png;base64,${base64String}`;

    return dataUrl;
  } catch (err) {
    console.error(err);
  }
};

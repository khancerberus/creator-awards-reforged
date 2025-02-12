export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
};

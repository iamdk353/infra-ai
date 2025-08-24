export const cleanText = (text: string) => {
  return text
    .replace(/[\r\n\t]+/g, " ") // Remove \n, \r, and \t (tabs)
    .replace(/\s+/g, " ") // Normalize multiple spaces to single space
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, "") // Remove non-printable chars
    .trim(); // Remove leading/trailing whitespace
};

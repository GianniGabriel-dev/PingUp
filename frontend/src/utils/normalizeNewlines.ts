export const normalizeNewlines = (text: string): string => {
  return text.replace(/\n{3,}/g, "\n\n");
};

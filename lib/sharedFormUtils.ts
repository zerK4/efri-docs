export const magicRename = (string: string) => {
  const normalizedString = string
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();

  return normalizedString
    .split("_")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ");
};

export const generateRandomId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

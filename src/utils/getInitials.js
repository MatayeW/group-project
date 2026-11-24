export const getInitials = (name = "") => {
    const words = name.split(" ").filter(Boolean);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return words
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
};
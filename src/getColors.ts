export const getCardBackgroundColor = (colorScheme: string) => {
  switch (colorScheme) {
    case "blue":
      return "bg-blue-50";
    case "red":
      return "bg-red-50";
    case "orange":
      return "bg-orange-50";
    default:
      return "bg-orange-50";
  }
};

export const getIconBackgroundColor = (colorScheme: string) => {
  switch (colorScheme) {
    case "blue":
      return "bg-blue-100";
    case "red":
      return "bg-red-100";
    case "orange":
      return "bg-orange-100";
    default:
      return "bg-orange-100";
  }
};

export const getLevelColor = (
  level: number,
  colorScheme: "blue" | "red" | "orange",
): string => {
  const schemes = {
    blue: [
      "bg-blue-100/30",
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-500",
      "bg-blue-600",
    ],
    red: [
      "bg-red-100/30",
      "bg-red-200",
      "bg-red-300",
      "bg-red-500",
      "bg-red-600",
    ],
    orange: [
      "bg-orange-100/30",
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-500",
      "bg-orange-600",
    ],
  };

  return schemes[colorScheme][level];
};

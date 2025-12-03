export function formatCategories(input?: string[] | { name: string }[]) {
  if (!input || input.length === 0) return "—";

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (typeof input[0] === "object") {
    return (input as { name: string }[])
      .map((c) => capitalizeFirstLetter(c.name))
      .join(", ");
  }

  return (input as string[])
    .map((name) => capitalizeFirstLetter(name))
    .join(", ");
}

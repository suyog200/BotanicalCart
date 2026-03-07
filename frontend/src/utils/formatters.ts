export function formatCategories(input?: string[] | { name: string }[]) {
  if (!input || input.length === 0) return "—";

  const capitalizeFirstLetter = (str: string | undefined | null) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (typeof input[0] === "object") {
    return (
      (input as { name?: string }[])
        .filter((c) => c && c.name) // Filter out items without valid names
        .map((c) => capitalizeFirstLetter(c.name))
        .join(", ") || "—"
    );
  }

  return (
    (input as string[])
      .filter((name) => name) // Filter out empty/undefined strings
      .map((name) => capitalizeFirstLetter(name))
      .join(", ") || "—"
  );
}

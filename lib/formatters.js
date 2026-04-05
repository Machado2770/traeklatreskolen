export function csvEscape(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
    return `"\${str.replace(/"/g, '""')}"`;
  }
  return str;
}

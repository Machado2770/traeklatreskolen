// Fælles formatering — kan bruges af både server- og klientkomponenter.

export function formatPrice(kr) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(kr);
}

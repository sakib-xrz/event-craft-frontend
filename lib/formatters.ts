export function formatDate(date: string): string {
  const localDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(localDate);
}

export function formatTime(date: string): string {
  const localDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(localDate);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDateTime(date: string): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

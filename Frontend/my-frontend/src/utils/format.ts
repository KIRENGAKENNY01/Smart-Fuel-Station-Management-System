export function formatRwf(amount: number | undefined | null): string {
  const n = Number(amount) || 0;
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v % 1 === 0 ? v : v.toFixed(1)}M RWF`;
  }
  if (n >= 1000) {
    const v = n / 1000;
    return `${v % 1 === 0 ? v : v.toFixed(1)}K RWF`;
  }
  return `${n.toLocaleString()} RWF`;
}

export function formatLiters(liters: number | undefined | null): string {
  const n = Number(liters) || 0;
  if (n >= 1000) {
    const v = n / 1000;
    return `${v % 1 === 0 ? v : v.toFixed(1)}K L`;
  }
  return `${n.toLocaleString()} L`;
}

export function fuelTypeLabel(fuel: { fuelTypes?: string; name?: string; fuelType?: string } | string | null): string {
  if (!fuel) return 'Fuel';
  const raw = typeof fuel === 'string' ? fuel : fuel.fuelType || fuel.fuelTypes || fuel.name || 'Fuel';
  if (raw === 'PETROL') return 'Petrol';
  if (raw === 'DIESEL') return 'Diesel';
  return raw;
}

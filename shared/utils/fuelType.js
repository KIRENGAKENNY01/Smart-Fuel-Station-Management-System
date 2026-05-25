/**
 * Resolve display label for a fuel type ref (populated doc, id, or string code).
 */
export function resolveFuelTypeLabel(fuelTypeRef) {
  if (fuelTypeRef == null) return "Unknown";

  if (typeof fuelTypeRef === "string") {
    const s = fuelTypeRef.trim();
    if (/petrol|P95/i.test(s)) return "Petrol";
    if (/diesel|D10/i.test(s)) return "Diesel";
    return "Unknown";
  }

  const code = fuelTypeRef.fuelTypes ?? fuelTypeRef.name ?? fuelTypeRef.fuelType ?? fuelTypeRef.type ?? fuelTypeRef.fuel_type;
  if (!code) {
    return "Unknown";
  }

  if (/petrol|P95/i.test(String(code))) return "Petrol";
  if (/diesel|D10/i.test(String(code))) return "Diesel";
  return String(code);
}

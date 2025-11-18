export const isEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

export const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;

export const clampRating = (r) => {
  if (r == null) return null;
  const n = Number(r);
  if (Number.isNaN(n)) return null;
  return Math.min(5, Math.max(1, n));
};

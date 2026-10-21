// WAEC-style grade scale.
export const gradeOf = (p) =>
  p >= 75 ? "A1" : p >= 70 ? "B2" : p >= 65 ? "B3" : p >= 60 ? "C4" : p >= 55 ? "C5" : p >= 50 ? "C6" : p >= 45 ? "D7" : p >= 40 ? "E8" : "F9";
export const pct = (score, total) => (total ? Math.round((score / total) * 1000) / 10 : 0);

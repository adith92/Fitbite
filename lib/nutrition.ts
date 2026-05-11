export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: "male" | "female") {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}

export function calculateTDEE(bmr: number, multiplier = 1.55) {
  return Math.round(bmr * multiplier);
}

export function targetCalories(tdee: number, goal: "fat_loss" | "cutting" | "bulking" | "maintain") {
  if (goal === "fat_loss") return Math.round(tdee * 0.8);
  if (goal === "cutting") return Math.round(tdee * 0.85);
  if (goal === "bulking") return Math.round(tdee * 1.12);
  return tdee;
}

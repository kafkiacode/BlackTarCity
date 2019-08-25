export default function getRandomWeights(steps, variation = 0) {
  return function getWeights() {
    let total = 0;
    const variations = [];
    for (let i = 0; i < steps; i++) {
      variations[i] = 1 + Math.random() * variation - variation / 2;
      total += variations[i];
    }
    return variations.map((v) => v / total);
  };
}

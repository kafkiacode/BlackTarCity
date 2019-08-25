export default function getRandomScale(steps, variation = 0) {
  return function getScale() {
    let total = 0;
    let acc = 0;
    return Array(steps)
      .fill()
      .map(() => {
        const d = 1 + Math.random() * variation - variation / 2;
        total += d;
        return d;
      })
      .map((d) => {
        acc += d / total;
        return acc;
      });
  };
}

import Stats from 'stats-js';

let stats;

export default function useStats() {
  if (!stats) {
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }
  return stats;
}

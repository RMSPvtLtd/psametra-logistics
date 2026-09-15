export function heroPhase(progress: number) {
  const segment = (start: number, end: number) => {
    const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };
  return { film: Math.max(0, Math.min(1, progress / .7)), cover: segment(.7, .76), rotate: segment(.76, .86) * 90, split: segment(.86, 1) };
}

import { producers } from '@/database';

type IntervalResult = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export function register() {
  const intervals: IntervalResult[] = producers.flatMap((producer) => {
    const winningMovies = producer.movies.filter((m) => m.winner);

    const years = winningMovies.map((m) => m.year).sort((a, b) => a - b);

    if (years.length < 2) return [];

    return years.slice(1).map((year, index) => ({
      producer: producer.name,
      interval: year - years[index],
      previousWin: years[index],
      followingWin: year,
    }));
  });

  if (intervals.length === 0) {
    return { min: [], max: [] };
  }

  const min = Math.min(...intervals.map((i) => i.interval));
  const max = Math.max(...intervals.map((i) => i.interval));

  return {
    min: intervals.filter((i) => i.interval === min),
    max: intervals.filter((i) => i.interval === max),
  };
}

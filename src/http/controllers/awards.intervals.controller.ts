import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type IntervalResult = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export async function register() {
  const producers = await prisma.producer.findMany({
    include: {
      movies: {
        where: { winner: true },
      },
    },
  });

  const intervals: IntervalResult[] = producers.flatMap((producer) => {
    const years = producer.movies.map((m) => m.year).sort((a, b) => a - b);
    if (years.length < 2) return [];

    return years.slice(1).map((year, index) => ({
      producer: producer.name,
      interval: year - years[index],
      previousWin: years[index],
      followingWin: year,
    }));
  });

  const min = Math.min(...intervals.map((i) => i.interval));
  const max = Math.max(...intervals.map((i) => i.interval));

  return {
    min: intervals.filter((i) => i.interval === min),
    max: intervals.filter((i) => i.interval === max),
  };
}

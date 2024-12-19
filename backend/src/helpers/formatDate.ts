export const formatDate = function (date: Date, locale: string): string {
  const calcDaysPassed = (date1: Date, date2: Date): number =>
    Math.round(
      Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
    );

  const daysPassed: number = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

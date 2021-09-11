const buildCal = (curDay) => {
  const startDay = curDay.startOf("month").startOf("week");
  const endDay = curDay.endOf("month").endOf("week");
  const end = endDay.subtract(1, "day");
  let day = startDay.subtract(1, "day");

  const calendar = [[]];
  let count = 0;
  while (day.isBefore(end)) {
    if (count === 7) {
      count = 0;
      calendar.push([]);
    }
    day = day.add(1, "day");
    calendar.at(-1).push(day);
    count++;
  }

  return calendar;
};

export default buildCal;

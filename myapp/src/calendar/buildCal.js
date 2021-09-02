import dayjs from "dayjs";
import badMutable from "dayjs/plugin/badMutable";

dayjs.extend(badMutable);

const buildCal = (curDay) => {
  const startDay = curDay.clone().startOf("month").startOf("week");
  const endDay = curDay.clone().endOf("month").endOf("week");
  const end = endDay.clone().subtract(1, "day");
  const day = startDay.clone().subtract(1, "day");

  const calendar = [];
  while (day.isBefore(end)) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return calendar;
};

export default buildCal;

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const CalendarUtility = {
  getMonth(year, month) {
    const firstDayOfMonth = moment([year, month, 1]).startOf('month');
    const lastDayOfMonth = moment([year, month, 1]).endOf('month');
    const firstDayOfRange = firstDayOfMonth.clone().startOf('isoWeek');
    const lastDayOfRange = lastDayOfMonth.clone().endOf('isoWeek');

    const range = moment.range(firstDayOfRange, lastDayOfRange);
    const days = Array.from(range.by('day'));
    const arrayDays = [];

    days.forEach((day) => {
      arrayDays.push({
        day,
        isBefore: day.isBefore(firstDayOfMonth, 'day'),
        isAfter: day.isAfter(lastDayOfMonth, 'day'),
      });
    });

    return arrayDays;
  },
  getMonthByWeek(currentYear, currentMonth) {
    const monthByWeek = [];
    const month = CalendarUtility.getMonth(currentYear, currentMonth);
    for (let weekIndex = 0; weekIndex < month.length; weekIndex += 7) {
      const rows = [];
      for (let dayIndex = weekIndex; dayIndex < weekIndex + 7; dayIndex += 1) {
        rows.push(month[dayIndex]);
      }
      monthByWeek.push(rows);
    }

    return monthByWeek;
  },
};

export default CalendarUtility;

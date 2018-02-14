import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const calendar = {
  getMonth(year, month) {
    const firstDayOfMonth = moment([year, month, 1]).startOf('month');
    const lastDayOfMonth = moment([year, month, 1]).endOf('month');
    const firstDayOfRange = firstDayOfMonth.clone().startOf('isoWeek');
    const lastDayOfRange = lastDayOfMonth.clone().endOf('isoWeek');

    const range = moment.range(firstDayOfRange, lastDayOfRange);
    const days = Array.from(range.by('day'));
    const arrayDays = [];
    console.log(firstDayOfMonth, lastDayOfMonth);
    days.forEach((day) => {
      arrayDays.push({
        day,
        isBefore: day.isBefore(firstDayOfMonth, 'day'),
        isAfter: day.isAfter(lastDayOfMonth, 'day'),
      });
    });
    console.log(arrayDays);
    return arrayDays;
  },
};

export default calendar;

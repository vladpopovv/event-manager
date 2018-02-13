import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const calendar = {
  getMonth(year, month) {
    const firstDayOfMonth = moment([year, month]).startOf('month');
    const lastDayOfMonth = moment([year, month]).endOf('month');
    const firstDayOfRange = firstDayOfMonth.startOf('isoWeek');
    const lastDayOfRange = lastDayOfMonth.endOf('isoWeek');
    const range = moment.range(firstDayOfRange, lastDayOfRange);
    const days = Array.from(range.by('day'));
    const arrayDays = [];

    days.forEach((day) => {
      arrayDays.push({
        day,
        isBefore: day.isBefore(moment([year, month]).startOf('month')),
        isAfter: !day.isBefore(moment([year, month]).endOf('month')),
      });
    });
    return arrayDays;
  },
};

export default calendar;

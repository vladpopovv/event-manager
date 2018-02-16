import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const CalendarUtility = {
  getMonth(year, month) {
    const firstDayOfMonth = moment([year, month, 1]).startOf('month');
    const lastDayOfMonth = moment([year, month, 1]).endOf('month');
    const { firstDayOfRange, lastDayOfRange } = CalendarUtility.getRangePoint(year, month);

    const range = moment.range(firstDayOfRange, lastDayOfRange);
    const days = Array.from(range.by('day'));
    const arrayDays = [];

    days.forEach((day) => {
      arrayDays.push({
        day,
        isBefore: day.isBefore(firstDayOfMonth, 'day'),
        isAfter: day.isAfter(lastDayOfMonth, 'day'),
        eventsData: {
          events: [],
        },
      });
    });

    return arrayDays;
  },
  getMonthByWeek(arrayDays) {
    const monthByWeek = [];
    for (let weekIndex = 0; weekIndex < arrayDays.length; weekIndex += 7) {
      const rows = [];
      for (let dayIndex = weekIndex; dayIndex < weekIndex + 7; dayIndex += 1) {
        rows.push(arrayDays[dayIndex]);
      }
      monthByWeek.push(rows);
    }

    return monthByWeek;
  },

  setEventsToDays(days, events = []) {
    const newDays = [];
    days.forEach((dayItem) => {
      const date = moment(dayItem.day).format('MM-DD-YYYY');
      console.log('events[date]', events[date]);
      const currentDay = {
        ...dayItem,
        eventsData: {
          events: date in events ? events[date].events : [],
        },
      };
      newDays.push(currentDay);
    });

    return newDays;
  },

  getEventsDays(events, days) {
    let eventsDays = {};
    events.forEach((event) => {
      const eventRange = moment.range(event.fromDate, event.toDate);
      const daysByEventRange = Array.from(eventRange.by('day'));
      const newEventsByRange = CalendarUtility.getEventsByRange(
        daysByEventRange,
        eventsDays,
        event,
      );
      eventsDays = {
        ...eventsDays,
        ...newEventsByRange,
      };
    });

    return CalendarUtility.setEventsToDays(days, eventsDays);
  },

  getEventsByRange(daysByEventRange, eventsDays, event) {
    const eventsByRange = {};
    daysByEventRange.forEach((day) => {
      const date = Moment(day).format('MM-DD-YYYY');
      const currentEvents = eventsDays[date] ? eventsDays[date].events : [];

      eventsByRange[date] = {
        events: currentEvents.concat(event),
      };
    });
    return eventsByRange;
  },

  getRangePoint(year, month) {
    return {
      firstDayOfRange: moment([year, month, 1]).startOf('month').startOf('isoWeek'),
      lastDayOfRange: moment([year, month, 1]).endOf('month').endOf('isoWeek'),
    };
  },
};

export default CalendarUtility;

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
const formatDate = 'MM-DD-YYYY';

const CalendarUtility = {
  getMonth(year, month) {
    const firstDayOfMonth = moment([year, month, 1]);
    const lastDayOfMonth = moment([year, month, 1]).endOf('month');
    const { firstDayOfRange, lastDayOfRange } = CalendarUtility.getRangePoint(year, month);

    const range = moment.range(firstDayOfRange, lastDayOfRange);
    const days = Array.from(range.by('day'));
    const mapDays = new Map();
    const today = moment().format(formatDate);

    days.forEach((day) => {
      const date = day.format(formatDate);
      mapDays.set(date, {
        day: date,
        isBefore: day.isBefore(firstDayOfMonth, 'day'),
        isAfter: day.isAfter(lastDayOfMonth, 'day'),
        eventsData: {
          events: [],
        },
      });
    });

    if (mapDays.has(today)) {
      mapDays.set(today, {
        ...mapDays.get(today),
        isToday: true,
      });
    }

    return mapDays;
  },
  getMonthByWeek(mapDays) {
    const monthByWeek = new Map();
    let weekCounter = 0;
    mapDays.forEach((dayItem, i) => {
      let currentWeek = new Map();
      if (i % 7 === 0 && i > 0) {
        weekCounter += 1;
      }
      if (monthByWeek.has(weekCounter)) {
        currentWeek = monthByWeek.get(weekCounter);
      }
      currentWeek.set(dayItem.day, dayItem);
      monthByWeek.set(weekCounter, currentWeek);
    });

    return monthByWeek;
  },

  setEventsToDays(days, events = []) {
    let daysWithEvents = days;
    days.forEach((dayItem) => {
      const date = dayItem.day;
      const currentEvents = date in events ? events[date].events : [];
      daysWithEvents = CalendarUtility.setPropToMap(daysWithEvents, date, 'eventsData', {
        events: currentEvents,
      });
    });

    return daysWithEvents;
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
    let currentEvent = event;
    const eventsByRange = {};
    const firstDayOfEvent = moment(event.fromDate).format('MM-DD-YYYY');
    const lastDayOfEvent = moment(event.toDate).format('MM-DD-YYYY');
    daysByEventRange.forEach((day) => {
      currentEvent = event;
      const date = moment(day).format('MM-DD-YYYY');
      const events = eventsDays[date] ? eventsDays[date].events : [];

      if (date === firstDayOfEvent) {
        currentEvent = {
          ...currentEvent,
          isFirstDay: true,
        };
      }

      if (date === lastDayOfEvent) {
        currentEvent = {
          ...currentEvent,
          isLastDay: true,
        };
      }

      eventsByRange[date] = {
        events: events.concat(currentEvent),
      };
    });
    return eventsByRange;
  },

  getRangePoint(year, month) {
    return {
      firstDayOfRange: moment([year, month, 1]).startOf('isoWeek'),
      lastDayOfRange: moment([year, month, 1]).endOf('month').endOf('isoWeek'),
    };
  },

  setPropToMap(targetMap, key, prop, value) {
    const newValue = {
      ...targetMap.get(key),
    };
    newValue[prop] = value;

    return targetMap.set(key, newValue);
  },
};

export default CalendarUtility;

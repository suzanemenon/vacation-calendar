import moment from 'moment';
import calendar from '../data/calendar_example.json';

const DATE_FORMAT = 'MM/DD/YY';
const PIVOT_SHIFT_UNIT = 'days'

const selectedDays = 10;

function match() {
  const matchObject = [];
  
  calendar.events.forEach(event => {
    const eventDate = moment(`${event.month}/${event.day}/${event.year}`, DATE_FORMAT);
    const eventName = event.name; // The event name
    let bonusDays = 0; // Number of bridge days + weekend
    let leaveDate = undefined; // Last day before vacation starts
    let startDate = undefined; // Vacation period starts
    let endDate = undefined; // Vacation period ends
    let returnDate = undefined; // First day after vacation ends
    let badOption = undefined;
    
    if(event.bridge) {
      bonusDays = 4;
      badOption = false;
      
      if(event.day_of_week === 3) { // Tuesday so Monday is the bridge. Start period n days before
        leaveDate = moment(eventDate).add(-4, PIVOT_SHIFT_UNIT); // Friday
        startDate = moment(eventDate).add(1, PIVOT_SHIFT_UNIT);
        endDate = moment(startDate).add(selectedDays, PIVOT_SHIFT_UNIT); 
        returnDate = moment(endDate).add(1, PIVOT_SHIFT_UNIT);
        
      } else if(event.day_of_week === 5) { // Thursday so Friday is the bridge. Start period n days after
        leaveDate = moment(eventDate).add(-1, PIVOT_SHIFT_UNIT);
        startDate = moment(eventDate).add(4, PIVOT_SHIFT_UNIT);
        endDate = moment(startDate).add(selectedDays, PIVOT_SHIFT_UNIT);
        returnDate = moment(endDate).add(1, PIVOT_SHIFT_UNIT);
        
      }
    } else {
      bonusDays = 1;
      badOption = true; // Lost weekend days
      
      leaveDate = moment(eventDate).add(-1, PIVOT_SHIFT_UNIT);
      startDate = moment(eventDate).add(1, PIVOT_SHIFT_UNIT);
      endDate = moment(startDate).add(selectedDays, PIVOT_SHIFT_UNIT);
      returnDate = moment(endDate).add(1, PIVOT_SHIFT_UNIT);
    }

    matchObject.push({
      bonusDays, 
      leaveDate, 
      startDate, 
      endDate, 
      returnDate, 
      badOption, 
      eventName, 
      eventDate
    });
  });

  return (matchObject);
}

export default match;

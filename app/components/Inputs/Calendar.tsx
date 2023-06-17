'use client'

import { DateRange, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: any;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void;
}


const Calendar = ({ value, disabledDates, onChange }: CalendarProps) => {
  return (
    <DateRange 
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        minDate={new Date()}
        showDateDisplay={false}
    />
    )
}

export default Calendar;
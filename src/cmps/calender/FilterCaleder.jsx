import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';

import { addDays } from 'date-fns';
import { useState } from 'react';


export function FilterCalender({range,setRange}) {

    // const { startDate, endDate } = range[0];
    // console.log(endDate.toLocaleDateString('he-IL'))
   console.log( range)


    return <section className={'calender '+ (range[0] .startDate? 'chosen':'')} >
        <DateRange
            onChange={item => setRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={range}
            direction="horizontal"
            dateDisplayFormat='MMM yyyy'
            minDate={new Date()}
            showMonthAndYearPickers={false}

        />
    </section>
}
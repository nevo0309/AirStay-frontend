import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';

import { addDays } from 'date-fns';
import { useState} from 'react';


export function FilterCalender() {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    console.log(range)
    return <section className='calender' >
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
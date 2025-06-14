import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';

import { addDays, set } from 'date-fns';
import { useState } from 'react';


export function FilterCalender({ range, setRange, setOpenModal, openModal, cmp }) {

    // const { startDate, endDate } = range[0];
    // console.log(endDate.toLocaleDateString('he-IL'))

    function onOpenNextModal() {
        if (openModal === 'calenderCheckIn') setOpenModal('calenderCheckOut')
        else if (openModal === 'calenderCheckOut') setOpenModal('guests')
    }

    function onHandleChnage(ranges) {
        setRange(ranges)
        if (cmp === 'header') onOpenNextModal()
    }


    return <section className={'calender ' + (range[0].startDate ? 'chosen' : '')} >
        <DateRange
            onChange={(ranges) => onHandleChnage(ranges)}
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
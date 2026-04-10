import { useState } from "react"
import {DayPicker} from 'react-day-picker'
import { differenceInDays, format } from "date-fns"
// import 'react-day-picker/style.css'

function DualCalendar({onRangeSelect}) {
    const [range, setRange] = useState({
        from: undefined,
        to: undefined
    })

    const hdlRangeChange = (newRange) => {
        setRange(newRange)
        if(onRangeSelect) {
            onRangeSelect(newRange)
        }
    }

    let nights = 0;
    if (range?.from && range?.to) {
        nights = differenceInDays(range.to, range.from);
    }

  return (
    <div className="bg-white p-4 rounded-[16px] shadow-xl inline-block border border-gray-100 font-['Whitney-Book'] ">
        <DayPicker mode="range" selected={range} onSelect={hdlRangeChange} numberOfMonths={2} min={1}
        pagedNavigation={false} disabled={{ before: new Date() }} startMonth={new Date()} />
        <div className="text-sm font-[Whitney-Medium] text-neutral mt-8 pr-2 flex gap-2 justify-end">
            <div>
                {range?.from ? format(range.from, 'MMM d') : 'Check in'} - {' '}
                {range?.to ? format(range.to, 'MMM d') : 'Check out'}
            </div>
            {range?.from && range?.to && (
                <span className="ml-1 text-primary">
                    ({nights} {nights === 1 ? 'night' : 'nights'})
                </span>
            )}
        </div>
    </div>
  )
}

export default DualCalendar
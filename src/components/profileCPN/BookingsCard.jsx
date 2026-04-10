// import { motion } from 'motion/react'
import { useEffect } from 'react'
import useBookingStore from '../../stores/bookingStore.js'
import TodLongTab from '../TODLONG/TodLongTab'
import UpcomingCPN from './UpcomingCPN.jsx'

function BookingsCard() {
  const booking = useBookingStore(st=>st.booking)
  const getAllBookingsFromThisUser = useBookingStore(st=>st.getAllBookingsFromThisUser)

  // useEffect(()=>{
  //   console.log('bbbbb')
  //   getAllBookingsFromThisUser()
  //   console.log('aaaa')
  // },[getAllBookingsFromThisUser])

//   useEffect(() => {
//   console.log('Booking state changed! New data:', booking);
// }, [booking]);

  return (
    <div className='bg-base-200 w-[655px] h-fit rounded-[20px] px-10 py-7 flex flex-col'>
        <h1 className='text-[26px] mb-5'>Bookings</h1>
        <UpcomingCPN/>
        {/* <pre>booking{JSON.stringify(booking, null, 2)}</pre> */}
    </div>
  )
}

export default BookingsCard
import { useEffect } from "react"
import useBookingStore from "../stores/bookingStore"
import BSuccess from "../components/BookCPN/BSuccess"
import { useNavigate } from "react-router"
import { SuccessLogo } from "../icons"

function BookSuccess() {
  const booking = useBookingStore(st=>st.booking)
  const navigate = useNavigate()

  useEffect(()=>{
    useBookingStore.getState().setPaymentMethod('CREDIT_CARD')
  },[])

  const lastBooking = booking.length > 0 ? booking[booking.length - 1] : null
  const bk = lastBooking.bookingDetails
  const bkp = lastBooking.paymentDetails
  const bkg = lastBooking.guestList

return(
  <div className="bg-base-300 py-10">
    <div className="max-w-[800px] mx-auto pt-5 -mb-9 flex flex-col justify-between items-center">
        <SuccessLogo className="w-15 text-primary"/>
        <h1 className="text-neutral text-[26px] font-[Whitney-Bold]">You successfully created your booking</h1>
        <button onClick={()=>navigate('/account/bookings')} className="underline hover:text-primary">Go to your booking history</button>
    </div>

    <BSuccess bk={bk} bkp={bkp} bkg={bkg}/>
  </div>
)
}

export default BookSuccess
import { useEffect } from "react"
import useBookingStore from "../stores/bookingStore"
import BSuccess from "../components/BookCPN/BSuccess"

function BookSuccess() {
  const booking = useBookingStore(st=>st.booking)

  useEffect(()=>{
    useBookingStore.getState().setPaymentMethod('CREDIT_CARD')
  },[])

  const bk = booking.bookingDetails

return(
  <div className="bg-base-300 py-10">
    <BSuccess bk={bk}/>
  </div>
)
}

export default BookSuccess
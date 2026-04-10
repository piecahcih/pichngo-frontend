import BDiscount from "../components/BookCPN/BDiscount"
import BDate from "../components/BookCPN/BDate"
import BGuestInfo from "../components/BookCPN/BGuestInfo"
import BHotelInfoCard from "../components/BookCPN/BHotelInfoCard"
import BPayment from "../components/BookCPN/BPayment"
import BPrice from "../components/BookCPN/BPrice"
import BRewards from "../components/BookCPN/BRewards"
import { useNavigate, useSearchParams } from "react-router"
import useHotelStore from "../stores/hotelStore"
import { differenceInDays } from "date-fns"
import useBookingStore from "../stores/bookingStore"
import { toast } from "react-toastify"
import { useState } from "react"
import { WasBookSwal } from "../components/swal/WasBookAlert"

function BookInfo() {
  const hotels = useHotelStore(st=>st.hotels)
  const totalPrice = useBookingStore(st=>st.totalPrice)
  const guestList = useBookingStore(st=>st.guestList)
  const paymentMethod = useBookingStore(st=>st.paymentMethod)
  const promoCode = useBookingStore(st=>st.promoCode)
  const currentBooking = useBookingStore(st=>st.currentBooking)
  const{ checkin, checkout, nightCount, guest, room, roomId } = currentBooking


  const navigate = useNavigate()
  const [isBooking, setIsBooking] = useState(false)


  const currentHotel =
    hotels?.find(h => h.rooms.some(room => room.id === roomId))

  const currentRoom = currentHotel?.rooms.find(room => room.id === roomId)

  const bkInfo = {
    bookingDetails: {
      roomId: currentRoom?.id,
      roomAmount: Number(room),
      numGuest: guest,
      checkInDate: new Date(checkin),
      checkOutDate: new Date(checkout),
      // originalPrice: 9999,
      // discountAmount: 9999,
      // finalPrice: 9999
    },
    guestList: guestList,
    paymentDetails: {
          paymentMethod: paymentMethod,
          accountName: "Pichayapa Thaisedhawatkul",
          amount: 9999,
          paymentDate: new Date().toISOString(),
          paymentRefNo: "REF_123456789",
          paymentStatus: "PAID"
      }    
  }
  if(promoCode){
    bkInfo.bookingDetails.promoCode = promoCode
  }
  console.log('guestList', guestList)
  const hdlReservation = async (bkInfo) => {
    setIsBooking(true)
    try {
      await useBookingStore.getState().createBooking(bkInfo)
      
      setTimeout(()=>{
        useBookingStore.getState().resetCurrentBooking()
        navigate('/book/success')
      },1500)
    } catch (error) {
      setIsBooking(false)
      const errMsg = error.response?.data?.message || "This room has already been book"
      console.error(errMsg)
      // toast.error(errMsg)
      WasBookSwal(navigate)
    }
  }

  return (
    <div className="bg-base-300 min-h-[67vh] text-primary-content">
      <div className="mx-[10%] py-15 flex justify-center gap-8">
        <div className="flex flex-col gap-8">
          <BGuestInfo room = {{room}} />
          <BDiscount />
          <BPayment />
          <button onClick={()=>hdlReservation(bkInfo)} disabled={isBooking} 
          className="bg-primary text-white py-2 text-[20px] rounded-[8px]">
            Confirm Your Reservation {isBooking && <span className="loading loading-dots loading-md"></span>}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <BHotelInfoCard roomInfo = {{currentHotel, currentRoom}} Info = {{checkin, checkout, room, guest, nightCount}}/>
          <BPrice roomInfo = {{currentRoom}} Info = {{room, nightCount}} />
          <BRewards />
          {/* <div className="w-[450px] overflow-scroll">
            <pre>currentHotel{JSON.stringify(currentHotel, null, 2)}</pre>
            <pre>currentRoom{JSON.stringify(currentRoom, null, 2)}</pre>
            <pre>roomId{typeof (roomId)}{roomId}</pre>
            <pre>room{typeof (room)}{room}</pre>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BookInfo
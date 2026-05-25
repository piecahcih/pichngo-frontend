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
import { useEffect, useState } from "react"
import { WasBookSwal } from "../components/swal/WasBookAlert"
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { stripePromise } from '../configs/stripe'


function BookInfoForm({ clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()

  const hotels = useHotelStore(st=>st.hotels)
  const pricePreview = useBookingStore(st=>st.pricePreview)
  const totalPrice = pricePreview?.finalPrice || 0
  const guestList = useBookingStore(st=>st.guestList)
  const paymentMethod = useBookingStore(st=>st.paymentMethod)
  const promoCode = useBookingStore(st=>st.promoCode)
  const currentBooking = useBookingStore(st=>st.currentBooking)
  const { checkin, checkout, nightCount, guest, room, roomId } = currentBooking

  const navigate = useNavigate()
  const [isBooking, setIsBooking] = useState(false)

  const currentHotel =
    hotels?.find(h => h.rooms.some(room => room.id === roomId))

  const currentRoom = currentHotel?.rooms.find(room => room.id === roomId)

  const hdlReservation = async () => {
    if (!stripe || !elements) return;
    setIsBooking(true)

    let paymentRef = "MANUAL_PAYMENT";
    
    //If Credit Card, confirm with Stripe first
    if (paymentMethod === 'CREDIT_CARD') {
      try {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
          confirmParams: {
            return_url: `${window.location.origin}/book/success`,
          },
        });

        if (error) {
          toast.error(error.message);
          setIsBooking(false);
          return;
        }

        if (paymentIntent.status === 'succeeded') {
          paymentRef = paymentIntent.id;
        }
      } catch (err) {
        console.error("Stripe Error:", err);
        toast.error("Payment failed. Please try again.");
        setIsBooking(false);
        return;
      }
    }


    const bkInfo = {
      bookingDetails: {
        roomId: currentRoom?.id,
        roomAmount: Number(room),
        numGuest: guest,
        checkInDate: new Date(checkin),
        checkOutDate: new Date(checkout),
        ...(promoCode && {promoCode: promoCode})
      },
      guestList: guestList,
      paymentDetails: {
            paymentMethod: paymentMethod,
            accountName: guestList[0]?.firstName + " " + guestList[0]?.lastName || "Guest",
            amount: totalPrice,
            paymentDate: new Date().toISOString(),
            paymentRefNo: paymentRef,
            paymentStatus: "PAID"
            // paymentStatus: paymentMethod === 'CREDIT_CARD' ? "PAID" : "UNPAID"
        }    
    }

    try {
      await useBookingStore.getState().createBooking(bkInfo)
      
      setTimeout(()=>{
        useBookingStore.getState().resetCurrentBooking()
        navigate('/book/success')
      },1200)
    } catch (error) {
      setIsBooking(false)
      const errMsg = error.response?.data?.message || "This room has already been book"
      console.error(errMsg)
      WasBookSwal(navigate)
    }
  }

  return (
    <div className="mx-[10%] py-15 flex justify-center gap-8">
        <div className="flex flex-col gap-8">
          <BGuestInfo room = {{room}} />
          <BDiscount />
          <BPayment />
          <button onClick={hdlReservation} disabled={isBooking || !stripe} 
          className="bg-primary text-white py-2 text-[20px] rounded-[8px] hover:bg-[#b5390e] transition-colors">
            {isBooking ? <span className="loading loading-dots loading-md"></span> : "Confirm Your Reservation"}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <BHotelInfoCard roomInfo = {{currentHotel, currentRoom}} Info = {{checkin, checkout, room, guest, nightCount}}/>
          <BPrice roomInfo = {{currentRoom}} Info = {{room, nightCount}} />
          <BRewards />
        </div>
    </div>
  )
}

function BookInfo() {
  const [clientSecret, setClientSecret] = useState("");
  const currentBooking = useBookingStore(st=>st.currentBooking)
  const promoCode = useBookingStore(st=>st.promoCode)
  const pricePreviewShown = useBookingStore(st=>st.pricePreviewShown)
  const createPaymentIntent = useBookingStore(st=>st.createPaymentIntent)
  const { checkin, checkout, room, roomId } = currentBooking

  useEffect(() => {
    const fetchIntent = async () => {
      if (!roomId) return;
      try {
        const payload = {
          roomId: Number(roomId),
          checkInDate: new Date(checkin),
          checkOutDate: new Date(checkout),
          roomAmount: Number(room),
          ...(promoCode && { promoCode })
        };
        // Fetch price preview first to update store
        await pricePreviewShown(payload);
        
        // fetch the Stripe intent
        const res = await createPaymentIntent(payload)
        if (res?.clientSecret) {
          setClientSecret(res.clientSecret);
        } else {
          toast.error("Could not initialize payment. Please try again.");
        }
      } catch (err) {
        console.error("Failed to initialize payment", err);
        toast.error("Payment service is currently unavailable.");
      }
    };

    setClientSecret(""); // Reset when deps change
    fetchIntent();
  }, [roomId, checkin, checkout, room, promoCode, pricePreviewShown, createPaymentIntent]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#D44A1B',
      colorBackground: '#ffffff',
      colorText: '#1F2937',
    },
  };

  return(
    <div className="bg-base-300 min-h-[67vh] text-primary-content">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <BookInfoForm clientSecret={clientSecret}/>
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
    </div>
  )
}


export default BookInfo
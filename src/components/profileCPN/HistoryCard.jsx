import { differenceInDays, format } from "date-fns"
import { useFormatPrice } from "../../utils/formatNum"
import { DeleteBKSwal } from "../swal/DeleteBKAlert"
import { useNavigate } from "react-router"
import { CancelBKSwal } from "../swal/CancelBKAlert"
import useHotelStore from "../../stores/hotelStore"
import useBookingStore from "../../stores/bookingStore"
import useReviewStore from "../../stores/reviewStore"
import useUserStore from "../../stores/userStore"
import ReviewModal from "./ReviewModal"
import { useEffect, useState } from "react"

const HistoryCard = ({ booking, sll }) => {
  const formatPrice = useFormatPrice()
  const nightCount = (booking.checkInDate && booking.checkOutDate)
    ? differenceInDays(new Date(booking.checkOutDate), new Date(booking.checkInDate))
    : 0

  const user = useUserStore(st => st.user)
  const myReviews = useReviewStore(st=>st.myReviews)
  const getAllMyReviews = useReviewStore(st=>st.getAllMyReviews)
  const [hasReviewed, setHasReviewed] = useState(false)

  useEffect(() => {
    getAllMyReviews()
  }, [getAllMyReviews])


  const modalId = `review-modal-${booking.id}`

  // console.log('myReviews', myReviews)
  // console.log('booking', booking)

  useEffect(() => {
    const checkReview = () => {
      try {
        const hotelId = booking?.room?.hotel?.id
        if (!hotelId || !user?.id || !myReviews) return

        const found = myReviews.some((r) => {
          const isSameUser = Number(r.userId) === Number(user.id)
          const isSameHotel = Number(r.hotelId) === Number(hotelId)

          return isSameUser && isSameHotel
        })

        setHasReviewed(found)
      } catch (err) {
        console.error("Check review failed", err)
      }
    }

    if (sll === "Completed" && myReviews.length >= 0) {
      checkReview()
    }
  }, [sll, booking, user, myReviews]) 

  const handleReviewCreated = () => {
    setHasReviewed(true)
  }

  const deleteOnSubmit = async () => {
    try {
      await useBookingStore.getState().deleteSpecificBooking(booking.id)
      await useBookingStore.getState().getAllBookingsFromThisUser()
    } catch (error) {
      console.error("Delete process failed", error)
    }
  }

  const navigate = useNavigate()
  const createSlug = (text) => text?.toLowerCase().replace(/\s+/g, "-")

  const cancelOnSubmit = async () => {
    try {
      await useBookingStore.getState().cancelBookingByUser(booking.id)
      await useBookingStore.getState().getAllBookingsFromThisUser()
    } catch (error) {
      console.error("Cancel process failed", error)
    }
  }

  const hdlBookingAgain = async () => {
    await useHotelStore.getState().getHotelsByCity(booking?.room?.hotel?.city)
    navigate(
      `/hotels/${createSlug(booking?.room?.hotel?.city)}/${createSlug(booking?.room?.hotel?.name)}`
    )
  }

  return (
    <>
      <div className="w-full h-full bg-base-200 flex flex-col gap-4 p-3 border border-neutral/50 rounded-[12px]">
        <div>
          <div className="flex justify-between border-b pb-3 text-[14px]">
            <div className="flex font-[Whitney-Book] gap-4">
              <h3>Booking No.{booking.id}</h3>
              <h3>Booking Date: {format(booking.bookingDate, "MMMM dd, yyyy")}</h3>
            </div>
            <p
              className={
                booking.bookingStatus === "CONFIRMED"
                  ? "text-success"
                  : booking.bookingStatus === "WAITING"
                  ? "text-warning"
                  : "text-error"
              }
            >
              {booking.bookingStatus}
            </p>
          </div>

          <div className="flex justify-between gap-4 py-3">
            <div className="w-[100px] h-[115px] rounded-[6px] overflow-hidden">
              <img
                src={booking?.room?.hotel?.hotelImg?.img1}
                alt="hotelimg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[420px] flex flex-col justify-between py-1">
              <div className="flex justify-between text-[18px]">
                <h1>{booking.room.hotel.name}</h1>
                <h1>{formatPrice(booking.finalPrice, 2)}</h1>
              </div>
              <div className="bg-base-100 p-2 flex justify-between font-[Whitney-Medium] text-[14px]">
                <div className="w-[160px]">
                  <h3>
                    {format(booking.checkInDate, "MMMM dd, yyyy")} –{" "}
                    {format(booking.checkOutDate, "MMMM dd, yyyy")}
                  </h3>
                  <p className="font-[Whitney-Light]">
                    {nightCount} night{nightCount < 1 ? "s" : ""}
                  </p>
                </div>
                <div className="w-fit">
                  <h3>
                    {booking.bookingGuests?.[0]?.firstName}{" "}
                    {booking.bookingGuests?.[0]?.lastName}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* ── Upcoming actions ── */}
          {sll === "Upcoming" && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => CancelBKSwal({ booking, cancelOnSubmit })}
                className="border border-primary px-4 py-1.5 rounded-[8px] text-primary"
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── Completed actions ── */}
          {sll === "Completed" && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => DeleteBKSwal({ booking, deleteOnSubmit })}
                className="border border-primary px-4 py-1.5 rounded-[8px] text-primary"
              >
                Delete
              </button>

              {hasReviewed ? (
                <button
                  disabled
                  className="px-4 py-1.5 rounded-[8px] bg-base-300 text-neutral/50 cursor-not-allowed"
                >
                  Reviewed
                </button>
              ) : (
                <button
                  onClick={() => document.getElementById(modalId)?.showModal()}
                  className="bg-primary px-4 py-1.5 rounded-[8px] text-white"
                >
                  Review
                </button>
              )}

              <button
                onClick={() => hdlBookingAgain()}
                className="bg-primary px-4 py-1.5 rounded-[8px] text-white"
              >
                Book Again
              </button>
            </div>
          )}

          {/* ── Cancelled actions ── */}
          {sll === "Cancelled" && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => DeleteBKSwal({ booking, deleteOnSubmit })}
                className="border border-primary px-4 py-1.5 rounded-[8px] text-primary"
              >
                Delete
              </button>
              <button
                onClick={() => hdlBookingAgain()}
                className="bg-primary px-4 py-1.5 rounded-[8px] text-white"
              >
                Book Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal – rendered per-card */}
      {sll === "Completed" && (
        <ReviewModal
          booking={booking}
          modalId={modalId}
          onReviewCreated={handleReviewCreated}
        />
      )}
    </>
  )
}

export default HistoryCard

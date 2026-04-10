import { differenceInDays, format } from "date-fns"
import { formatPrice } from "../../utils/formatNum"
import useAdminStore from "../../stores/adminStore"
import { AdminUpdateBKSwal } from "../swal/ADMINUpdateBKst"

function BookingDataCard({booking}) {
    const nightCount = (booking.checkInDate && booking.checkOutDate) ? differenceInDays(new Date(booking.checkOutDate), new Date(booking.checkInDate)): 0
    const updateStatusOnSubmit = async() => {
        try {
            useAdminStore.getState().adminUpdateBookingStatus(booking.id)
        } catch (error) {
            console.error('updateStatus error',error)
        }
    }

  return (
        <div className="w-full h-full bg-base-200 flex flex-col gap-4 p-3 shadow-md rounded-[12px] ">
            <div className="">
                <div className="flex justify-between border-b pb-3 text-[14px]">
                    <div className="flex font-[Whitney-Book] gap-4">
                        <h3>Booking No.{booking.id}</h3>
                        <h3>Booking Date: {format(booking.bookingDate, 'MMMM dd, yyyy')}</h3>
                    </div>
                    <p className={booking.bookingStatus === 'CONFIRMED' ? 'text-success': booking.bookingStatus ===  'WAITING' ? 'text-warning': 'text-error' }>{booking.bookingStatus}</p>
                </div>

                <div className="flex justify-between gap-4 py-3">
                    <div className="w-[120px] h-[120px] rounded-[6px] overflow-hidden">
                        <img src={booking?.room?.hotel?.hotelImg?.img1} alt="hotelimg" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-[420px] flex flex-col justify-between py-1">
                        <div className="flex justify-between text-[18px]">
                            <h1>{booking.room.hotel.name}</h1>
                            <h1>{formatPrice(booking.totalPrice,2)}</h1>
                        </div>
                        <div className="bg-base-100 p-2 flex justify-between font-[Whitney-Medium] text-[14px]">
                            <div className="w-[160px]">
                                <h3>{format(booking.checkInDate, 'MMMM dd, yyyy')} - {format(booking.checkOutDate, 'MMMM dd, yyyy')}</h3>
                                <p className="font-[Whitney-Light]">{nightCount} night{nightCount<1 ? 's' : ''}</p>
                            </div>
                            <div className="w-fit">
                                <h3>{booking.bookingGuests?.[0]?.firstName} {booking.bookingGuests?.[0]?.lastName}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {booking.bookingStatus === 'WAITING' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => AdminUpdateBKSwal({booking, updateStatusOnSubmit}) } className="bg-primary px-4 py-1.5 rounded-[8px] text-white">Change Status</button>
                    </div>
                )}

                {/* {sll === 'Upcoming' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => CancelBKSwal({booking, cancelOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Cancel</button>
                    </div>
                )}
                
                {sll === 'Completed' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => DeleteBKSwal({booking, deleteOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Delete</button>
                        <button onClick={() => navigate(`/hotels/${createSlug(booking?.room?.hotel?.city)}/${createSlug(booking?.room?.hotel?.name)}`) } className="bg-primary px-4 py-1.5 rounded-[8px] text-white">Book Again</button>
                    </div>
                )}
                
                {sll === 'Cancelled' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => DeleteBKSwal({booking, deleteOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Delete</button>
                        <button onClick={() => navigate(`/hotels/${createSlug(booking?.room?.hotel?.city)}/${createSlug(booking?.room?.hotel?.name)}`) } className="bg-primary px-4 py-1.5 rounded-[8px] text-white">Book Again</button>
                    </div>
                )} */}
                
            </div>

        </div>
    )
}

export default BookingDataCard
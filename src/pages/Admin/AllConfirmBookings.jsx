import { useEffect } from "react"
import ADMINnav from "../../components/ADMIN/ADMINnav"
import useAdminStore from "../../stores/adminStore"
import BookingDataCard from "../../components/ADMIN/BookingDataCard"

function AllConfirmBookings() {
  const bookings = useAdminStore(st=>st.bookings)
  const adminGetAllBookingsfromDatabase = useAdminStore(st=>st.adminGetAllBookingsfromDatabase)

  const allConfirmBooking = bookings.filter( booking => booking.bookingStatus === 'CONFIRMED')

  useEffect(()=>{
    console.log('peach')
    adminGetAllBookingsfromDatabase()
    console.log('peachja')
  },[adminGetAllBookingsfromDatabase])
  // console.log('bookings', bookings)

  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-8 p-[70px]">
      <ADMINnav/>
      <div className="flex flex-col w-[600px] gap-6">
        <h1 className="text-4xl">All Bookings in Database</h1>
        {allConfirmBooking?.map( booking => <BookingDataCard key={booking.id} booking={booking} /> )}
        {/* <pre>booking{JSON.stringify(bookings, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default AllConfirmBookings
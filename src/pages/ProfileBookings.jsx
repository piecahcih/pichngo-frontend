import { useEffect, useLayoutEffect } from "react"
import AccountMenu from "../components/profileCPN/AccountMenu"
import BookingsCard from "../components/profileCPN/BookingsCard"
import useBookingStore from "../stores/bookingStore"

function ProfileBookings() {
  // const getAllBookingsFromThisUser = useBookingStore(st=>st.getAllBookingsFromThisUser)
  // const booking = useBookingStore(st=>st.booking)
  

  // useLayoutEffect(()=>{
  //   console.log('bbbbb')
  //   getAllBookingsFromThisUser()
  //   console.log('aaaa')
  // },[getAllBookingsFromThisUser])

  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 p-[150px]">
      <AccountMenu/>
      <BookingsCard/>
      {/* <button onClick={()=>getAllBookingsFromThisUser()}>AAAA</button> */}
                          {/* <pre>{JSON.stringify(booking, null, 2)}</pre>
                    <pre>{typeof(booking)}</pre>
                    <pre>ar{Array.isArray(booking).toString()}</pre> */}
    </div>
  )
}

export default ProfileBookings
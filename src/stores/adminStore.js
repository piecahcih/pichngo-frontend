import { create } from "zustand";
import { ADMINGetAllBookingsFromDatabaseApi, ADMINUpdateBookingStatusApi } from "../api/adminAPI";

const useAdminStore = create((set,get)=>({
    bookings:[],
    adminGetAllBookingsfromDatabase: async () => {
        // console.log('start')
        const res = await ADMINGetAllBookingsFromDatabaseApi()
        // console.log('res',res)
        set({ bookings: res.data.bookingInfo})
    },
    adminUpdateBookingStatus: async (id) => {
        const res = await ADMINUpdateBookingStatusApi(id)
        const updatedBooking = res.data.bookingInfo
        // set((state)=>({ bookings:[...state.bookings, res.data.bookingInfo]}))
        set((state) => ({
            bookings: state.bookings.map(booking => 
                // If the ID matches, replace it with the new data. Otherwise, keep the old data.
                booking.id === id ? updatedBooking : booking
            )
        }))

        return res
    }
}))

export default useAdminStore

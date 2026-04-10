import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddBookingApi, CancelBookingByUserApi, DeleteSpecificBookingApi, GetAllBookingsFromThisUserApi } from "../api/mainAPI";

const useBookingStore = create(persist((set,get)=>({
    booking:[],
    currentBooking:{},
    totalPrice: 0,
    promoCode: "",
    paymentMethod: 'CREDIT_CARD',
    guestList: [],
    setGuestList: (list) => set({ guestList: list }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setPromoCode: (code) => set({ promoCode: code }),
    setTotalPrice: (price) => set({ totalPrice: price }),
    setCurrentBooking: (data) => {
        console.log('data', data)
        set({ currentBooking: data })
    },
    resetCurrentBooking: () => set({ currentBooking: {} }) ,
    createBooking: async (body)=>{
        const res = await AddBookingApi(body)
        // console.log('resBK', res)
        set({booking: res.data.bookingInfo })
    },
    getAllBookingsFromThisUser: async () => {
        // console.log('start')
        const res = await GetAllBookingsFromThisUserApi()
        // console.log('end')

        set({ booking: res.data.bookingInfo })
    },
    deleteSpecificBooking: async (id) => {
        const res = await DeleteSpecificBookingApi(id)

        return res
    },
    cancelBookingByUser: async (id) => {
        const res = await CancelBookingByUserApi(id)

        // set((state)=>[...state.booking, res.data.bookingInfo])
        return res
    },
    resetBooking: () => set({booking: []})

}),{ name: 'pichngo-booking', storage: createJSONStorage( ()=>localStorage )}))

export default useBookingStore
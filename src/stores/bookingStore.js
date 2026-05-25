import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddBookingApi, CancelBookingByUserApi, createPaymentIntentApi, DeleteSpecificBookingApi, GetAllBookingsFromThisUserApi, pricePreviewApi } from "../api/mainAPI";

const useBookingStore = create(persist((set,get)=>({
    booking:[],
    currentBooking:{},
    // totalPrice: 0,
    pricePreview: {},
    promoCode: "",
    paymentMethod: 'CREDIT_CARD',
    guestList: [],
    setGuestList: (list) => set({ guestList: list }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    createPaymentIntent: async (body) => {
        const res = await createPaymentIntentApi(body)
        return res.data
    },

    setPromoCode: (code) => set({ promoCode: code }),
    // setTotalPrice: (price) => set({ totalPrice: price }),
    resetPromoCode: () => set({ promoCode: "" }) ,
    setCurrentBooking: (data) => {
        // console.log('CurrentBooking', data)
        set({ currentBooking: data })
    },
    resetCurrentBooking: () => set({ currentBooking: {} }) ,
    pricePreviewShown: async (body) => {
        // console.log('startprice',body)
        const res = await pricePreviewApi(body)
        // console.log('pricepreview',res)

        set({ pricePreview: res.data.pricePreview })
    },
    createBooking: async (body)=>{
        const res = await AddBookingApi(body)
        const newBooking = res.data.bookingInfo
        // console.log('resBK', res)
        set((state) => ({
            booking: [...state.booking, newBooking],
            
            promoCode: "",
            guestList: [],
            totalPrice: 0,
            pricePreview: {}
        }))
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
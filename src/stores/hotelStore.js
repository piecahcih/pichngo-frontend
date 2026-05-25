import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetHotelCountsByCityApi, GetHotelsApi, GetHotelsByCityApi, GetHotelsByNameApi, GetLikedApi, LikeApi, UnLikeApi } from "../api/mainAPI";

const useHotelStore = create(persist((set, get) => ({
    hotels: [],
    selectHotel: {},
    searchHotels: [],
    hotelCounts: [],
    myLists: [],
    getAllHotels: async () => {
        const res = await GetHotelsApi()
        // console.log('allhotels', res)

        set({ searchHotels: res.data.hotels })
    },
    getHotelsByCity: async (city) => {
        const res = await GetHotelsByCityApi(city)
        // console.log('res',res)
        set({ hotels: res.data.hotels })
    },
    getHotelsByName: async (city, name, checkin, checkout) => {
        console.log('startgetbyname',city,name)
        const queryParams = new URLSearchParams()
        if (checkin) queryParams.append('checkin', checkin)
        if (checkout) queryParams.append('checkout', checkout)

        const queryString = queryParams.toString()
        const url = queryString ? `${name}?${queryString}` : name

        const res = await GetHotelsByNameApi(city, url)
        console.log('hotelbyname', res)
        set({ selectHotel: res.data.hotels })
    },
    getHotelCountsByCity: async () => {
        const res = await GetHotelCountsByCityApi()
        // console.log('res',res)
        set({ hotelCounts: res.data.hotelCounts })
    },
    createLike: async (id, hotelid) => {
        set((st) => {
            const updatedHotels = st.hotels.map((hotel) => {
                if (hotel.id === hotelid) {
                    return { ...hotel, likes: [...hotel.likes, { userId: id }] };
                }
                return hotel;
            });
            const updatedSelectHotel = st.selectHotel?.id === hotelid
                ? { ...st.selectHotel, likes: [...(st.selectHotel.likes || []), { userId: id }] }
                : st.selectHotel;
            return { hotels: updatedHotels, selectHotel: updatedSelectHotel };
        });
        //FLip the order so UI goes first jaa
        const res = await LikeApi(hotelid)
        return res
    },
    unLike: async (id, hotelid) => {
        set((st) => {
            const updatedHotels = st.hotels.map((hotel) => {
                if (hotel.id === hotelid) {
                    return { ...hotel, likes: hotel.likes.filter((like) => like.userId !== id) };
                }
                return hotel;
            });
            const updatedSelectHotel = st.selectHotel?.id === hotelid
                ? { ...st.selectHotel, likes: (st.selectHotel.likes || []).filter((like) => like.userId !== id) }
                : st.selectHotel;
            return { hotels: updatedHotels, selectHotel: updatedSelectHotel };
        });

        const res = await UnLikeApi(hotelid)
        return res
    },
    getMyList: async () => {
        const res = await GetLikedApi()
        // console.log(res)
        set({ myLists: res.data.result })
        return res
    },


}), { name: 'hotelState', storage: createJSONStorage(() => localStorage) }))

export default useHotelStore
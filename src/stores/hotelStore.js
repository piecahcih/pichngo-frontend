import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetHotelCountsByCityApi, GetHotelsApi, GetHotelsByCityApi, GetHotelsByNameApi, GetLikedApi, LikeApi, UnLikeApi } from "../api/mainAPI";

const useHotelStore = create( persist((set,get)=>({
    hotels: [],
    searchHotels: [],
    hotelCounts: [],
    myLists: [],
    getAllHotels: async () => {
        const res = await GetHotelsApi()
        console.log('res', res)

        set({ searchHotels: res.data.hotels, hotels: res.data.hotels })
    },
    getHotelsByCity: async (city) => {
        const res = await GetHotelsByCityApi(city)
        // console.log('res',res)
        set({ hotels: res.data.hotels})
    },
    // getHotelsByName: async (city,name) => {
    //     const res = await GetHotelsByNameApi(city,name)
    //     console.log('res',res)
    //     set({ hotels: res.data.hotels})
    // },
    getHotelCountsByCity: async () => {
        const res = await GetHotelCountsByCityApi()
        // console.log('res',res)
        set({ hotelCounts: res.data.hotelCounts})
    },
    createLike: async (id, hotelid) => {       
        set((st) => ({
            hotels: st.hotels.map((hotel) => {
                if (hotel.id === hotelid) {
                    return { ...hotel, likes: [...hotel.likes, { userId: id }] };
                }
                return hotel;
            })
        }));
        //FLip the order so UI goes first jaa
        const res = await LikeApi(hotelid)
        return res
    },
    unLike: async (id, hotelid) => {
        set((st) => ({
            hotels: st.hotels.map((hotel) => {
                if (hotel.id === hotelid) {
                    return { ...hotel, likes: hotel.likes.filter((like) => like.userId !== id) };
                    //"Look at this like. Is the userId on this like different than my current logged-in userId?"
                    //If Y (it belongs to someone else), it keeps the like in the array.
                    //If N (it's your), it will delete the like.
                }
                return hotel;
            })
        }));

        const res = await UnLikeApi(hotelid)
        return res
    },
    getMyList: async () => {
        const res = await GetLikedApi()
        // console.log(res)
        set({ myLists: res.data.result })
        return res
    },


}),{ name: 'hotelState', storage: createJSONStorage( ()=>localStorage )}))

export default useHotelStore
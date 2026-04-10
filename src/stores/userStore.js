import { AddTravelerApi, DeleteAccApi, DeleteTravelerApi, EditAccApi, EditTravelerInfoApi, GetTravelerInfoApi, mainAPI } from "../api/mainAPI"
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'

const useUserStore = create(persist((set, get) => ({
    user: null,
    token: '',
    travelerInfo: [],
    rememberMe: false,
    login: async (body) => {
        const res = await mainAPI.post('/auth/login', body)
        // console.log("user",res)
        set({ token: res.data.token, user: res.data.user, rememberMe: body.rememberMe })
        
        await get().getTravelerInfo()

        return res
    },
    logout: () => {
        set({ token: '', user: null, travelerInfo: [] })
        localStorage.removeItem('userState')
    },
    updateAcc: async (body) => {
        const res = await EditAccApi(body)
        // console.log("adduser",res)

        set({ user: res.data.user })
        return res
    },
    deleteAcc: async (id) => {
        const res = await DeleteAccApi(id)

        return res
    },
    getTravelerInfo: async () => {
        const res = await GetTravelerInfoApi()
        // console.log(res)

        set({ travelerInfo: res.data.travelerInfo || [] })
    },
    addTraveler: async (body) => {
        const res = await AddTravelerApi(body)

        set((state) => ({
            travelerInfo: [...state.travelerInfo, res.data.travelerInfo]
        }));
        return res
    },
    updateTravelerInfo: async (body) => {
        const res = await EditTravelerInfoApi(body)
        const updatedTraveler = res.data?.travelerInfo

        set((state) => ({ 
            travelerInfo: state.travelerInfo.map((item) => 
            item.id === updatedTraveler.id ? updatedTraveler : item
        ) //use .map because u want to find and replace one specific item
        }))
        return res
    },
    deleteTravelerInfo: async (id) => {
        const res = await DeleteTravelerApi(id)

        set((state) => ({
            travelerInfo: state.travelerInfo.filter(t => t.id !== id)
        }));
        return res
    },

}), { name: 'userState', storage: createJSONStorage(() => localStorage) }))

export default useUserStore
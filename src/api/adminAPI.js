import axios from "axios";
import useUserStore from "../stores/userStore";

export const mainAPI = axios.create({
    baseURL : import.meta.env.VITE_API_URL || "http://localhost:3399",
    headers : {
        'Content-Type' : 'application/json'
    }
})

mainAPI.interceptors.request.use( config => {
    const token = useUserStore.getState().token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const ADMINGetAllBookingsFromDatabaseApi = async () => { return await mainAPI.get(`/book/all`)}

export const ADMINUpdateBookingStatusApi = async (id) => { return await mainAPI.patch(`/book/updatestatus`,{data: {id}})}

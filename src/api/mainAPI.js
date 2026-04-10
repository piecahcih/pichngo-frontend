import axios from "axios";
import useUserStore from "../stores/userStore";

export const mainAPI = axios.create({
    baseURL : "http://localhost:3399",
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

export const RegisterApi = async (body) => { return await mainAPI.post('/auth/register',body)}


export const EditAccApi = async (body) => { return await mainAPI.patch('/account/profile',body)}

export const DeleteAccApi = async (id) => { return await mainAPI.delete('/account/profile',id)}


export const GetTravelerInfoApi = async () => { return await mainAPI.get('/account/traveler-info')}

export const AddTravelerApi = async (body) => { return await mainAPI.post('/account/traveler-info',body)}

export const EditTravelerInfoApi = async (body) => { return await mainAPI.patch('/account/traveler-info',body)}

export const DeleteTravelerApi = async (id) => { return await mainAPI.delete('/account/traveler-info',{data: {id}})}


export const GetHotelsApi = async () => { return await mainAPI.get('/hotels')}

export const GetHotelCountsByCityApi = async () => { return await mainAPI.get(`/hotels/counts`)}

export const GetHotelsByCityApi = async (city) => { return await mainAPI.get(`/hotels/${city}`)}

export const GetHotelsByNameApi = async (city,name) => { return await mainAPI.get(`/hotels/${city}/${name}`)}

export const LikeApi = async (hotelid) => { return await mainAPI.post(`/like/${hotelid}`)}

export const UnLikeApi = async (hotelid) => { return await mainAPI.delete(`/like/${hotelid}`)}

export const GetLikedApi = async () => { return await mainAPI.get(`/like`)}


export const AddBookingApi = async (body) => { return await mainAPI.post(`/book`,body)}

export const GetAllBookingsFromThisUserApi = async () => { return await mainAPI.get(`/book`)}

export const DeleteSpecificBookingApi = async (id) => { return await mainAPI.delete('/book',{data: {id}})}

export const CancelBookingByUserApi = async (id) => { return await mainAPI.patch('/book',{data: {id}})}

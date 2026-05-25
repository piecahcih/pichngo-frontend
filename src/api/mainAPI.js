import axios from "axios";
import useUserStore from "../stores/userStore";

export const mainAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3399",
    headers: {
        'Content-Type': 'application/json'
    }
})

mainAPI.interceptors.request.use(config => {
    const token = useUserStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const RegisterApi = async (body) => { return await mainAPI.post('/auth/register', body) }
export const LoginApi = async (body) => { return await mainAPI.post('/auth/login', body) }
export const RegisterLoginWithGoogleApi = async (idToken) => { return await mainAPI.post('/auth/registerOrLoginWithGoogle', {},
    {
      headers: { Authorization: `Bearer ${idToken}` },
    },
) }

export const EditAccApi = async (body) => { return await mainAPI.patch('/account/profile', body) }
export const DeleteAccApi = async (id) => { return await mainAPI.delete('/account/profile', id) }


export const GetTravelerInfoApi = async () => { return await mainAPI.get('/account/traveler-info') }
export const AddTravelerApi = async (body) => { return await mainAPI.post('/account/traveler-info', body) }
export const EditTravelerInfoApi = async (body) => { return await mainAPI.patch('/account/traveler-info', body) }
export const DeleteTravelerApi = async (id) => { return await mainAPI.delete('/account/traveler-info', { data: { id } }) }


export const GetHotelsApi = async () => { return await mainAPI.get('/hotels') }
export const GetHotelCountsByCityApi = async () => { return await mainAPI.get(`/hotels/counts`) }
export const GetHotelsByCityApi = async (city) => { return await mainAPI.get(`/hotels/${city}`) }
export const GetHotelsByNameApi = async (city, name) => { return await mainAPI.get(`/hotels/${city}/${name}`) }

export const LikeApi = async (hotelid) => { return await mainAPI.post(`/like/${hotelid}`) }
export const UnLikeApi = async (hotelid) => { return await mainAPI.delete(`/like/${hotelid}`) }
export const GetLikedApi = async () => { return await mainAPI.get(`/like`) }


export const AddBookingApi = async (body) => { return await mainAPI.post(`/book`, body) }
export const GetAllBookingsFromThisUserApi = async () => { return await mainAPI.get(`/book`) }
export const DeleteSpecificBookingApi = async (id) => { return await mainAPI.delete('/book', { data: { id } }) }
export const CancelBookingByUserApi = async (id) => { return await mainAPI.patch('/book', { data: { id } }) }
export const pricePreviewApi = async (body) => { return await mainAPI.post('/book/pricepreview', body) }

export const createPaymentIntentApi = async (body) => { return await mainAPI.post('/payment/create-intent', body) }


export const GetDiscountsApi = async () => { return await mainAPI.get('/discount') }
export const GetDiscountByCodeApi = async (code) => { return await mainAPI.get(`/discount/${code}`) }


export const GetUserRewardsAndTierApi = async () => { return await mainAPI.get('/reward') }
export const CalculateBookingRewardsApi = async (finalPrice) => { return await mainAPI.post('/reward',{finalPrice: finalPrice}) }


export const createReviewApi = async (body) => { return await mainAPI.post('/review', body) }
export const getAllReviewsApi = async () => { return await mainAPI.get('/review') }
export const getAllMyReviewsApi = async () => { return await mainAPI.get('/review/my-reviews') }
export const getReviewByHotelApi = async (hotelId) => { return await mainAPI.get(`/review/hotel/${hotelId}`) }
export const getReviewByIdApi = async (reviewId) => { return await mainAPI.get(`/review/${reviewId}`) }
export const DeleteReviewApi = async (reviewId) => { return await mainAPI.delete(`/review/${reviewId}`) }
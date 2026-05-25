import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getAllReviewsApi, getReviewByHotelApi, getReviewByIdApi, DeleteReviewApi, createReviewApi, getAllMyReviewsApi } from "../api/mainAPI";

const useReviewStore = create(persist((set) => ({
    reviews: [],
    myReviews: [],
    reviewsByHotel: [],
    selectReview: {},
    getReviews: async () => {
        const res = await getAllReviewsApi()
        // console.log('res', res)
        set({ reviews: res.data.reviews })
    },
    getAllMyReviews: async () => {
        const res = await getAllMyReviewsApi()
        // console.log('allmyreview', res)
        set({ myReviews: res.data.reviews })
    },
    getReviewByHotel: async (hotelId) => {
        const res = await getReviewByHotelApi(hotelId)
        // set({ reviews: res.data.reviewsByHotel })
        return res.data.reviews
    },
    getReviewById: async (reviewId) => {
        const res = await getReviewByIdApi(reviewId)
        set({ selectReview: res.data.reviews })
    },
    createReview: async (body) => {
        const res = await createReviewApi(body)
        return res
    },
    deleteReview: async (reviewId) => {
        const res = await DeleteReviewApi(reviewId)
        return res
    }
}), { name: 'reviewState', storage: createJSONStorage(() => localStorage) }))

export default useReviewStore
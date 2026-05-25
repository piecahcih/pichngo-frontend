import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetDiscountsApi, GetDiscountByCodeApi, GetUserRewardsAndTierApi, CalculateBookingRewardsApi } from "../api/mainAPI";

const useRewardStore = create(persist((set) => ({
    previewRewards: {},
    userRewards: {},
    getUserRewardsAndTier: async () => {
        const res = await GetUserRewardsAndTierApi()
        // console.log('userRewards', res)
        set({ userRewards: res.data.reward })
        return res
    },
    calculateBookingRewards: async (finalPrice) => {
        // console.log('finalPrice', finalPrice)
        const res = await CalculateBookingRewardsApi(finalPrice)
        // console.log('res', res)
        set({ previewRewards: res.data.reward })
    }

}), { name: 'rewardState', storage: createJSONStorage(() => localStorage) }))

export default useRewardStore
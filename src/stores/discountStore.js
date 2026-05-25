import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetDiscountsApi, GetDiscountByCodeApi } from "../api/mainAPI";

const useDiscountStore = create(persist((set) => ({
    discounts: [],
    getDiscounts: async () => {
        const res = await GetDiscountsApi()
        set({ discounts: res.data.discount })
    },

    getDiscountByCode: async (code) => {
        const res = await GetDiscountByCodeApi(code)
        return res
    }

}), { name: 'discountState', storage: createJSONStorage(() => localStorage) }))

export default useDiscountStore
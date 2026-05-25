import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const DEFAULT_RATES = {
  THB: 1.0,
  USD: 0.027,
  EUR: 0.025,
  JPY: 4.25,
  SGD: 0.037,
};

const SYMBOLS = {
  THB: "฿",
  USD: "$",
  EUR: "€",
  JPY: "¥",
  SGD: "SGD",
};

const LOCALES = {
  THB: "en-TH",
  USD: "en-US",
  EUR: "de-DE",
  JPY: "ja-JP",
  SGD: "en-SG",
};

const useCurrencyStore = create(
  persist(
    (set, get) => ({
      currency: "THB",
      rates: DEFAULT_RATES,
      symbols: SYMBOLS,
      locales: LOCALES,

      setCurrency: (currencyCode) => {
        if (SYMBOLS[currencyCode]) {
          set({ currency: currencyCode });
        }
      },

      fetchRates: async () => {
        try {
          const res = await fetch("https://open.er-api.com/v6/latest/THB");
          if (!res.ok) throw new Error("Failed to fetch exchange rates");
          const data = await res.json();
          if (data && data.rates) {
            const newRates = { ...get().rates };
            for (const key of Object.keys(newRates)) {
              if (data.rates[key]) {
                newRates[key] = data.rates[key];
              }
            }
            set({ rates: newRates });
          }
        } catch (error) {
          console.warn("Using offline fallback exchange rates:", error.message);
        }
      },
    }),
    {
      name: "pichngo-currency-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currency: state.currency }),
    }
  )
);

export default useCurrencyStore;

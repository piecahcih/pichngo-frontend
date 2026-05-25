import useCurrencyStore from "../stores/currencyStore";

// Helper function that performs the actual formatting based on the currency state
export function formatPriceWithState(price, state, digit = 0) {
    const currency = state.currency || 'THB';
    const rate = state.rates[currency] || 1;
    const locales = state.locales || {};
    const symbols = state.symbols || {};

    const val = price ? Number(price) * rate : 0;
    const locale = locales[currency] || 'en-TH';

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
    });

    const parts = formatter.formatToParts(val);
    const customSymbol = symbols[currency] || currency;

    const formatted = parts.map(part => {
        if (part.type === 'currency') {
            const hasLetters = /^[A-Za-z]+$/.test(customSymbol);
            return hasLetters ? `${customSymbol} ` : customSymbol;
        }
        return part.value;
    }).join('');

    return formatted;
}

// React hook that subscribes to the currency store to trigger re-renders on currency change
export function useFormatPrice() {
    const currency = useCurrencyStore(st => st.currency);
    const rates = useCurrencyStore(st => st.rates);
    const symbols = useCurrencyStore(st => st.symbols);
    const locales = useCurrencyStore(st => st.locales);

    return (price, digit = 0) => {
        return formatPriceWithState(price, { currency, rates, symbols, locales }, digit);
    };
}

// Legacy formatPrice function (does not trigger re-renders itself but useful for non-React contexts)
export function formatPrice(price, digit = 0) {
    const state = useCurrencyStore.getState();
    return formatPriceWithState(price, state, digit);
}
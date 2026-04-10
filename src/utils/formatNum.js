
export function formatPrice (price, digit = 0){
    const thbFormatter = new Intl.NumberFormat('en-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: digit,    
    })

    const val = price ? Number(price) : 0;

    return thbFormatter.format(val).replace('THB', 'THB ')
}
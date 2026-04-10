import { useEffect } from "react"
import { formatPrice } from "../../utils/formatNum.js"
import useBookingStore from "../../stores/bookingStore.js"

function BPrice({roomInfo, Info}) {
    const { currentRoom } = roomInfo
    const { room, nightCount } = Info

    const originalPrice = currentRoom?.nightlyRate * room * nightCount

    const discount = originalPrice * 0.30 //-%30 every deals jaa for now
    const discountPrice = originalPrice - discount

    const servicechargeprice = discountPrice * 0.10
    const totalPricewSVC = discountPrice + servicechargeprice
    const VATprice = totalPricewSVC * 0.07
    const SVCnVAT = servicechargeprice + VATprice

    const grandTotalPrice = discountPrice + SVCnVAT

    useEffect(()=>{
        useBookingStore.getState().setTotalPrice(grandTotalPrice)
    },[grandTotalPrice])

  return (
    <div className='bg-base-200 w-[500px] h-fit rounded-[12px] p-6 flex flex-col'>
        <h1 className="text-[24px]">Price Details</h1>
        <div className="flex justify-between font-[Whitney-Book]">
            <p>{`${room} room${room>1?'s':''}`} x {`${nightCount} night${nightCount>1?'s':''}`}</p>
            {/* <p>THB {Number(currentRoom.nightlyRate).toFixed(2).toLocaleString()}</p> */}
            <p>{formatPrice(originalPrice,2)}</p>
        </div>
        <div className="flex justify-between font-[Whitney-Book] text-primary">
            <p>Discount</p>
            <p>- {formatPrice(discount,2)}</p>
        </div>
        <div className="flex justify-between font-[Whitney-Book]">
            <p>Taxes & fees</p>{/*servicecharge&vat*/}
            <p>{formatPrice(SVCnVAT,2)}</p>
        </div>
        <hr className='text-neutral-400/40 my-5' />
        <div className="flex justify-between text-[22px]">
            <p>Total</p>
            <p>{formatPrice(grandTotalPrice,2)}</p>
        </div>
        {/* <p className="font-[Whitney-Book] text-primary">You saved  THB 1,999 on this booking</p> */}
    </div>
  )
}

export default BPrice
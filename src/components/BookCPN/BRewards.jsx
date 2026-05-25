import { useEffect } from "react"
import useBookingStore from "../../stores/bookingStore"
import { useFormatPrice } from "../../utils/formatNum"
import useRewardStore from "../../stores/rewardStore"

function BRewards() {
  const formatPrice = useFormatPrice()
  const pricePreview = useBookingStore(st=>st.pricePreview)
  const calculateBookingRewards = useRewardStore(st=>st.calculateBookingRewards)
  const previewRewards = useRewardStore(st=>st.previewRewards)
  
  useEffect(()=>{
    calculateBookingRewards(pricePreview.finalPrice)
  },[pricePreview.finalPrice, calculateBookingRewards])

  return (
    <div className='bg-base-200 w-[500px] h-fit rounded-[12px] p-6 flex flex-col gap-2'>
        <h1 className="text-[24px]">Rewards</h1>
        <p className="font-[Whitney-Book]">
            Earn <span className="text-secondary font-[Whitney-Medium]">{previewRewards?.rewardPoints} Pich Coins (~ {formatPrice(Number(previewRewards?.rewardPoints) * 10)})</span> after your stay.</p>
    </div>
  )
}

export default BRewards
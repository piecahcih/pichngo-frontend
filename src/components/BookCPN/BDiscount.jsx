import { useState } from "react"
import Swal from "sweetalert2"
import useBookingStore from "../../stores/bookingStore"

function BDiscount() {
  const promoCode = useBookingStore(st=>st.promoCode)
  const setPromoCode = useBookingStore(st=>st.setPromoCode)

  const [inputCode, setInputCode] = useState(promoCode || "")
  const isInputValid = inputCode.trim().length > 0;

  const hdlApplyPromo = () => {
    setPromoCode(inputCode.trim())
    Swal.fire(`promotion code ${inputCode} has been applied`);
  }

  return (
    <div className='bg-base-200 w-[40vw] h-fit rounded-[12px] p-6 flex flex-col'>
        <h1 className="text-[24px]">Discount</h1>
        {/* <p className="font-[Whitney-Book] text-primary"><strong>30% Special Discount</strong> in every booking</p> */}
        <div className="border border-neutral/50 rounded-[4px] p-2 w-fit flex gap-8 mt-2">
          <input type="text" placeholder="Enter more promo code" value={inputCode} onChange={(e) => setInputCode(e.target.value)}
          className="font-[Whitney-Book] outline-none"/>
          <button onClick={hdlApplyPromo} disabled={!isInputValid}
          className={`text-white px-6 py-2 rounded-[4px] font-[Whitney-Medium] ${isInputValid ? 'bg-primary' : 'bg-[#D1D5DB]'}`}>
            Use
          </button>
        </div>

        {/* <h1 className="text-[24px] mt-6">Pich Coins</h1>
        <p className="font-[Whitney-Book]">Use 67 Trip Coins to save
          <span className="text-secondary font-[Whitney-Medium]"> THB 24.67</span></p> */}
    </div>
  )
}

export default BDiscount
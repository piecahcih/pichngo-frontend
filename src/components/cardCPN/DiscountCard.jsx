import { useState } from "react"


function DiscountCard({ discount }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const text = discount?.description || "Get a discount on your next booking with us!"

    return (
        <div className='relative w-[404px] h-[264px] rounded-[12px] bg-cyan-700 text-neutral-content flex flex-col gap-3 justify-between p-5 flex-none transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden'>
            
            <img
                src={discount?.discountImage}
                alt="discountImage"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            {/* <div className="font-[Whitney-Bold] text-[24px]">
                {discount?.type === 'percent' ? `${discount.value}% OFF` : `${discount?.value || 0} THB OFF`}
            </div>

            <div className="flex flex-col gap-3">
                <div className="font-[Whitney-Medium] text-[16px]">
                    {text.length < 80 ? text : <p className={isExpanded ? "" : "line-clamp-2"}>{text}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="text-[12px] opacity-80">Use Code:</div>
                    <div className="font-[Whitney-Bold] text-[18px] bg-white/20 px-3 py-1.5 rounded-lg w-fit tracking-wider">
                        {discount?.code || "PROMOCODE"}
                    </div>
                </div>

                <div className="font-[Whitney-Light] text-[12px] opacity-70 mt-2">
                    Valid until {discount?.endDate ? new Date(discount.endDate).toLocaleDateString() : 'N/A'}
                </div>
            </div> */}
        </div>
    )
}

export default DiscountCard
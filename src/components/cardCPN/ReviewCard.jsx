import { useState } from "react"


function ReviewCard() {
  const [isExpanded, setIsExpanded] =useState(false)
  const text = "This cozy courtyard near the Old City of Chiang Mai is so goggksjdfshfjajdk;asdak;ldjajs"

  return (
    <div className='w-[264px] h-[404px] rounded-[12px] bg-cyan-700 text-neutral-content flex flex-col gap-3 justify-end p-5'>
      <div className="font-[Whitney-Medium]">
        {text.length < 80 ? text : <p className={isExpanded ? "" : "line-clamp-2"}>{text}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full bg-primary"></div>
        <div className="font-[Whitney-Light] text-[14px]">Name_Reviewer</div>
      </div>
    </div>
  )
}

export default ReviewCard
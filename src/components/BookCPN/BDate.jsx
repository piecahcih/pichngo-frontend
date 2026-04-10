
function BDate() {
  return (
    <div className='bg-base-200 w-[500px] h-fit rounded-[12px] p-6 flex flex-col'>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <p className='font-[Whitney-Book]'>checkin</p>
                <h1 className="text-[24px]">Thu, Mar 26</h1>
                <p className='font-[Whitney-Book]'>14:00</p>
            </div>
            <div className="flex flex-col">
                <p className='font-[Whitney-Book]'>checkout</p>
                <h1 className="text-[24px]">Fri, Mar 27</h1>
                <p className='font-[Whitney-Book]'>12:00</p>
            </div>
        </div>
        <hr className='text-neutral-400/40 my-5' />
        <div className="flex justify-between">
            <p className='font-[Whitney-Medium]'>1 night</p>
            <p className='font-[Whitney-Medium]'>3 rooms</p>
        </div>
    </div>
  )
}

export default BDate
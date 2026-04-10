import mockMap from '../../assets/map.png'
import { StarLogo } from '../../icons'

function FilterCard() {

  return (
    <div className='flex flex-col gap-5 w-[300px]'>
        <div className="bg-base-200 h-[120px]">
            <img src={mockMap} className='h-full' />
        </div>
        
        <div className="bg-base-200 h-fit p-5">
            <div className="flex flex-col gap-5">
              <h1 className='font-[Whitney-Bold]'>Budget</h1>
              <input type="range" min={0} max="100" 
                className="range range-xs px-2 h-6 text-secondary [--range-bg:lightgray] [--range-thumb:white] [--range-fill:0] 
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5   "/>

              <div className="flex justify-around text-[12px] mt-3">
                <div className="flex flex-col gap-2">
                  <h3>MIN</h3>
                  <input type="text" placeholder='฿ 0' className='border p-1 w-25' />
                </div>
                <div className="flex flex-col gap-2">
                  <h3>MAX</h3>
                  <input type="text" placeholder='฿ 100,000' className='border p-1 w-25' />
                </div>
              </div>
            </div>

            <div className="divider -mx-5"></div>

            <div className="flex flex-col gap-2">
              <h1 className='font-[Whitney-Bold]'>Star Rating</h1>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
              </div>
            </div>

            <div className="divider -mx-5"></div>

            <div className="flex flex-col gap-2">
              <h1 className='font-[Whitney-Bold]'>Property facilities & services</h1>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Pool</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Gym</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Spa/Sauna</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Laundry room</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>24-hour front desk</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Internet</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Car park</p>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className='accent-primary'/>
                <p className='font-[Whitney-medium]'>Restaurants</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FilterCard
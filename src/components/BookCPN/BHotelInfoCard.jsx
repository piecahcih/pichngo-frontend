import { CalendarIcon, DoorIcon, InfoIcon, PeopleIcon, StarLogo } from '../../icons'
import { differenceInDays, format } from 'date-fns'
import useHotelStore from '../../stores/hotelStore'
import { formatPrice } from '../../utils/formatNum'

function BHotelInfoCard({roomInfo, Info}) {
    const { currentHotel, currentRoom } = roomInfo
    const { checkin, checkout, room, guest, nightCount} = Info

  return (
    <div className='bg-base-200 w-[500px] h-fit rounded-[12px] p-6 flex flex-col'>
        <div className="flex gap-6">
            <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                <img src={currentHotel.hotelImg.img1} alt="hotelImg" className='w-full h-full object-cover'/>  
            </div>
            <div className="flex flex-col">
                <h1 className="text-[24px]">{currentHotel?.name}</h1>
                <div className="flex">
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                  <StarLogo className="h-[17px] text-secondary"/>
                </div>
                <p className='font-[Whitney-Book]'>{currentHotel?.address}</p>
            </div>
        </div>
        <hr className='text-neutral-400/40 my-5' />
        <div className="flex flex-col">
            <h1 className="text-[24px]">{currentRoom?.roomType}</h1>
            <p className='font-[Whitney-Light] text-neutral/80'>{formatPrice(currentRoom?.nightlyRate)} per room, per night</p>
            <p className='flex gap-2 items-center font-[Whitney-Light] text-neutral/80 leading-1'><InfoIcon className="w-4"/> Non-refundable</p>
        </div>
        <div className="border border-neutral-400/40 rounded-[12px] my-5 p-5 flex justify-between">
            <div className="flex flex-col">
                <p className='font-[Whitney-Book]'>checkin</p>
                <h1 className="text-[24px]">{format(checkin,'EEE, MMM dd')}</h1>
                <p className='font-[Whitney-Book]'>14:00</p>
            </div>
            <div className="flex flex-col">
                <p className='font-[Whitney-Book]'>checkout</p>
                <h1 className="text-[24px]">{format(checkout,'EEE, MMM dd')}</h1>
                <p className='font-[Whitney-Book]'>12:00</p>
            </div>
        </div>
        <hr className='text-neutral-400/40 my-5' />
        <div className="flex justify-around">
            <p className='font-[Whitney-Medium] flex gap-2 -mr-7'><CalendarIcon className="w-5"/>{`${nightCount} night${nightCount>1?'s':''}`}</p>
            <p className='font-[Whitney-Medium] flex gap-2 border-x border-neutral/50 w-1/3 justify-center'><DoorIcon className="w-5"/>{`${room} room${room>1?'s':''}`}</p>
            <p className='font-[Whitney-Medium] flex gap-2 -ml-7'><PeopleIcon className="w-5"/>{`${guest} guest${guest>1?'s':''}`}</p>
        </div>

    </div>
  )
}

export default BHotelInfoCard
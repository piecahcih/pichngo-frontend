import { useNavigate, useSearchParams } from "react-router"
import useUserStore from "../../stores/userStore"
import { toast } from "react-toastify"
import { LoginSwal } from "../swal/LoginAlert"
import { formatPrice } from "../../utils/formatNum"
import useBookingStore from "../../stores/bookingStore"
import { differenceInDays } from "date-fns"

function RoomCard({room}) {
    const user = useUserStore(st=>st.user)
    const navigate = useNavigate()
    const[searchParams] = useSearchParams()

    const roomAmn = searchParams.get("room")
    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")
    const nightCount = differenceInDays(new Date(checkout), new Date(checkin))

    const hdlReserve = async (e) => {
        e.preventDefault()

        if(!user){
            LoginSwal(navigate)
            // toast.error("Please log in to reserve a hotel")
            return
        }

        const data = {
            checkin: checkin,
            checkout: checkout,
            nightCount: nightCount || 0 ,
            room: searchParams.get("room"),
            roomId: room.id,
            guest: Number(searchParams.get("adult"))+Number(searchParams.get("children")||0)
        }

        await useBookingStore.getState().setCurrentBooking(data)

        navigate(`/book`)
        // navigate(`/book?${searchParams}&roomId=${room.id}`)
    }

  return (
    <div className="border border-base-content rounded-[12px] flex p-5 justify-between items-end">
        <div className="flex gap-5">
            <img src={room.roomImg} alt="room picture" className="w-[250px] h-fit rounded-[5px]" />
            <div>
                <h3 className="text-[20px]">{room.roomType}</h3>
                <div className="font-[Whitney-Book] text-[14px] flex gap-2">
                    <p> {room.roomSize} m<sup>2</sup> </p>
                    <hr className="w-[1px] h-6 bg-gray-400 border-0" />
                    <p>Max {room.maxAdults} adults</p>
                    <hr className="w-[1px] h-6 bg-gray-400 border-0" />
                    <p>Max {room.maxChildren} childrens</p>
                    <hr className="w-[1px] h-6 bg-gray-400 border-0" />
                    <p>{room.bedSetup}</p>  
                </div>
            </div>
        </div>
            {/* <pre>searchpr:{searchParams}</pre> */}
        <div className="flex gap-6 items-center">
            <div className="flex flex-col items-end">
                <div className="flex flex-col items-end pb-1.5">
                    <h3 className="text-[20px]">{formatPrice(room.nightlyRate)}</h3>
                    <p className="font-[Whitney-Book] text-[12px] leading-1">Total price:{formatPrice(room.nightlyRate*(nightCount||1))}</p>    
                </div>
                <p className="font-[Whitney-Book] text-[12px]">Price before taxes</p>    
            </div>
            <button onClick={hdlReserve} className="bg-primary text-white px-6 py-1.5 rounded-[20px] text-[20px] h-fit">Reserve</button>
        </div>
    </div>
  )
}

export default RoomCard
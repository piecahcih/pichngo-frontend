import { NavLink, useNavigate, useSearchParams } from "react-router"
import useHotelStore from "../stores/hotelStore"
import { motion } from 'motion/react'
import { useParams } from "react-router"
import { HeartLineLogo, HeartLogo, StarLogo } from "../icons"
import useUserStore from "../stores/userStore"
import RoomCard from "../components/cardCPN/RoomCard"
import { toast } from "react-toastify"
import { LoginSwal } from "../components/swal/LoginAlert"
import mockMap from '../assets/map.png'

function HotelsDetail() {
    const user = useUserStore(st => st.user)
    const hotels = useHotelStore(st => st.hotels)
    const createLike = useHotelStore(st => st.createLike)
    const unLike = useHotelStore(st => st.unLike)
    const myLists = useHotelStore(st => st.myLists)

    const navigate = useNavigate()

    const { city, hotelname } = useParams()
    const [searchParams] = useSearchParams()

    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }

    const currentHotel = 
        hotels?.find(h => createSlug(h.name) === hotelname) || myLists?.find(h => createSlug(h.name) === hotelname)
    if (!currentHotel) return <div>Loading...</div>

    const haveLike = currentHotel.likes?.some(el => el.userId === user?.id)

    const hdlLikeClick = async (e) => {
        e.preventDefault()
        e.stopPropagation() // Stops the click from bubbling up the HTML tree

        if (!user) {
            LoginSwal(navigate)
            // toast.error("Please log in to like a hotel")
            return
        }

        if (haveLike) {
            await unLike(user.id, currentHotel.id)
        } else {
            await createLike(user.id, currentHotel.id)
        }
    }

    return (
        <div className="bg-base-300 min-h-[67vh] flex flex-col pt-[80px] pb-15 text-primary-content">
            <div className="mx-[10%] flex flex-col gap-10 my-8">
                <div className="flex gap-2 text-[12px] font-[Whitney-Light] leading-0 text-neutral">
                    <NavLink to="/">Home</NavLink>
                    <p>{">"}</p>
                    <NavLink to={`/hotels/${city}?${searchParams}`}>{currentHotel.city}</NavLink>
                    <p>{">"}</p>
                    <p className="font-[Whitney-medium]">{currentHotel.name}</p>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-[26px] font-[Whitney-Bold]">{currentHotel.name}</h1>
                        <h3 className="text-[16px] font-[Whitney-Light] leading-3">{currentHotel.address}, {currentHotel.city}, {currentHotel.country}</h3>
                    </div>

                    <a href="#selectroom" className="bg-primary px-4 py-2 h-fit rounded-[14px] text-[18px] text-neutral-content">Select Rooms</a>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-[1.5fr_1fr_1.5fr] gap-1.5 h-[380px] rounded-[12px] overflow-hidden">
                        <div className="w-full h-full overflow-hidden">
                            <motion.img src={currentHotel.hotelImg.img1} className="w-full h-full object-cover min-h-[380px]"
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                        </div>

                        <div className="grid grid-rows-2 gap-1.5 h-full w-full min-h-[380px]">
                            <div className="w-full h-full overflow-hidden">
                                <motion.img src={currentHotel.hotelImg.img2} className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                            </div>
                            <div className="w-full h-full overflow-hidden">
                                <motion.img src={currentHotel.hotelImg.img3} className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                            </div>
                        </div>

                        <div className="w-full h-full overflow-hidden">
                            <motion.img src={currentHotel.hotelImg.img4} className="w-full h-full object-cover min-h-[380px]"
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                        </div>
                    </div>

                    <motion.button whileTap={{ scale: 1.2, transition: { duration: 0.2 } }} onClick={hdlLikeClick}
                        className="bg-base-100 rounded-full p-1.5 ml-auto text-neutral absolute top-4 right-4">
                        {haveLike ? <HeartLogo className="h-[28px]" /> :
                            <HeartLineLogo className="h-[28px] text-neutral opacity-80" />
                        }
                    </motion.button>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col w-[50vw] gap-6 ">
                        <div className="">
                            <h1 className="text-[22px]">Amenities</h1>
                            <p className="font-[Whitney-Book]">{currentHotel.amenities}</p>
                        </div>
                        <div className="">
                            <h1 className="text-[22px]">Property Description</h1>
                            <p className="font-[Whitney-Book]">{currentHotel.hotelDetails}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 w-[25vw] border-l border-neutral/20 p-4">
                        {/* <div className="flex justify-between border border-neutral/50 rounded-[12px] pt-2 py-5"> */}
                        <div className="flex justify-between">
                            <div className="">
                                <h1 className="text-[22px] flex gap-1.5">4.8 <StarLogo className="w-6 text-secondary"/></h1>
                                <p className="font-[Whitney-Book] leading-1">(4 Reviews)</p>
                            </div>
                                <button className="text-info">Read all reviews</button>
                        </div>
                        <div className="border-t border-neutral/20">
                            <img src={mockMap} alt="map" className="my-4" />
                            <h1 className="text-[22px]">Surroundings</h1>
                            <p className="font-[Whitney-Book]">{currentHotel.surroundings}</p>
                        </div>
                        <div className="">
                            <h1 className="text-[22px]">Policies</h1>
                            <p className="font-[Whitney-Book]">{currentHotel.policies}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pt-10" id="selectroom">
                    <h1 className="text-[22px]">Room Availability</h1>
                    {currentHotel.rooms?.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>

            </div>
            {/* <pre>{JSON.stringify(currentHotel, null, 2)}</pre> */}
        </div>
    )
}

export default HotelsDetail
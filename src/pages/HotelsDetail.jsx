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
import { useEffect, useState } from "react"
import useReviewStore from "../stores/reviewStore"
import HotelReviewModalItem from "../components/cardCPN/HotelReviewModalItem"

function HotelsDetail() {
    const user = useUserStore(st => st.user)
    // const hotels = useHotelStore(st => st.hotels)
    const selectHotel = useHotelStore(st => st.selectHotel)
    const getHotelsByName = useHotelStore(st => st.getHotelsByName)
    const createLike = useHotelStore(st => st.createLike)
    const unLike = useHotelStore(st => st.unLike)
    const myLists = useHotelStore(st => st.myLists)
    const getReviewByHotel = useReviewStore(st => st.getReviewByHotel)
    const [reviews, setReviews] = useState([])
    const [isLoadingReviews, setIsLoadingReviews] = useState(false)

    const hdlReadAllReviews = async () => {
        document.getElementById('review_modal').showModal()
        if (selectHotel?.id) {
            setIsLoadingReviews(true)
            try {
                const data = await getReviewByHotel(selectHotel.id)
                setReviews(data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoadingReviews(false)
            }
        }
    }

    const navigate = useNavigate()

    const { city, hotelname } = useParams()
    const [searchParams] = useSearchParams()

    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }

    useEffect(()=>{
        const checkin = searchParams.get("checkin")
        const checkout = searchParams.get("checkout")
        getHotelsByName(city, hotelname, checkin, checkout)
    },[getHotelsByName, city, hotelname, searchParams])

    // console.log('selectHotel', selectHotel)

    // const selectHotel = 
    //     hotels?.find(h => createSlug(h.name) === hotelname) || myLists?.find(h => createSlug(h.name) === hotelname)
    // if (!selectHotel) return <div>Loading...</div>

    const haveLike = selectHotel.likes?.some(el => el.userId === user?.id)

    const hdlLikeClick = async (e) => {
        e.preventDefault()
        e.stopPropagation() // Stops the click from bubbling up the HTML tree

        if (!user) {
            LoginSwal(navigate)
            // toast.error("Please log in to like a hotel")
            return
        }

        if (haveLike) {
            await unLike(user.id, selectHotel.id)
        } else {
            await createLike(user.id, selectHotel.id)
        }
    }

    return (
        <div className="bg-base-300 min-h-[67vh] flex flex-col pt-[80px] pb-15 text-primary-content">
            <div className="mx-[10%] flex flex-col gap-10 my-8">
                <div className="flex gap-2 text-[12px] font-[Whitney-Light] leading-0 text-neutral">
                    <NavLink to="/">Home</NavLink>
                    <p>{">"}</p>
                    <NavLink to={`/hotels/${city}?${searchParams}`}>{selectHotel.city}</NavLink>
                    <p>{">"}</p>
                    <p className="font-[Whitney-medium]">{selectHotel.name}</p>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-[26px] font-[Whitney-Bold]">{selectHotel.name}</h1>
                        <h3 className="text-[16px] font-[Whitney-Light] leading-3">{selectHotel.address}, {selectHotel.city}, {selectHotel.country}</h3>
                    </div>

                    <a href="#selectroom" className="bg-primary px-4 py-2 h-fit rounded-[14px] text-[18px] text-neutral-content">Select Rooms</a>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-[1.5fr_1fr_1.5fr] gap-1.5 h-[380px] rounded-[12px] overflow-hidden">
                        <div className="w-full h-full overflow-hidden">
                            <motion.img src={selectHotel.hotelImg?.img1} className="w-full h-full object-cover min-h-[380px]"
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                        </div>

                        <div className="grid grid-rows-2 gap-1.5 h-full w-full min-h-[380px]">
                            <div className="w-full h-full overflow-hidden">
                                <motion.img src={selectHotel.hotelImg?.img2} className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                            </div>
                            <div className="w-full h-full overflow-hidden">
                                <motion.img src={selectHotel.hotelImg?.img3} className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} />
                            </div>
                        </div>

                        <div className="w-full h-full overflow-hidden">
                            <motion.img src={selectHotel.hotelImg?.img4} className="w-full h-full object-cover min-h-[380px]"
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
                            <h1 className="text-[22px]">Property Description</h1>
                            <p className="font-[Whitney-Book]">{selectHotel.hotelDetails}</p>
                        </div>
                        <div className="">
                            <h1 className="text-[22px]">Amenities</h1>
                            <p className="font-[Whitney-Book]">{selectHotel.amenities}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 w-[25vw] border-l border-neutral/20 p-4">
                        {/* <div className="flex justify-between border border-neutral/50 rounded-[12px] pt-2 py-5"> */}
                        <div className="flex justify-between">
                            <div className="">
                                <h1 className="text-[22px] flex gap-1.5">{Number(selectHotel.averageRating).toFixed(1)} <StarLogo className="w-6 text-secondary"/></h1>
                                <p className="font-[Whitney-Book] leading-1">({selectHotel.reviewCount} Reviews)</p>
                            </div>
                                <button onClick={hdlReadAllReviews} className="text-info hover:underline">Read all reviews</button>
                        </div>
                        <div className="border-t border-neutral/20">
                            <a 
                                href={selectHotel?.name ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectHotel.name}, ${selectHotel.address || ''}, ${selectHotel.city || ''}`)}` : "#"}
                                target={selectHotel?.name ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="relative group my-4 overflow-hidden rounded-[12px] cursor-pointer transition-all duration-300 hover:shadow-md">
                                    <img src={mockMap} alt="Hotel location map" 
                                        className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-primary/0 border-0 group-hover:bg-primary/5 group-hover:border-2 group-hover:border-primary rounded-[12px]" />
                                </div>
                            </a>

                            <h1 className="text-[22px]">Surroundings</h1>
                            <p className="font-[Whitney-Book]">{selectHotel.surroundings}</p>
                        </div>
                        <div className="">
                            <h1 className="text-[22px]">Policies</h1>
                            <p className="font-[Whitney-Book]">{selectHotel.policies}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pt-10" id="selectroom">
                    <h1 className="text-[22px]">Room Availability</h1>
                    {selectHotel.rooms?.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>

            </div>

            <dialog id="review_modal" className="modal">
                <div className="modal-box w-11/12 max-w-[55vw] bg-base-200">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-[Whitney-Bold] text-[22px] mb-6">Reviews for {selectHotel?.name}</h3>
                    {isLoadingReviews ? (
                        <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                    ) : reviews?.length > 0 ? (
                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                            {reviews.map(review => (
                                <HotelReviewModalItem key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-10 font-[Whitney-Book]">No reviews found.</p>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* <pre>{JSON.stringify(selectHotel, null, 2)}</pre> */}
        </div>
    )
}

export default HotelsDetail
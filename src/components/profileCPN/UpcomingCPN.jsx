"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import useBookingStore from "../../stores/bookingStore"
import { differenceInDays, format } from "date-fns"
import { formatPrice } from "../../utils/formatNum"
import { DeleteBKSwal } from "../swal/DeleteBKAlert"
import { useNavigate } from "react-router"
import { CancelBKSwal } from "../swal/CancelBKAlert"
import useHotelStore from "../../stores/hotelStore"

/**
 * ==============   Data   ================
 */

const allIngredients = [
  { icon: "🍅", label: "Upcoming" },
  { icon: "🥬", label: "Completed" },
  { icon: "🧀", label: "Cancelled" },
]

const [tomato, lettuce, cheese] = allIngredients
const tabs = [tomato, lettuce, cheese]

////COMPONENT
const HistoryCard = ({booking,sll}) => {
    const nightCount = (booking.checkInDate && booking.checkOutDate) ? differenceInDays(new Date(booking.checkOutDate), new Date(booking.checkInDate)): 0
    const deleteOnSubmit = async () => {   
        try {
            console.log(booking.id)
            console.log(typeof(booking.id))
            await useBookingStore.getState().deleteSpecificBooking(booking.id)
            console.log(`Delete Booking NO.${booking.id} successfully `)
            await useBookingStore.getState().getAllBookingsFromThisUser()

        } catch (error) {
            console.error("Delete process failed", error)
        }
    }

    const navigate = useNavigate()
    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }

    const cancelOnSubmit = async () => {   
        try {
            console.log(booking.id)
            // console.log(typeof(booking.id))
            await useBookingStore.getState().cancelBookingByUser(booking.id)
            console.log(`Delete Booking NO.${booking.id} successfully `)
            await useBookingStore.getState().getAllBookingsFromThisUser()

        } catch (error) {
            console.error("Delete process failed", error)
        }
    }

    // const getHotelsByName = useHotelStore(st=>st.getHotelsByName)

    const hdlBookingAgain = async () => {
      // await getHotelsByName(booking?.room?.hotel?.city, booking?.room?.hotel?.name)
      await useHotelStore.getState().getHotelsByCity(booking?.room?.hotel?.city)

      navigate(`/hotels/${createSlug(booking?.room?.hotel?.city)}/${createSlug(booking?.room?.hotel?.name)}`)
    }


    return (
        <div className="w-full h-full bg-base-200 flex flex-col gap-4 p-3 border border-neutral/50 rounded-[12px] ">
            <div className="">
                <div className="flex justify-between border-b pb-3 text-[14px]">
                    <div className="flex font-[Whitney-Book] gap-4">
                        <h3>Booking No.{booking.id}</h3>
                        <h3>Booking Date: {format(booking.bookingDate, 'MMMM dd, yyyy')}</h3>
                    </div>
                    <p className={booking.bookingStatus === 'CONFIRMED' ? 'text-success': booking.bookingStatus ===  'WAITING' ? 'text-warning': 'text-error' }>{booking.bookingStatus}</p>
                </div>

                <div className="flex justify-between gap-4 py-3">
                    <div className="w-[100px] h-[115px] rounded-[6px] overflow-hidden">
                        <img src={booking?.room?.hotel?.hotelImg?.img1} alt="hotelimg" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-[420px] flex flex-col justify-between py-1">
                        <div className="flex justify-between text-[18px]">
                            <h1>{booking.room.hotel.name}</h1>
                            <h1>{formatPrice(booking.finalPrice,2)}</h1>
                        </div>
                        <div className="bg-base-100 p-2 flex justify-between font-[Whitney-Medium] text-[14px]">
                            <div className="w-[160px]">
                                <h3>{format(booking.checkInDate, 'MMMM dd, yyyy')} - {format(booking.checkOutDate, 'MMMM dd, yyyy')}</h3>
                                <p className="font-[Whitney-Light]">{nightCount} night{nightCount<1 ? 's' : ''}</p>
                            </div>
                            <div className="w-fit">
                                <h3>{booking.bookingGuests?.[0]?.firstName} {booking.bookingGuests?.[0]?.lastName}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {sll === 'Upcoming' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => CancelBKSwal({booking, cancelOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Cancel</button>
                    </div>
                )}
                
                {sll === 'Completed' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => DeleteBKSwal({booking, deleteOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Delete</button>
                        <button onClick={() => hdlBookingAgain() } className="bg-primary px-4 py-1.5 rounded-[8px] text-white">Book Again</button>
                    </div>
                )}
                
                {sll === 'Cancelled' && (
                    <div className="flex justify-end gap-4">
                        <button onClick={() => DeleteBKSwal({booking, deleteOnSubmit})} className="border border-primary px-4 py-1.5 rounded-[8px] text-primary">Delete</button>
                        <button onClick={() => hdlBookingAgain() } className="bg-primary px-4 py-1.5 rounded-[8px] text-white">Book Again</button>
                    </div>
                )}
                
            </div>

        </div>
    )
}




////MOTION COMPONENT
export default function SharedLayoutAnimation() {
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const booking = useBookingStore(st=>st.booking)
    const getAllBookingsFromThisUser = useBookingStore(st=>st.getAllBookingsFromThisUser)

    // const get
    // const [book, setBook] = useState([])

    useEffect(()=>{
        // console.log('bbbbb')
        getAllBookingsFromThisUser()
        // console.log('aaaa')
        // setBook(booking)
    },[getAllBookingsFromThisUser])


    const bookingArray = Array.isArray(booking) ? booking : (booking ? [booking] : []);

    // console.log('booking', booking)
    // console.log('TO.booking', Array.isArray(booking))

    const today = new Date();
    today.setHours(0,0,0,0);

    const upcomingTrip = bookingArray.filter(item=> new Date(item.checkInDate)>= today  && new Date(item.checkOutDate)>= today && item.bookingStatus !== "CANCELLED" )
    const completedTrip = bookingArray.filter(item=> new Date(item.checkInDate)<= today  && new Date(item.checkOutDate)<= today && item.bookingStatus !== "CANCELLED" )
    const cancelledTrip = bookingArray.filter(item=> item.bookingStatus === "CANCELLED" )
    // console.log('upcomingTrip', upcomingTrip)
    // console.log('selectedTab.label', selectedTab.label)

  return (
    <div style={container}>

      <nav style={nav}>
        <ul style={tabsContainer}>
          {tabs.map(item => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                color: item === selectedTab ? "#D44A1B" : "#676767"
              }}
              style={tab}
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div
                  style={underline}
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>


      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.label === "Upcoming" && (
                <div className="w-full h-full flex flex-col gap-4 pt-4">
                    {upcomingTrip.length > 0 ? upcomingTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label}/>)
                    : "No Upcoming Trip"}
                </div>
            )}

            {selectedTab.label === "Completed" && (
                <div className="w-full h-full flex flex-col gap-4 pt-4">
                    {completedTrip.length > 0 ? completedTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label}/>)
                    : "No Completed Trip"}
                </div>
            )}
            
            {selectedTab.label === "Cancelled" && (
                <div className="w-full h-full flex flex-col gap-4 pt-4">
                    {cancelledTrip.length > 0 ? cancelledTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label}/>)
                    : "No Cancelled Trip"}
                </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* <main className="overflow-scroll">
        <pre className="text-red-600">{JSON.stringify(upcomingTrip, null, 2)}</pre>
      </main> */}
    </div>
  )
}

/**
 * ==============   Styles   ================
 */

const container = {
  width: "570px",
//   height: "fit",
  minHeight: 300,
  // borderRadius: 10,
  background: "#FBF9F6",
  overflow: "hidden",
  // boxShadow:
  //   "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
  display: "flex",
  flexDirection: "column"
}

const nav = {
  background: "#FBF9F6",
//   padding: "5px 5px 0",
//   borderRadius: "10px",
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
  borderBottom: "1px solid #999999",
  height: 44
}

const tabsStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 18,
}

const tabsContainer = {
  ...tabsStyles,
  display: "flex",
  width: "100%",
  height: "100%",
  padding: "0px 0px 12px"
}

const tab = {
  ...tabsStyles,
//   borderRadius: 5,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
  width: "100%",
  height: "100%",
//   padding: "0px 20px 0px",
  position: "relative",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
  userSelect: "none",
  color: "#676767"
}

const underline = {
  position: "absolute",
  bottom: -13,
  left: 0,
  right: 0,
  height: 3,
  background: "#D44A1B",
  zIndex: 1,
}

const iconContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1
}

const icon = {
  fontSize: 128
}


"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import useBookingStore from "../../stores/bookingStore"
import HistoryCard from "./HistoryCard"

/**
 * ==============   Data   ================
 */

const allIngredients = [
  { label: "Upcoming" },
  { label: "Completed" },
  { label: "Cancelled" },
]

const [Upcoming, Completed, Cancelled] = allIngredients
const tabs = [Upcoming, Completed, Cancelled]

////MOTION COMPONENT
export default function SharedLayoutAnimation() {
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const booking = useBookingStore(st => st.booking)
  const getAllBookingsFromThisUser = useBookingStore(st => st.getAllBookingsFromThisUser)

  // const get
  // const [book, setBook] = useState([])

  useEffect(() => {
    // console.log('bbbbb')
    getAllBookingsFromThisUser()
    // console.log('aaaa')
    // setBook(booking)
  }, [getAllBookingsFromThisUser])


  // const bookingArray = Array.isArray(booking) ? booking : (booking ? [booking] : []);

  // console.log('booking', booking)
  // console.log('TO.booking', Array.isArray(booking))

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrip = booking.filter(item => new Date(item.checkInDate) >= today && new Date(item.checkOutDate) >= today && item.bookingStatus !== "CANCELLED")
  const completedTrip = booking.filter(item => new Date(item.checkInDate) <= today && new Date(item.checkOutDate) <= today && item.bookingStatus !== "CANCELLED")
  const cancelledTrip = booking.filter(item => item.bookingStatus === "CANCELLED")
  // const upcomingTrip = bookingArray.filter(item => new Date(item.checkInDate) >= today && new Date(item.checkOutDate) >= today && item.bookingStatus !== "CANCELLED")
  // const completedTrip = bookingArray.filter(item => new Date(item.checkInDate) <= today && new Date(item.checkOutDate) <= today && item.bookingStatus !== "CANCELLED")
  // const cancelledTrip = bookingArray.filter(item => item.bookingStatus === "CANCELLED")
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
                {upcomingTrip.length > 0 ? upcomingTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label} />)
                  : (<p className="mt-24 text-center text-neutral/60 font-[Whitney-Medium] text-[15px]">
                        No Upcoming Trip.
                    </p>)}
              </div>
            )}

            {selectedTab.label === "Completed" && (
              <div className="w-full h-full flex flex-col gap-4 pt-4">
                {completedTrip.length > 0 ? completedTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label} />)
                  : (<p className="mt-24 text-center text-neutral/60 font-[Whitney-Medium] text-[15px]">
                        No Completed Trip.
                    </p>)}
              </div>
            )}

            {selectedTab.label === "Cancelled" && (
              <div className="w-full h-full flex flex-col gap-4 pt-4">
                {cancelledTrip.length > 0 ? cancelledTrip.map(item => <HistoryCard key={item.id} booking={item} sll={selectedTab.label} />)
                  : (<p className="mt-24 text-center text-neutral/60 font-[Whitney-Medium] text-[15px]">
                        No Cancelled Trip.
                    </p>)}
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


import { differenceInDays, formatDate, subDays } from "date-fns"
import { useNavigate } from "react-router"
import { formatPrice } from "../../utils/formatNum"
import useBookingStore from "../../stores/bookingStore"
import { SuccessLogo } from "../../icons"

function BSuccess({bk}) {
  const booking = useBookingStore(st=>st.booking)
  const navigate = useNavigate()


  return (
    <div className="">
      <div className="max-w-[800px] mx-auto pt-12 -mb-10 flex flex-col justify-between items-center">
        <SuccessLogo className="w-15 text-primary"/>
        <h1 className="text-neutral text-[26px] font-[Whitney-Bold]">You successfully created your booking</h1>
        <button onClick={()=>navigate('/account/bookings')} className="underline hover:text-primary">Go to your booking history</button>

      </div>

      <div className="max-w-[800px] mx-auto my-20 bg-base-200 shadow-lg font-sans text-[#333]">
            {/* Header Section */}
            <div className="p-6 flex justify-between items-center">
              <div className="text-[#D44A1B] text-[32px] tracking-[2.8px]">Pich & Go</div>
              <div className="text-right">
                <h2 className="text-lg font-bold">Check-in voucher</h2>
                <p className="text-primary font-bold text-xl"><span className="text-neutral">Confirmation no.</span> 999240334494280</p>
                <p className="text-sm text-gray-500">Booking No.: {bk.id}</p>
              </div>
            </div>

            {/* Hotel Info Section */}
            <div className="px-6 py-4 border-y border-blue-100 flex gap-4">
              <img 
                src={bk.room?.hotel?.hotelImg?.img1} 
                alt="Hotel" 
                className="w-[150px] h-[150px] object-cover rounded"
              />
              <div className="text-neutral font-[Whitney-Book]">
                <h1 className="text-xl font-[Whitney-Bold]">{bk.room.hotel.name}</h1>
                <p className="mt-1">Address: {bk.room.hotel.address}, {bk.room.hotel.city}, {bk.room.hotel.country}</p>
                <p >Phone: +86-23-89883999, +86-23-89883666</p>
              </div>
            </div>

            {/* Date & Room Stats Section */}
            <div className="flex border-b border-blue-100">
              <div className="flex-1 p-6 border-r border-blue-100 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Check-in</p>
                <p className="text-2xl font-[Whitney-Bold] mt-1">{formatDate(bk.checkInDate,'MMM dd, yyyy')}</p>
                <p className="text-sm text-gray-500">{formatDate(bk.checkInDate,'EEEE')} | After 14:00</p>
              </div>
              <div className="flex-1 p-6 border-r border-blue-100 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Check-out</p>
                <p className="text-2xl font-[Whitney-Bold] mt-1">{formatDate(bk.checkOutDate,'MMM dd, yyyy')}</p>
                <p className="text-sm text-gray-500">{formatDate(bk.checkOutDate,'EEEE')}  | Before 12:00</p>
              </div>
              <div className="flex-1 p-6 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Rooms / Nights</p>
                <p className="text-2xl font-[Whitney-Bold] mt-1">{bk.roomAmount||1} <span className="text-gray-300 font-light">/</span> {differenceInDays(new Date(bk.checkOutDate),new Date(bk.checkInDate))||1}</p>
              </div>
            </div>

            {/* Pricing & Room Detail Section */}
            <div className="flex border-b border-blue-100 min-h-[300px]">
              {/* Left: Price */}
              <div className="w-1/3 p-6 border-r border-blue-100">
                <h3 className="font-bold text-lg mb-4">Price Details</h3>
                <p className="text-xs text-gray-500">{booking.paymentDetails.paymentMethod}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold">{formatPrice(bk.finalPrice,2)}</span>
                  <span className="text-[10px] border border-primary text-primary px-1 rounded">Paid</span>
                </div>
                <p className="text-xs text-gray-500">Includes: Taxes & fees</p>
              </div>

              {/* Right: Room Details */}
              <div className="w-2/3 p-6">
                <h3 className="font-bold text-lg">{bk.room.roomType}</h3>
                
                <div className="mt-4">
                  <p className="text-[10px] text-gray-400 uppercase">Guest Names</p>
                  <p className="text-sm font-[Whitney-Medium] leading-4">{booking.guestList.map(item=> `${item.firstName} ${item.lastName}`).join(", ")}</p>
                </div>

                <div className="mt-4 flex gap-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Occupancy</p>
                    <p className="text-xs">Max 2 adults</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Room info</p>
                    <p className="text-xs">1 king bed</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-[10px] text-gray-400 uppercase">Meals</p>
                  <p className="text-xs">No meals included</p>
                </div>
              </div>
            </div>

            {/* Amenities & Policy Section */}
            <div className="flex px-6 gap-10">
              <div className="w-1/3 p-6 border-r border-blue-100">
                <h3 className="font-bold mb-3">Room Amenities</h3>
                <p className="text-[11px] text-neutral font-[Whitney-Medium] leading-relaxed">
                  Toothbrush · Toothpaste · Body wash · Shampoo · Hair conditioner · Soap · Shower cap · Comb · Shaver · Private bathroom · Private toilet · Hair dryer · Shower · Towel · Bath towel · 24-hour hot water · Slippers · Rainfall Shower Head
                </p>
              </div>

              <div className="w-2/3 py-6 -ml-2.5">
                <h3 className="font-bold mb-3">Cancellation Policy</h3>
                <table className="w-full text-xs border-collapse">
                  <thead className="font-[Whitney-Semibold]">
                    <tr className="bg-gray-50 text-gray-500">
                      <th className="border p-2 text-left font-medium">Hotel's Local Time</th>
                      <th className="border p-2 text-left font-medium">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="font-[Whitney-Medium]">
                    <tr>
                      <td className="border p-2">Before 12:00, {formatDate(subDays(new Date(bk.checkInDate),3),'MMM dd, yyyy')}</td>
                      <td className="border p-2">Free Cancellation</td>
                    </tr>
                    <tr>
                      <td className="border p-2">After 12:00, {formatDate(subDays(new Date(bk.checkInDate),3),'MMM dd, yyyy')}</td>
                      <td className="border p-2">Non-refundable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

                          {/* <pre>{JSON.stringify(booking, null, 2)}</pre>
                          <pre>{typeof(booking)}</pre>
                          <pre>ar{Array.isArray(booking).toString()}</pre> */}
      </div>

    </div>
  )
}

export default BSuccess
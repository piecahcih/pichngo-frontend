import { NavLink, useParams } from "react-router"
import useReviewStore from "../stores/reviewStore"
import { useEffect, useMemo } from "react"
import defaultImg from "../assets/default-profilepic.jpg"
import { formatPrice } from "../utils/formatNum"

function ReviewDetails() {
    const selectReview = useReviewStore(st => st.selectReview)
    const getReviewById = useReviewStore(st => st.getReviewById)

    const { reviewid } = useParams()
    console.log('reviews', selectReview)

    useEffect(() => {
        if (reviewid) {
            getReviewById(reviewid)
        }
    }, [reviewid, getReviewById])

    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }


    if (!selectReview) {
        return (
            <div className="bg-base-300 min-h-[67vh] flex items-center justify-center pt-[80px]">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="bg-base-300 min-h-[67vh] flex flex-col pt-[80px] pb-15 text-primary-content font-[Whitney-Medium]">
            <div className="mx-[10%] my-6 flex flex-col gap-6">
                
                {/* Breadcrumbs */}
                <div className="flex gap-2 text-[12px] font-[Whitney-Light] leading-none text-neutral mb-2">
                    <NavLink to="/" className="hover:underline">Home</NavLink>
                    <p>{">"}</p>
                    <NavLink to="/reviews" className="hover:underline">Reviews</NavLink>
                    <p>{">"}</p>
                    <p className="font-[Whitney-Medium]">Review Details</p>
                </div>

                {/* Details Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left side: Image */}
                    {selectReview?.reviewImg && (
                        <div className="w-full h-[350px] md:h-[480px] overflow-hidden shadow-inner relative group">
                            <img 
                                src={selectReview?.reviewImg || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"} 
                                alt="Review Highlight"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    )}

                    {/* Right side: Content */}
                    <div className="flex flex-col justify-between py-2 gap-4">

                        {/* Bottom: Reviewer Profile info */}
                        <div className="flex items-center gap-3.5">
                            <img 
                                src={selectReview?.user?.profileImg || defaultImg} 
                                alt={selectReview?.user?.name || "Reviewer"} 
                                className="w-12 h-12 rounded-full object-cover border border-neutral/10 bg-white"
                            />
                            <div className="flex flex-col">
                                <span className="font-[Whitney-Bold] text-primary-content text-[15px]">
                                    {selectReview?.user?.name || "Anonymous Traveler"}
                                </span>
                                {/* Star Rating & Stayed Date */}
                                <div className="flex items-center gap-3.5 -mt-1">
                                    <div className="text-yellow-400 text-lg flex items-center">
                                        {"★".repeat(selectReview?.rating || 5)}{"☆".repeat(5 - (selectReview?.rating || 5))}
                                    </div>
                                    {selectReview?.stayedDate && (
                                        <span className="text-xs text-neutral/70 font-[Whitney-Light] border-l border-neutral/20 pl-3">
                                            Stayed: {new Date(selectReview.stayedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-5">
                            {/* Hotel name & City */}
                            <div>
                                {selectReview?.hotel?.name && (
                                    <h1 className="text-[20px] font-[Whitney-Semibold] mb-1">
                                        {selectReview?.hotel?.city ? `${selectReview.hotel.name}, ${selectReview.hotel.city}` : selectReview.hotel.name}
                                    </h1>
                                )}                
                                {/* Details Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {selectReview?.room?.roomType && (
                                        <span className="badge badge-outline border-neutral/15 text-neutral text-xs px-3 py-2 rounded-[8px] font-[Whitney-Book]">
                                            Room: {selectReview.room.roomType}
                                        </span>
                                    )}
                                    {selectReview?.hotel?.country && (
                                        <span className="badge badge-outline border-neutral/15 text-neutral text-xs px-3 py-2 rounded-[8px] font-[Whitney-Book]">
                                            Country: {selectReview.hotel.country}
                                        </span>
                                    )}
                                </div>
                            </div>


                            {/* Review Content */}
                            <div className="text-neutral font-[Whitney-Book] text-[15px] leading-relaxed whitespace-pre-line border-b border-neutral/10 pb-5 mt-2 max-h-[250px] overflow-y-auto scrollbar-hide">
                                {selectReview?.reviewContent || "No review content provided."}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[18px] font-[Whitney-Semibold] mb-1">Mention in this review</h2>

                            <NavLink to={`/hotels/${createSlug(selectReview.hotel?.city)}/${createSlug(selectReview.hotel?.name)}`}>
                                <div className="border border-neutral/50 p-3 flex gap-4">
                                    <img src={selectReview.hotel?.hotelImg?.img1} alt="hotelImg" className="w-30 h-30 object-cover" />
                                    <div>
                                        <h3 className="font-bold">{selectReview.hotel?.name}</h3>
                                        <p>review</p>
                                        <p className="text-[12px] font-[Whitney-Light]">{selectReview.hotel?.address}</p>
                                    </div>
                                    <div className="flex justify-end items-end">
                                        <h3 className="text-end text-[22px] font-[Whitney-Bold]">{formatPrice(selectReview.room?.nightlyRate)}</h3>
                                    </div>
                                </div>
                            </NavLink>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}

export default ReviewDetails
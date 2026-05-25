import { useEffect, useState, useMemo } from "react"
import useReviewStore from "../stores/reviewStore"
import { motion, AnimatePresence } from "motion/react"
import ReviewCard from "../components/cardCPN/ReviewCard"
import { NavLink } from "react-router"
import { DropDownIcon, SearchLogo } from "../icons"

function Reviews() {
    const reviews = useReviewStore(st => st.reviews)
    const getReviews = useReviewStore(st => st.getReviews)

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRating, setSelectedRating] = useState("All")
    const [onlyPhotos, setOnlyPhotos] = useState(false)
    const [sortBy, setSortBy] = useState("Newest stays")

    useEffect(() => {
        getReviews()
    }, [getReviews])

    // Calculations for Stats (based on all reviews before filters are applied)
    const stats = useMemo(() => {
        const total = reviews.length
        if (total === 0) {
            return { avg: "0.0", total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
        }
        const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0)
        const avg = (sum / total).toFixed(1)

        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        reviews.forEach(r => {
            if (breakdown[r.rating] !== undefined) {
                breakdown[r.rating]++
            }
        })
        return { avg, total, breakdown }
    }, [reviews])

    // Apply Filter & Sort logic
    const processedReviews = useMemo(() => {
        let result = [...reviews]

        // 1. Keyword search
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase()
            result = result.filter(r => 
                r.reviewContent?.toLowerCase().includes(query) ||
                r.user?.name?.toLowerCase().includes(query)
            )
        }

        // 2. Star rating filter
        if (selectedRating !== "All") {
            const star = Number(selectedRating)
            result = result.filter(r => r.rating === star)
        }

        // 3. Photos only filter
        if (onlyPhotos) {
            result = result.filter(r => r.reviewImg !== null && r.reviewImg !== undefined && r.reviewImg !== "")
        }

        // 4. Sort
        result.sort((a, b) => {
            if (sortBy === "Newest stays") {
                return new Date(b.stayedDate) - new Date(a.stayedDate)
            }
            if (sortBy === "Highest rating") {
                return b.rating - a.rating
            }
            if (sortBy === "Lowest rating") {
                return a.rating - b.rating
            }
            return 0
        })

        return result
    }, [reviews, searchQuery, selectedRating, onlyPhotos, sortBy])

    const handleSortChange = (option) => {
        setSortBy(option)
        const ele = document.activeElement
        if (ele) {
            ele.blur()
        }
    }

    return (
        <div className="bg-base-300 min-h-[67vh] flex flex-col pt-[80px] pb-15 text-primary-content font-[Whitney-Medium]">
                
            <div className="mx-[10%] flex flex-col gap-6">
                <div className="flex flex-col">

                    <div className="bg-gradient-to-br from-primary/95 to-secondary/95 text-white p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between relative overflow-hidden">
                        <div className="flex-1 z-10">
                            <span className="bg-white/20 text-white text-xs font-[Whitney-Semibold] px-3 py-1 rounded-full uppercase tracking-wider">
                                Traveler Stories
                            </span>
                            <h1 className="text-3xl md:text-4xl font-[Whitney-Bold] mt-3 mb-2 text-white">The Art of Going</h1>
                            <p className="text-white/80 font-[Whitney-Book] text-[15px] max-w-xl leading-relaxed">
                                Curated by Us, Rated by You. Read real traveler stories, photo highlights, and detailed accommodation experiences from around the world.
                            </p>
                        </div>                   

                        <div className="bg-black/15 backdrop-blur-md rounded-2xl p-6 flex flex-col sm:flex-row gap-8 w-full lg:w-auto items-center z-10 border border-white/10">
                            <div className="text-center sm:border-r sm:border-white/20 sm:pr-8 flex flex-col items-center">
                                <span className="text-6xl font-[Whitney-Bold] text-white flex items-baseline gap-1">
                                    {stats.avg}
                                    <span className="text-yellow-400 text-3xl">★</span>
                                </span>
                                <span className="text-[13px] text-white/80 mt-2 font-[Whitney-Light] block">
                                    Based on {stats.total} {stats.total === 1 ? 'review' : 'reviews'}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 w-full sm:w-52">
                                {[5, 4, 3, 2, 1].map(stars => {
                                    const count = stats.breakdown[stars]
                                    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
                                    return (
                                        <button 
                                            key={stars} 
                                            onClick={() => setSelectedRating(selectedRating === String(stars) ? "All" : String(stars))}
                                            className={`flex items-center gap-2 group text-left cursor-pointer transition-all hover:scale-[1.02] ${selectedRating === String(stars) ? 'opacity-100 font-[Whitney-Semibold]' : 'opacity-85'}`}
                                        >
                                            <span className="w-10 text-white text-xs text-right">{stars} ★</span>
                                            <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="w-6 text-white text-xs text-right font-[Whitney-Light] group-hover:underline">
                                                {count}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                        <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                    </div>


                    {/* Filter and Control Bar */}
                    <div className="bg-base-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-base-100">
                        
                        {/* Search & Pills Container */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 flex-1">
                            {/* Search Input */}
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral">
                                    <SearchLogo className="w-4 h-4 opacity-70" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search reviews..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input input-bordered w-full pl-5 pr-4 py-2.5 rounded-[10px] text-[15px] font-[Whitney-Book] bg-base-100 focus:outline-none border-neutral/20 focus:border-primary text-primary-content"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral hover:text-primary transition-colors"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Star Filters (Pills) */}
                            <div className="flex flex-wrap items-center gap-2">
                                {["All", "5", "4", "3", "2"].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => setSelectedRating(rating)}
                                        className={`px-2 py-2 rounded-[10px] text-xs font-[Whitney-Semibold] border transition-all cursor-pointer ${
                                            selectedRating === rating
                                                ? "bg-primary text-white border-primary shadow-sm"
                                                : "bg-base-100 border-neutral/10 hover:border-neutral/30 text-neutral"
                                        }`}
                                    >
                                        {rating === "All" ? "All Stars" : `${rating} ★`}
                                    </button>
                                ))}
                            </div>
                            {(searchQuery || selectedRating !== "All" || onlyPhotos) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedRating("All")
                                        setOnlyPhotos(false)
                                    }}
                                    className="text-primary hover:underline font-[Whitney-Semibold] cursor-pointer text-xs"
                                >
                                    Reset all filters
                                </button>
                            )}
                        </div>

                        {/* Toggle and Sort */}
                        <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end">
                            {/* Photo Toggle */}
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={onlyPhotos}
                                    onChange={(e) => setOnlyPhotos(e.target.checked)}
                                    className="toggle toggle-primary toggle-sm"
                                />
                                <span className="text-[14px] text-neutral font-[Whitney-Book]">Photos only</span>
                            </label>

                            {/* Sort Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn bg-base-100 hover:bg-base-100/80 px-4 py-2.5 rounded-[10px] border border-neutral/15 hover:border-neutral/30 font-[Whitney-Book] text-[15px] flex items-center justify-between gap-3 text-primary-content"
                                >
                                    <span>Sort: {sortBy}</span>
                                    <DropDownIcon className="w-3.5 h-3.5 opacity-70" />
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu shadow-md bg-base-100 p-2 mt-1.5 font-[Whitney-Light] rounded-[10px] text-[15px] w-48 border border-neutral/5 z-20"
                                >
                                    <li>
                                        <button onClick={() => handleSortChange("Newest stays")} className="hover:bg-base-300 py-2.5 text-left rounded-[6px]">
                                            Newest stays
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleSortChange("Highest rating")} className="hover:bg-base-300 py-2.5 text-left rounded-[6px]">
                                            Highest rating
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleSortChange("Lowest rating")} className="hover:bg-base-300 py-2.5 text-left rounded-[6px]">
                                            Lowest rating
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>



                <div className="flex justify-between">
                    <div className="flex gap-2 text-[12px] font-[Whitney-Light] leading-none text-neutral">
                            <NavLink to="/" className="hover:underline">Home</NavLink>
                            <p>{">"}</p>
                            <p className="font-[Whitney-Medium]">Reviews</p>
                    </div> 

                    {/* Filter Summary & Matches count */}
                    <div className="flex items-center justify-between text-xs text-neutral/70 px-1 font-[Whitney-Book]">
                        <p>Showing {processedReviews.length} of {reviews.length} reviews</p>
                    </div>
                </div>

                {/* Grid list / Cards Grid */}
                <div className="my-2">
                    {processedReviews.length > 0 ? (
                        <motion.div 
                            layout
                            className="flex flex-wrap gap-5 justify-between"
                        >
                            <AnimatePresence mode="popLayout">
                                {processedReviews.map((review, i) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.25 }}
                                        key={review.id || i}
                                    >
                                        <ReviewCard review={review} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        /* Beautiful Empty State */
                        <div className="bg-base-200 rounded-[20px] py-16 px-6 text-center border border-neutral/5 flex flex-col items-center max-w-lg mx-auto my-8 shadow-sm">
                            <div className="w-16 h-16 bg-neutral/10 rounded-full flex items-center justify-center text-2xl text-neutral mb-4">
                                ✉
                            </div>
                            <h3 className="text-lg font-[Whitney-Bold] text-primary-content mb-1">No reviews found</h3>
                            <p className="text-neutral font-[Whitney-Book] text-[14px] max-w-sm leading-relaxed mb-6">
                                We couldn't find any reviews matching your criteria. Try widening your search keyword or clearing the filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedRating("All")
                                    setOnlyPhotos(false)
                                }}
                                className="btn btn-primary rounded-[10px] text-xs font-[Whitney-Semibold] px-6 text-white cursor-pointer"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Reviews
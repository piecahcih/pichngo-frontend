import { useState } from "react"
import defaultImg from '../../assets/default-profilepic.jpg'
import { NavLink } from "react-router"

function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const text = review?.reviewContent || "No review content provided."
  const reviewerName = review?.user?.name || "Anonymous"
  const profileImg = review?.user?.profileImg || defaultImg
  const plainWhiteFallback = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

  return (
    <NavLink to={`/reviews/${review?.id}`}>
      <div className='relative w-[264px] h-[404px] rounded-[12px] text-white flex flex-col justify-end flex-none hover:scale-[1.02] transition-transform duration-300 cursor-pointer overflow-hidden group'>

        <div className="absolute inset-0 bg-base-200 z-1" />
        <img
          src={review?.reviewImg || plainWhiteFallback}
          alt="reviewImg"
          className="absolute inset-0 w-full h-full object-cover z-2"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        <div className="relative p-5 z-25 flex flex-col gap-3 max-h-full overflow-y-auto scrollbar-hide">
          <div className="font-[Whitney-Medium] flex-1">
            {text.length < 150 ? text : (
              <div>
                <p className={isExpanded ? "" : "line-clamp-4"}>{text}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="text-[12px] underline mt-1 block opacity-80 hover:opacity-100"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-white/20">
            <img
              src={profileImg}
              alt={reviewerName}
              className="w-[30px] h-[30px] rounded-full object-cover bg-white"
            />
            <div className="flex flex-col">
              <div className="font-[Whitney-Medium] text-[14px]">{reviewerName}</div>
              {review?.rating && (
                <div className="text-yellow-400 text-[12px]">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </NavLink>
  )
}

export default ReviewCard
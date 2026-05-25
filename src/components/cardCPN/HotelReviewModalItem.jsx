import { format } from "date-fns"
import defaultImg from '../../assets/default-profilepic.jpg'

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className="text-[18px]"
        style={{ color: s <= rating ? "#D44A1B" : "#D1C9C0" }}
      >
        ★
      </span>
    ))}
  </div>
)

const HotelReviewModalItem = ({ review }) => {
  const profileImg = review?.user?.profileImg || defaultImg
  const reviewerName = review?.user?.name || "Anonymous"

  return (
    <div className="w-full flex flex-col gap-3 p-4 border border-neutral/30 rounded-[12px] bg-base-100">
      {/* ── Top row: User info + Rating ── */}
      <div className="flex justify-between items-start border-b border-neutral/20 pb-3">

        <div className="flex items-center gap-3">
          <img
            src={profileImg}
            alt={reviewerName}
            className="w-[50px] h-[50px] rounded-full object-cover bg-white"
          />
          <div className="flex flex-col">
            <h3 className="text-[16px] font-[Whitney-Medium]">
              {reviewerName}
            </h3>
            {review?.room?.roomType && (
              <p className="text-[13px] font-[Whitney-Light] text-neutral/60">
                {review?.room?.roomType}
              </p>
            )}
            <p className="text-[12px] font-[Whitney-Light] text-neutral/50">
              Stayed:{" "}
              {review.stayedDate
                ? format(new Date(review.stayedDate), "MMMM dd, yyyy")
                : "—"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 mt-2">
          <StarDisplay rating={review.rating} />
        </div>        
      </div>

      {/* ── Content + review image ── */}
      <div className="flex gap-4">
        {review.reviewImg && (
          <div className="w-[100px] h-[100px] rounded-[8px] overflow-hidden flex-shrink-0">
            <img
              src={review.reviewImg}
              alt="review"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-[14px] font-[Whitney-Book] text-neutral/80 leading-relaxed whitespace-pre-wrap">
          {review.reviewContent || "No review content provided."}
        </p>
      </div>
    </div>
  )
}

export default HotelReviewModalItem

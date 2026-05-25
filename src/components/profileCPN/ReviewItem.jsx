import { useEffect, useState } from "react"
import { format } from "date-fns"
import { getReviewByIdApi } from "../../api/mainAPI"
import useReviewStore from "../../stores/reviewStore"
import { DeleteReviewSwal } from "../swal/DeleteReviewAlert"

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

const ReviewItem = ({ review, onDeleted }) => {

  const deleteOnSubmit = async () => {
    await useReviewStore.getState().deleteReview(review.id)
    onDeleted()
  }


  return (
    <div className="w-full flex flex-col gap-3 p-4 border border-neutral/30 rounded-[12px]">

      {/* ── Top row: hotel info + delete ── */}
      <div className="flex justify-between items-start border-b border-neutral/20 pb-3">

          {/* Hotel name + room */}
          <div className="flex flex-col">
            <h3 className="text-[16px] font-[Whitney-Medium]">
              {review?.hotel?.name ?? <span className="text-neutral/30 animate-pulse">Loading…</span>}
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

        <div className="flex flex-col items-end justify-between gap-1.5">
          <button
            onClick={() => DeleteReviewSwal({ review, deleteOnSubmit })}
            className="border border-neutral/50 text-neutral/50 text-[13px] w-20 px-3 py-1 rounded-[8px] hover:bg-primary/5 transition-colors flex-shrink-0"
          >
            Delete
          </button>

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
        <p className="text-[14px] font-[Whitney-Book] text-neutral/80 leading-relaxed">
          {review.reviewContent}
        </p>
      </div>

    </div>
  )
}

export default ReviewItem

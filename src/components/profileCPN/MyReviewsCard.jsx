import { useEffect } from "react"
import useReviewStore from "../../stores/reviewStore"
import useUserStore from "../../stores/userStore"
import ReviewItem from "./ReviewItem"

function MyReviewsCard() {
  const myReviews = useReviewStore(st=>st.myReviews)
  const getAllMyReviews = useReviewStore(st=>st.getAllMyReviews)
  const user = useUserStore((st) => st.user)

  useEffect(() => {
    getAllMyReviews()
  }, [getAllMyReviews])


  return (
    <div className="bg-base-200 w-[655px] h-fit rounded-[20px] px-10 py-7 flex flex-col">
      <h1 className="text-[26px] mb-5">Reviews</h1>

      <div className="flex flex-col gap-4">
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onDeleted={getAllMyReviews}
            />
          ))
        ) : (
          <p className="mt-14 mb-19 text-center text-neutral/60 font-[Whitney-Medium] text-[15px]">
            You haven't written any reviews yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default MyReviewsCard
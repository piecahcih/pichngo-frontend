import { useRef, useState } from "react"
import { format } from "date-fns"
import useReviewStore from "../../stores/reviewStore"
import useUserStore from "../../stores/userStore"
import uploadCloud from "../../utils/uploadCloud"
import { toast } from "react-toastify"

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-[32px] transition-transform duration-100 hover:scale-110 focus:outline-none"
          style={{ color: star <= (hovered || value) ? "#D44A1B" : "#D1C9C0" }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

const ReviewModal = ({ booking, modalId, onReviewCreated }) => {
  const user = useUserStore((st) => st.user)
  const createReview = useReviewStore((st) => st.createReview)

  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [imgUrl, setImgUrl] = useState(null)
  const [imgPreview, setImgPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const resetForm = () => {
    setRating(0)
    setContent("")
    setImgUrl(null)
    setImgPreview(null)
  }

  const handleClose = () => {
    resetForm()
    document.getElementById(modalId)?.close()
  }

  const handleImgChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    try {
      const reviewImgUrl = await uploadCloud(selectedFile)
      console.log("reviewImgUrl:", reviewImgUrl)
      setImgUrl(reviewImgUrl)
      setImgPreview(URL.createObjectURL(selectedFile))

    } catch (error) {
      console.error("Upload process failed", error);
      setError("Failed to upload image. Please try again.");
    }
  }

  const handleRemoveImg = () => {
    setImgUrl(null)
    setImgPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e) => {
    if (rating === 0) return toast.error("Please select a star rating")
    if (!content.trim()) return toast.error("Please write your review")

    setLoading(true)

    try {
      const body = {
        userId: user?.id,
        hotelId: booking?.room?.hotel?.id,
        roomId: booking?.room?.id,
        reviewContent: content.trim(),
        rating,
        stayedDate: booking?.checkInDate,
        ...(imgUrl && { reviewImg: imgUrl }),
      }

      await createReview(body)
      toast.success("Review submitted! Thank you 🎉")
      handleClose()
      if (onReviewCreated) onReviewCreated()
    } catch (err) {
      console.error("Review submission failed", err)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setLoading(false)
    }

    // try {
    //   let reviewImgUrl = null
    //   if (imgUrl) {
    //     reviewImgUrl = await uploadCloud(imgUrl)
    //   }

    //   const body = {
    //     userId: user?.id,
    //     hotelId: booking?.room?.hotel?.id,
    //     roomId: booking?.room?.id,
    //     reviewContent: content.trim(),
    //     rating,
    //     stayedDate: booking?.checkInDate,
    //     ...(reviewImgUrl && { reviewImg: reviewImgUrl }),
    //   }

    //   await createReview(body)
    //   toast.success("Review submitted! Thank you 🎉")
    //   handleClose()
    //   if (onReviewCreated) onReviewCreated()
    // } catch (err) {
    //   console.error("Review submission failed", err)
    //   toast.error("Failed to submit review. Please try again.")
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-[520px] p-0 overflow-hidden rounded-[16px]">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-white text-[20px] font-[Whitney-Medium]">Write a Review</h2>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white text-[22px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Hotel Info */}
        <div className="px-6 py-4 flex gap-3 items-center border-b border-base-300 bg-base-200">
          <div className="w-[60px] h-[60px] rounded-[8px] overflow-hidden flex-shrink-0">
            <img
              src={booking?.room?.hotel?.hotelImg?.img1}
              alt="hotel"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[16px] font-[Whitney-Medium]">{booking?.room?.hotel?.name}</p>
            <p className="text-[13px] text-neutral/70 font-[Whitney-Light]">
              {booking?.checkInDate ? format(new Date(booking.checkInDate), "MMM dd") : ""}
              {" – "}
              {booking?.checkOutDate ? format(new Date(booking.checkOutDate), "MMM dd, yyyy") : ""}
            </p>
            <p className="text-[13px] text-neutral/70 font-[Whitney-Light]">
              {booking?.room?.roomType}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="px-6 py-5 flex flex-col gap-5 bg-base-100">
          {/* Star Rating */}
          <div>
            <label className="block text-[14px] font-[Whitney-Medium] mb-2 text-neutral/80">
              Overall Rating <span className="text-error">*</span>
            </label>
            <StarRating value={rating} onChange={setRating} />
            {rating > 0 && (
              <p className="text-[13px] text-primary mt-1 font-[Whitney-Book]">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </p>
            )}
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-[14px] font-[Whitney-Medium] mb-2 text-neutral/80">
              Your Review <span className="text-error">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Share your experience with this hotel…"
              className="w-full border border-base-300 rounded-[10px] px-4 py-3 text-[14px] font-[Whitney-Book] resize-none focus:outline-none focus:border-primary bg-base-200 placeholder:text-neutral/40 transition-colors"
            />
            <p className="text-[12px] text-neutral/40 text-right mt-0.5">{content.length}/1000</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[14px] font-[Whitney-Medium] mb-2 text-neutral/80">
              Add a Photo <span className="text-[12px] font-[Whitney-Light] text-neutral/50">(optional)</span>
            </label>

            {imgPreview ? (
              <div className="relative w-full h-[160px] rounded-[10px] overflow-hidden border border-base-300">
                <img src={imgPreview} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={handleRemoveImg}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center text-[14px] transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-[100px] border-2 border-dashed border-base-300 hover:border-primary rounded-[10px] flex flex-col items-center justify-center gap-2 text-neutral/50 hover:text-primary transition-colors group"
              >
                <svg
                  className="w-8 h-8 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[13px] font-[Whitney-Book]">Click to upload image</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImgChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2 rounded-[8px] border border-primary text-primary text-[14px] font-[Whitney-Medium] hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-[8px] bg-primary text-white text-[14px] font-[Whitney-Medium] hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Submitting…
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={resetForm}>close</button>
      </form>
    </dialog>
  )
}

export default ReviewModal

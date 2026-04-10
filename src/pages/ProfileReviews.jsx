import AccountMenu from "../components/profileCPN/AccountMenu"
import MyReviewsCard from "../components/profileCPN/MyReviewsCard"

function ProfileReviews() {
  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 p-[150px]">
      <AccountMenu/>
      <MyReviewsCard/>
    </div>
  )
}

export default ProfileReviews
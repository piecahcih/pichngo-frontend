import { useEffect } from "react"
import useUserStore from "../../stores/userStore"
import useRewardStore from "../../stores/rewardStore"
import { useFormatPrice } from "../../utils/formatNum"
import ProfilePic from "./ProfilePic"
import { StarIcon } from "../../icons"

const TIERS = [
  { label: "Bronze", bookings: 0 },
  { label: "Silver", spend: 30000, bookings: 2 },
  { label: "Gold", spend: 100000, bookings: 5 },
  { label: "Platinum", spend: 300000, bookings: 15 },
  { label: "Diamond", spend: 750000, bookings: 30 },
]

function MembershipCard() {
  const user = useUserStore(st => st.user)
  const userRewards = useRewardStore(st => st.userRewards)
  const getUserRewardsAndTier = useRewardStore(st => st.getUserRewardsAndTier)

  const activeTierIndex = TIERS.findIndex((t) => t.label === userRewards.tier)
  const formatPrice = useFormatPrice()

  useEffect(() => {
    getUserRewardsAndTier()
  }, [getUserRewardsAndTier])

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-neutral/30 p-6">
      {/* Row 1 — User Info */}
      <div className="flex items-center gap-4">
        <ProfilePic imgSrc={user?.profileImg} className="rounded-full h-[55px] ml-5 mr-2" />
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            Hi, {user?.name}
          </h2>
          <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
            {userRewards.tier || "Bronze"}
          </span>
        </div>
      </div>

      {/* Row 2 — Metrics Grid */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200">
        {[
          { label: "Your Status", value: userRewards.tier || "Bronze" },
          { label: "Pich coins", value: userRewards.availablePoints || 0 },
          { label: "Eligible Spend", value: formatPrice(userRewards.totalSpend || 0) },
        ].map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1 px-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs text-center">
              {m.label}
            </span>
            <span className="text-sm font-bold text-gray-900 sm:text-base">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Row 3 — Milestone Timeline */}
      <div className="mt-8 overflow-x-auto">
        <div className="relative flex min-w-[520px] items-start justify-between">
          {/* Dashed connector line */}
          <div className="absolute left-[40px] right-[40px] top-[18px] border-t-2 border-dashed border-gray-300" />

          {TIERS.map((tier, i) => {
            const isActive = i <= activeTierIndex
            return (
              <div
                key={tier.label}
                className="relative z-10 flex w-0 flex-1 flex-col items-center gap-2"
              >
                <div
                  className={`flex size-9 items-center justify-center rounded-full ${isActive
                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                    : "bg-gray-100 text-gray-400"
                    }`}
                >
                  <StarIcon className="size-4" />
                </div>
                <span
                  className={`text-center text-[10px] leading-tight sm:text-xs ${isActive ? "text-amber-700" : "text-gray-400"
                    }`}
                >
                  {tier.label}
                </span>
                <div className="text-center text-[9px] font-[Whitney-Book] leading-snug text-neutral/60 sm:text-[10px]">
                  {tier.label === "Bronze" ? (
                    <p>MEMBER</p>
                  ) : (
                    <>
                      <p>{tier.bookings} bookings</p>
                      {tier.spend && <p>or {formatPrice(tier.spend)} spent</p>}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MembershipCard

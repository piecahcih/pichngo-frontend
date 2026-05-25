import mockMap from '../../assets/map.png'
import { StarLogo } from '../../icons'

function FilterCard({ filters, setFilters }) {
  // Fallback for independent rendering
  const defaultFilters = {
    minPrice: 0,
    maxPrice: 100000,
    starRatings: [],
    facilities: []
  }

  const activeFilters = filters || defaultFilters
  const updateFilters = setFilters || (() => {})

  const hasActiveFilters = 
    activeFilters.minPrice > 0 || 
    activeFilters.maxPrice < 100000 || 
    activeFilters.starRatings.length > 0 || 
    activeFilters.facilities.length > 0

  const handleClearAll = () => {
    updateFilters(defaultFilters)
  }

  const handleRemoveFilter = (type, value) => {
    if (type === 'minPrice') updateFilters({ ...activeFilters, minPrice: 0 })
    if (type === 'maxPrice') updateFilters({ ...activeFilters, maxPrice: 100000 })
    if (type === 'starRatings') {
      updateFilters({
        ...activeFilters,
        starRatings: activeFilters.starRatings.filter(s => s !== value)
      })
    }
    if (type === 'facilities') {
      updateFilters({
        ...activeFilters,
        facilities: activeFilters.facilities.filter(f => f !== value)
      })
    }
  }

  const handleStarToggle = (stars) => {
    if (activeFilters.starRatings.includes(stars)) {
      handleRemoveFilter('starRatings', stars)
    } else {
      updateFilters({ ...activeFilters, starRatings: [...activeFilters.starRatings, stars] })
    }
  }

  const handleFacToggle = (fac) => {
    if (activeFilters.facilities.includes(fac)) {
      handleRemoveFilter('facilities', fac)
    } else {
      updateFilters({ ...activeFilters, facilities: [...activeFilters.facilities, fac] })
    }
  }

  return (
    <div className='flex flex-col w-[300px]'>
        
        {hasActiveFilters && (
          <div className="bg-base-200 h-fit px-5 pt-5 -mb-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className='font-[Whitney-Bold] text-[18px]'>Your filters</h1>
              <button onClick={handleClearAll} className="text-primary text-[13px] font-[Whitney-Medium] hover:underline">
                Clear all
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.minPrice > 0 && (
                <div className="badge badge-outline border-neutral/30 gap-1 text-[12px] py-3 rounded-[6px]">
                  Min: ฿{activeFilters.minPrice.toLocaleString()}
                  <span className="cursor-pointer font-bold ml-1" onClick={() => handleRemoveFilter('minPrice')}>✕</span>
                </div>
              )}
              {activeFilters.maxPrice < 100000 && (
                <div className="badge badge-outline border-neutral/30 gap-1 text-[12px] py-3 rounded-[6px]">
                  Max: ฿{activeFilters.maxPrice.toLocaleString()}
                  <span className="cursor-pointer font-bold ml-1" onClick={() => handleRemoveFilter('maxPrice')}>✕</span>
                </div>
              )}
              {activeFilters.starRatings.map(s => (
                <div key={s} className="badge badge-outline border-neutral/30 gap-1 text-[12px] py-3 rounded-[6px]">
                  {s} Stars
                  <span className="cursor-pointer font-bold ml-1" onClick={() => handleRemoveFilter('starRatings', s)}>✕</span>
                </div>
              ))}
              {activeFilters.facilities.map(f => (
                <div key={f} className="badge badge-outline border-neutral/30 gap-1 text-[12px] py-3 rounded-[6px]">
                  {f}
                  <span className="cursor-pointer font-bold ml-1" onClick={() => handleRemoveFilter('facilities', f)}>✕</span>
                </div>
              ))}
            </div>
            <div className="divider -mx-5 opacity-50"></div>
          </div>
        )}

        <div className="bg-base-200 h-fit p-5">
            <div className="flex flex-col gap-5">
              <h1 className='font-[Whitney-Bold]'>Budget</h1>
              
              <div className="relative w-full h-6 flex items-center px-1">
                {/* Background track */}
                <div className="absolute left-1 right-1 h-1 bg-neutral/20 rounded-full"></div>
                {/* Active track */}
                <div className="absolute h-1 bg-primary rounded-full pointer-events-none" 
                  style={{ 
                    left: `calc(0.25rem + ${(activeFilters.minPrice / 100000) * 100}%)`, 
                    right: `calc(0.25rem + ${100 - (activeFilters.maxPrice / 100000) * 100}%)` 
                  }}>
                </div>
                {/* Min Slider */}
                <input type="range" min={0} max={100000} step={500}
                  value={activeFilters.minPrice}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), activeFilters.maxPrice - 500)
                    updateFilters({ ...activeFilters, minPrice: val })
                  }}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none h-6 
                  [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20" />
                {/* Max Slider */}
                <input type="range" min={0} max={100000} step={500}
                  value={activeFilters.maxPrice}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), activeFilters.minPrice + 500)
                    updateFilters({ ...activeFilters, maxPrice: val })
                  }}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none h-6 
                  [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20" />
              </div>

              <div className="flex justify-around text-[12px] mt-3">
                <div className="flex flex-col gap-2 w-[45%]">
                  <h3>MIN</h3>
                  <input type="number" 
                    value={activeFilters.minPrice || ''} 
                    onChange={(e) => updateFilters({ ...activeFilters, minPrice: Number(e.target.value) })}
                    placeholder='฿ 0' className='border border-neutral/20 p-2 rounded w-full bg-base-100' />
                </div>
                <div className="flex flex-col gap-2 w-[45%]">
                  <h3>MAX</h3>
                  <input type="number" 
                    value={activeFilters.maxPrice} 
                    onChange={(e) => updateFilters({ ...activeFilters, maxPrice: Number(e.target.value) })}
                    placeholder='฿ 100,000' className='border border-neutral/20 p-2 rounded w-full bg-base-100' />
                </div>
              </div>
            </div>

            <div className="divider -mx-5 opacity-50"></div>

            <div className="flex flex-col gap-3">
              <h1 className='font-[Whitney-Bold] mb-1'>Star Rating</h1>
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-3 cursor-pointer" onClick={() => handleStarToggle(stars)}>
                  <input type="checkbox" className='accent-primary pointer-events-none' checked={activeFilters.starRatings.includes(stars)} readOnly />
                  <div className="flex">
                    {Array.from({ length: stars }).map((_, i) => (
                      <StarLogo key={i} className="h-[17px] text-secondary"/>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider -mx-5 opacity-50"></div>

            <div className="flex flex-col gap-3">
              <h1 className='font-[Whitney-Bold] mb-1'>Property facilities & services</h1>
              {["Pool", "Gym", "Spa/Sauna", "Laundry room", "24-hour front desk", "Internet", "Car park", "Restaurants"].map(fac => (
                <div key={fac} className="flex items-center gap-3 cursor-pointer" onClick={() => handleFacToggle(fac)}>
                  <input type="checkbox" className='accent-primary pointer-events-none' checked={activeFilters.facilities.includes(fac)} readOnly />
                  <p className='font-[Whitney-medium] text-[14px]'>{fac}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default FilterCard
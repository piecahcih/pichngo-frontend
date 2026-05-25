import { NavLink } from "react-router"
import { LanguageLogo } from "../icons"
import SearchBarNav from "./SearchBarNav"
import useCurrencyStore from "../stores/currencyStore"
import { useEffect, useState } from "react"
import SearchBarHome from "./SearchBarHome"

function GuestHeader() {
  const currentCurrency = useCurrencyStore(st=>st.currency)
  const setCurrency = useCurrencyStore(st=>st.setCurrency)
  const rates = useCurrencyStore(st=>st.rates)
  const symbols = useCurrencyStore(st=>st.symbols)

  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const hdlScroll = () => {
      if(window.scrollY > 320) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll',hdlScroll)
    return () => window.removeEventListener('scroll', hdlScroll)
  },[])

  const isTransparent = isHome && !isScrolled
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <div>
      <div className={` transition-all duration-300 h-[80px] px-10 flex justify-between items-center ${
        isTransparent ? 'bg-transparent text-white' : 'bg-base-200 text-neutral shadow-sm'}`}>

        <NavLink to="/"><div className="text-[#D44A1B] whitespace-nowrap text-[16px] md:text-[24px] lg:text-[32px] tracking-[2.8px]">Pich & Go</div></NavLink>

          {!isSearchExpanded && <div onClick={()=>setIsSearchExpanded(true)} className={`pl-30 transition-opacity duration-300 ${isTransparent ? 'opacity-0 pointer-events-none': 'opacity-100'}`}>
            <SearchBarNav/>
          </div>}

          <div className="flex gap-10 text-neutral items-center">
            <div className="dropdown dropdown-bottom dropdown-end flex items-center">
              <div tabIndex={0} role="button" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <LanguageLogo className={`h-5 ${isTransparent ? 'text-white' : 'text-neutral'}`}/>
                <div className={`divider divider-horizontal mx-0.5 -my-2 before:w-[1px] after:w-[1px] ${isTransparent ? 'before:bg-white after:bg-white' : ''}`}></div>
                <p className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>{currentCurrency}</p>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-neutral-content rounded-box z-[150] w-36 p-2 shadow-lg mt-2 text-neutral">
                {Object.keys(rates).map((cur) => (
                  <li key={cur}>
                    <a 
                      className={currentCurrency === cur ? "active font-bold text-primary" : ""} 
                      onClick={() => setCurrency(cur)}
                    >
                      {cur} ({symbols[cur]})
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <NavLink to="./register"><span className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>Sign up</span></NavLink>
            <NavLink to="./login"><span className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>Log in</span></NavLink>
          </div>
      </div>

        {isSearchExpanded && (
          <div className="flex justify-center bg-base-200 p-4 pb-8">
            <div 
              className="fixed inset-0 bg-black/40 -z-10" 
              onClick={() => setIsSearchExpanded(false)} 
            />
            <SearchBarHome onClose={() => setIsSearchExpanded(false)} />
          </div>
        )}            
    </div>
  )
}

export default GuestHeader
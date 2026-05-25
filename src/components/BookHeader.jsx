import { NavLink } from "react-router"
import { HamburgerNavLogo, HeartLogo, LanguageLogo } from "../icons"
import SearchBarNav from "./SearchBarNav"
import useUserStore from "../stores/userStore"
import useCurrencyStore from "../stores/currencyStore"
import ProfilePic from "./profileCPN/ProfilePic"

function BookHeader() {
  const user = useUserStore(st=>st.user)
  const logout = useUserStore(st=>st.logout)
  const currentCurrency = useCurrencyStore(st=>st.currency)
  const setCurrency = useCurrencyStore(st=>st.setCurrency)
  const rates = useCurrencyStore(st=>st.rates)
  const symbols = useCurrencyStore(st=>st.symbols)

  return (
    <div className="flex justify-between items-center bg-base-200 h-[80px] px-10">
        <NavLink to="/"><div className="text-[#D44A1B] text-[32px] tracking-[2.8px]">Pich & Go</div></NavLink>

        {/* <div className="pl-30">
          <SearchBarNav/>
        </div> */}

        <div className="flex gap-10 text-neutral items-center">
          <div className="dropdown dropdown-bottom dropdown-end flex items-center">
            <div tabIndex={0} role="button" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <LanguageLogo className="h-5"/>
              <div className="divider divider-horizontal mx-0.5 -my-2 "></div>
              <p>{currentCurrency}</p>
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

          <div className="border rounded-[12px] border-base-content p-2 bg-neutral-content">
            <NavLink to="/mylists"><HeartLogo className="w-8"/></NavLink>
          </div>

          <div className="dropdown dropdown-end">
              {/* <div tabIndex={0} role="button" className="btn m-1 btn-circle overflow-hidden"> */}
              <div tabIndex={0} role="button" className="border rounded-[12px] border-base-content px-2 py-1 flex gap-2 bg-neutral-content">
                <ProfilePic imgSrc={user.profileImg} className='rounded-full h-[40px]' />
                <HamburgerNavLogo className="w-4"/>
              </div>
            
              <ul tabIndex={0} className="dropdown-content menu bg-neutral-content rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><NavLink to='/account/profile'>Profile</NavLink></li>
                  <li><a onClick={logout}>Sign out</a></li>
              </ul>
          </div>
        </div>
    </div>
  )
}

export default BookHeader
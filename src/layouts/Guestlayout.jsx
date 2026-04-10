import { Outlet, useLocation } from "react-router"
import GuestHeader from "../components/GuestHeader"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Guestlayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-100">
        <GuestHeader/>
      </div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Guestlayout
import { Outlet, useLocation } from "react-router"
import Footer from "../components/Footer"
import BookHeader from "../components/BookHeader"
import { useEffect } from "react";

function Booklayout() {
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
        <BookHeader/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Booklayout
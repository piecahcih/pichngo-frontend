import ADMINheader from '../components/ADMIN/ADMINheader'
import { Outlet, useLocation } from 'react-router'
import Footer from '../components/Footer'
import { useEffect } from 'react';

function AdminLayout() {
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
        <ADMINheader/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AdminLayout
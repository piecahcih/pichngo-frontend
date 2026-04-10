import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

import Guestlayout from "../layouts/Guestlayout";
import Userlayout from "../layouts/Userlayout";
// const Userlayout = lazy(()=>import("../layouts/Userlayout"))
import Booklayout from "../layouts/BookLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import Profile from "../pages/Profile";
import MyList from "../pages/MyList";
import ProfileBookings from "../pages/ProfileBookings";
import ProfileRewards from "../pages/ProfileRewards";
import ProfileReviews from "../pages/ProfileReviews";
import AdminLanding from "../pages/Admin/AdminLanding";
import Hotels from "../pages/Hotels";
import HotelsDetail from "../pages/HotelsDetail";
import BookInfo from "../pages/BookInfo";
import BookSuccess from "../pages/BookSuccess";
import ProfileTravelers from "../pages/ProfileTravelers";
import AllWaitingBookings from "../pages/Admin/AllWaitingBooking";
import AllCancelBookings from "../pages/Admin/AllCancelBookings";
import AllConfirmBookings from "../pages/Admin/AllConfirmBookings";

const guestRouter = createBrowserRouter([
    {
        path:"/",
        element:<Guestlayout/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path:'register',
                element: <Register/>
            },
            {
                path:'login',
                element: <LogIn/>
            },
            {
                path:'/hotels/:city',
                element: <Hotels/>
            },
            {
                path:'/hotels/:city/:hotelname',
                element: <HotelsDetail/>
            },
        ]
    },
    {
        path:'*',
        element: <Navigate to = '/'/>
    }
])

const userRouter = createBrowserRouter([
    {
        path:"/",
        element:<Userlayout/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path:'hotels/:city',
                element: <Hotels/>
            },
            {
                path:'hotels/:city/:hotelname',
                element: <HotelsDetail/>
            },
            {
                path:'account/profile',
                element: <Profile/>
            },
            {
                path:'account/bookings',
                element: <ProfileBookings/>
            },
            {
                path:'account/traveler-info',
                element: <ProfileTravelers/>
            },
            {
                path:'account/rewards',
                element: <ProfileRewards/>
            },
            {
                path:'account/reviews',
                element: <ProfileReviews/>
            },
            {
                path:'mylists',
                element: <MyList/>
            },
        ]
    },
    {
        path:"/book",
        element:<Booklayout/>,
        children:[
            {
                index: true,
                element: <BookInfo/>
            },
            {
                path:'success',
                element: <BookSuccess/>
            },
        ]        
    },
    {
        path:'*',
        element: <Navigate to = '/'/>
    }
])

const adminRouter = createBrowserRouter([
    {
        path:"/admin",
        element:<AdminLayout/>,
        children:[
            {
                index: true,
                element: <AdminLanding/>
            },
            {
                path:'allwaitingbookings',
                element: <AllWaitingBookings/>
            },
            {
                path:'allconfirmbookings',
                element: <AllConfirmBookings/>
            },
            {
                path:'allcancelbookings',
                element: <AllCancelBookings/>
            },
            {
                path:'account/profile',
                element: <Profile/>
            },
            {
                path:'account/bookings',
                element: <ProfileBookings/>
            },
            {
                path:'account/rewards',
                element: <ProfileRewards/>
            },
            {
                path:'account/reviews',
                element: <ProfileReviews/>
            },
        ]
    },
    {
        path:'*',
        element: <Navigate to = '/admin'/>
    }
])

export{ guestRouter, userRouter, adminRouter }
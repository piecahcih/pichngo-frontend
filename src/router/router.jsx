import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

import Guestlayout from "../layouts/Guestlayout";
import Userlayout from "../layouts/Userlayout";
// const Userlayout = lazy(()=>import("../layouts/Userlayout"))
import Booklayout from "../layouts/BookLayout";
import AdminLayout from "../layouts/AdminLayout";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const LogIn = lazy(() => import("../pages/LogIn"));
const Profile = lazy(() => import("../pages/Profile"));
const MyList = lazy(() => import("../pages/MyList"));
const ProfileBookings = lazy(() => import("../pages/ProfileBookings"));
const ProfileRewards = lazy(() => import("../pages/ProfileRewards"));
const ProfileReviews = lazy(() => import("../pages/ProfileReviews"));
const AdminLanding = lazy(() => import("../pages/Admin/AdminLanding"));
const Hotels = lazy(() => import("../pages/Hotels"));
const HotelsDetail = lazy(() => import("../pages/HotelsDetail"));
const BookInfo = lazy(() => import("../pages/BookInfo"));
const BookSuccess = lazy(() => import("../pages/BookSuccess"));
const ProfileTravelers = lazy(() => import("../pages/ProfileTravelers"));
const AllWaitingBookings = lazy(() => import("../pages/Admin/AllWaitingBooking"));
const AllCancelBookings = lazy(() => import("../pages/Admin/AllCancelBookings"));
const AllConfirmBookings = lazy(() => import("../pages/Admin/AllConfirmBookings"));
const ReviewDetails = lazy(() => import("../pages/ReviewDetails"));
const Reviews = lazy(() => import("../pages/Reviews"));

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
            {
                path:'reviews',
                element: <Reviews/>
            },
            {
                path:'reviews/:reviewid',
                element: <ReviewDetails/>
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
            {
                path:'reviews',
                element: <Reviews/>
            },
            {
                path:'reviews/:reviewid',
                element: <ReviewDetails/>
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
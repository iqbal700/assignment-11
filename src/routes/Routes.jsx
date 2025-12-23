import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Layouts from "../RootLayout/Layouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashLayout from "../DashLayout/DashLayout";
import MainDashBoard from "../pages/DashBoard/MainDashBoard/MainDashBoard";
import ManageProduct from "../pages/DashBoard/ManageProduct/ManageProduct";
import AddRequest from "../DashLayout/AddRequest/AddRequest";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../DashLayout/AddRequest/MyRequest";
import Donate from "../pages/Donate";
import PaymentSuccess from "../pages/PaymentSuccess";
import SearchRequest from "../pages/SearchRequest";
import PendingRequest from "../pages/PendingRequest";
import BloodRequestDetails from "../pages/BloodRequestDetails";
import MyProfile from "../pages/MyProfile";



const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children:[
      {
         index: true,
         element: <Home/>
      },
      {
        path: '/login',
         element: <Login/>
      },
      {
        path: '/register',
         element: <Register/>
      },
      {
        path: '/donate',
         element: <PrivateRoute><Donate/></PrivateRoute> 
      },
      {
        path: '/payment-success',
         element: <PaymentSuccess/> 
      },
      {
        path: '/search-request',
         element: <SearchRequest/> 
      },
      {
        path: '/pending-request',
         element: <PendingRequest/> 
      },
      {
        path: '/bloodrequest-details/:id',
         element: <PrivateRoute><BloodRequestDetails></BloodRequestDetails></PrivateRoute>
      }
  ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashLayout></DashLayout></PrivateRoute>,
    children: [
      {
        path: 'main',
        element: <MainDashBoard> </MainDashBoard>
      },
      
      {
        path: 'add-request',
        element: <AddRequest></AddRequest>
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'my-request',
        element: <MyRequest></MyRequest>
      },
      {
        path: 'my-profile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      }

    ]
  }
]);

export default router


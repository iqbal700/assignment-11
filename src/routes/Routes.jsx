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
         element: <Donate/> 
      },
      {
        path: '/payment-success',
         element: <PaymentSuccess/> 
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
        path: 'manage-products',
        element: <ManageProduct></ManageProduct>
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
      }

    ]
  }
]);

export default router


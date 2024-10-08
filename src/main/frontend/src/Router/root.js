import { Suspense, lazy } from "react";
import Router from "./Router";



const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const MainManager = lazy(() => import("../components/HomeManager"))
const MainUser = lazy(() => import("../components/HomeUser"))
const ItemPurchase = lazy(() => import("../components/ItemPurchase"))
const Cart = lazy(() => import("../components/ShoppingCart"))
const SignIn = lazy(() => import("../components/Login/SignIn"))
const SignUp = lazy(() => import("../components/Login/SignUp"))
const Mypage = lazy(() => import("../components/Login/Mypage"))
const Dashboard = lazy(() => import("../components/adminpage/Dashboard"))
const ManagerList = lazy(() => import("../components/Manager/ListPage"))



const root = createBrowserRouter([

  {
  path: "", element: <Suspense fallback={Loading}><MainManager/></Suspense>
  },

  {
    path: "homemanager",
    element: <Suspense fallback={Loading}><MainManager/></Suspense>
  },

  {
      path: "homeuser",
      element: <Suspense fallback={Loading}><MainUser/></Suspense>
  },
  {
      path: "/itempurchase/:productId",
      element: <Suspense fallback={Loading}><ItemPurchase/></Suspense>
  },
  {
      path: "cart",
      element: <Suspense fallback={Loading}><Cart/></Suspense>
  },
  {
      path: "signin",
      element: <Suspense fallback={Loading}><SignIn/></Suspense>
  },
  {
      path: "signup",
      element: <Suspense fallback={Loading}><SignUp/></Suspense>
  },

  {
     path: "manager",
     element: <Suspense fallback={Loading}><Dashboard/></Suspense>,
     children: Router()
  },
  ...Router()
]);

export default root;
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";


const Router = () => {
  const Loading = <div>Loading....</div>
  const ManagerList = lazy(() => import("../components/Manager/ListPage"))
  const ManagerRead = lazy(() => import("../components/Manager/ReadPage"))
  const ManagerAdd = lazy(() => import("../components/Manager/AddPage"))
  const ManagerModify = lazy(() => import("../components/Manager/ModifyPage"))
  const AddPage = lazy(() => import("../components/Manager/AddPage"));
  return [
   {
     path: "list", element: <Suspense fallback={Loading}><ManagerList/></Suspense>
   },
   {
     path: "", element: <Navigate replace to="/manager/list"/>
   },
   {
     path: "read/:userId", element: <Suspense fallback={Loading}><ManagerRead/></Suspense>
   },
   {
     path: "add", element: <Suspense fallback={Loading}><ManagerAdd/></Suspense>
   },
   {
     path: "modify/:userId", element: <Suspense fallback={Loading}><ManagerModify/></Suspense>
   },



  ]
}
export default Router;

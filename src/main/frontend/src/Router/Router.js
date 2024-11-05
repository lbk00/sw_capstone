import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";


const Router = () => {
    const Loading = <div>Loading....</div>
    const ManagerList = lazy(() => import("../components/Manager/ListPage"))
    const ManagerRead = lazy(() => import("../components/Manager/ReadPage"))
    const ManagerAdd = lazy(() => import("../components/Manager/AddPage"))
    const ManagerModify = lazy(() => import("../components/Manager/ModifyPage"))
    const OrderList = lazy(() => import("../components/Order/ListPage"))
    const OrderRead = lazy(() => import("../components/Order/ReadPage"));
    const OrderAdd = lazy(() => import("../components/Order/AddPage"))
    const ProductAdd = lazy(() => import("../components/Product/AddPage"))
    const OrderModify = lazy(() => import("../components/Order/ModifyPage"));

    return [
        {
            path: "manager/list", element: <Suspense fallback={Loading}><ManagerList/></Suspense>
        },
        {
            path: "read/:userId", element: <Suspense fallback={Loading}><ManagerRead/></Suspense>
        },
        {
            path: "manager/add", element: <Suspense fallback={Loading}><ManagerAdd/></Suspense>
        },
        {
            path: "manager/modify/:userId", element: <Suspense fallback={Loading}><ManagerModify/></Suspense>
        },
        {
            path: "order/list", element: <Suspense fallback={Loading}><OrderList/></Suspense>
        },
        {
            path: "order/read/:id", element: <Suspense fallback={Loading}><OrderRead/></Suspense>
        },
        {
            path: "order/add", element: <Suspense fallback={Loading}><OrderAdd/></Suspense>
        },
        {
            path: "product/add", element: <Suspense fallback={Loading}><ProductAdd/></Suspense>
        },
        {
            path: "order/modify/:id", element: <Suspense fallback={Loading}><OrderModify/></Suspense>
        },


export default Router;

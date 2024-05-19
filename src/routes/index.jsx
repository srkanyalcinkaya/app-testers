import PrivateRoute from "@/components/shared/privateRoute";
import HomeLayout from "@/layout/home";
import { Account, App, Create, Home, Login, NotFound } from "@/pages";
import { createBrowserRouter } from "react-router-dom";



const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                auth: true,
                path: "account",
                element: <PrivateRoute><Account /></PrivateRoute>
            },
            {
                path: "app/:id",
                element: <App />
            },
            {
                path: "app/create",
                element: <PrivateRoute><Create /></PrivateRoute>

            },
            {
                path: "auth/signin",
                element: <Login />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])



export default routes;
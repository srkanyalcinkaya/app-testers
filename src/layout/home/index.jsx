import React, { useEffect } from "react"
import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "@/components/loader"
import { get_apps } from "@/firebase"
export default function HomeLayout() {

    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        get_apps()
    }, [])

    if (user === null) {
        return <Loader />
    }


    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen h-full flex flex-col items-center justify-between  text-slate-900 dark:text-white w-full md:px-0 px-4 overflow-x-hidden">

            <main className="mx-auto max-w-5xl w-full h-full">
                <Header />
                <Outlet />
            </main>
            <Footer />

        </div>
    )
}
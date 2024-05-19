import React from "react";
import List from "@/components/list";
import { useSelector } from "react-redux";
export default function Home() {

    const { app } = useSelector(state=> state.apps)
    
    return (
        <div className="h-full">
            <div className="mt-20">
                <h2 className="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0">
                    Welcome to the applications world 👋
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    {
                        app.map(item=>(
                            <List item={item} key={item.appname} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
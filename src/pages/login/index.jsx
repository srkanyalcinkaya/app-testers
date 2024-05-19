import React from "react"
import { Button } from "@/components/ui/button"
import { login } from "@/firebase"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
export default function Login() {
    const { user } = useSelector(state => state.auth)
    if (user) {
        return <Navigate to={location.state?.return_url || '/'} replace={true} />
    }

    return (
        <div className="py-20 mx-auto max-w-sm">


            <Button onClick={login} variant="" className="w-full space-x-2 flex items-center  ">
                <FaGoogle size={20}/>
                <span>
                    Login with Google
                </span>
            </Button>
        </div>
    )
}
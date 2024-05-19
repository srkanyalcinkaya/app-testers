import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button"
import { LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { FaGoogle } from "react-icons/fa";
import { login } from "@/firebase";
export default function Header() {

    const { user } = useSelector(state => state.auth)
    return (
        <div className="w-full  flex items-center justify-center py-4">
            <div className="flex flex-row items-center justify-between max-w-5xl w-full  ">
                <Link to={"/"} reloadDocument>
                    <span className="text-4xl font-extrabold">App Testers</span>
                </Link>
                <div className="flex flex-row items-center gap-4">
                    {user ?

                        <Link to={"/account"} className={[buttonVariants({ variant: "outline" }), "flex flex-row gap-3"]}>
                            <span className="font-semibold md:block hidden ">
                                {user?.email}
                            </span>
                            <LuUser size={22} />

                        </Link>
                        :
                        <Button onClick={login} variant="outline" className="flex flex-row gap-3">
                            <span className="font-semibold md:block hidden ">
                                Login with Google
                            </span>
                            <FaGoogle size={22} />

                        </Button>
                    }
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}
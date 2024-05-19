import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import DeviceType from "@/components/shared/device-type";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
export default function App() {
    let { id } = useParams();
    const { app } = useSelector(state => state.apps);
    const [isOpen, setIsOpen] = useState(false)
    let filtered = app?.filter(state => state.id === id);
    let item = filtered[0];
    const createdDate = new Date(item?.created?.seconds * 1000); // Convert seconds to milliseconds
    const formattedDate = createdDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    return (
        <div className="md:mt-20 mt- flex flex-col md:flex-row justify-between  w-full ">
            <div className="flex-col flex gap-6">

                <div className="flex md:flex-row flex-col items-center justify-between  ">
                    <div className="flex md:flex-row flex-col  md:items-start text-center md:text-start items-center md:gap-6 gap-3">
                        <Avatar className="rounded h-24 w-24 ">
                            <AvatarImage src={item?.avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col ">
                            <p className="text-lg font-medium leading-none my-4">
                                {item?.appname}
                            </p>

                            <p className="text-xs text-muted-foreground flex items-center space-x-1">
                                <Button variant="outline" size="icon" className="rounded h-8 w-8">
                                    <User className="h-4 w-4" />
                                </Button>
                                <span>
                                    {item?.author.name}
                                </span>
                            </p>

                        </div>
                    </div>
                    <div className="md:border-l-2 border-t-2 md:border-t-0 md:w-[200px] md:hidden w-full md:mt-0 mt-8 p-4 flex flex-col items-center justify-center">
                        <span className="md:text-6xl text-4xl text-center  font-extrabold">
                            {item?.tester_count}
                        </span>
                        <span>
                            Tester
                        </span>
                        <span className="text-xs">
                            {formattedDate}
                        </span>
                    </div>

                </div>
                <div className="max-w-lg w-full ">
                    <div>
                        <span className="text-lg font-semibold">
                            Description
                        </span>
                        <p className="text-sm font-normal ">
                            {item?.description}
                        </p>
                        <Separator className="my-8 " />
                        <DeviceType type={item?.device_type} size={24} />
                        <Separator className="my-8 " />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-base font-semibold">
                                Send Feedback
                            </span>
                            <span className="text-sm">
                                {item.email_feedback}
                            </span>
                        </div>
                    </div>
                    <Button className="w-full mt-8 md:hidden block"
                        onClick={() => setIsOpen(true)}
                    >Join</Button>

                </div>
            </div>
            <div className="border-l-2  max-w-sm w-full  p-4 hidden md:flex flex-col items-center justify-center">
                <span className="text-6xl text-center  font-extrabold">
                    {item?.tester_count}
                </span>
                <span>
                    Tester
                </span>
                <span className="text-xs">
                    {formattedDate}
                </span>
                <Button onClick={() => setIsOpen(true)} className="w-3/5 mt-6">Join</Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent>
                    <DialogHeader className="text-white">
                        <DialogTitle>Join Testers</DialogTitle>
                        <DialogDescription>
                            as a tester, you will be able to download the app via the account you provide. Make sure to open it at least once, so that the developer can see that you have tested it.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit">Join</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
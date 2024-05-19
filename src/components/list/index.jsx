import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, User } from "lucide-react";
import { FaAndroid } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from "react-router-dom";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";
import { update_app, delete_app } from "@/firebase";
import DeviceType from "../shared/device-type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { extractDynamicPart } from "@/lib/utils";
import { IoClose } from "react-icons/io5";


export default function List({ item, action = false }) {
    const [isOpen, setIsOpen] = useState(false); // Initially closed
    const [isOpenDrawer, setIsOpenDrawer] = useState(false); // Initially closed
    const [isLoading, setIsLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null);
    const [selectedId, setSelectedId] = useState(null)
    const [form, setForm] = useState({
        avatar: item.avatar,
        appname: item.appname,
        description: item.description,
        device_type: item.device_type,
        email_feedback: item.email_feedback,
        download: item?.download,
        link: item?.link,
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({
            ...form,
            [name]: value
        });

    };



    const uploadFile = async (imageUpload) => {
        setIsLoading(true)
        try {
            if (imageUpload != null) {
                const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`);
                const snapshot = await uploadBytes(imageRef, imageUpload);
                const url = await getDownloadURL(snapshot.ref);
                setForm({
                    ...form,
                    ["avatar"]: url
                });
                const deleted_image = extractDynamicPart(item.avatar)
                await update_app(form, deleted_image, selectedId);
                setIsLoading(false)
                setIsOpenDrawer(false);
                navigate(`/app/${selectedId}`);
            } else {
                let deleted_image = false
                await update_app(form, deleted_image, selectedId);
                setIsLoading(false);
                setIsOpenDrawer(false);
                navigate(`/app/${selectedId}`);
            }

        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };


    const handleDrawer = () => {
        setIsOpenDrawer(!isOpen)
        setSelectedId(item.id)
    }

    const handleUpdate = async () => {
        await uploadFile(imageUpload);
    }


    return (
        <div className={action ? "flex items-center space-x-2" : null}>
            <Link to={`/app/${item?.id}`} className="hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors delay-75 ease-in-out  relative z-10  flex items-center justify-between space-x-4 rounded-md border p-4 w-full">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={item?.avatar} alt="@shadcn" />
                        <AvatarFallback>TT</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none my-2">
                            {item?.appname}
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center items-start md:space-x-3 space-y-2 md:space-y-0">

                            <p className="text-xs text-muted-foreground flex items-center space-x-1">
                                <Button variant="outline" size="icon" className="rounded h-8 w-8">
                                    <User className="h-4 w-4" />
                                </Button>
                                <span>
                                    {item?.author?.name}
                                </span>
                            </p>
                            <DeviceType type={item?.device_type} size={16} list={true} />
                        </div>
                    </div>

                </div>

                <div className="border-l-2 text-center text-4xl font-extrabold flex items-center  justify-center w-12 md:w-24 absolute right-0 h-full">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>{item?.tester_count}</TooltipTrigger>
                            <TooltipContent>
                                <p>The number of participants</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>


            </Link>
            {
                action &&
                <div className="flex flex-col justify-betweens space-y-4">
                    {/*Update apps */}
                    <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
                        <DrawerTrigger asChild >
                            <Button variant="outline" onClick={handleDrawer}>
                                <Pencil size={16} />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-2xl dark:text-white text-slate-900">
                                <DrawerHeader>
                                    <DrawerTitle>Edit your app</DrawerTitle>
                                </DrawerHeader>
                                <div className="p-4 pb-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 place-items-start w-full">
                                        <div className="grid w-full max-w-md items-center gap-1.5">
                                            <Label htmlFor="name" >
                                                App Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="appname"
                                                value={form.appname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="grid w-full max-w-md items-center gap-1.5">
                                            <Label htmlFor="avatar">
                                                Avatar
                                                {imageUpload ?
                                                    <div className="flex items-center gap-8 w-full ">
                                                        {<p className="text-xs">{imageUpload?.name}</p>}
                                                        <Button onClick={() => setImageUpload(null)} variant={"outline"} className="rounded-full  flex items-center justify-center">
                                                            <IoClose size={16} color="red" />
                                                        </Button>
                                                    </div>
                                                    :
                                                    form.avatar &&
                                                    <>
                                                        <div className="flex items-center gap-8 w-full   cursor-pointer">
                                                            {<p className="text-xs">{extractDynamicPart(item?.avatar)}</p>}
                                                            <div className="hover:bg-slate-700/70 p-2 rounded-full  flex items-center justify-center">
                                                                <IoClose size={16} color="red" />
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </Label>
                                            <Input id="avatar" type="file" required accept="image/png" name="avatar" onChange={(event) => { setImageUpload(event.target.files[0]) }} className="cursor-pointer hidden" />
                                        </div>

                                        <div className="grid w-full max-w-md items-center gap-1.5">
                                            <Label htmlFor="email_feedback">Feedback Email</Label>
                                            <Input id="email_feedback" type="email"
                                                name="email_feedback"
                                                value={form.email_feedback}
                                                onChange={handleChange} />
                                        </div>
                                        <div className="grid w-full max-w-md items-center gap-1.5">
                                            {
                                                form.device_type == "android" ?
                                                    <>
                                                        <Label htmlFor="download">Google Play download link</Label>
                                                        <Input id="download" type="text"
                                                            name="download"
                                                            value={form.download}
                                                            onChange={handleChange}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <Label htmlFor="link">Link to your app</Label>
                                                        <Input id="link" type="text"
                                                            name="link"
                                                            value={form.link}
                                                            onChange={handleChange} />
                                                    </>
                                            }
                                        </div>
                                        <div className="grid col-span-1  md:col-span-2  md:max-w-4xl max-w-md  w-full items-center gap-1.5">
                                            <Label htmlFor="username" >
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button disabled={isLoading} onClick={handleUpdate}>
                                        {
                                            isLoading ?
                                                "Loading..."
                                                :
                                                "Update"
                                        }
                                    </Button>
                                    <DrawerClose disabled={isLoading} asChild onClick={handleDrawer}>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    {/*delete apps*/}
                    <Dialog open={isOpen}>
                        <DialogTrigger>
                            <Button variant="destructive" onClick={() => setIsOpen(true)}>
                                <Trash2 size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your app and remove your data from our servers.
                                </DialogDescription>
                                <DialogFooter>
                                    <Button onClick={() => { delete_app(item.id); setIsOpen(false); }} type="button" variant="outline" className="text-slate-900 dark:text-white">Yes</Button>
                                    <DialogClose asChild>
                                        <Button type="button" onClick={() => setIsOpen(false)}>No</Button>

                                    </DialogClose>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            }

        </div>
    )
}



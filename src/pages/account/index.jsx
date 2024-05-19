import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FormSchema } from "@/validation/formSchema"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import List from "@/components/list"
import { LogOut, Trash2 } from "lucide-react"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useSelector } from "react-redux";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import { logout, update_profile } from "@/firebase"
export default function Account() {
    const { user } = useSelector(state => state.auth)
    const form = useForm({
        resolver: zodResolver(FormSchema)
    })

    function onSubmit(data) {
        update_profile(data)

    }
    const { app } = useSelector(state => state.apps)
    return (
        <div className="my-20 flex flex-col items-center justify-center">

            <div className="flex flex-col items-center space-y-2 mb-6">
                <Avatar className="rounded h-20 w-20 ">
                    <AvatarImage src={user.avatar} alt={user?.fullName} />
                    <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <span className="text-2xl font-semibold">
                    {user?.fullName}
                </span>
                <span className="text-xs">
                    {user?.email}
                </span>
            </div>



            <div className="w-full mt-6 flex flex-col items-center justify-center space-y-3">
                <div className="md:flex hidden w-full items-center justify-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="max-w-[43rem] w-full gap-2">Update Profile</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Tester" defaultValue={user.fullName} className="text-slate-900 dark:text-white" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://..." className="text-slate-900 dark:text-white" defaultValue={user.website} {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public your website.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about yourself"
                                                        className="resize-none  text-slate-900 dark:text-white"
                                                        defaultValue={user.bio}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    You can <span>@mention</span> other users and organizations.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="max-w-3xl w-full">Update</Button>
                                </form>
                            </Form>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="md:hidden flex w-full items-center justify-center">
                    <Drawer >
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="max-w-[43rem] w-full gap-2">Update Profile</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>Edit Profile</DrawerTitle>
                                </DrawerHeader>
                                <div className="p-4 pb-10">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="username"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Username</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Tester" className="text-slate-900 dark:text-white" defaultValue={user.fullName} {...field} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is your public display name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="website"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Website</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://..." className="text-slate-900 dark:text-white" defaultValue={user.website} {...field} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is your public your website.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="bio"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Bio</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Tell us a little bit about yourself"
                                                                    className="resize-none text-slate-900 dark:text-white"
                                                                    defaultValue={user.website}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                You can <span>@mention</span> other users and organizations.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit" className="max-w-3xl w-full">Update</Button>
                                            </form>
                                        </Form>
                                    </div>

                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <Button asChild className="max-w-[43rem] w-full gap-2">
                    <Link to={"/app/create"}>Create app</Link>
                </Button>

                <Button onClick={() => logout()} variant="destructive" className="max-w-[43rem] w-full gap-2">

                    <span>Logout</span>
                    <LogOut size={22} />
                </Button>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <Button variant="destructive" className="max-w-[43rem] w-full gap-2">
                            Account delete
                            <Trash2 size={22} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </DialogDescription>
                            <DialogFooter>
                                <Button type="button" variant="outline">Yes</Button>
                                <DialogClose asChild>
                                    <Button type="button" >No</Button>

                                </DialogClose>
                            </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>


            </div>
            <Tabs defaultValue="apps" className="max-w-[43rem] w-full mt-8">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="apps">Apps</TabsTrigger>
                    <TabsTrigger value="test">You're Testing</TabsTrigger>
                </TabsList>
                <TabsContent value="apps">
                    <Card className="border-none bg-none shadow-none">

                        <CardContent className="space-y-2 p-0">
                            {
                                app.map(item => (
                                    <List item={item} key={item.appname} action={true} />
                                ))
                            }

                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="test" className="bg-none ">
                    <Card className="border-none shadow-none bg-none min-h-40  ">
                        <CardContent className="space-y-2 p-0 flex flex-col w-full h-full  justify-center   items-center">
                            <span className="text-center mt-10 capitalize  ">
                                no apps found
                            </span>
                        </CardContent>

                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}
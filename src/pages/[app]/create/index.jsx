import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp } from "lucide-react";
import { FaAndroid } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { SiIos } from "react-icons/si";
import { Separator } from "@/components/ui/separator"
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { create_app, storage } from "@/firebase";
import { useNavigate } from "react-router-dom";
export default function Create() {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null);
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        avatar: null,
        appname: null,
        description: null,
        device_type: "android",
        email_feedback: null,
        download: null,
        link: null,
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async () => {
        await uploadFile(imageUpload);
    };

    const uploadFile = async (imageUpload) => {
        setIsLoading(true)
        if (imageUpload == null) {
            setIsLoading(false)
            return
        };

        const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);



            // uploadFile fonksiyonu tamamlandıktan sonra create_app fonksiyonunu çağır
            await create_app(formData, url);
            navigate("/");
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    };
    return (
        <div className="w-full items-center flex  justify-center">
            <div className="max-w-xl w-full  flex flex-col  gap-4 py-4 items-center ">

                <div className="rounded-md border  text-center bg-gray-50 p-2 shadow-md w-28 h-28 flex items-center flex-col justify-center">
                    <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                        {imageUpload ?
                            <img src={URL.createObjectURL(imageUpload)} alt="App" />
                            :
                            <>
                                <ImageUp />
                                <span className="text-gray-600 text-xs font-medium">Upload Avatar</span>
                            </>
                        }
                    </label>
                    <input id="upload" required accept="image/png" name="avatar" onChange={(event) => { setImageUpload(event.target.files[0]) }} type="file" className="hidden" />
                </div>
                <div className="grid  w-full  items-center gap-1.5">
                    <Label htmlFor="name" >
                        App Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        name="appname"
                        placeholder="Your app name"
                        value={formData.appname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="username" >
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="@description"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex w-full justify-center    items-center gap-1.5">
                    <Button onClick={() => setFormData({ ...formData, ["device_type"]: "android" })} variant="outline" size="icon" className={`w-20 h-20 ${formData.device_type === "android" && "!bg-slate-900 !text-white dark:!bg-white dark:!text-slate-900 "}`}>
                        <FaAndroid size={24} />
                    </Button>
                    <Button onClick={() => setFormData({ ...formData, ["device_type"]: "web" })} variant="outline" size="icon" className={`w-20 h-20 ${formData.device_type === "web" && "!bg-slate-900 !text-white dark:!bg-white dark:!text-slate-900"}`}>
                        <TbWorld size={24} />
                    </Button>
                    <Button onClick={() => setFormData({ ...formData, ["device_type"]: "ios" })} variant="outline" size="icon" className={`w-20 h-20 ${formData.device_type === "ios" && "!bg-slate-900 !text-white dark:!bg-white dark:!text-slate-900"}`}>
                        <SiIos className="h-4 w-4" />
                    </Button>
                </div>

                <div className="border text-xs p-4 rounded-lg w-full">

                    every user can access your app.

                    {formData.device_type === "android" &&
                        <>
                            <br /> <br />
                            <strong>For Google Play Closed Testing:</strong> <br /> add the following google group to your list of private testers: <br />
                            <br /><strong>tester@googlegroups.com</strong>
                        </>
                    }
                </div>

                <span className="!text-slate-900 dark:!text-white text-center text-sm normal-case">
                    the following will only be shown to your testers
                </span>
                <Separator />
                <div className="w-full space-y-4 ">
                    <div className="grid  w-full  items-center gap-1.5">
                        <Label htmlFor="email_feedback" >
                            Email address for feedback
                        </Label>
                        <Input
                            id="email_feedback"
                            type="email"
                            name="email_feedback"
                            placeholder="feedback@example.com"
                            value={formData.email_feedback}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {
                        formData.device_type === "android" ?
                            <div className="grid  w-full  items-center gap-4">
                                <span className="text-xs text-muted-foreground">
                                    Make sure, your App is <strong>available in all regions.</strong> <br />
                                    Users will be able to download your app by clicking the link:
                                </span>
                                <Label htmlFor="download" >
                                    Google Play download link
                                </Label>
                                <Input
                                    id="download"
                                    name="download"
                                    type="text"
                                    placeholder="https://play.google.com/..."
                                    onChange={handleChange}
                                    value={formData.download}
                                    required
                                />

                            </div> :
                            <div className="grid  w-full  items-center gap-1.5 ">

                                <Label htmlFor="link" >
                                    Link to your app
                                </Label>
                                <Input
                                    name="link"
                                    onChange={handleChange}
                                    value={formData.link}
                                    id="link"
                                    type="text"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                    }

                </div>


                <Button disabled={isLoading} onClick={handleSubmit}>
                    {
                        isLoading ?
                            "Loading..."
                        :
                          "Create App"
                        }
                </Button>
            </div>
        </div>
    )
}
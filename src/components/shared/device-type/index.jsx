import React from "react"
import { FaAndroid } from "react-icons/fa"
import { TbWorld } from "react-icons/tb";
import { SiIos } from "react-icons/si";

export default function DeviceType({ type, size, list = false }) {
    return (
        <div className="flex h-5 items-center justify-center md:justify-start space-x-4 text-sm">
            {
                type === "android" ?
                    <div className="text-center flex flex-col items-center ">
                        <FaAndroid size={size} />
                        {!list && "android"}
                    </div>
                    :
                    type === "web" ?
                        <div className="text-center flex flex-col items-center ">
                            <TbWorld size={size} />
                            {!list && "web"}
                        </div>
                        :

                        <div className="text-center flex flex-col items-center">
                            <SiIos size={size} />
                            {!list && "ios"}

                        </div>
            }
        </div>
    )
}
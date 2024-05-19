import store from "@/store"
import { setApps } from "@/store/apps"
import { setUser } from "@/store/auth"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}


export const userHandle = data => {
	store.dispatch(setUser(data))
}
export const appsHandle = data => {
	store.dispatch(setApps(data))
}

export function extractDynamicPart(url) {
	let parts = url.split('?');
	if (parts.length < 2) {
		return null;
	}

	let pathPart = parts[0];

	let pathSegments = pathPart.split('/');
	let dynamicPart = pathSegments[pathSegments.length - 1];

	let decodedDynamicPart = decodeURIComponent(dynamicPart);
	
		return decodedDynamicPart;


}
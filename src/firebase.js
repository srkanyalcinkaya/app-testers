import { initializeApp } from "firebase/app";
import {
    deleteUser,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { appsHandle, userHandle } from "./lib/utils";
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const provider = new GoogleAuthProvider();
export const storage = getStorage(app)

onAuthStateChanged(auth, async user => {
    if (user) {
        const dbUser = await getDoc(doc(db, "users", user.uid))

        let data = {
            uid: user.uid,
            fullName: user.displayName,
            email: user.email,
            avatar: user.photoURL,
            ...dbUser.data()
        }
        userHandle(data)
    } else {
        userHandle(false)
    }
})

export const get_apps = async () => {
    let userApps = [];
    const dbApp = await getDocs(collection(db, "apps"))
    dbApp.forEach((doc) => {
        userApps.push({ ...doc.data(), id: doc.id });
    });
    appsHandle(userApps)
}

export const login = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = await getDoc(doc(db, "users", result.user.uid))
            if (!user.exists()) {
                await setDoc(doc(db, "users", result.user.uid), {
                    fullName: result.user.displayName,
                    notifications: [],
                    website: '',
                    bio: '',
                    test_apps: [],
                })

                await updateProfile(auth.currentUser, {
                    displayName: result.user.displayName
                })

                return response.user
            }
        }).catch((error) => {
            console.log(error)
        });
}

export const update_profile = async (profileData) => {
    try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);

        const updatedData = {
            fullName: profileData.username,
            bio: profileData.bio,
            website: profileData.website,
        };
        await updateDoc(userDocRef, updatedData);
        toast.success('Successfully updated!');
    } catch (error) {
        toast.error('Error updated!');
        console.log(error)
    }
}
export const update_app = async (data, deleted_image = false, selectedId) => {
    try {
        const appsDocRef = doc(db, "apps", selectedId);
        if (deleted_image) {
            deleteObject(ref(storage, `images/${deleted_image}`))
        }
        await updateDoc(appsDocRef, data);
        get_apps()
        toast.success('Successfully updated!');
    } catch (error) {
        toast.error('Error updated!');
        console.log(error)
    }
}

export const create_app = async (data, url) => {
    try {
        if (data.device_type === "android") {
            await addDoc(collection(db, "apps"), {
                avatar: url,
                appname: data.appname,
                description: data.description,
                device_type: data.device_type,
                email_feedback: data.email_feedback,
                download: data.download,
                link: null,
                author: {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                },
                status: '',
                public: true,
                created: Timestamp.fromDate(new Date()),
                tester_count: 0
            })
        } else {
            await addDoc(collection(db, "apps"), {
                avatar: url,
                appname: data.appname,
                description: data.description,
                device_type: data.device_type,
                email_feedback: data.email_feedback,
                download: null,
                link: data.link,
                author: {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                },
                status: '',
                public: true,
                created: Timestamp.fromDate(new Date()),
                tester_count: 0
            })
        }

        get_apps()
        toast.success('Successfully Created Your App!');
    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
}



export const delete_app = async (id) => {
    const appsDoc = doc(db, "apps", id);
    await deleteDoc(appsDoc).then(res => {
        get_apps()
    })
};

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (err) {
        console.log(err)
    }
}

export const delete_user = async () => {
    try {
        deleteUser(auth.uid)
    } catch (error) {
        console.log(error)
    }
}
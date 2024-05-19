import {configureStore} from "@reduxjs/toolkit";
import auth from "./auth";
import apps from "./apps";


const store = configureStore({
	reducer: {
		auth,
		apps
	}
})

export default store
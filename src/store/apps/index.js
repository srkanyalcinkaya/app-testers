import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	app: []
}

const apps = createSlice({
	name: 'apps',
	initialState,
	reducers: {
		setApps: (state, action) => {
			state.app = action.payload
		}
	}
})

export const { setApps } = apps.actions
export default apps.reducer
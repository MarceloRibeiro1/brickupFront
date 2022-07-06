import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../lib/store";
import { TaskModel } from "../../models/TaskModel";

export const taskSlice = createSlice({
	name: "task",
	initialState: {
		task: {} as TaskModel,
		open: false,
		picture: { file: undefined } as { file: File | undefined },
	},
	reducers: {
		toggleOpen: (state) => {
			state.open = !state.open;
		},
		setNewTask: (state, action) => {
			state.task = { ...state.task, task: action.payload.task };
		},
		setNewDescription: (state, action) => {
			state.task = { ...state.task, description: action.payload.description };
		},
		setNewStatus: (state, action) => {
			state.task = { ...state.task, status: action.payload.status };
		},
		setNewPicture: (state, action) => {
			state.task = { ...state.task, picture: action.payload.picture };
		},
		deletes: (state) => {
			state.task = {} as TaskModel;
		},
		addPicture: (state, action) => {
			state.picture.file = action.payload;
		},
		removePicture: (state) => {
			state.picture = { file: undefined } as { file: File | undefined };
		},
	},
});

export const {
	toggleOpen,
	setNewDescription,
	setNewPicture,
	setNewStatus,
	setNewTask,
	deletes,
	addPicture,
	removePicture,
} = taskSlice.actions;

export const selectTask = (state: RootState) => state.task.task;
export const selectisNewTaskOpen = (state: RootState) => state.task.open;
export const selectPicture = (state: RootState) => state.task.picture.file;

export default taskSlice.reducer;

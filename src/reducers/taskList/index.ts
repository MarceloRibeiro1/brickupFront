import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../lib/store";
import { TaskModel } from "../../models/TaskModel";

export const taskListSlice = createSlice({
	name: "taskList",
	initialState: {
		taskList: [] as TaskModel[],
		taskEditList: [] as TaskModel[],
		taskPictureEditList: [] as {
			file?: File;
			id: number;
			picture: string | null;
		}[],
	},
	reducers: {
		add: (state, action) => {
			state.taskList = [action.payload, ...state.taskList];
			state.taskEditList = [action.payload, ...state.taskEditList];
			state.taskPictureEditList = [
				{ id: action.payload.id, picture: action.payload.picture },
				...state.taskPictureEditList,
			];
		},
		addList: (state, action) => {
			state.taskList = [...action.payload].reverse();
			state.taskEditList = [...action.payload].reverse();
			let NewPictureList = [] as {
				file?: File;
				id: number;
				picture: string | null;
			}[];
			action.payload.map((taskPayload: TaskModel) => {
				NewPictureList.push({
					id: taskPayload.id,
					picture: taskPayload.picture,
				});
			});
			state.taskPictureEditList = NewPictureList.reverse();
		},
		clear: (state) => {
			state.taskList = [] as TaskModel[];
		},
		setTask: (state, action) => {
			const taskToEdit = action.payload.oldTask;
			const newTask = action.payload.newTask;
			let newState = [] as TaskModel[];
			state.taskList.map((task, i) => {
				if (task.id === taskToEdit.id) {
					const taskReplace = {
						...state.taskEditList[i],
						task: newTask.task,
					} as TaskModel;
					newState.push(taskReplace);
				} else newState.push(state.taskEditList[i]);
			});

			state.taskEditList = newState;
		},
		setStatus: (state, action) => {
			const taskToEdit = action.payload.oldTask;
			const newTask = action.payload.newTask;
			let newState = [] as TaskModel[];
			state.taskList.map((task, i) => {
				if (task.id === taskToEdit.id) {
					const taskReplace = {
						...state.taskEditList[i],
						status: newTask.status,
					} as TaskModel;
					newState.push(taskReplace);
				} else newState.push(state.taskEditList[i]);
			});

			state.taskEditList = newState;
		},
		setDescription: (state, action) => {
			const taskToEdit = action.payload.oldTask;
			const newTask = action.payload.newTask;
			let newState = [] as TaskModel[];
			state.taskList.map((task, i) => {
				if (task.id === taskToEdit.id) {
					const taskReplace = {
						...state.taskEditList[i],
						description: newTask.description,
					} as TaskModel;
					newState.push(taskReplace);
				} else newState.push(state.taskEditList[i]);
			});

			state.taskEditList = newState;
		},
		setPicture: (state, action) => {
			const taskToEdit = action.payload;
			let NewPictureList = [] as {
				file?: File;
				id: number;
				picture: string | null;
			}[];
			let NewEditList = state.taskEditList;
			state.taskPictureEditList.map((task, i) => {
				if (task.id === taskToEdit.id) {
					NewPictureList.push(taskToEdit);
					NewEditList[i].picture = task.id.toString();
				} else NewPictureList.push(state.taskPictureEditList[i]);
			});

			state.taskPictureEditList = NewPictureList;
			state.taskEditList = NewEditList;
		},
		saveEdits: (state, action) => {
			const taskToEdit = action.payload;
			let newState = [] as TaskModel[];
			state.taskList.map((task, i) => {
				if (task.id === taskToEdit.id) {
					newState.push(state.taskEditList[i]);
				} else newState.push(task);
			});
			state.taskList = newState;
		},
	},
});

export const {
	add,
	addList,
	clear,
	setTask,
	setStatus,
	setDescription,
	setPicture,
	saveEdits,
} = taskListSlice.actions;

export const selectTaskList = (state: RootState) => state.taskList.taskList;

export const selectTaskEditList = (state: RootState) =>
	state.taskList.taskEditList;

export const selectTaskPictureEditList = (state: RootState) =>
	state.taskList.taskPictureEditList;

export default taskListSlice.reducer;

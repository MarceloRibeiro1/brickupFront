import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import task from "../reducers/newTask";
import taskList from "../reducers/taskList";

export const store = configureStore({
	reducer: {
		task,
		taskList,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["task/addPicture", "taskList/setPicture"],
				ignoredActionPaths: ["task/addPicture"],
				ignoredPaths: ["task.picture.file", "taskList.taskPictureEditList"],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

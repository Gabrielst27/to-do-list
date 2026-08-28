import { TaskModel } from "@/models/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";

type TasksState = {
  tasks: TaskModel[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<TaskModel>) => {
        state.tasks.unshift(action.payload);
      },

      prepare: (title: string) => ({
        payload: {
          id: Crypto.randomUUID(),
          title,
          isDone: false,
          createdAt: new Date().toISOString(),
        },
      }),
    },

    updateTask: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
      }>,
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (!task) return;

      task.title = action.payload.title;
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);

      if (!task) return;

      task.isDone = !task.isDone;
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, toggleTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;

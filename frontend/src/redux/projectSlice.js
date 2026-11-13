import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.push(action.payload);
    },

    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    clearProjects: (state) => {
      state.projects = [];
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  clearProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
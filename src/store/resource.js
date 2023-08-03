// import { axios } from "vue/types/umd";

export default {
  namespaced: true,

  state: () => ({
    resources: [],
    resource: {},

    createtasks: [],
    createtask: {},
  }),

  getters: {
    resources(state) {
      return state.resources;
    },
    createtasks(state) {
      return state.createtasks;
    },
  },

  mutations: {
    Resource_Data(state, resources) {
      state.resources = resources;
    },
    CreateTask_Data(state, createtasks) {
      state.createtasks = createtasks;
    },

    CREATED(state) {},
    UPDATED(state) {},
  },

  actions: {
    SendEmail({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/send_email", data)
          .then((result) => {
            resolve(result);
            commit("CREATED");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    AddCreateTask({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/task", data)
          .then((result) => {
            resolve(result);
            commit("CREATED");
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetCreateTasks({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/task")
          .then((result) => {
            resolve(result);
            commit("CreateTask_Data", result.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DeleteCreateTask({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/task/" + id)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

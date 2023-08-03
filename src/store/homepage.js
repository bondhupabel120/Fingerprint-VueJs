// import { axios } from "vue/types/umd";

export default {
  namespaced: true,

  state: () => ({
    users: [],
    user: {}
  }),

  getters: {
    users(state){
      return state.users;
    },
    user(state){
      return state.user;
    },
  },

  mutations: {
    populateUsers(state,newUser){
      state.users = newUser;
    },
    populateUser(state,newUser){
      state.user = newUser;
    },
  },

  actions: {
    getUser(ctx) {
      let user = JSON.parse(localStorage.getItem("user_data"))
      ctx.commit("populateUser", user);  
    },

    async getUsers(ctx) {
      await axios.get("api/users").then(response => {
        let isSuccess = response.data
        console.log(response)
        ctx.commit('populateUsers',isSuccess);
        
      })
      .catch(error => {
            console.log(error)
        })
    },
  }
};

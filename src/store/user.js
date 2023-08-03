// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        user: {},
    }),

    getters: {
        user(state) {
            return state.user;
        }
    },

    mutations: {
        populateOrders(state, newOrder) {
            state.orders = newOrder;
        }
    },

    actions: {
        async PasswordChange({ commit },apiArg) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
          let isSuccess = false
          await axios.post("api/client_password_change",apiArg).then(response => {
            isSuccess = response.data
            console.log(response)
            return isSuccess
          })
          .catch(error => {
                isSuccess = false;
                console.log(error)
            })
          return isSuccess;
          },
          async UpdateDetails({ commit },apiArg) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
            let isSuccess = false
            await axios.post("api/profile_update",apiArg).then(response => {
                localStorage.setItem("user_data", JSON.stringify(response.data.user));
              console.log(response.data.user)
                isSuccess = response.data
              console.log(response)
              return isSuccess
            })
            .catch(error => {
                  isSuccess = false;
                  console.log(error)
              })
            return isSuccess;
            }
          
    }
}
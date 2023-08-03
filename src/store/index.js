import Vue from "vue";
import Vuex from "vuex";
import resource from "./resource"
import user from "./user"
import homepage from "./homepage"
import adminlayout from "./adminlayout"

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    resource: resource,
    user: user,
    homepage: homepage,
    adminlayout: adminlayout,
  }
});

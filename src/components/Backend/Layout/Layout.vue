<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content" style="padding-top:70px">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "../Header/Header.vue";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "./Layout.scss";
import Config from "@/config.json";
export default {
  name: "Layout",
  components: { Footer, Header, Sidebar },
  mounted() {
    this.checkUserLogin();
  },
  methods: {
    checkUserLogin() {
      // send request to check if the user is logged otherwise redirect him to login screen
      if (
        localStorage.getItem("auth_token") !== null &&
        localStorage.getItem("auth_token") !== undefined
      ) {
        axios
          .get("/api/check-login", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token"),
            },
          })
          .then((response) => {
            if (response.data.success !== 1) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("is_authenticated");
              localStorage.removeItem("user_data");
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            if (err) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("is_authenticated");
              localStorage.removeItem("user_data");
              this.$router.push("/login");
            }
          });
      }
    },
  },
};
</script>

<style src="./Layout.scss" lang="scss" scoped />

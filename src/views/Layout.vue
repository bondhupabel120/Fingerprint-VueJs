<template>
<v-main id="master_app">
  <v-app id="app">
    <core-top-bar />
     <core-app-bar />
    <!-- <core-drawer /> -->
    <core-view />
    <core-footer />
    <core-cta />
  </v-app>
</v-main>
</template>

<script>
import carousel from 'vue-owl-carousel'
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

export default {
  name: "App",
  components: {
    CoreCta: () => import("@/components/core/Cta"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreTopBar: () => import("@/components/core/TopBar"),
    CoreView: () => import("@/components/core/View"),
    carousel,

  },
  mounted(){
      this.checkUserLogin()
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
            if (response.data.success != 1) {
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
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
#master_app #app{
    font-family: 'Open Sans', sans-serif;
}
</style>

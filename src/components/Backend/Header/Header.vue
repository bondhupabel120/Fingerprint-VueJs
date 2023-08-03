<template>
  <v-app-bar
    class="main-header"
    height="64"
    fixed
    flat
    light
    secondary
    color="light"
  >
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <div class="d-sm-logo">
      <a @click="toHome()">
        <img height="30" :src="require('@/assets/img/logo.png')" />
      </a>
    </div>
    <v-spacer></v-spacer>

    <v-menu min-width="220" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
          <v-icon style="font-size: 28px" :color="config.light.iconColor"
            >mdi-account</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <div class="d-flex justify-center my-1">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logout"
            >Sign Out</v-btn
          >
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "@/config";

export default {
  name: "Header",
  data: () => ({
    config,
  }),
  computed: {
    ...mapState("adminlayout", ["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  methods: {
    ...mapActions("adminlayout", ["TOGGLE_DRAWER"]),
    logout: function () {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_data");
      this.$router.push("/login");
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" scoped></style>

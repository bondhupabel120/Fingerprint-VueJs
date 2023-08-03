<template>
  <div>
    <v-container>

      <div class="p-15 topbar">
        <div class="topbar-logo">
          <div class="d-flex-wrapper">
            <div class="d-sm-logo">
              <a @click="toHome()">
                <img
                  height="50"
                  :src="require('@/assets/img/logo.png')"
                />
              </a>
            </div>

          </div>
        </div>

        <div class="user-tools d-none d-md-block">
          <nav>
            <ul class="user-tab">
              <li class="user-item mr-2">
                <v-btn @click="toSignIn()" small color="success">Sign In</v-btn>
              </li>
              <li class="user-item">
                <v-btn @click="toSignUp()" small color="primary">Sign Up</v-btn>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "CoreTopBar",
  computed: {},
  computed: {
    ...mapState("homepage", ["user"]),
  },
  methods: {
    ...mapActions("homepage", ["getUser"]),

    toHome() {
      this.$router.push("/");
    },

    toSignIn() {
      this.$router.push("/login");
    },
    toSignUp() {
      this.$router.push("/registration");
    },

    logout: function() {
      this.Account = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_data");
      this.getUser();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>

</style>

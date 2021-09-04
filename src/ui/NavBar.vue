<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav-bar">
      <b-navbar-brand href="/">
        <b-img
          :src="brandLogo"
          class="brand-logo"
          fluid
          alt="Responsive image"
        ></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="!token">
          <b-nav-item href="/authentication">Sign In</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ userName }}</em>
            </template>
            <b-dropdown-item href="#">{{ userEmail }}</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logo from "../assets/logo-typing-race.png";
import { mapState } from "vuex";
export default {
  data() {
    return {
      brandLogo: logo,
      auth: false,
      firstName: "",
      email: "",
    };
  },
  created() {
    this.$store.dispatch("getToken");
    if (this.token) {
      this.$store.dispatch("getUserData", this.token);
    }
  },
  watch: {
    token(){
       this.$store.dispatch("getUserData", this.token);
       this.$router.push(`/`);
    }
  },
  computed: {
    ...mapState({
      token: "token",
      userName: "userName",
      userEmail: "userEmail",
    }),
  },
  mounted() {},
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>

<style>
.nav-bar {
  background-color: #4361ee !important;
  padding: 5px;
}
.brand-logo {
  width: 130px;
  padding: 5px;
}
</style>

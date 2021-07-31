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
        <b-navbar-nav v-if="!auth">
          <b-nav-item href="/authentication">Sign In</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ firstName }}</em>
            </template>
            <b-dropdown-item href="#">{{ email }}</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logo from "../assets/logo-typing-race.png";
import { jwtDecoded } from "../helper/jwtDecoded";
export default {
  data() {
    return {
      brandLogo: logo,
      auth: false,
      email: "",
      firstName: "",
    };
  },
  created() {
    const token = localStorage.getItem("@uth");
    if (token) {
      this.auth = true;
      const { email, name } = jwtDecoded(token);
      this.email = email;
      this.firstName = name.split(" ").shift();
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>

<style>
.nav-bar {
  background-color: #f72585 !important;
  padding: 5px;
}
.brand-logo {
  width: 130px;
  padding: 5px;
}
</style>

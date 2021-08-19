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
          <b-nav-item class="sign-link" href="/authentication"
            >Sign In</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item-dropdown right class="dropdown-user">
            <template #button-content>
              <b-avatar
                variant="info"
                class="user-photo"
                :src="userPhoto"
              ></b-avatar>
            </template>
            <b-dropdown-text href="#">Hi {{ userName }}</b-dropdown-text>
            <b-dropdown-text href="#">{{ userEmail }}</b-dropdown-text>
            <b-dropdown-item class="sign-out-item" @click="signOut"
              >Sign Out</b-dropdown-item
            >
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
    };
  },
  created() {
    this.$store.dispatch("getToken");
    if (this.token) {
      this.$store.dispatch("getUserData", this.token);
    }
  },
  watch: {
    token() {
      this.$store.dispatch("getUserData", this.token);
      this.$router.push(`/`);
    },
  },
  computed: {
    ...mapState({
      token: "token",
      userName: "userName",
      userEmail: "userEmail",
      userPhoto: "userPhoto",
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
.dropdown-user {
  font-size: 20px;
  letter-spacing: 1px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  transition: 0.5s background;
  text-align: center;

  font-weight: bold;
  background: rgba(27, 31, 25, 0.349);
  transition: 0.5s background;
}

.dropdown-user:hover {
  background: rgba(94, 102, 89, 0.349);
}
.nav-bar {
  padding: 15px;
  margin: auto;
  background: rgba(0, 0, 0, 0.281);
}
.brand-logo {
  width: 170px;
  padding: 5px;
}
.sign-link a {
  color: black !important;
  font-size: 20px;
  letter-spacing: 1px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  transition: 0.5s background;
  font-weight: bold;
  background: rgba(206, 14, 14, 0.507);
}
.sign-link a:hover {
  color: azure !important;
}
.user-name {
  color: black;
  font-style: normal;
}
.user-photo {
  width: 70px !important;
  height: 70px !important;
}
.sign-out-item {
  background: rgba(109, 99, 99, 0.322);
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
</style>

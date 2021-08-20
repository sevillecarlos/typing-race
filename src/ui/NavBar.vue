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
          <b-nav-item-dropdown
            menu-class="menu-user-profile"
            right
            class="dropdown-user"
          >
            <template #button-content>
              <b-avatar
                variant="info"
                class="user-photo"
                :src="userPhoto"
              ></b-avatar>
            </template>
            <b-dropdown-text href="#">Hi {{ userName }}</b-dropdown-text>
            <b-dropdown-text href="#">{{ userEmail }}</b-dropdown-text>
            <button class="restart-game-item" v-b-toggle="'collapse-2'">
              Restart from noob
            </button>
            <b-collapse class="confirmation-restart-collapse" id="collapse-2">
              <b-card class="card-collapse"
                >Are you sure to restart?
                <b-button
                  v-b-toggle="'collapse-2'"
                  class="restart button"
                  @click="restartGame"
                  >Restart</b-button
                >
                <b-button v-b-toggle="'collapse-2'" class="cancel button"
                  >Cancel</b-button
                >
              </b-card>
            </b-collapse>
            <b-dropdown-item class="sign-out-item" @click="signOut"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal ref="my-modal" hide-footer title="You restart your game"
      >Your level is: <span> noob</span> and you have 0 <span> points</span>
    </b-modal>
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
    restartGame() {
      this.$store.dispatch("restartGame", this.userEmail);
      this.$refs["my-modal"].show();
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
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
  width: 70% !important;
  margin: auto !important;
}
.restart-game-item {
  background: rgba(175, 94, 94, 0.322);
  border: none !important;
  border-top: 1.5px solid black !important;
  border-bottom: 1.5px solid black !important;
  margin-bottom: 2px !important;
  font-size: 18px !important;
  width: 70% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.restart-game-item:hover {
  background: rgba(189, 163, 163, 0.932);
}

.menu-user-profile {
  padding: 5px !important;
  background: rgba(246, 247, 245, 0.979) !important;
  border-bottom: 2px solid black !important;
  border-top: 2px solid black !important;
  border-radius: 0px !important;
  text-align: center !important;
}
.confirmation-restart-collapse {
  background: rgba(255, 255, 255, 0.932) !important;
}
.card-collapse {
  background: rgba(110, 104, 110, 0.253) !important;
  border-radius: 0px !important;
  border-right: 2px solid black !important;
  border-left: 2px solid black !important;
  margin-bottom: 5px;
}
.button {
  color: black !important;
  border-radius: 0px !important;
  padding: 5px !important;
  margin-right: 5px !important;
  border: none !important;
  border-right: 2px solid black !important;
  border-left: 2px solid black !important;
}
button:hover {
  background: rgba(46, 46, 38, 0.479) !important;
}
.restart {
  background: rgba(255, 0, 0, 0.411) !important;
}
.cancel {
  background: rgba(238, 214, 170, 0.493) !important;
}
</style>

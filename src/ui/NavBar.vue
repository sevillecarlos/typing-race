<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav-bar">
      <b-navbar-brand class="brand" href="/">
        <b-img
          :src="brandLogo"
          class="brand-logo-nav"
          fluid
          alt="Logo Image Typing Race"
        ></b-img>
        Typing Race
      </b-navbar-brand>
      <b-navbar-toggle
        target="nav-collapse"
        class="toggle-nav-bar"
      ></b-navbar-toggle>
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
              <b-avatar class="user-photo" :src="userPhoto"></b-avatar>
            </template>
            <b-dropdown-text href="#">Hi {{ userName }}</b-dropdown-text>
            <b-dropdown-text href="#">{{ userEmail }}</b-dropdown-text>
            <button class="restart-game-item" v-b-toggle="'collapse-2'">
              Restart from noob
            </button>
            <b-collapse class="confirmation-restart-collapse" id="collapse-2">
              <b-card class="card-collapse"
                >Are you sure to restart?
                <br>
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
            <br />
            <b-button class="sign-out" @click="signOut">Sign Out</b-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      ref="my-modal"
      class="restart-modal"
      hide-footer
      hide-header-close
      header-class="restart-modal-header"
      content-class="restart-modal-content"
      title="Restart Game"
    >
      <span class="restart-modal-msg"
        >Hi {{ userName }}, you restart from noob</span
      >
      <br />
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
.restart-modal-header {
  background: #f58b00 !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  border-bottom-color: transparent !important;
}
.restart-modal-content {
  font-weight: bold;
  padding: 3px;
  background: #faa507fa !important;
  font-size: 1vw;
}
.dropdown-user {
  font-size: 1.4vw;
  letter-spacing: 1px;
  text-align: center;
  font-weight: bold;
}
.user-name {
  color: black;
  font-style: normal;
}
.user-photo {
  width: 4vw !important;
  height: 4vw !important;
  background-color: rgba(255, 0, 106, 0.253) !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  transition: 0.5s box-shadow;
}

.user-photo:hover {
  box-shadow: -1px 4px 21px -3px rgba(0, 0, 0, 0.164);
}

.nav-bar {
  padding: 1%;
  background: #f58b00 !important;
  border-radius: 10px !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
.brand {
  font-size: 2vw !important;
  color: black !important;
  font-weight: bold !important;
  margin-left: 25%;
}
.brand-logo-nav {
  width: 5vw;
  padding: 1%;
}

.sign-link a {
  text-decoration: none;
  color: black !important;
  font-size: 1vw;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: center;
  background: rgb(235, 252, 8);
  border-radius: 50px !important;
  padding: 10px !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
.sign-link a:hover {
  box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
}

.sign-out {
  font-size: 1vw !important;
}
.restart-game-item {
  font-size: 1vw !important;
  margin-bottom: 10px;
  padding: 10px !important;
  background-color: #ff3333 !important;
}
.restart-game-item:hover {
  background: rgba(189, 163, 163, 0.932);
}

.menu-user-profile {
  padding: 10% !important;
  border: none !important;
  background: #faa507fa !important;
  border-radius: 15px !important;
  text-align: center !important;
  font-size: 1vw !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}

.confirmation-restart-collapse {
  border-radius: 15px !important;
  border: none !important;
  display: inline-block;
}
.card-collapse {
  background: #f58b00 !important;
  font-size: 1vw !important;
  border-radius: 15px !important;
  margin-bottom: 5px;
  border: none !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}

.restart-modal-greeting-msg {
  color: rgb(253, 253, 253);
}
.restart-modal-msg {
  font-size: 1vw;
}
.restart {
  background: rgb(214, 10, 10) !important;
  margin-right: 10px;
  font-size: 1vw !important;
}
.cancel {
  background: rgb(238, 214, 170) !important;
  font-size: 1vw !important;
}

@media only screen and (max-width: 1035px) {
  .sign-link a {
    font-size: 10px;
    width: 10vw;
    margin: auto;
    padding: 10px !important;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .nav-bar {
    padding: 5px;
  }
  .brand {
    font-size: 25px !important;
    color: black !important;
    font-weight: bold !important;
    margin-left: 1%;
  }
  .brand-logo-nav {
    width: 50px;
    padding: 5px;
  }
  .toggle-nav-bar {
    width: 50px;
  }
  .restart-modal {
    font-weight: bold !important;
  }
  .restart-modal-header {
    font-size: 16px !important;
  }
  .restart-modal-content {
    font-weight: bold;
    font-size: 20px;
  }
  .restart-modal-msg {
    font-size: 15px;
  }
  .dropdown-user {
    font-size: 15px;
  }
  .user-name {
    color: black;
    font-style: normal;
  }
  .user-photo {
    width: 50px !important;
    height: 50px !important;
  }
  .sign-link a {
    font-size: 20px;
    width: 30%;
    margin: auto;
    padding: 10px !important;
  }
  .sign-out {
    font-size: 13px !important;
  }
  .restart-game-item {
    font-size: 13px !important;
    margin-bottom: 10px;
    padding: 10px !important;
    background-color: #ff3333 !important;
  }
  .restart-game-item:hover {
    background: rgba(189, 163, 163, 0.932);
  }
  .card-collapse {
    font-size: 15px;
  }
  .restart {
    background: rgb(255, 0, 0) !important;
    margin-right: 10px;
    font-size: 12px !important;
  }
  .cancel {
    background: rgb(238, 214, 170) !important;
    font-size: 12px !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .nav-bar {
    padding: 5px;
  }
  .brand {
    font-size: 25px !important;
    color: black !important;
    font-weight: bold !important;
    margin-left: 1%;
  }
  .brand-logo-nav {
    width: 50px;
    padding: 5px;
  }
  .toggle-nav-bar {
    width: 50px;
  }
  .restart-modal {
    font-weight: bold !important;
  }
  .restart-modal-header {
    font-size: 16px !important;
  }
  .restart-modal-content {
    font-weight: bold;
    font-size: 20px;
  }
  .restart-modal-msg {
    font-size: 15px;
  }
  .dropdown-user {
    font-size: 15px;
  }
  .user-name {
    color: black;
    font-style: normal;
  }
  .user-photo {
    width: 50px !important;
    height: 50px !important;
  }
  .sign-link a {
    font-size: 15px;
    width: 30%;
    margin: auto;
    padding: 10px !important;
  }
  .sign-link a:hover {
    box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
    -webkit-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
    -moz-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  }
  .sign-out {
    font-size: 13px !important;
  }
  .restart-game-item {
    font-size: 13px !important;
    margin-bottom: 10px;
    padding: 10px !important;
    background-color: #ff3333 !important;
  }
  .restart-game-item:hover {
    background: rgba(189, 163, 163, 0.932);
  }
  .card-collapse {
    font-size: 15px;
  }
  .restart {
    background: rgb(255, 0, 0) !important;
    margin-right: 10px;
    font-size: 12px !important;
  }
  .cancel {
    background: rgb(238, 214, 170) !important;
    font-size: 12px !important;
  }
}
</style>

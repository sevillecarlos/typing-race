<template>
  <div id="app">
    <div class="mobile-msg" v-if="isMobile()">
      <span
        >This app is only for computers
        <b-img
          :src="appLogo"
          class="brand-logo-nav"
          fluid
          alt="Logo Image Typing Race"
        ></b-img
      ></span>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import logo from "../src/assets/logo-typing-race.png";
export default {
  data() {
    return {
      appLogo: logo,
    };
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
/******************************/
/**APP ELEMENTS**/
#app {
  width: 70%;
  margin: auto;
}

button {
  border: none !important;
  border-radius: 50px !important;
  padding: 1.5%;
  color: black !important;
  font-size: 1.2vw !important;
  font-weight: bold !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
input {
  border: none;
  font-size: 0.95vw !important;
  font-weight: bold !important;
  border-radius: 15px !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
button:hover {
  box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
}
button[type="submit"] {
  margin-top: 20px;
  font-size: 1vw !important;
  width: 100%;
  background: rgb(115, 255, 0) !important;
}

body::-webkit-scrollbar {
  width: 0.7vw;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background: #faa507fa !important;
  border-radius: 20px;
}

.mobile-msg {
  text-align: center;
  padding: 20px;
  margin: 25% auto;
  padding: 1%;
  width: 80%;
  font-size: 40px;
  background: #faa507fa !important;
  border-radius: 10px;
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  #app {
    width: 100%;
    margin: auto;
  }
  button {
    padding: 15px;
    font-size: 25px !important;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  #app {
    width: 100%;
    margin: auto;
  }
  button {
    padding: 15px;
    font-size: 20px !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  #app {
    width: 100%;
    margin: auto;
  }
  button {
    padding: 10px;
    font-size: 15px !important;
  }
}
</style>

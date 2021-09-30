<template>
  <div id="app">
    <div class="ribbon">
      <a href="https://github.com/sevillecarlos/typing-race" target="_blank">
        @sevillecarlos🍒
      </a>
    </div>
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
import logo from "../src/assets/image/logo-typing-race.png";
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

::-webkit-scrollbar {
  width: 0.7vw;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background: #faa507fa !important;
  border-radius: 20px;
}

.ribbon {
  background: #f58b00 !important;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  left: -50px;
  top: 40px;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
.ribbon a {
  border: 1px solid rgb(255, 255, 255);
  color: black;
  display: block;
  font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 1px 0;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 3px #444;
}
.ribbon a:hover{
  color: rgb(255, 255, 255);

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

/************************************************************/

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
#app {
    width: 80%;
    margin: auto;
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
    .ribbon {
    left: -40px;
    top: 15px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }
  .ribbon a {
    font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    margin: 2px 0;
    padding: 5px 30px;
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
    .ribbon {
    left: -40px;
    top: 15px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }
  .ribbon a {
    font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    margin: 2px 0;
    padding: 5px 30px;
  }
}
</style>

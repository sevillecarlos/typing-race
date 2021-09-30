<template>
  <b-sidebar no-header id="sidebar-1" title="Typing Race Rules" shadow>
    <div class="instruction-container">
      <b-img
        :src="logo"
        class="brand-logo-nav instruction"
        fluid
        alt="Logo Image Typing Race"
      ></b-img>

      <div class="instructions">
        <h5><strong>Instructions</strong></h5>
        <p>
          Try to type all the words possible before the timer turn to 0
        </p>
      </div>
      <div class="level-ranking">
        <h5><strong>Levels</strong></h5>
        <p><strong>noob</strong> x 0 points</p>
        <p><strong>pro</strong> x 50 points</p>
        <p><strong>master</strong> x 60 points</p>
        <p><strong>hacker</strong> x 70 points</p>
      </div>
      <div v-if="!token" class="sign-in-container">
        <p>Not Sign In yet?</p>
        <a class="sign-in-link" href="/authentication">Sign In</a>
      </div>
    </div>
  </b-sidebar>
</template>
<script>
import { mapState } from "vuex";
import logo from "../assets/image/logo-typing-race.png";
export default {
  name: "SideBar",
  data() {
    return {
      logo: logo,
    };
  },
  computed: {
    ...mapState({
      token: "token",
    }),
  },
};
</script>
<style>
/******************************/
/**SIDEBAR**/
#sidebar-1 {
  background-color: #faa50700 !important;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0) !important;
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0);
}
.logo-image-container {
  text-align: center;
}
.instruction-container {
  border-radius: 20px;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  background: #f58b00 !important;
  padding: 1%;
  width: 95%;
  margin: 5vw auto;
  text-align: center;
}

.level-ranking,
.instructions {
  margin-top: 5%;
}
.level-ranking h5,
.instructions h5 {
  color: black;
}

.sign-in-link {
  text-decoration: none;
  color: black !important;
  font-size: 1vw;
  letter-spacing: 1px;
  font-weight: bold;
  background: rgb(235, 252, 8);
  border-radius: 50px !important;
  padding: 5%;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
.sign-in-link:hover {
  box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(255, 255, 255, 0.75);
}
.sign-in-container {
  margin-top: 20%;
  font-weight: bold;
  font-size: 1.4vw;
}
.instruction {
  margin: auto !important;
}
/***************************************************************************/
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  #sidebar-1 {
    width: 50% !important;
  }
  .logo-image-container {
    text-align: center;
  }
  .level-ranking,
  .instructions {
    margin-top: 3%;
    font-size: 15px;
  }
  .level-ranking h5,
  .instructions h5 {
    padding: 1px;
    font-size: 25px;
  }

  .sign-in-link {
    font-size: 20px;
    padding: 15px;
  }
  .sign-in-container {
    font-size: 20px;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  #sidebar-1 {
    width: 50% !important;
  }
  .logo-image-container {
    text-align: center;
  }
  .logo-image {
    width: 70px;
  }
  .level-ranking,
  .instructions {
    margin-top: 2%;
    font-size: 12px;
  }
  .level-ranking h5,
  .instructions h5 {
    padding: 1px;
    font-size: 15px;
  }

  .def {
    font-size: 15px;
  }
  .sign-in-link {
    font-size: 15px;
    padding: 10px;
  }
  .sign-in-container {
    margin-top: 10px;
    font-weight: bold;
    font-size: 15px;
  }
}
</style>

<template>
  <b-sidebar no-header id="sidebar-1" title="Typing Race Rules" shadow>
    <div class="px-3 py-2">
      <div class="instructions">
        <h5><strong>Instructions</strong></h5>
        <p>
          Try to type all the words possible after the timer turn to 0
        </p>
      </div>
      <div class="level-ranking">
        <h5><strong>Level Ranking</strong></h5>
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
export default {
  name: "SideBar",
  computed: {
    ...mapState({
      token: "token",
    }),
  },
};
</script>
<style>
#sidebar-1{
  background-color: rgba(245, 245, 220, 0.26) !important;
}
.level-ranking {
  margin-top: 50px;
  text-align: justify;
}
.level-ranking h5 {
  border-bottom: 2px solid black;
  width: 55%;
}
.instructions h5 {
  border-bottom: 2px solid black;
  width: 50%;
}
.def {
  font-size: 20px;
}
.sign-in-link {
  text-decoration: none;
  color: black !important;
  font-size: 20px;
  letter-spacing: 1px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  font-weight: bold;
  background: rgba(206, 14, 14, 0.507);
  padding: 10px;
}
.sign-in-link:hover {
  color: azure !important;
}
.sign-in-container{
    margin-top: 50px;
    font-weight: bold;
    font-size: 20px;
}
</style>

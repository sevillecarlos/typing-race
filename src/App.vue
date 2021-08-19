<template>
  <div id="app">
    <NavBar />
    <router-view />
    <div class="footer">
      <span >code by Carlos🍒</span>
    </div>
  </div>
</template>
<script>
import NavBar from "./ui/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
<style>
#app {
  width: 70%;
  margin: auto;
  min-height: 90vh;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 20px;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
}
.footer span:hover{
  color: aliceblue;
}
.footer span{
  background-color: rgba(126, 32, 32, 0.322);
  padding: 15px;
    border-left: 3px solid black;
  border-right: 3px solid black;
}
</style>

<template>
  <div id="app">
    <NavBar />
    <router-view />
    <div class="footer">
      <a href="https://github.com/sevillecarlos" target="blank"
        >code by Carlos🍒</a
      >
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
}

.footer a {
  background-color: rgba(126, 32, 32, 0.322);
  padding: 15px;
  border-left: 3px solid black;
  border-right: 3px solid black;
  text-decoration: none;
  color: black;
}
.footer a:hover {
  color: aliceblue;
}
</style>

<template>
  <div id="app">
    <NavBar />
    <router-view />
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
   border-left: 3px solid black;
  border-right: 3px solid black;
  background: rgba(0, 0, 0, 0.158);
    min-height: 90vh;

}
</style>

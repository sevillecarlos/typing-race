<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script></script>
<style>
#app {
  width: 70%;
  margin: auto;
}
button {
  border: none !important;
  border-radius: 50px !important;
  margin: 5px;
  padding: 15px;
  color: black !important;
  font-size: 20px !important;
  font-weight: bold !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
}
input {
  border: none;
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
  width: 100%;
  background: rgb(115, 255, 0) !important;
}

/* Big tablets to 1200px*/
@media only screen and (max-width: 1200px) {
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  #app {
    width: 100%;
    margin: auto;
  }
}
</style>

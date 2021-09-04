<template>
  <div class="login">
    <div v-if="token" class="already-sigin">
      <h4>You are already sign in</h4>
    </div>
    <Auth v-else />
  </div>
</template>

<script>
import Auth from "../components/Auth.vue";
import { mapState } from "vuex";
export default {
  name: "Login",
  components: {
    Auth,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    ...mapState({
      token: "token",
    }),
  },
  watch: {
    token() {
      if (this.token) this.$router.push("/");
    },
  },
};
</script>

<style>
.login{
  padding: 20px;
}
.already-sigin {
  background: #faa507fa !important;
  padding: 15px;
  width: 50%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-radius: 15px;
}
.already-sigin h4 {
  font-size: 50px !important;
  padding: 50px;
}
</style>

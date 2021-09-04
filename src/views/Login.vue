<template>
  <div>
    <div v-if="token">
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
};
</script>

<style></style>

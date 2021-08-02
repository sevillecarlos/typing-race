<template>
  <div class="login">
    <b-tabs class="tab-auth" pills nav-class="item-tab" nav-wrapper-class="control-nav">
      <b-tab
        title-link-class="title-tab"
        title="Sign In"
        active
        class="tab-sign-in"
      >
        <b-form @submit="onSubmitSignIn" class="form-sign-in">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="formSignIn.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Your Email:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formSignIn.password"
              placeholder="Enter name"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Login</b-button>
          <br />
          <span v-if="error" class="error-msg">{{ error }}</span>
        </b-form>
      </b-tab>
      <b-tab title="Sing Up" title-link-class="title-tab">
        <b-form @submit="onSubmitSignUp" class="form-sign-up">
          <b-avatar variant="primary" class="avatar-user" :src="userPhoto">
          </b-avatar>
          <br />
          <b-form-file
            @change="uploadPhotoUser"
            class="mt-3 uploader-photo"
            plain
          ></b-form-file>

          <b-form-group
            id="input-group-1"
            label="Fullname:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="formSignUp.fullName"
              type="text"
              placeholder="Enter Full Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="formSignUp.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formSignUp.password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
          <!-- <b-form-group
            id="input-group-2"
            label="Your Confirm password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formSignUp.confirmPassword"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group> -->

          <b-button type="submit" variant="primary">Register</b-button>
          <br />
          <span class="error-msg">{{ error2 }}</span>
        </b-form></b-tab
      >
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formSignIn: {
        email: "",
        password: "",
      },
      formSignUp: {
        fullName: "",
        email: "",
        password: "",
        // userPhoto: null,
      },
      file: [],
      userPhoto: null,
    };
  },
  computed: {
    ...mapState({
      error: "error",
      error2: "error2",
    }),
  },
  methods: {
    onSubmitSignIn(e) {
      e.preventDefault();
      this.$store.dispatch("signIn", this.formSignIn);
    },
    onSubmitSignUp(e) {
      e.preventDefault();
      this.$store.dispatch("signUp", this.formSignUp);
    },
    uploadPhotoUser(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.userPhoto = e.target.result;
      };
    },
  },
};
</script>

<style>
.tab-auth {
  width: 30% !important;
  margin: 5% auto;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  background: rgba(0, 0, 0, 0.281);
  padding: 15px;
}

.title-tab {
  font-weight: bold;
  color: azure !important;
}
.active-class {
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  border-radius: 16px !important;
  background-color: rgb(0, 255, 21) !important;
  color: rgb(0, 0, 0) !important;
}
.avatar-user {
  width: 100px !important;
  height: 100px !important;
  background-color: darkcyan !important;
  font-size: 50px !important;
}
.error-msg {
  color: red;
  font-size: 20px;
}
.tab-sign-in {
  padding: 15px;
}
.form-sign-in * {
  padding: 2px;
}
.form-sign-up * {
  padding: 2px;
}
.form-sign-in input,
.form-sign-up input {
  border: none;
  border-radius: 0px;
  border-left: 3px solid black;
  border-right: 3px solid black;
}
.active-class {
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  border-radius: 16px !important;
  background-color: rgb(0, 255, 21) !important;
  color: rgb(0, 0, 0) !important;
}
button[type="submit"] {
  margin-top: 20px;
  width: 100%;
  background: rgba(172, 255, 47, 0.486) !important;
  border: none;
  color: black;
  font-weight: bold;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  border-radius: 0px;
  letter-spacing: 1px;
}
.item-tab {
  border-top: 3px solid black;
  border-bottom: 3px solid black;  
}
.item-tab :active{
  background: black !important;
}

</style>

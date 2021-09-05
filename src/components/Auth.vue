<template>
  <div class="login">
    <b-tabs
      class="tab-auth"
      pills
      nav-class="item-tab"
      nav-wrapper-class="control-nav"
      active-nav-item-class="active-tab"
    >
      <b-tab
        title-link-class="title-tab"
        title="Sign In"
        active
        class="tab-sign-in"
      >
        <b-form
          @submit.prevent="onSubmitSignIn"
          class="form-sign-in"
          autocomplete="off"
        >
          <div class="logo-container">
            <b-img
              :src="logo"
              class="brand-logo"
              fluid
              alt="logo image"
            ></b-img>
          </div>
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
            label="Your Password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formSignIn.password"
              placeholder="Enter name"
              :type="showPassWord"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-checkbox
            id="checkbox-password"
            v-model="showPassWord"
            name="checkbox-password"
            value="text"
            unchecked-value="password"
          >
            Show Password
          </b-form-checkbox>
          <span v-if="error" class="error-msg">{{ error }}</span>
          <b-button type="submit">Login</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Sing Up" title-link-class="title-tab">
        <b-form
          @submit.prevent="onSubmitSignUp"
          class="form-sign-up"
          autocomplete="off"
        >
          <div class="logo-container">
            <b-img
              :src="logo"
              class="brand-logo"
              fluid
              alt="logo image"
            ></b-img>
          </div>
          <div class="user-photo-container">
            <b-avatar
              variant="primary"
              class="avatar-user"
              :src="userPhotoPrev"
            >
            </b-avatar>
            <br />
            <b-form-file
              @change="uploadPhotoUser"
              class="uploader-photo"
              plain
              accept="image/jpg, image/jpeg, image/png, image/gif"
              no-drop
              required
            ></b-form-file>
          </div>

          <b-form-group
            id="input-group-3"
            label="Fullname:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="formSignUp.fullName"
              type="text"
              placeholder="Enter Full Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            label="Email address:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="formSignUp.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Your password:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="formSignUp.password"
              placeholder="Enter password"
              required
              :type="showPassWord2"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-6"
            label="Your Confirm password:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              :type="showPassWord2"
              v-model="formSignUp.confirmPassword"
              placeholder="Enter confirm password"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-checkbox
            id="checkbox-password"
            v-model="showPassWord2"
            name="checkbox-password"
            value="text"
            unchecked-value="password"
          >
            Show Passwords
          </b-form-checkbox>
          <span class="error-msg">{{ error2 }}</span>
          <b-button type="submit">Register</b-button>
        </b-form></b-tab
      >
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import logoImage from "../assets/logo-typing-race.png";

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
        confirmPassword: "",
      },
      showPassWord: "password",
      showPassWord2: "password",
      userPhotoPrev: null,
      userPhoto: null,
      logo: logoImage,
    };
  },
  computed: {
    ...mapState({
      error: "error",
      error2: "error2",
    }),
  },
  methods: {
    onSubmitSignIn() {
      this.$store.dispatch("signIn", this.formSignIn);
    },

    onSubmitSignUp() {
      if (this.formSignUp.confirmPassword !== this.formSignUp.password) {
        this.$store.commit("setError2", "Passwords not match");
      } else {
        const formData = new FormData();
        formData.append("fullName", this.formSignUp.fullName);
        formData.append("email", this.formSignUp.email);
        formData.append("password", this.formSignUp.password);
        formData.append("userPhoto", this.userPhoto);
        this.$store.dispatch("signUp", formData);
      }
    },
    uploadPhotoUser(e) {
      this.userPhoto = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.userPhoto);
      reader.onload = (e) => {
        this.userPhotoPrev = e.target.result;
      };
    },
  },
};
</script>

<style>
.tab-auth {
  width: 30% !important;
  margin: auto;
  border-radius: 10px !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  background: #f58b00 !important;
  padding: 15px;
}
.brand-logo {
  width: 80px !important;
}
.title-tab {
  font-weight: bold;
  color: rgb(0, 0, 0) !important;
  font-size: 20px !important;
}
.avatar-user {
  width: 100px !important;
  height: 100px !important;
  font-size: 50px !important;
}
.error-msg {
  color: red;
  font-size: 20px;
}
.tab-sign-in,
.form-sign-up {
  padding: 15px;
}
.form-sign-in * {
  padding: 2px;
}
.form-sign-up * {
  padding: 2px;
}

.logo-container {
  text-align: center;
  padding: 15px;
}
.logo-container h4 {
  font-weight: bold;
}
.uploader-photo {
  background-color: transparent !important;
}
.user-photo-container {
  text-align: center;
}
.active-tab {
  background: #faa507fa !important;
  box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 11px -2px rgba(0, 0, 0, 0.75);
  border-radius: 15px !important;
  font-size: 20px !important;
  color: black !important;
}

/* Big tablets to 1200px*/
@media only screen and (max-width: 1200px) {
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
    .tab-auth {
    width: 55% !important;
    padding: 5px;
  }
  .title-tab {
    font-size: 20px !important;
  }
  .brand-logo {
    width: 100px !important;
  }
  .error-msg {
    color: rgb(243, 34, 34);
    font-size: 25px;
  }
  .active-tab {
    font-size: 20px !important;
  }
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .tab-auth {
    width: 100% !important;
    padding: 5px;
  }
  .title-tab {
    font-size: 20px !important;
  }
  .brand-logo {
    width: 80px !important;
  }
  .avatar-user {
    width: 90px !important;
    height: 90px !important;
  }
  .error-msg {
    color: rgb(243, 34, 34);
    font-size: 20px;
  }
  .tab-sign-in {
    padding: 10px;
  }
  .uploader-photo {
    background-color: transparent !important;
    width: 100% !important;
  }
  .logo-container {
    text-align: center;
    padding: 5px;
  }
  .active-tab {
    font-size: 20px !important;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .tab-auth {
    width: 100% !important;
    padding: 5px;
  }
  .title-tab {
    font-size: 15px !important;
  }
  .brand-logo {
    width: 70px !important;
  }
  .avatar-user {
    width: 90px !important;
    height: 90px !important;
  }
  .error-msg {
    color: rgb(243, 34, 34);
    font-size: 15px;
  }
  .tab-sign-in {
    padding: 10px;
  }
  .uploader-photo {
    background-color: transparent !important;
    width: 100% !important;
  }
  .logo-container {
    text-align: center;
    padding: 5px;
  }
  .active-tab {
    font-size: 15px !important;
  }
}
</style>

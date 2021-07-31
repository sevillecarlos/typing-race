<template>
  <div class="login">
    <b-tabs class="tab-auth" pills card>
      <b-tab title="Tab 1" active>
        <b-form @submit="onSubmitSignIn">
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

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Tab 2">
        <b-form @submit="onSubmitSignUp">
          <b-avatar
            variant="primary"
            class="avatar-user"
            :src="formSignUp.userPhoto"
          >
          </b-avatar>
          <br />
          <!-- <b-form-file
            @change="uploadPhotoUser"
            v-model="file"
            class="mt-3 uploader-photo"
            plain
          ></b-form-file> -->

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

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form></b-tab
      >
    </b-tabs>
  </div>
</template>

<script>
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
        userPhoto: null,
      },
      file: "",
    };
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
    uploadPhotoUser() {
      //   const fileReader = new FileReader();
      //   fileReader.onload = (e) => {
      //     this.formSignUp.userPhoto = e.target.result;
      //   };
      //   fileReader.readAsDataURL(this.file);
      //   console.log(this.formSignUp.userPhoto)
      //   const reader = new FileReader(this.file);
      //   reader.readAsDataURL(this.file);
      //   console.log(reader)
      //   reader.onload = (e) => {
      //     console.log(e.target.result);
      //     this.formSignUp.userPhoto = e.target.result;
      //   };
    },
  },
};
</script>

<style>
.tab-auth {
  width: 30% !important;
  margin: 5% auto;
}
.avatar-user {
  width: 100px !important;
  height: 100px !important;
  background-color: darkcyan !important;
  font-size: 50px !important;
}
.uploader-photo {
}
</style>

<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">Email Address</label>
          <input
            type="email"
            v-model="email"
            class="input"
            id="email"
            placeholder="email@example.com"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="password"
            class="input"
            id="password"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password Confirmation</label>
          <input
            type="password"
            v-model="passwordConfirmation"
            class="input"
            id="password_confirmation"
          />
        </div>

        <button type="submit" class="btn green">Sign Up</button>

        <div class="my-4">
          <router-link to="/" class="link">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    async signup() {
      try {
        const response = await this.$http.plain.post('/signup', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        });
        this.signupSuccessful(response);
      } catch (error) {
        this.signupFailed(error);
      }
    },
    signupSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response);
        return;
      }

      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = '';
      this.$router.replace('/records');
    },
    signupFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        'Something went wrong';
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/records');
      }
    },
  },
});
</script>

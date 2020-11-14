<template>
<div>
  <form action="#" method="POST" @submit.prevent="login" class="form-signin" v-if="!isLoggedIn">
    <h1 class="h3 mb-3 font-weight-normal">Log in to make your To-Do list!</h1>
    <input type="email" name="email" v-model="credentials.email" placeholder="Email Address" variant="demo" class="form-control"/>
    <input type="password" name="password" v-model="credentials.password" placeholder="Password" class="form-control"/> 
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  <h1 v-if="isLoggedIn">You are already logged in!</h1>
</div>
</template>

<script>

export default {
  data() {
    return {
      credentials:{
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login(){
      await this.$store.dispatch('auth/login',this.credentials)
      this.$router.push({name:'Home'})
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn;
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
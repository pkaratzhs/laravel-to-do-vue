<template>
<div>
  <form action="#" method="POST" @submit.prevent="register" class="form-signin" v-if="!isLoggedIn">
    <h1 class="h3 mb-3 font-weight-normal">Register to make your To-Do list!</h1>
    <input type="name" name="name" v-model="credentials.name" placeholder="Full Name" class="form-control"/>
    <input type="email" name="email" v-model="credentials.email" placeholder="Email Address"  class="form-control"/>
    <input type="password" name="password" v-model="credentials.password" placeholder="Password" class="form-control"/> 
    <input type="password" name="passwordConfirm" v-model="credentials.password_confirmation" placeholder="Confirm Password" class="form-control mb-2"/> 
    <button :disabled="!passwordsMatch" type="submit" class="btn btn-primary">Register</button>
  </form>
  <h1 v-if="isLoggedIn">You are already logged in!</h1>
</div>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      credentials:{
        name: '',
        email: '',
        password: '',
        password_confirmation:''
      },
    }
  },
  methods: {
    async register(){
      await axios.post('/register',this.credentials).then(
        response => {if (response.status == '201'){
          this.$router.push({name:'Home'})
        }
        }
      ).catch(() => alert('Something went wrong'));
       await this.$store.dispatch('auth/loadUser')
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn;
    },
    passwordsMatch(){
      if((this.credentials.password === this.credentials.password_confirmation) && this.credentials.password != '' ){
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
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
.form-signin {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

</style>
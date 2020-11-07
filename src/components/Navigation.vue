<template>
<nav class="pl-5 pr-5 navbar navbar-expand sticky-top navbar-dark bg-dark flex-column flex-md-row">
      <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/">Home</router-link>
            <router-link class="nav-item nav-link" to="/about">About</router-link>
      </div>
      <div class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <div class="nav-item dropdown" v-if="loggedIn">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ user.email }}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a href="#" class="dropdown-item" @click.prevent="logout()">Log Out</a>
        </div>
      </div>
        <router-link class="nav-item nav-link" to="/login" v-if="!loggedIn">Log in</router-link>
        <router-link class="nav-item nav-link" to="/register" v-if="!loggedIn">Register</router-link>
      </div>
</nav>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
       ...mapGetters({
             loggedIn:'auth/getLoggedIn',
             user:'auth/getUser'
       })
  },
  methods:{
     async logout(){
        await this.$store.dispatch('auth/logOut')
        if (this.$route.name != 'Home'){
          this.$router.push({name:'Home'})
        }
      }
  }
}
</script>
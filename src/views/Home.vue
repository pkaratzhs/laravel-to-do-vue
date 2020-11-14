<template>
<div class="container">
    <h3>Here you will see any lists you've made</h3>
    <BouncyLoader class="align-middle mt-5" v-if="lists===null && isLoggedIn"/>
    <router-link :to="`/create`" tag="button" class="btn btn-primary" v-if="isLoggedIn">Add List</router-link>
    <div class="row mt-5">
        <div class="col-md-3 p-1" v-for="(list,index) in lists" :key="index">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ list.title }}</h5>
                    <p class="card-text">{{ list.description }}</p>
                    <router-link :to="`/list/${list.id}`" tag="button" class="btn btn-primary">View List</router-link>
                    <button class="btn btn-danger" @click="deleteList(list)">Delete list</button>
                </div>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import BouncyLoader from '@/components/BouncyLoader'
export default {
    methods:{
        deleteList(list){
            axios.delete(`api/lists/${list.id}`)
                .then(resp => console.log(resp))
                .then(this.$router.go({name:'Home'}))
        }
    },
    components:{
        BouncyLoader,
    },

  data(){
    return {
      lists:null
    }
  },
  created(){
    axios.get('/api/lists').then(resp => this.lists = resp.data.data)
  },
  computed:{
      isLoggedIn(){
          return this.$store.state.auth.isLoggedIn;
      }
  }
}
</script>
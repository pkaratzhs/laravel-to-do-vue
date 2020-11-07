<template>
<div class="container">
  <h3>Here you will see any lists you've made</h3>
  <div class="flex-row d-flex flex-wrap mt-5">
    <div class="card m-2" style="width: 18rem;" v-for="(list,index) in lists" :key="index">
      <div class="card-body">
        <h5 class="card-title">{{ list.title }}</h5>
        <p class="card-text">{{ list.description }}</p>
        <router-link :to="`/list/${list.id}`" tag="button" class="btn btn-primary">View List</router-link>
      </div>
    </div>  
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      lists:{}
    }
  },
  created(){
    axios.get('/api/lists').then(resp => this.lists = resp.data.data)
  }
}
</script>
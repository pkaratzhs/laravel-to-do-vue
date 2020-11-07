<template>
  <div>
    <h3 v-if="errors != null">{{errors}}</h3>
   <h3>{{list.title}}</h3>
   <h4>{{list.description}}</h4>
   <ul>
     <li v-for="(task,index) in list.tasks" :key='index'>
       {{ task.title }}
     </li>
   </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      list:{},
      errors:null
    }
  },
  created(){
    axios.get(`/api/lists/${this.$route.params.id}`)
    .then(resp => this.list = resp.data.data)
    .catch(e => this.errors = e)
  }
}
</script>
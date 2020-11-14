<template>
    <div class="container">
        <div class="row justify-content-center">
            <form action="#" method="POST" @submit.prevent="createList" class="form-signin" v-if="isLoggedIn">
            <h1 class="h3 mb-3 font-weight-normal">Make your To-Do list!</h1>
            <input type="text" required name="title" v-model="list.title" placeholder="List Title" class="form-control"/>
            <textarea type="textarea" rows="5" name="description" v-model="list.description" placeholder="Description" class="form-control"/> 
            <button type="submit" class="btn btn-primary">Create</button>
             </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list:{
                title: null,
                description:'',
                id:null
            }
        }
    },
    methods: {
        createList(){
            axios.post('api/lists',this.list)
                .then(resp => this.list.id = resp.data.data.id )
                .then(()=> this.$router.push(`/list/${this.list.id}`))
                .catch(e => alert(e))
        }
    },
    computed: {
        isLoggedIn(){
            return this.$store.state.auth.isLoggedIn;
        }
    },
}
</script>

<template>
  <div>
    <h3 v-if="errors != null">{{errors}}</h3>
   <h3>{{list.title}}</h3>
   <h4>{{list.description}}</h4>
   <button class="btn btn-danger" @click="deleteList">Delete List</button>
   <div class="container">
    <div class="list-group">
        <div class="list-group-item" v-for="(task,index) in list.tasks" :key='index'>
            <div v-show="!task.isEditting">
                <!--check icon-->
                <svg v-show="task.completed==0" @click='changeComplete(task)' width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                </svg>
                <!--check icon-->
                <!--filled check icon-->
                <svg v-show="task.completed==1" @click="changeComplete(task)" width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <!--filled check icon-->
                <strike v-show="task.completed == 1">{{ task.title }}</strike>
                <span v-show="task.completed == 0">{{ task.title }}</span>
                <button class="btn btn-primary ml-2" @click='task.isEditting = !task.isEditting'>Edit</button>
                <button class="btn btn-danger" @click='deleteTask(task)'>Delete</button>
            </div>
             <div v-show="task.isEditting">
                <form action="" @submit.prevent='editTask(task)'>
                    <input type="text" name="task" v-model="task.title">
                    <button class="btn btn-success ml-2" type="submit" >Change</button>
                    <button class="btn btn-danger" @click.prevent='task.isEditting = !task.isEditting'>Cancel</button>
                </form>
            </div>
        </div>
        </div>
    </div>
    <form action="" @submit.prevent="addTask">
        <input type="text" name="newTask" v-model="newTask.title">
        <button type="submti" class="btn btn-primary" >Add</button>
   </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
        list:{},
        errors:null,
        newTask:{
            title: null
        }
    }
  },
  methods:{
    addTask(){
        axios.post(`api/lists/${this.list.id}/tasks`,this.newTask)
            .then(() => this.$router.go())
            .catch(e => alert(e))
    },
    deleteList(){
        axios.delete(`api/lists/${this.list.id}`).then(this.$router.push({name:'Home'}))
    },
    editTask(task){
        axios.put(`api/tasks/${task.id}`,{title:task.title})
             .then(resp=> {
                    if(resp.status=='200')
                        task.isEditting = false;
                        //i feel like this is bad practice, basically manipulating an object from inside here
                 })
    },
    addEdittingToTasks(){
        this.list.tasks.forEach(task => this.$set(task,'isEditting',false))
    },
    deleteTask(task){
        axios.delete(`api/tasks/${task.id}`).then(() => this.$router.go(this.$router.currentRoute))
    },
    changeComplete(task){
        axios.put(`api/tasks/${task.id}`,{
                title:task.title,
                completed: (task.completed==0) ? task.completed = 1 : task.completed = 0
            })
    }
  },
  created(){
    axios.get(`/api/lists/${this.$route.params.id}`)
        .then(resp => { this.list = resp.data.data })
        .then(() => this.addEdittingToTasks())
        .catch(e => this.errors = e)
  }
}
</script>
<template>
  <div id="app" class="container-fluid text-center">
    <Navigation/>
    <router-view class="mt-5"/>
  </div>
</template>
<script>
import Darkmode from 'darkmode-js'
import Navigation from '@/components/Navigation'
new Darkmode().showWidget();
export default {
  components:{
    Navigation,
  }
}
</script>
<style>
.container-fluid{
  padding:0 !important;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f5f5f5be;
}
</style>

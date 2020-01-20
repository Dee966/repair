<template>
  <div id="app">
    <router-view/>
    <div v-if="$route.meta.keepAlive">
      <BottomBar/>
    </div>

  </div>
</template>

<script>
  import BottomBar from "./components/BottomBar";

export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    BottomBar
    // MdButton,
    // MdContent,
    // MdTabs
  }
}
</script>

<style>

</style>

<template>
  <div class="phone-viewport">
    <md-bottom-bar md-sync-route>
      <md-bottom-bar-item :to="{name:'homeLink'}" exact md-label="主页" md-icon="home"></md-bottom-bar-item>
      <md-bottom-bar-item :to="{name:'orderLink'}" md-label="订单" md-icon="pages"></md-bottom-bar-item>
      <md-bottom-bar-item :to="{name:'myLink'}" md-label="我的" md-icon="person"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
    export default {
        name: "BottomBar"
    }
</script>

<style scoped>
  .phone-viewport{
    position: fixed;
    /*height: 200px;*/
    width: 100%;
    /*background: blue;*/
    bottom: 0;
  }

</style>

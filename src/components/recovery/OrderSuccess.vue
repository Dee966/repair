<template>
  <div id="order_success">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center">
      <span class="md-title">订单</span>
    </md-toolbar>
    <div
      style="width: 100%;height: 180px;background-color: white;display: flex;justify-content: center;align-items: center">
      <div>
        <h2>下单成功！</h2>
        <router-link :to="{name:'homeLink'}" style="margin-left: 18px">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderSuccess",
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>

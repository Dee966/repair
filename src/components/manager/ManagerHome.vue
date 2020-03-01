<template>
    <div id="manager_home" style="margin: 0px 10%;padding: 0px 8%">
      <h1>手机闪修——后台管理系统</h1>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"><router-link  :to="{name:'maHomesLink'}">首页</router-link></el-menu-item>
        <el-menu-item index="2" ><router-link :to="{name:'maPhoneLink'}">机型上传</router-link></el-menu-item>
        <el-menu-item index="3"><router-link :to="{name:'maOrderLink'}">维修订单管理</router-link></el-menu-item>
        <el-menu-item index="4"><router-link :to="{name:'maReOrderLink'}">回收订单管理</router-link></el-menu-item>
        <el-menu-item index="5"><router-link :to="{name:'maBannerLink'}">轮播图管理</router-link></el-menu-item>
      </el-menu>
      <router-view/>
    </div>
</template>

<script>
    export default {
        name: "ManagerHome",
      data(){
          return{
            activeIndex:'1',
          }
      },
      components:{
      },
      methods:{

      },
      mounted() {
        this.$router.push({path:'/maHome/home'})
      }
    }
</script>

<style scoped>

</style>

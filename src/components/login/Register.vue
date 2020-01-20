<template>
    <div id="register">
      <md-card-header>
        <div class="md-title" style="display: flex;justify-content: center;color: #58595b"><h2>注册</h2></div>
      </md-card-header>

      <div style="width: 100%;height:100px;display: flex;justify-content: center">
        <img src="/static/img/repair.jfif" width="100px" height="100px">
      </div>

      <md-field style="width: 90%;margin-left: 5%">
        <label>用户名</label>
        <md-input v-model="username"></md-input>
      </md-field>

      <md-field style="width: 90%;margin-left: 5%">
        <label>密码</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <div style="width: 100%;display: flex;justify-content: center;margin-top: 50px">
        <el-button type="info" round @click="register()">注册</el-button>
        <el-button round><router-link :to="{name:'loginLink'}" style="color: #58595b">返回登录</router-link></el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "register",
      data(){
          return{
            username:'',
            password:''
          }
      },
      methods:{
        register(){
          let loginVo = {
            username:this.username,
            password:this.password
          }
          this.$axios.post('/serverName/login/user_register',loginVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            } else {
              let userId = res.data.data
              alert('注册成功，请填写个人信息...')
              this.$router.push({path:'/info/'+userId})
            }
          }).catch(err =>{
            alert("系统错误")
          })
        }
      }
    }
</script>

<style scoped>

</style>

<template>
    <div id="login">
      <md-card-header>
        <div class="md-title" style="display: flex;justify-content: center;color: #58595b"><h2>登录</h2></div>
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
        <el-button type="info" round @click="login()">登录</el-button>
        <el-button round><router-link :to="{name:'registerLink'}" style="color: #58595b">注册</router-link></el-button>
      </div>

    </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login(){
        let loginVo = {
          username:this.username,
          password:this.password
        }
        this.$axios.post('/serverName/login/user_login',loginVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userId', res.data.data.userId)
            this.$router.push('/home')
          }
        }).catch(err =>{
          alert("系统错误")
        })
      },
      autoLogin(){
        let token = localStorage.getItem('token')
        this.$axios({
          method:'post',
          url:'/serverName/login/auto_login',
          headers:{
            'Authorization':token
          }
        }).then(res =>{
          if (res.data.code === 0){
            alert('已自动登录')
            this.$router.push('/home')
          }
          console.log(res.data.msg)
        }).catch(err =>{

        })
      }
    },
    mounted() {
      this.autoLogin()
    }
  }
</script>

<style scoped>

</style>

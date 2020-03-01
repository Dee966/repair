<template>
    <div id="manager_login">
      <div class="login_body">
        <div style="width: 40%;border-radius: 10px;border:solid #c1c3c7 1px ;padding: 100px;text-align: center;margin-top: 80px">
          <h1>管理员登录</h1>
          <img :src=img width="120px" height="120px">
          <md-field>
            <label>用户名</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <md-field>
            <label>密码</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <br>
          <el-button round style="width: 100%" @click="maLogin()">登录</el-button>
        </div>


      </div>
    </div>
</template>

<script>
    export default {
        name: "ManagerLogin",
      data(){
          return{
            username:'',
            password:'',
            img:'./static/img/repair.png'
          }
      },
      methods:{
        maLogin(){
          let loginVo = {
            username:this.username,
            password:this.password
          }
          this.$axios.post('http://localhost:8080/login/manager_login',loginVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            }else {
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('managerId', res.data.data.userId)
              this.$router.push({path:'/maHome'})
            }
          }).catch(err =>{
            alert('系统错误，联系我们--手机/微信：15102064905')
          })
        }
      }
    }
</script>

<style scoped>
.login_body{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>

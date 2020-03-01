<template>
    <div id="my">
      <md-toolbar class="md-primary" style="display: flex;justify-content: center">
        <span class="md-title">我的</span>
      </md-toolbar>
      <div style="margin: 10px">
        <img :src=img width="80" height="80">
        <span style="margin-left: 15px;font-size: 15px"><strong>{{user.name}}</strong></span>
        <span style="float: right;margin: 10px;color: #909399"><em>余额：{{user.balance}}</em></span>
      </div>

      <md-toolbar style="margin-bottom: 1px" md-elevation="0">
        <h3 class="md-title">关于我们</h3>
      </md-toolbar>
      <div @click="quitLogin()">
        <md-toolbar md-elevation="0">
          <h3 class="md-title">退出登录</h3>
        </md-toolbar>
      </div>
      <br>
      <md-field>
        <label>姓名</label>
        <md-input v-model="realName"></md-input>
      </md-field>
      <md-field>
        <label>手机号码</label>
        <md-input v-model="telephone"></md-input>
      </md-field>
      <md-field style="margin-bottom: 15px">
        <label>微信</label>
        <md-input v-model="wechat"></md-input>
      </md-field>
      <md-button class="md-raised" style="float: right" @click="updateInfo()">更改信息</md-button>

    </div>
</template>

<script>
    export default {
        name: "My",
      data(){
          return{
            realName:'',
            telephone:'',
            wechat:'',
            user:{},
            img:'./static/img/repair.png'
          }
      },
      methods:{
        getUser(){
          let userId = localStorage.getItem('userId')
          let token = localStorage.getItem('token')
          this.$axios({
            method: 'get',
            'url':'http://'+localStorage.getItem('ipAddress')+':8080/user/info/'+1,
            headers:{
              'Authorization':token
            }
          }).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              if (res.data.msg === '未登录，请先进行登录'){
                this.$router.push({path:'/login'})
              }
            } else {
              console.log(res.data.data)
              this.user = res.data.data
              this.realName = this.user.name
              this.telephone = this.user.telephone
              this.wechat = this.user.wechat
            }
          }).catch(err =>{
            alert(err.msg)
          })
        },
        updateInfo(){
          let userId = localStorage.getItem('userId')
          let userVo = {
            name:this.realName,
            telephone:this.telephone,
            wechat:this.wechat
          }
          this.$axios.put('http://'+localStorage.getItem('ipAddress')+':8080/user/info/'+userId,userVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            } else {
              this.$router.go(0);
            }
          })
        },
        quitLogin(){
          localStorage.setItem('token','')
          localStorage.setItem('userId',0)
          this.$router.push('/login')
        }
      },
      mounted() {
        this.getUser()
        console.log(localStorage.getItem('token'))
      }

    }
</script>

<style scoped>

</style>

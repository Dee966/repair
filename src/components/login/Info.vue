<template>
    <div id="info">
      <md-toolbar class="md-primary" style="display: flex;justify-content: center">
        <span class="md-title">完善个人信息</span>
      </md-toolbar>
      <md-card-header>
        <div class="md-title"></div>
      </md-card-header>
      <md-field style="width: 90%;margin-left: 5%">
        <label>姓名</label>
        <md-input v-model="name"></md-input>
      </md-field>
      <md-field style="width: 90%;margin-left: 5%">
        <label>手机号码</label>
        <md-input v-model="telephone"></md-input>
      </md-field>
      <md-field style="width: 90%;margin-left: 5%">
        <label>微信</label>
        <md-input v-model="wechat"></md-input>
      </md-field>
      <br>
      <el-button type="primary" style="float: right" round @click="submitInfo()">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "Info",
      data(){
          return {
            userId: 0,
            name: '',
            telephone: '',
            wechat: ''
          }
      },
      methods:{
        submitInfo(){
          let info = {
            name:this.name,
            telephone:this.telephone,
            wechat:this.wechat
          }
          this.$axios.put('/serverName/user/info/'+this.userId,info).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            }else {
              console.log(res.data.data)
              alert("完善成功！")
              this.$router.push({path:'/login'})
            }
          }).catch(err =>{
            alert("系统错误")
          })
        }
      },
      mounted() {
          this.userId = this.$route.params.id
      }
    }
</script>

<style scoped>

</style>

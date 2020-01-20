<template>
  <div id="phone">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center;position: fixed;top: 0">
      <span class="md-title">故障选择</span>
    </md-toolbar>
    <div style="width: 100%;height: 100px;margin-top: 60px;border-bottom: solid #c1c3c7 1px" >
      <img :src=phone.img width="70px" height="70px" >
      <span style="margin-top: 20px"><span style="font-size: 18px;"><strong>{{phone.model}}</strong></span></span>
    </div>
    <div class="md-layout md-gutter" style="margin-top: 3px;padding-left: 15px;border-bottom: solid #c1c3c7 1px">
      <div class="md-layout-item"><span class="md-body-2"><span style="font-size: 10px;color: #c1c3c7">在线下单>></span></span></div>
      <div class="md-layout-item"><span class="md-body-2"><span style="font-size: 10px;color: #c1c3c7">完成支付>></span></span></div>
      <div class="md-layout-item"><span class="md-body-2"><span style="font-size: 10px;color: #c1c3c7">工程师联系>></span></span></div>
      <div class="md-layout-item"><span class="md-body-2"><span style="font-size: 10px;color: #c1c3c7">开始维修>></span></span></div>
    </div>
    <h4 style="padding-left: 10px;margin: 10px 0px">选择颜色</h4>
    <div v-for="(color,i) in phone.colors" :key="i">
      <md-radio v-model="radio1" :value="color.color" style="float: left;padding-left: 12px">{{color.color}}</md-radio>
    </div>
    <br><br><br><br><br><div style="background-color: #fafafa;color:#fafafa;">123</div>
    <div style="border-top: solid #eee 3px" >
      <h4 style="padding-left: 10px;margin: 10px 0px">选择故障</h4>
      <div v-for="(hitch,i) in phone.hitches" :key="i">
        <md-radio v-model="radio2" :value='hitch.hitch' style="padding-left: 15px">{{JSON.parse(hitch.hitch).hitch}}</md-radio>
      </div>
    </div>
    <input type="hidden" id="price" value="">
<!--    <button @click="check">check</button>-->
    <div style="position: fixed;width:100%;height: 50px;bottom: 0;border-top: solid #c1c3c7 1px">
      <el-row>
        <el-col :span="16"><div class="grid-content bg-purple">
          <span style="font-size: 22px;color: #ff5000;" v-if="radio2 != null">￥ {{JSON.parse(radio2).price}}</span>
        </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light confirm" @click="submitOrder()">
            <span style="margin-top: 12px;">确认</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Phone",
    data() {
      return {
        phone:[],
        radio1:false,
        radio2:null,
        // price:JSON.parse(this.radio2),
        total:''
      }
    },
    methods:{
      getPhoneById(id){
        this.$axios.get('/serverName/phone/phone/'+id).then(res =>{
          let str = {name:"xiaoman",age:18}
          this.phone = res.data.data
          console.log(this.phone)
        }).catch(err =>{
          alert("请求失败！")
        })
      },
      submitOrder(){
        let hitchInfo = {
          phoneId:this.phone.phoneId,
          img:this.phone.img,
          model:this.phone.model,
          color:this.radio1,
          hitch:JSON.parse(this.radio2).hitch,
          total:JSON.parse(this.radio2).price
        }
        console.log(hitchInfo)
        localStorage.setItem('hitchInfo',JSON.stringify(hitchInfo))
        this.$router.push('/confirm')
      }
    },
    mounted() {
      this.getPhoneById(this.$route.params.id);
    }
  }
</script>

<style scoped>
  .confirm{
    display:flex;
    justify-content:center;
    font-size: 18px;
    color: white;
    height:50px;
    background-color: #448aff;
  }
</style>

<template>
    <div id="order_info">
      <md-toolbar class="md-primary" style="display: flex;justify-content: center;">
        <span class="md-title">确认订单</span>
      </md-toolbar>
      <div style="margin-top: 2px;">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="上门维修" name="come">

            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
              <el-form-item label="详细地址" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.address"></el-input>
              </el-form-item>
              <el-form-item label="联系人" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.telephone"></el-input>
              </el-form-item>
              <el-form-item label="买家备注" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.marks"></el-input>
              </el-form-item>
            </el-form>
            <div style="width: 100%;height: 120px;margin-top: 45px;border-bottom: solid #c1c3c7 1px;border-top: solid #c1c3c7 1px" >
              <img :src=orderInfo.img width="70px" height="70px" >
              <span style="margin-top: 20px;width: 100%;height: 60px">
                <span style="font-size: 15px;"><strong>{{orderInfo.model}}</strong></span>
                <span style="font-size: 15px;"><strong>颜色： {{orderInfo.color}}</strong></span>
              </span>
              <div style="padding-left: 10px;padding-top: 10px">{{orderInfo.model}} &nbsp;{{orderInfo.hitch}}</div>
            </div>


          </el-tab-pane>
          <el-tab-pane label="邮寄维修" name="send">
            <md-card style="background-color: #ffb4a824">
              <md-card-header>
                <div class="md-title">邮寄地址</div>
              </md-card-header>

              <md-card-content>
                邮寄地址：广东技术师范大学天河学院19a601 <br>
                联系电话：15102064905
              </md-card-content>
            </md-card>
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="margin-top: 15px">
              <el-form-item label="回寄人" style="margin-bottom: 5px;">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="回寄电话" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.telephone"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.address"></el-input>
              </el-form-item>
              <el-form-item label="买家备注" style="margin-bottom: 5px">
                <el-input v-model="sizeForm.marks"></el-input>
              </el-form-item>
            </el-form>
            <div style="width: 100%;height: 120px;margin-top: 45px;border-bottom: solid #c1c3c7 1px;border-top: solid #c1c3c7 1px" >
              <img :src=orderInfo.img width="70px" height="70px" >
              <span style="margin-top: 20px;width: 100%;height: 60px">
                <span style="font-size: 15px;"><strong>{{orderInfo.model}}</strong></span>
                <span style="font-size: 15px;"><strong>颜色： {{orderInfo.color}}</strong></span>
              </span>
              <div style="padding-left: 10px;padding-top: 10px">{{orderInfo.model}} &nbsp;{{orderInfo.hitch}}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="position: fixed;width:100%;height: 50px;bottom: 0;border-top: solid #c1c3c7 1px">
          <el-row>
            <el-col :span="16"><div class="grid-content bg-purple">
              <span style="font-size: 10px;color: #c1c3c7">预计支付：</span><br>
              <span style="font-size: 18px;color: #ff5000">￥ {{orderInfo.total}}</span>
            </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light confirm" @click="confirmOrder()">
                <span style="margin-top: 14px;">提交订单</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: "OrderInfo",
    data() {
      return {
        orderInfo:{},
        activeName:'come',
        sizeForm:{
          address:'',
          name:'',
          telephone:'',
          marks:''
        }
      }
    },
    methods:{
      confirmOrder(){
        let token = localStorage.getItem('token');
        // let token = '';
        if (this.activeName === 'come'){
          this.activeName = '上门维修'
        }
        if (this.activeName === 'send'){
          this.activeName = '邮寄维修'
        }
        let orderVo = {
          address: this.sizeForm.address,
          color: this.orderInfo.color,
          hitch: this.orderInfo.hitch,
          mode: this.activeName,
          model: this.orderInfo.model,
          name: this.sizeForm.name,
          phoneId: this.orderInfo.phoneId,
          remarks: this.sizeForm.marks,
          telephone: this.sizeForm.telephone,
          total: this.orderInfo.total,
          userId: localStorage.getItem('userId')
        }
        this.$axios({
          method: 'post',
          url:'/serverName/order/insert',
          data:orderVo,
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
            let payOrder = res.data.data
            localStorage.setItem('payOrder',JSON.stringify(payOrder))
            alert("订单提交成功，请支付...")
            console.log(payOrder)
            this.$router.push({path:'/pay'})
          }
        }).catch(err =>{
            alert("系统错误")
        })
        console.log(orderVo)
      }
    },
    mounted() {
      this.orderInfo = JSON.parse(localStorage.getItem('hitchInfo'))
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
    background-color: #ff5000;
  }
</style>

<template>
    <div id="order">
      <md-toolbar class="md-primary" style="display: flex;justify-content: center;position: fixed;top: 0">
        <span class="md-title">订单</span>
      </md-toolbar>
      <md-tabs style="margin: 55px 0px">
        <md-tab id="tab-all" md-label="全部">
          <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in allOrder" :key="key">
            <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
              <span>订单号：{{order.orderId}}</span>
              <!--              <span style="float: right">{{order.state}}</span>-->
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple" >
                    <img :src="order.img" style="width: 80px;height: 80px">
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <span>{{order.model}}</span>
                    <div>颜色：{{order.color}}</div>
                    <div>故障：{{order.hitch}}</div>
                    <div style="color: red">￥ {{order.total}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </md-tab>
        <md-tab id="tab-pay" md-label="待支付" @click="stateOrder(0)">
          <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
            <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px" v-if="order.state == 0">
              <span>订单号：{{order.orderId}}</span>
              <span style="float: right;color: red" @click="quickPay(order)">待支付</span>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple" >
                    <img :src="order.img" style="width: 80px;height: 80px">
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <span>{{order.model}}</span>
                    <div>颜色：{{order.color}}</div>
                    <div>故障：{{order.hitch}}</div>
                    <div style="color: red">￥ {{order.total}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </md-tab>
        <md-tab id="tab-get" md-label="待维修" @click="stateOrder(1)">
          <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
            <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px" v-if="order.state == 1">
              <span>订单号：{{order.orderId}}</span>
              <span style="float: right">待维修</span>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple" >
                    <img :src="order.img" style="width: 80px;height: 80px">
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <span>{{order.model}}</span>
                    <div>颜色：{{order.color}}</div>
                    <div>故障：{{order.hitch}}</div>
                    <div style="color: red">￥ {{order.total}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </md-tab>
        <md-tab id="tab-repair" md-label="维修中" @click="stateOrder(2)">
          <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
            <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px" v-if="order.state == 2">
              <span>订单号：{{order.orderId}}</span>
              <span style="float: right">维修中</span>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple" >
                    <img :src="order.img" style="width: 80px;height: 80px">
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <span>{{order.model}}</span>
                    <div>颜色：{{order.color}}</div>
                    <div>故障：{{order.hitch}}</div>
                    <div style="color: red">￥ {{order.total}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </md-tab>
        <md-tab id="tab-send" md-label="待收货" @click="stateOrder(3)">
          <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
            <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px" v-if="order.state == 3">
              <span>订单号：{{order.orderId}}</span>
              <span style="float: right;color: #448aff" @click="confirmGot(3,order.orderId)">确认收货</span>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple" >
                    <img :src="order.img" style="width: 80px;height: 80px">
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <span>{{order.model}}</span>
                    <div>颜色：{{order.color}}</div>
                    <div>故障：{{order.hitch}}</div>
                    <div style="color: red">￥ {{order.total}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </md-tab>
      </md-tabs>
    </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        allOrder: [],
        stateOrders:[]
      }
    },
    methods: {
      listOrder(){
        let userId = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        this.$axios({
          method:'get',
          url:'/serverName/order/'+userId,
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
            this.allOrder = res.data.data
          }
        }).catch(err=>{
          alert("系统错误")
        })
      },
      stateOrder(state){
        let userId = localStorage.getItem('userId')
        this.$axios.get('/serverName/order/state?state='+state+'&userId='+userId).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            this.stateOrders = res.data.data
            console.log(this.stateOrders)
          }
        })
      },
      quickPay(order){
        localStorage.setItem('orderPay', JSON.stringify(order))
        this.$router.push({path:'/pays'})
      },
      confirmGot(state,orderId){
        let stateVo = {orderId:orderId,state:state}
        console.log(stateVo)
        this.$axios.put('/serverName/order/state',stateVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            alert("已确认收货")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误")
        })
      }
    },
    mounted() {
      this.listOrder();
    }
  }
</script>

<style scoped>

</style>

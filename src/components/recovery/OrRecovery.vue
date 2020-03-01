<template>
  <div id="or_recovery">
    <md-toolbar class="md-primary" style="display: flex;justify-content:center;position: fixed;top: 0">
      <span class="md-title">回收订单</span>
    </md-toolbar>

    <md-tabs style="margin: 55px 0px">
      <md-tab id="tab-all" md-label="全部">
        <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in allOrder" :key="key">
          <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
            <span>订单号：{{order.recoveryOrderId}}</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 0">状态：待收机</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 1">状态：待验收</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 2">状态：待收款</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 3">状态：已收款</span>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <img :src="order.img" style="width: 80px;height: 80px">
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <div style="color: red;font-size: 16px;margin-top: 60px;float: right;padding-right: 10px">出手价格￥ {{order.total}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-get" md-label="待收机" @click="stateOrder(0)">
        <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
          <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
            <span>订单号：{{order.recoveryOrderId}}</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 0">状态：待收机</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 1">状态：待验收</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 2">状态：待收款</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 3">状态：已收款</span>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <img :src="order.img" style="width: 80px;height: 80px">
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <div style="color: red;font-size: 16px;margin-top: 60px;float: right;padding-right: 10px">出手价格￥ {{order.total}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-check" md-label="待验收" @click="stateOrder(1)">
        <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
          <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
            <span>订单号：{{order.recoveryOrderId}}</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 0">状态：待收机</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 1">状态：待验收</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 2">状态：待收款</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 3">状态：已收款</span>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <img :src="order.img" style="width: 80px;height: 80px">
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <div style="color: red;font-size: 16px;margin-top: 60px;float: right;padding-right: 10px">出手价格￥ {{order.total}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-collect" md-label="待收款" @click="stateOrder(2)">
        <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
          <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
            <span>订单号：{{order.recoveryOrderId}}</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 0">状态：待收机</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 1">状态：待验收</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 2">状态：待收款</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 3">状态：已收款</span>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <img :src="order.img" style="width: 80px;height: 80px">
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <div style="color: red;font-size: 16px;margin-top: 60px;float: right;padding-right: 10px">出手价格￥ {{order.total}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-pay" md-label="已收款" @click="stateOrder(3)">
        <div style="width: 100%;height: 120px;background-color: #f5f5f5"  v-for="(order, key) in stateOrders" :key="key">
          <div style="padding-bottom: 10px;border-bottom: solid #c1c3c7 1px">
            <span>订单号：{{order.recoveryOrderId}}</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 0">状态：待收机</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 1">状态：待验收</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 2">状态：待收款</span>
            <span style="float: right;margin-right: 10px" v-if="order.state === 3">状态：已收款</span>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <img :src="order.img" style="width: 80px;height: 80px">
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <div style="color: red;font-size: 16px;margin-top: 60px;float: right;padding-right: 10px">出手价格￥ {{order.total}}</div>
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
    name: "OrRecovery",
    data() {
      return {
        allOrder: [],
        stateOrders:[]
      }
    },
    methods: {
      listOrder(){
        let userId = localStorage.getItem('userId')
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/recovery/listOrder/'+userId).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg);
          } else {
            this.allOrder = res.data.data
            console.log(this.stateOrders)
          }
        })
      },
      stateOrder(state){
          let userId = localStorage.getItem('userId')
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/recovery/listStateOrder?userId='+userId+'&state='+state).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
            this.stateOrders = {}
          } else {
            this.stateOrders = res.data.data
            console.log(this.stateOrders)
          }
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

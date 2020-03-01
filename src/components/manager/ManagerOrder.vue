<template>
  <div id="manager_order">
    <div v-for="(order,i) in orders" :key="i">
      <md-card>
        <md-card-header style="padding-bottom: 0px">
          <md-card-header-text>
            <div class="md-title">{{order.model}}</div>
            <span class="md-subhead">订单号：{{order.orderId}}</span>&nbsp;&nbsp;&nbsp;
            <span class="md-subhead" v-if="order.state === 0">状态：待支付</span>
            <span class="md-subhead" v-if="order.state === 1">状态：待维修</span>
            <span class="md-subhead" v-if="order.state === 2">状态：维修中</span>
            <span class="md-subhead" v-if="order.state === 3">状态：已发货</span>
            <span class="md-subhead" v-if="order.state === 4">状态：已收货</span><br>
            <span class="md-subhead">颜色：{{order.color}}</span>&nbsp;&nbsp;&nbsp;
            <span  class="md-subhead">故障：{{order.hitch}}</span>
            <div class="md-subhead">地址：{{order.address}}</div>
            <div class="md-subhead">维修方式：{{order.mode}}</div>
            <div class="md-subhead">卖家备注：{{order.remarks}}</div>
            <div class="md-subhead">状态码：{{order.state}}</div>
          </md-card-header-text>

          <md-card-media>
            <img :src=order.img>
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button></md-button>
          <md-button class="md-accent" v-if="order.state === 1" @click="stateUpdate(order.state,order.orderId)">维修中</md-button>
          <md-button class="md-accent" v-if="order.state === 2" @click="stateUpdate(order.state,order.orderId)">已发货</md-button>
        </md-card-actions>
      </md-card>
    </div>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="this.pageSize"
            layout="total, prev, pager, next"
            :total="this.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "ManagerOrder",
    data(){
      return{
        orders:[],
        isFirstPage:true,
        isLastPage:false,
        hasNextPage:true,
        pageNum:0,
        pages:0,
        pageSize:0,
        total:0
      }
    },
    methods:{
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getAllOrder(`${val}`)
      },
      getFirstAllOrder(){
        let num = '1'
        this.$axios.get('http://localhost:8080/order/all?num='+num).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          }else {
            this.orders = res.data.data.list
            for (let i = 0;i < this.orders.length;i++){
              this.orders[i].img = this.orders[i].img.substr(1);
              console.log(this.orders[i].img.substr(1))
            }
            this.pageNum = res.data.data.pageNum
            this.pages = res.data.data.pages
            this.pageSize = res.data.data.size
            this.total = res.data.data.total
            console.log(this.orders)
          }
        }).catch(err =>{
          alert('系统错误，联系我们--手机/微信：15102064905')
        })
      },
      getAllOrder(page) {
        this.$axios.get('http://localhost:8080/order/all?num=' + page).then(res => {
          if (res.data.code !== 0) {
            alert(res.data.msg)
          } else {
            this.orders = res.data.data.list
          }
        }).catch(err => {
          alert('系统错误，联系我们--手机/微信：15102064905')
        })
      },
      stateUpdate(state,orderId){
        let stateVo = {orderId:orderId,state:state}
        console.log(stateVo)
        this.$axios.put('http://localhost:8080/order/state',stateVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            alert("已修改状态")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误")
        })
      }
    },
    mounted() {
      this.getFirstAllOrder()
    }
  }
</script>

<style scoped>

</style>

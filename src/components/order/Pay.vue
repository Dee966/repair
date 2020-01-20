<template>
  <div id="pay">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center;">
      <span class="md-title">支付</span>
    </md-toolbar>
    <md-card>
      <md-card-header>
        <div class="md-title" style="color: #ff5000">待支付：{{payOrder.total}}</div>
        <div class="md-subhead">订单信息：</div>
      </md-card-header>

      <md-card-content>
        <div>联系人：{{payOrder.name}}</div>
        <div>联系电话：{{payOrder.telephone}}</div>
        <div>地址：{{payOrder.address}}</div>
        <div>机型：{{payOrder.model}}</div>
        <div>颜色：{{payOrder.color}}</div>
        <div>故障：{{payOrder.hitch}}</div>
        <div>备注信息：{{payOrder.remarks}}</div>
        <div>维修模式：{{payOrder.mode}}</div>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-accent" @click="pay()">支付</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: "Pay",
    data(){
      return{
        payOrder:{}
      }
    },
    methods:{
      pay(){
        let payVo = {
          orderId:this.payOrder.orderId,
          total:this.payOrder.total,
          userId:this.payOrder.userId
        }
        this.$axios.put('/serverName/order/pay',payVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            alert("支付成功！")
            this.$router.push({path:'/order'})
          }
        }).catch(err =>{
          alert("系统错误")
        })
      }
    },
    mounted() {
      this.payOrder = JSON.parse(localStorage.getItem('payOrder'))
      console.log(this.payOrder)
    }
  }
</script>

<style scoped>

</style>

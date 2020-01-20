<template>
    <div id="pays">
      <md-toolbar class="md-primary" style="display: flex;justify-content: center;">
        <span class="md-title">支付</span>
      </md-toolbar>
      <md-card>
        <md-card-header>
          <div class="md-title" style="color: #ff5000">待支付：{{orderPay.total}}</div>
          <div class="md-subhead">订单信息：</div>
        </md-card-header>

        <md-card-content>
          <div>联系人：{{orderPay.name}}</div>
          <div>联系电话：{{orderPay.telephone}}</div>
          <div>地址：{{orderPay.address}}</div>
          <div>机型：{{orderPay.model}}</div>
          <div>颜色：{{orderPay.color}}</div>
          <div>故障：{{orderPay.hitch}}</div>
          <div>备注信息：{{orderPay.remarks}}</div>
          <div>维修模式：{{orderPay.mode}}</div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent" @click="pays()">支付</md-button>
        </md-card-actions>
      </md-card>
    </div>
</template>

<script>
  export default {
    name: "Pays",
    data() {
      return {
        orderPay: {}
      }
    },
    methods: {
      pays() {
        let payVo = {
          orderId:this.orderPay.orderId,
          total:this.orderPay.total,
          userId:this.orderPay.userId
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
      this.orderPay = JSON.parse(localStorage.getItem('orderPay'))
    }
  }
</script>

<style scoped>

</style>

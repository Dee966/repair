<template>
  <div id="recovery_order">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center">
      <span class="md-title">估价并下单</span>
    </md-toolbar>
    <div style="margin: 15px 0px;width: 100%;height: 20%;background-color: white">
      <div style="padding: 10px;color: #909399">预计可得（元）</div>
      <span style="float: right"><el-button type="success" size="small" plain round @click="goBack()">重新估价</el-button></span>
      <div style="padding: 15px 10px;font-size: 34px;color: red"><strong>{{orderInfo.total}}</strong></div>
    </div>

    <div style="margin-top: 2px;">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="上门回收" name="come">
          <div style="color: #c1c3c7;margin-bottom: 10px;padding-left: 10px">(用于快递小哥联系您)</div>
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
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <br>
    <div style="width: 100%;display: flex;justify-content: flex-end;margin-bottom: 60px">
      <el-button type="success" round @click="recoveryOrder()">下单</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecoveryOrder",
    data() {
      return {
        orderInfo: {},
        activeName: 'come',
        sizeForm: {
          address: '',
          name: '',
          telephone: '',
        },
        order:{}
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);//返回上一层
      },
      recoveryOrder(){
        let recoveryOrder = {
          account: this.orderInfo.account,
          address: this.sizeForm.address,
          edition: this.orderInfo.edition,
          memory: this.orderInfo.memory,
          model: this.orderInfo.model,
          name: this.sizeForm.name,
          other: this.orderInfo.other,
          phoneAppearance: this.orderInfo.phoneAppearance,
          phoneId: this.orderInfo.phoneId,
          recoverOrderId: 0,
          repair: this.orderInfo.repair,
          screenAppearance: this.orderInfo.screenAppearance,
          state: 0,
          telephone: this.sizeForm.telephone,
          total: this.orderInfo.total,
          userId: localStorage.getItem('userId')
        }
        console.log(recoveryOrder)
        this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8080/recovery/recoveryOrder',recoveryOrder).then(res => {
          if (res.data.code !== 0){
            alert(res.data.msg)
          }
          this.order = res.data.data
          this.$router.push('/orderSuccess')
        }).catch(err => {
          alert("下单失败！")
        })
      }
    },
    mounted() {
      this.orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
    }
  }
</script>

<style scoped>

</style>

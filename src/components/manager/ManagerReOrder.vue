<template>
  <div id="manager_re_order">
    <div v-for="(order,i) in allOrders" :key="i">
      <md-card>
        <md-card-header style="padding-bottom: 0px">
          <md-card-header-text>
            <div class="md-title">{{order.model}}</div>
            <span class="md-subhead">订单号：{{order.recoveryOrderId}}</span>&nbsp;&nbsp;&nbsp;
            <span class="md-subhead" v-if="order.state == 0">状态：待收机</span>
            <span class="md-subhead" v-if="order.state == 1">状态：待验收</span>
            <span class="md-subhead" v-if="order.state == 2">状态：待收款</span>
            <span class="md-subhead" v-if="order.state == 3">状态：已收款</span>
            <div class="md-subhead">
              机况：{{order.edition}} / {{order.memory}} / {{order.screenAppearance}} / {{order.phoneAppearance}}
              / {{order.repair}} / {{order.account}} / {{order.other}}
            </div>
            <div class="md-subhead">回收价：{{order.total}}</div>
            <br>
            <div class="md-subhead">联系人：{{order.name}}</div>
            <div class="md-subhead">联系电话：{{order.telephone}}</div>
            <div class="md-subhead">地址：{{order.address}}</div>
          </md-card-header-text>

          <md-card-media>
            <img :src=order.img>
          </md-card-media>
        </md-card-header>
        <br>

        <md-card-actions>
          <md-button></md-button>
          <md-button class="md-accent" v-if="order.state === 0" @click="stateUpdate(order.state,order.recoveryOrderId)">已收机
          </md-button>
          <md-button class="md-accent" v-if="order.state === 1" @click="stateUpdate(order.state,order.recoveryOrderId)">已验机
          </md-button>
          <md-button class="md-accent" v-if="order.state === 2" @click="dialogVisible = true,openTran(order.state,order.recoveryOrderId,order.userId)">转账
          </md-button>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <h3>&nbsp;向用户支付回收费用</h3>
      <el-input v-model="money"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false,moneyTransfer()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ManagerReOrder",
    data() {
      return {
        allOrders: [],
        pageNum:0,
        pages:0,
        pageSize:0,
        total:0,
        dialogVisible:false,
        money:0,
        state:0,
        orderId:0,
        userId:0
      }
    },
    methods: {
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getAllOrder(`${val}`)
      },
      firstGetAllOrder() {
        let page = '1'
        this.$axios.get('http://localhost:8080/recovery/listAllMaOrder?num='+page).then(res => {
          if (res.data.code !== 0) {
            alert(res.data.msg)
          } else {
            this.allOrders = res.data.data.list
            this.pageNum = res.data.data.pageNum
            this.pages = res.data.data.pages
            this.pageSize = res.data.data.size
            this.total = res.data.data.total
            console.log(this.pageSize)
            console.log(res.data.data)
          }
        }).catch(err => {
          alert('系统错误，联系我们--手机/微信：15102064905')
        })
      },
      getAllOrder(page) {
        this.$axios.get('http://localhost:8080/recovery/listAllMaOrder?num=' + page).then(res => {
          if (res.data.code !== 0) {
            alert(res.data.msg)
          } else {
            this.allOrders = res.data.data.list
          }
        }).catch(err => {
          alert('系统错误，联系我们--手机/微信：15102064905')
        })
      },
      stateUpdate(state, orderId) {
        let stateVo = {
          orderId: orderId,
          state: state
        }
        this.$axios.put('http://localhost:8080/recovery/updateState',stateVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            alert("已修改状态")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误")
        })
      },
      openTran(state,orderId,userId){
        this.state = state
        this.orderId = orderId
        this.userId = userId
      },
      moneyTransfer(){
        let transferVo = {
          state:this.state,
          orderId:this.orderId,
          userId:this.userId,
          money:this.money
        }
        console.log(transferVo)
        this.$axios.post('http://localhost:8080/recovery/transfer',transferVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          } else {
            alert("转账成功")
            this.$router.go(0);
          }
        }).catch(err =>{
          alert("系统错误")
        })
      }
    },
    mounted() {
      this.firstGetAllOrder()
    }
  }
</script>

<style scoped>

</style>

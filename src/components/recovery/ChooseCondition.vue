<template>
  <div id="choose_condition">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center">
      <span class="md-title">选择机况</span>
    </md-toolbar>
    <div style="margin: 20px 0px 10px 0px;background-color: white;height: 60px;display: flex;align-items: center">
      <img :src="phone.img" alt="" style="width: 50px;height: 50px">
      <span style="font-size: 16px"><strong>{{phone.model}}</strong></span>
    </div>

    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>1.版本</strong>
      <div v-for="(condition,i) in conditions" :key="i" v-if='i<4'>
        <div style="width: 100%">
          <md-radio v-model="edition" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>2.内存</strong>
      <div v-for="(condition,i) in conditions.slice(4, 8)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="memory" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>3.屏幕外观</strong>
      <div v-for="(condition,i) in conditions.slice(8, 11)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="screenAppearance" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>4.机身外观</strong>
      <div v-for="(condition,i) in conditions.slice(11, 14)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="phoneAppearance" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>5.维修</strong>
      <div v-for="(condition,i) in conditions.slice(14, 18)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="repair" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 10px 0px;background-color: white;padding : 10px 10px">
      <strong>6.账号</strong>
      <div v-for="(condition,i) in conditions.slice(18, 20)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="account" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0px 5px 0px;background-color: white;padding : 10px 10px">
      <strong>7.其他</strong>
      <div v-for="(condition,i) in conditions.slice(20, 28)" :key="i">
        <div style="width: 100%">
          <md-radio v-model="other" :value="condition" style="padding-left: 12px">
            {{condition.condition}}
          </md-radio>
        </div>
      </div>
    </div>
    <div style="width: 100%;display: flex;justify-content: center;margin-bottom: 60px">
      <el-button type="success" round @click="estimate()">估价并下单</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ChooseCondition",
    data() {
      return {
        edition: false,
        memory: false,
        screenAppearance: false,
        phoneAppearance: false,
        repair: false,
        account: false,
        other: false,
        phone: {},
        phoneId: 0,
        conditions: []
      }
    },
    methods: {
      getPhoneById(id) {
        this.$axios.get('http://' + localStorage.getItem('ipAddress') + ':8080/phone/phone/' + id).then(res => {
          this.phone = res.data.data
          this.phone.img = this.phone.img.substr(1);
          console.log(this.phone)
        }).catch(err => {
          alert("请求失败！")
        })
      },
      getConditionById(id) {
        this.phoneId = id
        this.$axios.get('http://' + localStorage.getItem('ipAddress') + ':8080/recovery/listCondition/' + id).then(res => {
          console.log(res.data.data)
          this.conditions = res.data.data
        }).catch(err => {
          alert("请求失败！")
        })
      },
      estimate(){
        let estimateVo = {
          phoneId:this.$route.params.id,
          prices:[
            this.edition.price,
            this.memory.price,
            this.screenAppearance.price,
            this.phoneAppearance.price,
            this.repair.price,
            this.account.price,
            this.other.price
          ]
        }
        let orderInfo = {
          edition:this.edition.condition,
          memory:this.memory.condition,
          screenAppearance:this.screenAppearance.condition,
          phoneAppearance:this.phoneAppearance.condition,
          repair:this.repair.condition,
          account:this.account.condition,
          other:this.other.condition,
          phoneId:this.$route.params.id,
          model:this.phone.model,
          total:0
        }
        let token = localStorage.getItem('token')
        this.$axios({
          method:'post',
          url:'http://' + localStorage.getItem('ipAddress') + ':8080/recovery/estimate/',
          data:estimateVo,
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
            if (res.data.code !== 0){
              alert("估价失败");
              return;
            }
            orderInfo.total = res.data.data
            console.log(JSON.stringify(orderInfo))
            localStorage.setItem('orderInfo',JSON.stringify(orderInfo))
            this.$router.push('/recoveryOrder')
          }
        }).catch(err=>{
          alert("系统错误")
        })
      }
    },
    mounted() {
      this.getPhoneById(this.$route.params.id);
      this.getConditionById(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>

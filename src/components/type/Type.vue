<template>
  <div id="type">
    <md-toolbar class="md-primary" style="display: flex;justify-content: center">
      <span class="md-title">机型选择</span>
    </md-toolbar>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="苹果" name="apple" to="/type/1">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="华为" name="huawei">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="小米" name="mi" to="/type/4">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三星" name="samsung" to="/type/5">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="oppo" name="oppo" to="/type/6">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="vivo" name="vivo" to="/type/7">
        <div v-for="(phone,i) in phones" :key="i">
          <router-link :to="/phone/+phone.phoneId">
            <div style="width: 33.3%;height: 100px;float: left;">
              <img :src=phone.img style="width: 80px;height: 80px;margin-left: 22px"><br>
              <div style="width: 100%;display: flex;justify-content: center">
                <span>{{phone.model}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>

<script>
  export default {
    name: "Type",
    data() {
      return {
        tabPosition:'',
        activeName: 'apple',
        types:[],
        phones:[]
      }
    },
    methods:{
      getType:function(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/phone/type').then(res =>{
          console.log(res.data.data[0])
          this.types = res.data.data
        }).catch(err =>{
          alert("请求失败！")
        })
      },
      getTypePhone:function (id) {
        console.log(id)
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/phone/get_type/'+id).then(res =>{
          console.log(res.data.data)
          this.phones = res.data.data
          for (let i = 0;i < this.phones.length;i++){
            this.phones[i].img = this.phones[i].img.substr(1);
            console.log(this.phones[i].img.substr(1))
          }
        }).catch(err =>{
          alert("请求失败！")
        })
      },
      handleClick:function(activeName){
        if (this.activeName == 'apple'){
          this.getTypePhone(1)
        }
        if (this.activeName == 'huawei'){
          this.getTypePhone(3)
        }
        if (this.activeName == 'mi'){
          this.getTypePhone(4)
        }
        if (this.activeName == 'samsung'){
          this.getTypePhone(5)
        }
        if (this.activeName == 'oppo'){
          this.getTypePhone(6)
        }
        if (this.activeName == 'vivo'){
          this.getTypePhone(7)
        }
      },
      phoneSign:function (id) {
        console.log(id)
        if (id == 3){
          this.activeName = 'huawei'
        }
        if (id == 4){
          this.activeName = 'mi'
        }
        if (id == 5){
          this.activeName = 'samsung'
        }
        if (id == 6){
          this.activeName = 'oppo'
        }
        if (id == 7){
          this.activeName = 'vivo'
        }
      }
    },
    mounted:function () {
      this.getType();
      this.getTypePhone(this.$route.params.id);
      this.phoneSign(this.$route.params.id);
      this.tabPosition = 'life'
    }

  }
</script>

<style scoped>
</style>

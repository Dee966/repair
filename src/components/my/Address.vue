<template>
  <div id="address">

    <md-toolbar class="md-primary" style="display: flex;justify-content: flex-end">
      <span @click="addAddress()">添加地址</span>
    </md-toolbar>
    <div v-for="(address, key) in addressList" :key="key">
      <md-card>
        <md-card-content>
          {{address.address}}
        </md-card-content>
        <md-card-actions>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Address",
    data(){
      return{
        addressList:[]
      }
    },
    methods:{
      addAddress(){

      },
      getAddress(){
        let userId = localStorage.getItem('userId')
        this.$axios.get('http://192.168.10.72:8080/user/address/'+userId).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          }else {
            this.addressList = res.data.data
          }
        }).catch(err =>{
          alert("请求失败")
        })
      }
    },
    mounted() {
      this.getAddress()
    }
  }
</script>

<style scoped>

</style>

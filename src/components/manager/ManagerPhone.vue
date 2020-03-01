<template>
    <div id="manager_phone">
      <md-field>
        <label>机型</label>
        <md-input v-model="model"></md-input>
      </md-field>
      <md-field>
        <label>品牌ID</label>
        <md-input v-model="typeId"></md-input>
      </md-field>
      <div style="display: flex;justify-content: center;">
        <md-field>
          <label>颜色1</label>
          <md-input v-model="color1"></md-input>
        </md-field>
        <md-field>
          <label>颜色2</label>
          <md-input v-model="color2"></md-input>
        </md-field>
        <md-field>
          <label>颜色3</label>
          <md-input v-model="color3"></md-input>
        </md-field>
        <md-field>
          <label>颜色4</label>
          <md-input v-model="color4"></md-input>
        </md-field>
        <md-field>
          <label>颜色5</label>
          <md-input v-model="color5"></md-input>
        </md-field>
        <md-field>
          <label>颜色6</label>
          <md-input v-model="color6"></md-input>
        </md-field>
        <md-field>
          <label>颜色7</label>
          <md-input v-model="color7"></md-input>
        </md-field>
      </div>
      <div style="display: flex;justify-content: center">
        <md-field>
          <label>故障1</label>
          <md-input v-model="hitch1"></md-input>
        </md-field>
        <md-field>
          <label>维修价钱1</label>
          <md-input v-model="price1"></md-input>
        </md-field>
      </div>
      <div style="display: flex;justify-content: center">
        <md-field>
          <label>故障2</label>
          <md-input v-model="hitch2"></md-input>
        </md-field>
        <md-field>
          <label>维修价钱2</label>
          <md-input v-model="price2"></md-input>
        </md-field>
      </div>
      <div style="display: flex;justify-content: center">
        <md-field>
          <label>故障3</label>
          <md-input v-model="hitch3"></md-input>
        </md-field>
        <md-field>
          <label>维修价钱3</label>
          <md-input v-model="price3"></md-input>
        </md-field>
      </div>
      <div style="display: flex;justify-content: center">
        <md-field>
          <label>故障4</label>
          <md-input v-model="hitch4"></md-input>
        </md-field>
        <md-field>
          <label>维修价钱4</label>
          <md-input v-model="price4"></md-input>
        </md-field>
      </div>
      <form id="upload_imge" enctype="multipart/form-data">
        图片上传：<input type="file" id="img" name="img">
      </form>
      <md-button class="md-raised md-primary" style="float: right" @click="uploadPhone()">上传</md-button>
    </div>
</template>

<script>
    export default {
        name: "ManagerPhone",
      data(){
          return{
            model:'',
            typeId:null,
            img:null,
            color1:'', color2:'', color3:'', color4:'', color5:'', color6:'', color7:'',
            hitch1:'',hitch2:'',hitch3:'',hitch4:'',
            price1:'',price2:'',price3:'',price4:'',
          }
      },
      methods:{
          uploadAll(img){
            let colors = [];
            let hitches = []
            if (this.color1 !== ''){
              colors.push({color:this.color1,colorId:0,phoneId:0})
            }
            if (this.color2 !== ''){
              colors.push({color:this.color2,colorId:0,phoneId:0})
            }
            if (this.color3 !== ''){
              colors.push({color:this.color3,colorId:0,phoneId:0})
            }
            if (this.color4 !== ''){
              colors.push({color:this.color4,colorId:0,phoneId:0})
            }
            if (this.color5 !== ''){
              colors.push({color:this.color5,colorId:0,phoneId:0})
            }
            if (this.color6 !== ''){
              colors.push({color:this.color6,colorId:0,phoneId:0})
            }
            if (this.color7 !== ''){
              colors.push({color:this.color7,colorId:0,phoneId:0})
            }
            if (this.hitch1 !== ''){
              hitches.push({hitch:this.hitch1,price:this.price1,hitchId:0,phoneId:0})
            }
            if (this.hitch2 !== ''){
              hitches.push({hitch:this.hitch2,price:this.price2,hitchId:0,phoneId:0})
            }
            if (this.hitch3 !== ''){
              hitches.push({hitch:this.hitch3,price:this.price3,hitchId:0,phoneId:0})
            }
            if (this.hitch4 !== ''){
              hitches.push({hitch:this.hitch4,price:this.price4,hitchId:0,phoneId:0})
            }
            let phoneInfoVo = {
              model:this.model,
              img:img,
              typeId:this.typeId,
              colors:colors,
              hitches:hitches
            }
            console.log(phoneInfoVo)
            this.$axios.post('http://localhost:8080/phone/phone',phoneInfoVo).then(res =>{
              if (res.data.code){
                alert(res.data.msg)
              } else {
                alert('上传成功')
              }
            }).catch(err =>{
              alert('系统错误，联系我们--手机/微信：15102064905')
            })
          },
          uploadPhone(){
            let formData = new FormData($('#upload_imge')[0]);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            this.$axios.post('http://localhost:8080/phone/phone_upload',formData,config).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
              } else {
                this.img = res.data.data
                this.uploadAll(this.img)
              }
            }).catch(err =>{
              alert('系统错误，联系我们--手机/微信：15102064905')
            })
          }
      }
    }
</script>

<style scoped>

</style>

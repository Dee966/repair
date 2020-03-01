<template>
    <div id="manager_banner">
      <span style="color: red">*点击可删除轮播图</span>
      <div v-for="(banner,i) in banners" :key="i">
        <img :src=banner.img style="width: 372px;height: 200px;margin-bottom: 5px" @click="openDelete(banner.bannerId)">
      </div>
      <md-field>
        <label>点击的目标地址</label>
        <md-input v-model="link"></md-input>
      </md-field>
      <form id="upload_img" enctype="multipart/form-data">
        图片上传：<input type="file" id="img" name="img">
      </form>
      <md-button class="md-raised md-primary" style="float: right" @click="uploadBannerImg()">上传</md-button>
    </div>
</template>

<script>
    export default {
        name: "ManagerBanner",
      data(){
          return{
            banners:[],
            link:'',
          }
      },
      methods:{
        openDelete(bannerId){
          console.log(bannerId)
          this.$confirm('确定要删除该轮播图吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.bannerDelete(bannerId)
            this.$router.go(0);
          }).catch(() => {
            console.log("取消")
          });
        },
        bannerDelete(bannerId){
          this.$axios.delete('http://localhost:8080/banner/delete/'+bannerId).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            } else {
              alert("删除成功")
              this.$router.go(0);
            }
          }).catch(err =>{
            alert('系统错误，联系我们--手机/微信：15102064905')
          })
        },
        getBanner:function() {
          this.$axios.get('http://localhost:8080/banner/list').then(res =>{
            this.banners = res.data.data;
            for (let i =0;i < this.banners.length;i++){
              this.banners[i].img = this.banners[i].img.substr(1)
            }
          }).catch(err =>{
            alert("轮播图请求失败！")
          })
          // console.log(this.items)
        },
        uploadBannerImg(){
          let formData = new FormData($('#upload_img')[0]);
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$axios.post('http://localhost:8080/banner/upload',formData,config).then(res =>{
            if (res.data.code){
              alert(res.data.msg)
            } else {
              this.uploadBanner(res.data.data)
            }
          }).catch(err =>{
            alert('系统错误，联系我们--手机/微信：15102064905')
          })
        },
        uploadBanner(img){
          let managerId = localStorage.getItem('managerId')
          let bannerVo = {
            img:img,
            link:this.link,
            managerId:managerId
          }
          console.log(bannerVo)
          this.$axios.post('http://localhost:8080/banner/info',bannerVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            } else {
              alert('上传成功')
              this.$router.go(0);
            }
          }).catch(err =>{
            alert('系统错误，联系我们--手机/微信：15102064905')
          })
        }
      },
      mounted() {
          this.getBanner()
      }
    }
</script>

<style scoped>

</style>

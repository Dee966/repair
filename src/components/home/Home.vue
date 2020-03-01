<template>
  <div id="home">
    <md-toolbar class="md-primary" style="position: fixed;top: 0">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <!--              <md-icon>menu</md-icon>-->
          </md-button>
        </div>

        <md-autocomplete
          class="search"
          v-model="selectedEmployee"
          :md-options="employees"
          md-layout="box">
          <label>搜索您的型号</label>
        </md-autocomplete>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="search()">
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>

    <section class="my-swiper" style="margin-top: 56px">
      <swiper v-if="items.length>1" :options="swiperOption" style="width: 375px;height: 200px">
        <swiper-slide  class="my-swp-silde" v-for="(slide, key) in items" :key="key" data-id="slide.id">
          <router-link :to="slide.link">
            <img class="my-swp-img" :src="slide.img" alt="" style="width: 375px;height: 200px" >
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>

    <div class="md-layout md-gutter" style="margin-top: 3px">
      <div class="md-layout-item"><span class="md-body-2">🚀极速服务</span></div>
      <div class="md-layout-item"><span class="md-body-2">💪专业团队</span></div>
      <div class="md-layout-item"><span class="md-body-2">📷全程录像</span></div>
      <div class="md-layout-item"><span class="md-body-2">🌂全国联保</span></div>
    </div>

    <div style="width: 100%;display: flex;justify-content: center">
      <h2 style="margin-bottom: 0px">选择您的手机品牌</h2>
    </div>
    <br>

    <div v-for="(phone,i) in phones" :key="i">
      <div style="width: 33.3%;height: 100px;float: left;" @click="moveType(phone.typeId)">
        <img :src=phone.logo style="width: 80px;height: 80px;margin-left: 22px">
      </div>
      <!--        <md-content class="md-elevation-2"><img src="/static/img/华为.jfif"></md-content>-->
      <!--        <md-content class="md-elevation-3"><img src="/static/img/小米.jfif"></md-content>-->
      <!--        <md-content class="md-elevation-4"><img src="/static/img/三星.jfif"></md-content>-->
      <!--        <md-content class="md-elevation-5"><img src="/static/img/oppo.jfif"></md-content>-->
      <!--        <md-content class="md-elevation-6"><img src="/static/img/vivo.jfif"></md-content>-->
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: "Home",
    data() {
      return {
        selectedEmployee: '',
        employees: [],
        swiperOption: {
          loop:true,
          autoplay: {
            disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
            delay: 2000, // 自动切换的时间间隔（单位ms）
          },
          speed: 1500,
          initialSlide: 0,
          loop: true,
          pagination: { el: '.swiper-pagination' }, // 分页按钮
          paginationClickable: true,
          onSlideChangeEnd: swiper => {
            //console.log('onSlideChangeEnd', swiper.realIndex)
          }
        },
        items: [],
        phones:[],

      }
    },
    components:{
      swiper, swiperSlide
    },
    methods:{
      search:function(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/phone/search/'+this.selectedEmployee).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg);
          } else {
            this.$router.push('/phone/'+res.data.data.phoneId)
          }
        }).catch(err =>{
          alert("系统错误")
        })
      },
      getBanner:function() {
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/banner/list').then(res =>{
          let banner = res.data.data
          this.items = banner;
        }).catch(err =>{
          alert("轮播图请求失败！")
        })
        // console.log(this.items)
      },
      getType:function(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8080/phone/type').then(res =>{
          this.phones = res.data.data
        }).catch(err =>{
          alert("请求失败！")
        })
      },
      moveType:function (id) {
        this.$router.push('/type/'+id)
      }
    },
    mounted:function () {
      this.getType();
      this.getBanner();
    }
  }
</script>

<style scoped>
  .elevation-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
  }
  .md-content {
    width: 80px;
    height: 80px;
    margin: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>

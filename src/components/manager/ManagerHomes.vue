<template>
    <div id="manager_homes">
      <el-tabs v-model="activeName" @tab-click="getType(activeName)">
        <el-tab-pane label="苹果" name="apple">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>苹果</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red" @click="openDelete(phone.phoneId)">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
        <el-tab-pane label="华为" name="huawei">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
        <el-tab-pane label="小米" name="mi">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
        <el-tab-pane label="三星" name="samsung">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
        <el-tab-pane label="OPPO" name="oppo">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
        <el-tab-pane label="VIVO" name="vivo">
          <md-table>
            <md-table-row>
              <md-table-head md-numeric>ID</md-table-head>
              <md-table-head>机型</md-table-head>
              <md-table-head>图片</md-table-head>
              <md-table-head>品牌</md-table-head>
              <md-table-head>操作</md-table-head>
            </md-table-row>
            <md-table-row v-for="(phone,i) in phones" :key="i">
              <md-table-cell md-numeric>{{phone.phoneId}}</md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><img :src=phone.img width="60px" height="60px"></md-table-cell>
              <md-table-cell>{{phone.model}}</md-table-cell>
              <md-table-cell><span style="cursor:pointer;;color: red">删除</span></md-table-cell>
            </md-table-row>
          </md-table>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
    export default {
      name: "ManagerHomes",
      data() {
        return {
          phones: {},
          activeName: 'apple',
        }
      },
      methods: {
        openDelete(phoneId){
          this.$confirm('确定要删除该商品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.phoneDelete(phoneId)
          }).catch(() => {
            console.log("取消")
          });
        },
        phoneDelete(phoneId){
          this.$axios.delete('http://localhost:8080/phone/phone/'+phoneId).then(res =>{
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
        getType() {
          if (this.activeName == 'apple') {
            this.getTypePhone(1)
          }
          if (this.activeName == 'huawei') {
            this.getTypePhone(3)
          }
          if (this.activeName == 'mi') {
            this.getTypePhone(4)
          }
          if (this.activeName == 'samsung') {
            this.getTypePhone(5)
          }
          if (this.activeName == 'oppo') {
            this.getTypePhone(6)
          }
          if (this.activeName == 'vivo') {
            this.getTypePhone(7)
          }
        },
        getTypePhone: function (id) {
          this.$axios.get('http://localhost:8080/phone/get_type/' + id).then(res => {
            console.log(res.data.data)
            this.phones = res.data.data
            for (let i = 0;i < this.phones.length;i++){
              this.phones[i].img = this.phones[i].img.substr(1);
              console.log(this.phones[i].img.substr(1))
            }

          }).catch(err => {
            alert("请求失败！")
          })
        }
      },
      mounted() {
        this.getType()
      }
    }
</script>

<style scoped>

</style>

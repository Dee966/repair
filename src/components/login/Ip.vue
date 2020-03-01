<template>
    <div id="ip">
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
            <label>输入你的服务器ip</label>
          </md-autocomplete>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" @click="ipInput()">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
    </div>
</template>

<script>
    export default {
        name: "Ip",
      data(){
          return{
            selectedEmployee:'',
            employees:[]
          }
      },
      methods:{
        ipInput(){
          let ipAddress = this.selectedEmployee
          localStorage.setItem('ipAddress',ipAddress)
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>

</style>

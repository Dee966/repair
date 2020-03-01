import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import Order from '../components/order/Order'
import My from '../components/my/My'
import Type from '../components/type/Type'
import Phone from "../components/phone/Phone";
import Confirm from "../components/order/Confirm";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import Info from "../components/login/Info";
import Pay from "../components/order/Pay";
import Pays from "../components/order/Pays";
import ManagerLogin from "../components/manager/ManagerLogin";
import ManagerHome from "../components/manager/ManagerHome";
import ManagerPhone from "../components/manager/ManagerPhone";
import ManagerOrder from "../components/manager/ManagerOrder";
import ManagerBanner from "../components/manager/ManagerBanner";
import ManagerHomes from "../components/manager/ManagerHomes";
import Address from "../components/my/Address"
import Ip from "../components/login/Ip";
import RecoveryType from "../components/recovery/RecoveryType";
import ChooseCondition from "../components/recovery/ChooseCondition";
import RecoveryOrder from "../components/recovery/RecoveryOrder";
import OrderSuccess from "../components/recovery/OrderSuccess";
import OrRecovery from "../components/recovery/OrRecovery";
import ManagerReOrder from "../components/manager/ManagerReOrder";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'ipLink', component: Ip,meta:{keepAlive:false}},
    {path: '/home', name: 'homeLink', component: Home,meta:{keepAlive:true}},
    {path: '/order', name: 'orderLink', component: Order,meta:{keepAlive:true}},
    {path: '/my', name: 'myLink', component: My,meta:{keepAlive:true}},
    {path: '/recoveryType', name: 'reTypeLink', component: RecoveryType,meta:{keepAlive:true}},
    {path: '/type/:id', name: 'typeLink', component: Type,meta:{keepAlive:true}},
    {path: '/phone/:id', name: 'phoneLink', component: Phone,meta:{keepAlive:false}},
    {path: '/confirm', name: 'confirmLink', component: Confirm,meta:{keepAlive:false}},
    {path: '/login', name: 'loginLink', component: Login,meta:{keepAlive:false}},
    {path: '/register', name: 'registerLink', component: Register,meta:{keepAlive:false}},
    {path: '/info/:id', name: 'infoLink', component: Info,meta:{keepAlive:false}},
    {path: '/pay', name: 'payLink', component: Pay,meta:{keepAlive:false}},
    {path: '/pays', name: 'paysLink', component: Pays,meta:{keepAlive:false}},
    {path: '/address', name: 'addressLink', component: Address,meta:{keepAlive:true}},
    {path: '/chooseCondition/:id', name: 'chConditionLink', component: ChooseCondition,meta:{keepAlive:true}},
    {path: '/recoveryOrder', name: 'reOrderLink', component: RecoveryOrder,meta:{keepAlive:true}},
    {path: '/orderSuccess', name: 'orSuccessLink', component: OrderSuccess,meta:{keepAlive:true}},
    {path: '/orRecovery', name: 'orRecoveryLink', component: OrRecovery,meta:{keepAlive:true}},

    {path: '/maLogin', name: 'maLoginLink', component: ManagerLogin,meta:{keepAlive:false}},
    {path: '/maHome', name: 'maHomeLink', component: ManagerHome,meta:{keepAlive:false},children:[
        {path: '/maHome/home', name: 'maHomesLink', component: ManagerHomes,meta:{keepAlive:false}},
        {path: '/maHome/phone', name: 'maPhoneLink', component: ManagerPhone,meta:{keepAlive:false}},
        {path: '/maHome/order', name: 'maOrderLink', component: ManagerOrder,meta:{keepAlive:false}},
        {path: '/maHome/reOrder', name: 'maReOrderLink', component: ManagerReOrder,meta:{keepAlive:false}},
        {path: '/maHome/banner', name: 'maBannerLink', component: ManagerBanner,meta:{keepAlive:false}}
      ]},
  ],
  mode:"history"
})

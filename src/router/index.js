import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import Order from '../components/order/Order'
import My from '../components/my/My'
import Type from '../components/type/Type'
import Apple from '../components/type/Apple'
import HuaWei from '../components/type/HuaWei'
import Phone from "../components/phone/Phone";
import Confirm from "../components/order/Confirm";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import Info from "../components/login/Info";
import Pay from "../components/order/Pay";
import Pays from "../components/order/Pays";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'homeLink', component: Home,meta:{keepAlive:true}},
    {path: '/home', name: 'homeLink', component: Home,meta:{keepAlive:true}},
    {path: '/order', name: 'orderLink', component: Order,meta:{keepAlive:true}},
    {path: '/my', name: 'myLink', component: My,meta:{keepAlive:true}},
    {path: '/type/:id', name: 'typeLink', component: Type,meta:{keepAlive:true}},
    {path: '/phone/:id', name: 'phoneLink', component: Phone,meta:{keepAlive:false}},
    {path: '/confirm', name: 'confirmLink', component: Confirm,meta:{keepAlive:false}},
    {path: '/login', name: 'loginLink', component: Login,meta:{keepAlive:false}},
    {path: '/register', name: 'registerLink', component: Register,meta:{keepAlive:false}},
    {path: '/info/:id', name: 'infoLink', component: Info,meta:{keepAlive:false}},
    {path: '/pay', name: 'payLink', component: Pay,meta:{keepAlive:false}},
    {path: '/pays', name: 'paysLink', component: Pays,meta:{keepAlive:false}},
  ],
  // mode:"history"
})

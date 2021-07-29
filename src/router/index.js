import Vue from 'vue'
import VueRouter from 'vue-router'
import Registros from '../views/Registros.vue'
import Cadastrar from '../views/Cadastrar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cadastrar',
    component: Cadastrar
  },
  {
    path: '/registros',
    name: 'Registros',
    component: Registros
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

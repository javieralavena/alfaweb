import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Administracion from '@/views/Administracion.vue'
import EditarCurso from '@/views/EditarCurso.vue'
import Login from '@/views/Login.vue'
import Registrarse from '@/views/Registrarse.vue'
import {getAuth} from "firebase/auth"
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      login:true
    }
  },
  {
    path: '/administracion',
    name: 'administracion',
    component: Administracion,
    meta: {
      login:true
    }
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: EditarCurso,
    meta: {
      login:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    component: Registrarse
  },
  {
    path: '/*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const auth = getAuth()
  console.log(auth)
  let user = auth.currentUser
  console.log(user)
  let private_rute = to.meta.login

  if(private_rute && !user){
    next('/login')
  }
  else if(private_rute == undefined && user){
    next('/')
  }
  else {
    next()
  }
})

export default router

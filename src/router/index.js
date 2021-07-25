import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/detail')
const Login = () => import('../views/profile/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile,
    // children: [
    //   {
    //     path: '/login',
    //     component:Login
    //   }
    // ]
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
       {
        path: '/login',
        component:Login
      }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

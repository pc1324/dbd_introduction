import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
// createRouter 创建路由实例
// 配置路由模式（history:）
// 1.history模式：createWebHistory 地址栏不带 #
// 2.hash模式：createWebHashHistory 地址栏带 #
const routes = [
  {
    path: '/adminLogin',
    component: () => import('@/views/login/AdminLoginPage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/RegisterPage.vue')
  },
  {
    path: '/manaSystem',
    redirect: '/manaSystem/welcome',
    component: () => import('@/views/manaSystem/ManaSystem.vue'),
    children: [
      {
        path: '/manaSystem/welcome',
        component: () => import('@/views/manaSystem/welcome/ManaWelcome.vue')
      },
      {
        path: '/manaSystem/user/userList',
        component: () => import('@/views/manaSystem/user/UserList.vue')
      },
      {
        path: '/manaSystem/survivor',
        component: () => import('@/views/manaSystem/survivor/SurvivorPage.vue')
      },
      {
        path: '/manaSystem/killer',
        component: () => import('@/views/manaSystem/killer/KillerPage.vue')
      },
      {
        path: '/manaSystem/skill/survivor',
        component: () => import('@/views/manaSystem/skill/SurvivorSkill.vue')
      },
      {
        path: '/manaSystem/skill/killer',
        component: () => import('@/views/manaSystem/skill/KillerSkill.vue')
      },
      {
        path: '/manaSystem/prop',
        component: () => import('@/views/manaSystem/prop/PropPage.vue')
      },
      {
        path: '/manaSystem/map',
        component: () => import('@/views/manaSystem/map/MapPage.vue')
      },
      {
        path: '/manaSystem/offer',
        component: () => import('@/views/manaSystem/offer/OfferPage.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/LayoutContainer.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/layout/home/HomePage.vue')
      }
    ]
  },
  { path: '/mytest', component: () => import('@/views/test/MyTest.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 放行白名单数组（无需登录）
const noInterceptArr = [
  '/adminLogin',
  '/login',
  '/register',
  '/mytest',
  '/',
  '/home'
]
// 路由导航守卫：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 根据返回值决定，是放行还是不放行
// 返回值
// 1.undefined / true 直接放行
// 2.false 拦回 from 的地址页面
// 3. 具体路径 或 路径对象，拦截到对应的地址
// '/login' { name:'logon'}

router.beforeEach((to) => {
  // console.log(to, from)
  // 如果没有 token，且访问的是非登录页，拦截到登录页
  const userStore = useUserStore()

  // console.log(to.path.slice(0, 11))
  // console.log(userStore.user.identity)

  // 未登录用户只能访问白名单路径
  if (!userStore.token && !noInterceptArr.includes(to.path)) {
    ElMessage.error('请先登录')
    return '/login'
  }
  // 非管理员不能访问管理员页面
  if (
    userStore.user.identity !== '0' &&
    to.path.slice(0, 11) === '/manaSystem'
  ) {
    ElMessage.error('你不是管理员!')
    return '/adminLogin'
  }
})

export default router

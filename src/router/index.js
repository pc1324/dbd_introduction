import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
// createRouter 创建路由实例
// 配置路由模式（history:）
// 1.history模式：createWebHistory 地址栏不带 #
// 2.hash模式：createWebHashHistory 地址栏带 #
const routes = [
  // 管理员登录页（一级路由）
  {
    path: '/adminLogin',
    component: () => import('@/views/login/AdminLoginPage.vue')
  },
  // 登录页（一级路由）
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  // 注册页（一级路由）
  {
    path: '/register',
    component: () => import('@/views/register/RegisterPage.vue')
  },
  // 管理员系统（一级路由）
  {
    path: '/manaSystem',
    redirect: '/manaSystem/welcome',
    component: () => import('@/views/manaSystem/ManaSystem.vue'),
    children: [
      // 欢迎页（二级路由）
      {
        path: '/manaSystem/welcome',
        component: () => import('@/views/manaSystem/welcome/ManaWelcome.vue')
      },
      // 用户管理（二级路由）
      {
        path: '/manaSystem/user/userList',
        component: () => import('@/views/manaSystem/user/UserList.vue')
      },
      // 逃生者管理（二级路由）
      {
        path: '/manaSystem/survivor',
        component: () => import('@/views/manaSystem/survivor/SurvivorPage.vue')
      },
      // 杀手管理（二级路由）
      {
        path: '/manaSystem/killer',
        component: () => import('@/views/manaSystem/killer/KillerPage.vue')
      },
      // 逃生者技能管理（二级路由）
      {
        path: '/manaSystem/skill/survivor',
        component: () => import('@/views/manaSystem/skill/SurvivorSkill.vue')
      },
      // 杀手技能管理（二级路由）
      {
        path: '/manaSystem/skill/killer',
        component: () => import('@/views/manaSystem/skill/KillerSkill.vue')
      },
      // 道具管理（二级路由）
      {
        path: '/manaSystem/prop',
        component: () => import('@/views/manaSystem/prop/PropPage.vue')
      },
      // 地图管理（二级路由）
      {
        path: '/manaSystem/map',
        component: () => import('@/views/manaSystem/map/MapPage.vue')
      },
      // 祭品管理（二级路由）
      {
        path: '/manaSystem/offer',
        component: () => import('@/views/manaSystem/offer/OfferPage.vue')
      }
    ]
  },
  // 用户系统（一级路由）
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/LayoutContainer.vue'),
    children: [
      // 首页（二级路由）
      {
        path: '/home',
        component: () => import('@/views/layout/home/HomePage.vue')
      },
      // 逃生者（二级路由）
      {
        path: '/survivor',
        component: () => import('@/views/layout/survivor/SurvivorPage.vue')
      },
      // 逃生者详情（二级路由）
      {
        path: '/survivor/details',
        component: () =>
          import('@/views/layout/survivor/SurvivorDetailsPage.vue')
      },
      // 杀手（二级路由）
      {
        path: '/killer',
        component: () => import('@/views/layout/killer/KillerPage.vue')
      },
      // 杀手详情（二级路由）
      {
        path: '/killer/details',
        component: () => import('@/views/layout/killer/KillerDetailsPage.vue')
      },
      {
        path: '/skill/survivor',
        component: () => import('@/views/layout/skill/SurvivorSkill.vue')
      },
      {
        path: '/skill/killer',
        component: () => import('@/views/layout/skill/KillerSkill.vue')
      }
    ]
  },
  // 测试（一级路由）
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

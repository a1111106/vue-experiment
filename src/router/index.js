import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
//新增文章页面
import ArticleList from '../views/ArticleList.vue'
import ArticleManage from '../views/ArticleManage.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - Vue3个人简历' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于我 - Vue3个人简历' }
  },
  {
    path: '/project',
    component: Project,
    meta: { title: '项目中心 - Vue3个人简历' },
    children: [
      {
        path: '',
        redirect: { name: 'ProjectList' }
      },
      {
        path: 'list',
        name: 'ProjectList',
        component: ProjectList,
        meta: { title: '项目列表 - Vue3个人简历' }
      },
      {
        path: ':id',
        name: 'ProjectDetail',
        component: ProjectDetail,
        meta: { title: '项目详情 - Vue3个人简历' }
      }
    ]
  },
  //=====文章嵌套路由【修复】=====
  {
    path: '/article',
    meta: { title: '文章中心 - Vue3个人简历' },
    children: [
      {
        path: '',
        redirect: { name: 'ArticleList' }
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: ArticleList,
        meta: { title: '文章列表 - Vue3个人简历' }
      },
      {
        path: ':id',
        name: 'ArticleDetail',
        component: ArticleDetail,
        meta: { title: '文章详情 - Vue3个人简历' }
      }
    ]
  },
  // 后台文章管理，放到admin路由下，需要登录权限
  {
    path: '/admin/article',
    name: 'ArticleManage',
    component: ArticleManage,
    meta: { title: '文章管理 - Vue3个人简历', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录 - Vue3个人简历' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { title: '后台管理 - Vue3个人简历', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面不存在 - Vue3个人简历' }
  }
]
// 使用 hash 模式，避免 GitHub Pages 刷新子路由 404
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// ✅ beforeEach 全局路由守卫：动态修改网页标题、登录权限校验
router.beforeEach(async (to, from, next) => {
  // 修改浏览器标签标题，满足实验要求
  if(to.meta.title){
    document.title = to.meta.title
  }
  // 动态导入pinia仓库
  const { useAuthStore } = await import('../stores/authStore')
  const authStore = useAuthStore()
  const isLogin = authStore.isLogin
  // 已登录不能再进登录页
  if(to.path === '/login' && isLogin){
    next('/admin')
  // 需要登录但是未登录，跳转登录
  }else if(to.meta.requiresAuth && !isLogin){
    next('/login')
  }else{
    next()
  }
})
export default router

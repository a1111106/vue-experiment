import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: localStorage.getItem('isLogin') === 'true'
  }),
  getters: {
    // 获取登录状态
    loginStatus: (state) => state.isLogin
  },
  actions: {
    login() {
      this.isLogin = true
      localStorage.setItem('isLogin', 'true')
    },
    logout() {
      this.isLogin = false
      localStorage.removeItem('isLogin')
    }
  }
})

import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: localStorage.getItem('isLogin') === 'true'
  }),
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

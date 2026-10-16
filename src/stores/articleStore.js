import { defineStore } from 'pinia'
export const useArticleStore = defineStore('article', {
  state: () => {
    const storageData = localStorage.getItem('articleList')
    if(storageData){
      const list = JSON.parse(storageData)
      if(Array.isArray(list) && list.length > 0){
        return { articleList: list }
      }
    }
    return {
      articleList: [
        {id:1, title:"Vue3入门笔记", content:"Pinia状态管理学习", createTime:"2026-10-01"},
        {id:2, title:"路由学习", content:"VueRouter路由守卫练习", createTime:"2026-10-05"}
      ]
    }
  },
  // getters：文章搜索过滤（实验考点）
  getters: {
    filteredArticles: (state) => {
      return (searchKey) => {
        if(!searchKey) return state.articleList
        return state.articleList.filter(item => item.title.includes(searchKey))
      }
    }
  },
  actions: {
    //新增文章：自动生成id和发布日期
    addArticle(art) {
      art.id = Date.now()
      art.createTime = new Date().toLocaleDateString()
      // unshift 将新文章插入数组头部，新文章置顶
      this.articleList.unshift(art)
      this.saveLocal()
    },
    //删除文章
    deleteArticle(id) {
      this.articleList = this.articleList.filter(a => a.id !== id)
      this.saveLocal()
    },
    //编辑文章
    editArticle(editArt) {
      const index = this.articleList.findIndex(item => item.id === editArt.id)
      if(index !== -1){
        this.articleList[index] = editArt
        this.saveLocal()
      }
    },
    //保存到本地存储
    saveLocal() {
      localStorage.setItem('articleList', JSON.stringify(this.articleList))
    }
  }
})

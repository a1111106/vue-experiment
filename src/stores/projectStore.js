import { defineStore } from 'pinia'
export const useProjectStore = defineStore('project', {
  state: () => ({
    list: JSON.parse(localStorage.getItem('projectList')) || [
      {id:1, name:"个人简历项目",content:"Vue3组件化开发",status:"已完成"},
      {id:2, name:"前端实验项目",content:"VueRouter路由练习",status:"进行中"}
    ]
  }),
  actions: {
    addProject(item) {
      // 新增项目自动生成唯一id
      item.id = Date.now()
      this.list.push(item)
      this.saveLocal()
    },
    deleteProject(id) {
      this.list = this.list.filter(p => p.id !== id)
      this.saveLocal()
    },
    saveLocal() {
      localStorage.setItem('projectList', JSON.stringify(this.list))
    }
  }
})

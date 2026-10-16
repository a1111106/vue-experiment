<template>
  <div class="container">
    <ProfileInfo
      :info="infoData"
      :is-edit="isInfoEdit"
      :show-detail="showInfoDetail"
      @toggle-detail="showInfoDetail = !showInfoDetail"
      @open-edit="isInfoEdit = true"
      @save-info="handleSaveInfo"
      @update-avatar="handleUpdateAvatar"
    />
    <h2 class="home-card-title">技能列表</h2>
    <SkillManager
      :skill-list="skillList"
      v-model:search-key="skillSearch"
      @add-skill="handleAddSkill"
      @del-skill="handleDelSkill"
    />
    <h2 class="home-card-title">项目中心</h2>
    <ProjectList
      :project-list="list"
      @add-project="handleAddProject"
      @delete-project="handleDeleteProject"
    />
    <h2 class="home-card-title">全部文章</h2>
    <div class="card">
      <div class="article-preview" style="margin:16px 0;">
        <div
          v-for="art in articleList || []"
          :key="art.id"
          style="border:1px solid #ccc; padding:12px; border-radius:8px; margin-bottom:12px;"
        >
          <h4 style="margin:0 0 6px;">{{ art.title }}</h4>
          <p style="margin:0 0 6px;">{{ art.content }}</p>
          <span style="font-size:14px;color:#666;">发布时间：{{ art.createTime }}</span>
        </div>
      </div>
      <div style="text-align:center;">
        <RouterLink to="/article/list" class="btn primary">查看全部文章</RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'
import { useProjectStore } from '../stores/projectStore'
import { storeToRefs } from 'pinia'
import ProfileInfo from '../components/ProfileInfo.vue'
import SkillManager from '../components/SkillManager.vue'
import ProjectList from '../components/ProjectList.vue'
// 文章仓库
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)
// =========项目仓库：解构变量是 list（仓库state定义的名称）=========
const projectStore = useProjectStore()
const { list } = storeToRefs(projectStore)
// ========== 个人信息 持久化 ==========
const infoData = ref(JSON.parse(localStorage.getItem("infoData")) || {
  name: "张三",
  major: "计算机科学与技术",
  phone: "13800138000",
  desc: "热爱前端开发，熟悉Vue3、JS、HTML/CSS",
  avatar: ""
})
const isInfoEdit = ref(false)
const showInfoDetail = ref(false)
const handleUpdateAvatar = (url) => {
  infoData.value.avatar = url
}
const handleSaveInfo = (newInfo) => {
  infoData.value = newInfo
  isInfoEdit.value = false
}
// ========== 技能列表 持久化 ==========
const skillList = ref(JSON.parse(localStorage.getItem("skillList")) || [
  "Vue3",
  "JavaScript",
  "HTML/CSS"
])
const skillSearch = ref("")
const handleAddSkill = (skillName) => {
  skillList.value.push(skillName)
}
const handleDelSkill = (index) => {
  skillList.value.splice(index,1)
}
// =========新增项目、删除项目处理函数【改为调用pinia仓库方法】=========
const handleAddProject = (newProj) => {
  projectStore.addProject(newProj)
}
const handleDeleteProject = (delId) => {
  projectStore.deleteProject(delId)
}
</script>
<style scoped>
.home-card-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0 16px;
}
</style>

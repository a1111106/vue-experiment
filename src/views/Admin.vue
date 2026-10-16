<template>
  <div class="container">
    <el-page-header @back="$router.push('/home')" content="返回首页" />
    <h2 style="text-align: center; margin: 16px 0;">
      <el-icon><Setting /></el-icon>&nbsp;后台管理控制台
    </h2>

    <!-- 数据统计卡片 -->
    <el-row :gutter="16">
      <el-col :xs="12" :sm="6" v-for="s in stats" :key="s.label">
        <el-card shadow="hover">
          <el-statistic :title="s.label" :value="s.value" />
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" style="margin-top: 16px;">
      <el-tabs v-model="activeTab">
        <!-- 个人简介 -->
        <el-tab-pane label="个人简介" name="profile">
          <el-input v-model="profileInfo" type="textarea" :rows="4" placeholder="编辑个人简介" />
          <el-button type="primary" style="margin-top: 10px" @click="saveProfile">保存</el-button>
        </el-tab-pane>

        <!-- 技能管理 -->
        <el-tab-pane label="技能管理" name="skill">
          <div style="margin-bottom: 10px;">
            <el-tag v-for="(s, i) in skillList" :key="i" closable @close="skillList.splice(i, 1)" style="margin-right: 8px;">
              {{ s }}
            </el-tag>
          </div>
          <el-input v-model="newSkillName" placeholder="输入新技能后回车" style="width: 260px" @keyup.enter="addSkill">
            <template #append>
              <el-button @click="addSkill">添加</el-button>
            </template>
          </el-input>
          <el-button style="margin-left: 10px" @click="saveSkill">保存全部</el-button>
        </el-tab-pane>

        <!-- 项目管理 -->
        <el-tab-pane label="项目管理" name="project">
          <el-table :data="projectStore.list" border stripe size="small">
            <el-table-column prop="name" label="项目名称" />
            <el-table-column prop="content" label="描述" />
            <el-table-column prop="status" label="状态" width="120">
              <template #default="{ row }">
                <el-select v-model="row.status" size="small">
                  <el-option label="进行中" value="进行中" />
                  <el-option label="已完成" value="已完成" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="{ row }">
                <el-popconfirm title="删除该项目？" @confirm="projectStore.deleteProject(row.id)">
                  <template #reference>
                    <el-button size="small" type="danger" plain>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-divider>新增项目</el-divider>
          <el-form :model="newProject" inline>
            <el-form-item label="名称"><el-input v-model="newProject.name" /></el-form-item>
            <el-form-item label="描述"><el-input v-model="newProject.content" /></el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addProject">新增</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 文章管理入口 -->
        <el-tab-pane label="文章管理" name="article">
          <el-empty description="文章管理已迁移到独立页面">
            <el-button type="primary" @click="$router.push('/admin/article')">前往文章管理</el-button>
          </el-empty>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <div style="text-align: center; margin: 20px 0;">
      <el-button type="danger" :icon="SwitchButton" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '../stores/authStore'
import { useProjectStore } from '../stores/projectStore'
import { useArticleStore } from '../stores/articleStore'

const router = useRouter()
const authStore = useAuthStore()
const projectStore = useProjectStore()
const articleStore = useArticleStore()

const activeTab = ref('profile')

const infoData = ref(JSON.parse(localStorage.getItem('infoData')) || { desc: '热爱前端，持续学习Vue3' })
const profileInfo = ref(infoData.value.desc)

const skillList = ref(JSON.parse(localStorage.getItem('skillList')) || ['Vue3', 'JavaScript', 'HTML/CSS'])
const newSkillName = ref('')

const newProject = ref({ name: '', content: '', status: '进行中' })

const stats = computed(() => [
  { label: '项目总数', value: projectStore.list.length },
  { label: '文章总数', value: articleStore.articleList.length },
  { label: '技能数量', value: skillList.value.length },
  { label: '登录状态', value: authStore.isLogin ? '已登录' : '未登录' }
])

const saveProfile = () => {
  infoData.value.desc = profileInfo.value
  localStorage.setItem('infoData', JSON.stringify(infoData.value))
  ElMessage.success('个人简介已保存')
}
const addSkill = () => {
  if (newSkillName.value.trim()) {
    skillList.value.push(newSkillName.value.trim())
    newSkillName.value = ''
  }
}
const saveSkill = () => {
  localStorage.setItem('skillList', JSON.stringify(skillList.value))
  ElMessage.success('技能已保存')
}
const addProject = () => {
  if (newProject.value.name) {
    projectStore.addProject({ ...newProject.value })
    newProject.value = { name: '', content: '', status: '进行中' }
    ElMessage.success('项目已新增')
  }
}
const logout = async () => {
  await ElMessageBox.confirm('确定要退出登录吗？', '提示', { type: 'warning' })
  authStore.logout()
  ElMessage.info('已退出登录')
  router.push('/login')
}
</script>

<template>
<section class="card project-card">
  <div class="card-header">
    <div class="search-wrap">
      <input placeholder="搜索项目名称" v-model="searchKey" class="search-input" />
      <select v-model="statusFilter" class="status-select">
        <option value="">全部状态</option>
        <option value="进行中">进行中</option>
        <option value="已完成">已完成</option>
      </select>
    </div>
  </div>
  <div class="project-list">
    <ProjectItem
      v-for="item in filteredList"
      :key="item.id"
      :item="item"
      @del="handleDelete"
    >
      <p style="font-size:13px;color:var(--muted)">【插槽扩展：项目备注信息】</p>
    </ProjectItem>
  </div>
  <ProjectForm @add-project="handleAdd" />
</section>
</template>
<script setup>
import {computed, ref} from 'vue'
import ProjectItem from './ProjectItem.vue'
import ProjectForm from './ProjectForm.vue'
// 引入pinia仓库
import { useProjectStore } from '../stores/projectStore'
const projectStore = useProjectStore()

const searchKey = ref('')
const statusFilter = ref('')
const filteredList = computed(()=>{
  // 直接读取store里面的list，不再读取props.projectList
  const list = projectStore.list || []
  return list.filter(p=>{
    const nameMatch = p.name.includes(searchKey.value)
    const statusMatch = statusFilter.value ? p.status === statusFilter.value : true
    return nameMatch && statusMatch
  })
})
// 新增项目，调用store action
const handleAdd = (newItem) => {
  projectStore.addProject(newItem)
}
// 删除项目，调用store action
const handleDelete = (delId) => {
  projectStore.deleteProject(delId)
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 18px;
  gap:12px;
}
.search-wrap{
  display:flex;
  gap:10px;
  align-items:center;
}
.search-input {
  width: 200px;
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
.status-select{
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
.project-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}
</style>

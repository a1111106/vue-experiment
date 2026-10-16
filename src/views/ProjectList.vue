<template>
  <div class="container">
    <ProjectList
      :project-list="projectList"
      @add-project="handleAddProject"
      @delete-project="handleDeleteProject"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import ProjectList from '../components/ProjectList.vue'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()
// storeToRefs 解构，保持响应式，满足实验4.1第3条
const { projectList } = storeToRefs(projectStore)

const handleAddProject = (newItem) =>{
  projectStore.addProject(newItem)
}
const handleDeleteProject = (delId) =>{
  projectStore.deleteProject(delId)
}
</script>
<style scoped>
.container{
  padding:15px;
}
</style>

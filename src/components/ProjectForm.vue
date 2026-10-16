<template>
<div class="project-add">
  <input v-model="localProject.name" placeholder="项目名称" />
  <input v-model="localProject.content" placeholder="项目描述" />
  <select v-model="localProject.status">
    <option value="进行中">进行中</option>
    <option value="已完成">已完成</option>
  </select>
  <button class="btn primary" @click="submit">新增项目</button>
</div>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps({
  defaultForm: {
    type: Object,
    default: () => ({ name:'', content:'', status:'进行中' })
  }
})
const emit = defineEmits(['add-project'])
const localProject = ref({...props.defaultForm})
const submit = ()=>{
  const newProject = {
    ...localProject.value,
    id: Date.now()
  }
  emit('add-project', newProject)
  localProject.value = {name:'',content:'',status:'进行中'}
}
</script>
<style scoped>
.project-add {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top:20px;
}
.project-add input,.project-add select {
  flex: 1;
  min-width: 160px;
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
.btn.primary {
  padding: 9px 18px;
  background: var(--primary);
  color: #fff;
  border:none;
  border-radius: 10px;
  cursor: pointer;
}
</style>

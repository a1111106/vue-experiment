<template>
<section class="card skill-card">
  <div class="card-header">
    <!-- 删除了 <h3>技能列表</h3>，标题交给父组件Home.vue统一管理 -->
    <!-- 修改这里：去掉v-model，改为 :value + @input -->
    <input placeholder="搜索技能" :value="searchKey" @input="$emit('update:searchKey', $event.target.value)" class="search-input" />
  </div>
  <div class="skill-add">
    <input v-model="newSkill" placeholder="输入新技能" />
    <button class="btn primary" @click="add">添加技能</button>
  </div>
  <ul class="skill-list">
    <li v-for="(item, idx) in filteredSkill" :key="idx" class="skill-item">
      <span class="skill-name">{{ item }}</span>
      <button class="btn danger small" @click="$emit('delSkill',idx)">删除</button>
    </li>
  </ul>
</section>
</template>
<script setup>
import {ref,computed} from 'vue'
const props = defineProps(['skillList','searchKey'])
const emit = defineEmits(['addSkill','delSkill','update:searchKey'])
const newSkill = ref('')
const filteredSkill = computed(()=>{
  const list = props.skillList || []
  return list.filter(s=>s.includes(props.searchKey))
})
const add = ()=>{
  const val = newSkill.value.trim()
  if(val){
    emit('addSkill', val)
    newSkill.value = ''
  }
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: flex-end; /* 原来左右布局，删掉标题后，搜索框靠右 */
  align-items: center;
  margin-bottom: 18px;
}
.search-input {
  width: 260px;
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
.skill-add {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}
.skill-add input {
  flex: 1;
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
}
.skill-name {
  font-weight: 500;
}
.btn {
  border-radius:10px;
  cursor:pointer;
}
.btn.primary {
  padding: 9px 18px;
  background: var(--primary);
  color: #fff;
  border:none;
}
.btn.danger.small {
  padding: 6px 12px;
  font-size: 13px;
  background: transparent;
  color: var(--danger);
  border:1px solid var(--danger);
}
.btn.danger.small:hover {
  background: var(--danger);
  color: #fff;
}
</style>

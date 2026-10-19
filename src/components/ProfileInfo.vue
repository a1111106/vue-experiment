<template>
<section class="card profile-card">
  <AvatarUploader :avatar="info?.avatar" @update-avatar="emitAvatar" />
  <div class="info">
    <div v-if="!isEdit" class="info-view">
      <h2>{{ info?.name }}</h2>
      <p class="job-title">{{ info?.major }}</p>
      <div class="info-row">
        <span class="label">电话：</span>
        <span>{{ info?.phone }}</span>
      </div>
      <p v-if="showDetail" class="desc">
        <span class="label">简介：</span>
        {{ info?.desc }}
      </p>
      <div class="action-buttons">
        <button class="btn" @click="$emit('toggleDetail')">
          {{ showDetail ? '收起详情' : '展开详情' }}
        </button>
        <button class="btn primary" @click="$emit('openEdit')">编辑信息</button>
      </div>
    </div>
    <div v-else class="info-edit">
      <div class="edit-item">
        <label>姓名</label>
        <input v-model="localInfo.name" />
      </div>
      <div class="edit-item">
        <label>专业</label>
        <input v-model="localInfo.major" />
      </div>
      <div class="edit-item">
        <label>电话</label>
        <input v-model="localInfo.phone" />
      </div>
      <div class="edit-item">
        <label>简介</label>
        <textarea v-model="localInfo.desc"></textarea>
      </div>
      <div class="edit-item">
        <label>方向</label>
        <input v-model="localInfo.direction" placeholder="如：全栈开发 / 前端工程" />
      </div>
      <div class="edit-item">
        <label>状态</label>
        <input v-model="localInfo.status" placeholder="如：大三在读" />
      </div>
      <button class="btn primary" @click="saveInfo">保存</button>
    </div>
  </div>
</section>
</template>
<script setup>
import { ref, watch } from 'vue'
import AvatarUploader from './AvatarUploader.vue'
const props = defineProps(['info', 'isEdit', 'showDetail'])
const emit = defineEmits(['toggleDetail','openEdit','saveInfo','updateAvatar'])

// 修复：props.info为空时，默认空对象，防止展开undefined报错
const localInfo = ref({...(props.info || {})})

watch(()=>props.info, (val)=>{
  localInfo.value = {...(val || {})}
},{deep:true})

const saveInfo = ()=>{
  emit('saveInfo', {...localInfo.value})
}
const emitAvatar = (url)=>{
  emit('updateAvatar', url)
}
</script>
<style scoped>
.profile-card {
  display: flex;
  gap: 28px;
  align-items: center;
}
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }
}
.info {
  flex: 1;
}
.info-view h2 {
  font-size: 26px;
  margin-bottom: 4px;
}
.job-title {
  color: var(--muted);
  margin-bottom: 14px;
}
.info-row,.desc {
  margin-bottom: 10px;
}
.label {
  font-weight: 600;
  margin-right: 6px;
}
.action-buttons {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.info-edit {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}
.edit-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.edit-item label {
  font-size: 14px;
  color: var(--muted);
}
input,textarea {
  padding: 10px 14px;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
input:focus,textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
textarea {
  resize: vertical;
  min-height: 80px;
}
.btn {
  padding: 9px 18px;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.btn.primary {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.btn.primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
  color: #fff;
}
</style>

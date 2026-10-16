<template>
  <div class="avatar-box">
    <img v-if="avatar" :src="avatar" class="avatar" />
    <div v-else class="avatar default-avatar">无头像</div>
    <input type="file" accept="image/*" @change="handleUpload" id="avatar-input" hidden />
    <label for="avatar-input" class="upload-btn">更换头像</label>
  </div>
</template>
<script setup>
const props = defineProps(['avatar'])
const emit = defineEmits(['updateAvatar'])
const handleUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    emit('updateAvatar', ev.target.result)
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--card);
  box-shadow: 0 0 0 2px var(--primary);
}
.default-avatar {
  background: linear-gradient(135deg, #a7f3d0, #34d399);
  color: #064e3b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.upload-btn {
  color: var(--primary);
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s;
}
.upload-btn:hover {
  color: var(--primary-hover);
}
</style>

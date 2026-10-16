<template>
<div>
  <input v-model="form.title" placeholder="文章标题" />
  <textarea v-model="form.content" rows="4" placeholder="文章内容"></textarea>
  <button @click="handleSubmit">提交</button>
</div>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps({
  defaultData: {
    type: Object,
    default: () => ({title:'', content:''})
  }
})
const emit = defineEmits(['submit'])
const form = ref({...props.defaultData})
const handleSubmit = ()=>{
  emit('submit', {
    title: form.value.title,
    content: form.value.content
  })
}
</script>
<style scoped>
input,textarea{
  width:100%;
  box-sizing:border-box;
  margin:6px 0;
  padding:8px;
  border-radius:6px;
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
}
</style>

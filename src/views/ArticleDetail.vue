<template>
<div class="container">
  <div class="card">
    <h2>文章详情</h2>
    <div v-if="art">
      <p>标题：{{art.title}}</p>
      <p>内容：{{art.content}}</p>
      <p>发布时间：{{art.createTime}}</p>
    </div>
    <div v-else style="color:var(--danger)">
      <p>未找到该文章</p>
    </div>
    <button @click="backToList">返回文章列表</button>
  </div>
</div>
</template>
<script setup>
import {useRoute,useRouter} from 'vue-router'
import { useArticleStore } from '../stores/articleStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

// 计算属性，路由参数或者文章列表变化都会自动重新查找
const art = computed(()=>{
  return articleList.value.find(item=> item.id == route.params.id)
})

const backToList = () => {
  router.push('/article/list')
}
</script>

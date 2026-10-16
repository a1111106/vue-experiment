<template>
  <div class="container">
    <h2 style="text-align: center; margin: 16px 0;">
      <el-icon><Document /></el-icon>&nbsp;文章列表
    </h2>

    <el-card shadow="never">
      <el-input
        v-model="searchKey"
        placeholder="输入关键词搜索文章标题"
        clearable
        :prefix-icon="Search"
      />
    </el-card>

    <el-empty v-if="!articleStore.filteredArticles(searchKey).length" description="暂无文章" />

    <el-card
      v-for="art in articleStore.filteredArticles(searchKey)"
      :key="art.id"
      shadow="hover"
      style="margin-bottom: 12px"
    >
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="margin: 0 0 6px">{{ art.title }}</h3>
          <p style="margin: 0 0 6px; color: #555">{{ art.content }}</p>
          <el-tag size="small" type="info">发布时间：{{ art.createTime }}</el-tag>
        </div>
        <div>
          <el-button size="small" type="primary" @click="goDetail(art.id)">查看详情</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const searchKey = ref('')
const articleStore = useArticleStore()
const goDetail = (id) => router.push(`/article/${id}`)
</script>

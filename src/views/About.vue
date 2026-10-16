<template>
  <div class="container">
    <el-card shadow="never">
      <template #header>
        <h2 style="margin: 0; display: flex; align-items: center; gap: 6px;">
          <el-icon><InfoFilled /></el-icon> 关于我
        </h2>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">HJY</el-descriptions-item>
        <el-descriptions-item label="专业">计算机科学与技术</el-descriptions-item>
        <el-descriptions-item label="方向">全栈开发 / 前端工程</el-descriptions-item>
        <el-descriptions-item label="状态">大二在读</el-descriptions-item>
        <el-descriptions-item label="技术栈" :span="2">
          <el-tag v-for="t in skills" :key="t" style="margin-right: 6px">{{ t }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <h3 style="margin: 0; display: flex; align-items: center; gap: 6px;">
          <el-icon><Timer /></el-icon> 我的成长时间线
        </h3>
      </template>
      <!-- 实验要求：使用 Element Plus 布局组件在个人信息页新增时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(item, idx) in timeline"
          :key="idx"
          :timestamp="item.time"
          placement="top"
          :type="item.type"
          :hollow="item.hollow"
        >
          <el-card>
            <h4 style="margin: 0 0 6px">{{ item.title }}</h4>
            <p style="margin: 0; color: #666; font-size: 14px;">{{ item.desc }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
<script setup>
const skills = ['Vue3', 'JavaScript', 'Node.js', 'MySQL', 'HTML/CSS', 'Git']
const timeline = [
  { time: '2021-09', title: '踏入高中', desc: '开始接触编程，从 C 语言入门', type: 'primary' },
  { time: '2024-09', title: '进入大学', desc: '就读计算机科学与技术专业，系统学习数据结构与操作系统', type: 'success' },
  { time: '2025-03', title: '初识前端', desc: '完成第一个静态网页项目，迷上 Vue 生态', type: 'warning' },
  { time: '2026-06', title: '全栈实践', desc: '使用 Vue3 + Express + MySQL 完成多个课程项目', type: 'danger' },
  { time: '2026-10', title: '本实验', desc: '集成 Pinia + Vue Router + Element Plus，部署 GitHub Pages', type: 'primary', hollow: true }
]
</script>

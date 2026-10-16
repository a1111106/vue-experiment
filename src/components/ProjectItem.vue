<template>
  <div class="project-item">
    <!-- 左侧文字信息 -->
    <div class="project-main">
      <h4>{{ item.name }}</h4>
      <p>{{ item.content }}</p>
      <div class="extra">
        <slot></slot>
      </div>
    </div>
    <!-- 右侧：状态标签 + 两个按钮 -->
    <div class="project-meta">
      <span class="status-tag" :class="item.status === '已完成' ? 'finish' : 'doing'">
        {{ item.status }}
      </span>
      <button class="btn primary" @click="goDetail">查看详情</button>
      <button class="btn danger" @click="$emit('del', item.id)">删除项目</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['item'])
const emit = defineEmits(['del'])
const goDetail = () => {
  // 使用命名路由 ProjectDetail，和router/index.js的name对应
  router.push({
    name: "ProjectDetail",
    params: { id: props.item.id }
  })
}
</script>
<style scoped>
.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 10px;
}
@media (max-width: 768px) {
  .project-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
.project-main h4 {
  font-size: 16px;
  margin:0 0 4px 0;
}
.project-main p {
  color: var(--muted);
  font-size: 14px;
  margin:0;
}
.extra {
  margin-top:4px;
}
.project-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-tag {
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.status-tag.doing {
  background: #fef3c7;
  color: #92400e;
}
.status-tag.finish {
  background: #d1fae5;
  color: #065f46;
}
:deep(.dark) .status-tag.doing {
  background: #78350f;
  color: #fde68a;
}
:deep(.dark) .status-tag.finish {
  background: #064e3b;
  color: #a7f3d0;
}
.btn {
  padding: 6px 10px;
  border-radius:6px;
  cursor:pointer;
  border:1px solid;
  position:relative;
  z-index:2;
  font-size:14px;
}
.btn.danger {
  background: transparent;
  color: var(--danger);
  border-color: var(--danger);
}
.btn.danger:hover {
  background: var(--danger);
  color: #fff;
}
.btn.primary {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}
.btn.primary:hover {
  background: var(--primary);
  color: #fff;
}
</style>

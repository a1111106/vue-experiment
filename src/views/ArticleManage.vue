<template>
  <div class="container">
    <el-page-header @back="$router.push('/home')" content="返回首页" />
    <h2 style="text-align: center; margin: 16px 0;">
      <el-icon><Document /></el-icon>&nbsp;文章管理（后台）
    </h2>

    <el-card shadow="never">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>共 {{ articleList.length }} 篇文章</span>
          <el-button type="primary" :icon="Plus" @click="openAdd">新增文章</el-button>
        </div>
      </template>

      <el-table :data="articleList" border stripe style="width: 100%">
        <el-table-column type="index" label="#" width="60" align="center" />
        <el-table-column prop="title" label="文章标题" min-width="180" />
        <el-table-column prop="content" label="摘要" min-width="260" show-overflow-tooltip />
        <el-table-column prop="createTime" label="发布时间" width="120" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain :icon="Edit" @click="openEdit(row)">
              编辑
            </el-button>
            <el-popconfirm title="确定删除这篇文章吗？" @confirm="articleStore.deleteArticle(row.id)">
              <template #reference>
                <el-button size="small" type="danger" plain :icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑文章' : '新增文章'" width="500px">
      <el-form ref="formRef" :model="editData" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editData.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="editData.content"
            type="textarea"
            :rows="4"
            placeholder="请输入文章内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref()
const editData = reactive({ id: null, title: '', content: '' })
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}

const openAdd = () => {
  isEdit.value = false
  editData.id = null
  editData.title = ''
  editData.content = ''
  dialogVisible.value = true
}
const openEdit = (row) => {
  isEdit.value = true
  editData.id = row.id
  editData.title = row.title
  editData.content = row.content
  dialogVisible.value = true
}
const saveForm = async () => {
  await formRef.value.validate()
  if (isEdit.value) {
    articleStore.editArticle({ ...editData })
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle({ title: editData.title, content: editData.content })
    ElMessage.success('文章已发布')
  }
  dialogVisible.value = false
}
</script>

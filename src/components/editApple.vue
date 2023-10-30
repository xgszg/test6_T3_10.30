<script setup>
// TODO: 编辑
import axios from 'axios';
import { ref } from 'vue'
// 弹框开关
const dialogVisible = ref(false)

const from = ref({
  price: '',
  id: ''
})

const setDialogVisible = (row) => {
  dialogVisible.value = true
  from.value.price = row.price
  from.value.id = row.id
}
const emit = defineEmits(['on-update'])
const onUpdate = async () => {
  await axios.patch(`/Appleedit/${from.value.id}`, {
    id: from.value.id,
    price: from.value.price,
  })
  dialogVisible.value = false
  emit('on-update')
}
defineExpose({
  setDialogVisible
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑" width="400px">
    <el-form label-width="50px">
      <el-form-item label="ID">
        <el-input placeholder="请输入ID" v-model="from.id" disabled />
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="请输入价格" v-model="from.price" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onUpdate()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-input {
  width: 290px;
}
</style>

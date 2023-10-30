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

const setDialogVisible = (id) => {
  from.value.id = id
  dialogVisible.value = true
}
const emit = defineEmits(['on-update'])
const onUpdate = async () => {
  await axios.patch(`/Addapple`, {
    id: from.value.id,
    price: from.value.price,
  })
  from.value = {}
  dialogVisible.value = false
  emit('on-update')
}
defineExpose({
  setDialogVisible
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增" width="400px">
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

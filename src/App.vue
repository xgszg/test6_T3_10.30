<script setup>
import { inject, onMounted, ref } from 'vue';
import Edit from './components/edit.vue'
import EditApple from './components/editApple.vue'
import AddApple from './components/addApple.vue';
import * as echarts from 'echarts';
import axios from 'axios';
// TODO: 列表渲染
const list = ref([])
const apple = ref([])
var demo = null
var demo1 = null
const getList = async () => {
  const res = await axios.get('/list')
  list.value = res.data
}
const getappleList = async () => {
  const res = await axios.get('/appleList')
  apple.value = res.data
  showdata()
}

onMounted(() => {
  // getList()
  getappleList()
}
)
// TODO: 删除功能
const onDelete = async (id) => {
  console.log(id);
  await axios.delete(`/del/${id}`)
  getList()
}
const onDeleteApple = async (id) => {
  await axios.delete(`/appleDel/${id}`)
  getappleList()
}

// TODO: 编辑功能
const editRef = ref(null)
const edit = (row) => {
  editRef.value.setDialogVisible(row)
}
const editApple = (row) => {
  editRef.value.setDialogVisible(row)
}

// 新增
const addRef = ref(null)
const addApple = () => {
  addRef.value.setDialogVisible(apple.value[apple.value.length - 1].id + 1)
  addRef.value.setDialogVisible(row)
}
//仪表盘配置
const showdata = () => {
  var price = apple.value[apple.value.length - 1].price;
  if (demo != null && demo != "" && demo != undefined) {
    demo.dispose();//销毁
  }
  demo = echarts.init(document.getElementById('demo'));
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        max: 10,
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: price,
            name: '苹果价格'
          }
        ]
      }
    ]
  };
  demo.setOption(option);
  if (demo1 != null && demo1 != "" && demo1 != undefined) {
    demo1.dispose();//销毁
  }
  var chartDom = document.getElementById('demo1');
  demo1 = echarts.init(chartDom);
  var option1;
  option1 = {
    xAxis: {
      type: 'category',
      data: apple.value.map(obj => obj.id)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: apple.value.map(obj => obj.price),
        type: 'line'
      }
    ]
  };
  option1 && demo1.setOption(option1);
}

//放大(待完善)
const fulldemo = () => {
  const element = document.getElementById('demo');
  if (element.requestFullScreen) { // HTML W3C 提议
    element.requestFullScreen();
  } else if (element.msRequestFullscreen) { // IE11
    element.msRequestFullScreen();
  } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
    element.mozRequestFullScreen();
  }
  // 退出全屏
  if (element.requestFullScreen) {
    document.exitFullscreen();
  } else if (element.msRequestFullScreen) {
    document.msExitFullscreen();
  } else if (element.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (element.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
}
</script>

<template>
  <EditApple ref="editRef" @on-update="getappleList()" />
  <AddApple ref="addRef" @on-update="getappleList()" />
  <div>
    <div class="tools">
      <el-button type="primary" @click="getappleList()">刷新苹果{{ }}</el-button>
      <el-button type="primary" @click="addApple()">添加苹果</el-button>
      <!-- <el-button type="primary" @click="fulldemo()">全屏</el-button> -->
    </div>
    <div style="display: flex;justify-content: center;">
      <div>
        <div id="demo" style="width: 500px; height: 500px;background-color:#fff;;margin:0 auto"></div>
      </div>
      <div>
        <div id="demo1" style="width: 500px; height: 500px;background-color:#fff;;margin:0 auto"></div>
      </div>
    </div>

    <div style="display: flex;justify-content: center;">
      <div>
        <el-table :data="apple">
          <el-table-column label="ID" prop="id" width="150"></el-table-column>
          <el-table-column label="苹果价格" prop="price" width="150"></el-table-column>
          <!-- <el-table-column label="籍贯" prop="place"></el-table-column> -->
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button type="primary" @click="editApple(row)" link>编辑</el-button>
              <el-button type="danger" @click="onDeleteApple(row.id)" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools {
  text-align: center
}
</style>

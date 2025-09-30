<script setup lang="ts">
const tableData = [
  {
    name: '张三',
    dep: '技术部',
    id: '001',
    owner: '李四',
    task: '开发',
    belong: '项目A',
    status: '进行中',
  },
  {
    name: '王五',
    dep: '市场部',
    id: '002',
    owner: '赵六',
    task: '推广',
    belong: '项目B',
    status: '已完成',
  },
  {
    name: '孙七',
    dep: '人事部',
    id: '003',
    owner: '周八',
    task: '招聘',
    belong: '项目C',
    status: '未开始',
  },
  {
    name: '钱九',
    dep: '财务部',
    id: '004',
    owner: '吴十',
    task: '预算',
    belong: '项目D',
    status: '进行中',
  },
  {
    name: '郑十一',
    dep: '技术部',
    id: '005',
    owner: '冯十二',
    task: '测试',
    belong: '项目E',
    status: '已完成',
  },
];
</script>

<template>
  <div>
    <ElTable :data="tableData" border>
      <ElTableColumn prop="name" label="姓名" width="180" />
      <ElTableColumn prop="dep" label="部门" width="180" />
      <ElTableColumn prop="id" label="工号" width="180" />
      <ElTableColumn prop="owner" label="责任人" width="180" />
      <ElTableColumn prop="task" label="任务" width="180" />
      <ElTableColumn prop="belong" label="归属" width="180" />
      <ElTableColumn prop="status" label="状态" width="180" />
    </ElTable>
  </div>
</template>

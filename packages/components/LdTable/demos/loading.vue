<script>
export default {
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
      ],
      loading: false,
    };
  },
  methods: {
    simulateLoading() {
      // 清空表格数据
      this.tableData = [];
      this.loading = true;
      setTimeout(() => {
        this.tableData = [
          {
            name: "张三",
            age: 18,
            sex: "男",
          },
          {
            name: "李四",
            age: 20,
            sex: "女",
          },
        ];
        this.loading = false;
      }, 2000);
    },
  },
};
</script>
<template>
  <div>
    <el-button type="primary" @click="simulateLoading">模拟加载</el-button>
    <ld-table
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
      :pagination="false"
    ></ld-table>
  </div>
</template>

<script>
const tableData = [
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
  {
    name: "王五",
    age: 22,
    sex: "男",
  },
];
export default {
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          type: "globalIndex",
          label: "全局序号",
        },
        {
          type: "index",
          label: "本地序号",
          width: "100px",
        },
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
      pagination: {
        current: 1,
        size: 2,
        total: 3,
      },
      paginationOptions: {
        layout: "total, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.tableData = tableData.slice(0, this.pagination.size);
  },
  methods: {
    handleCurrentChange(current) {
      this.pagination.current = current;
      console.log(current);
      this.tableData = tableData.slice(
        (current - 1) * this.pagination.size,
        current * this.pagination.size,
      );
    },
  },
};
</script>
<template>
  <ld-table
    :data="tableData"
    :columns="tableColumns"
    :pagination="pagination"
    :pagination-options="paginationOptions"
    @pagination:current-change="handleCurrentChange"
  ></ld-table>
</template>

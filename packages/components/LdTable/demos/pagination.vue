<script>
export default {
  data() {
    return {
      tableData: [
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
      ],
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
      pagination: {
        current: 1,
        size: 10,
        total: 2,
      },
    };
  },
  methods: {
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagination.size = size;
    },
    handleCurrentChange(current) {
      console.log(`当前页: ${current}`);
      this.pagination.current = current;
    },
  },
};
</script>
<template>
  <div>
    <ld-table 
      :data="tableData" 
      :columns="tableColumns"
      :pagination="pagination"
      @pagination:size-change="handleSizeChange"
      @pagination:current-change="handleCurrentChange"
    ></ld-table>
  </div>
</template>

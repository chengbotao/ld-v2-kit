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
    };
  },
};
</script>
<template>
  <ld-table :data="tableData" :columns="tableColumns" :pagination="false"></ld-table>
</template>

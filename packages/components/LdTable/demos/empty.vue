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
    };
  },
};
</script>
<template>
  <ld-table
    :data="tableData"
    :columns="tableColumns"
    :pagination="false"
  ></ld-table>
</template>

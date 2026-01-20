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
  <div>
    <ld-table 
      :data="tableData" 
      :columns="tableColumns"
    ></ld-table>
    <div style="margin-top: 10px; color: #999;">
      空状态演示：当表格数据为空时，会显示空状态提示
    </div>
  </div>
</template>

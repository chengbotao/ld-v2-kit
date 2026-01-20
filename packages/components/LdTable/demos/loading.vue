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
      loading: true,
    };
  },
  mounted() {
    // 模拟加载过程
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
<template>
  <div>
    <ld-table 
      :data="tableData" 
      :columns="tableColumns"
      :loading="loading"
    ></ld-table>
    <div style="margin-top: 10px; color: #999;">
      加载状态演示：表格会显示加载动画，2秒后消失
    </div>
  </div>
</template>

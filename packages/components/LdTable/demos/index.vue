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
        {
          name: "王五",
          age: 22,
          sex: "男",
        },
      ],
      tableColumns: [
        {
          type: "globalIndex",
          label: "全局序号",
        },
        {
          type: "index",
          label: "本地序号",
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
      序号列演示：左侧为全局序号（从1开始递增），中间为本地序号（每页从1开始）
    </div>
  </div>
</template>

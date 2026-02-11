<template>
  <div>
    <ld-dynamic-button-group
      :buttonList="buttonList"
      :maxVisibleButtons="2"
      @click="handleClick"
    >
      <template #dropdown>
        <i class="el-icon-more"></i>
      </template>
    </ld-dynamic-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonList: [
        { key: "btn1", label: "编辑", props: { type: "primary" } },
        { key: "btn2", label: "删除", props: { type: "danger" } },
        { key: "btn3", label: "复制", props: { type: "warning" } },
        { key: "btn4", label: "导出", props: { type: "success" } },
      ],
    };
  },
  methods: {
    handleClick(button) {
      console.log("点击了按钮:", button);
    },
  },
};
</script>

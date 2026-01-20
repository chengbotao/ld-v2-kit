<script>
import { useDialog } from "../index";

export default {
  methods: {
    async openAsyncDialog() {
      useDialog({
        componentInstance: () => import("./AsyncComponent.vue"),
        dialogProps: {
          title: "异步加载对话框",
          width: "400px",
          top: "20vh",
        },
        close: (type, componentRef, done) => {
          console.log("对话框关闭，类型:", type);
          done();
        },
      });
    },
  },
};
</script>
<template>
  <el-button type="primary" @click="openAsyncDialog"
    >打开异步加载对话框</el-button
  >
</template>

<script>
import { useDialog } from "../index";

export default {
  methods: {
    openHFunctionDialog() {
      // 使用 h 函数创建组件
      const HFunctionComponent = {
        render(h) {
          return h(
            "div",
            {
              style: {
                padding: "20px",
              },
            },
            [
              h("h3", "H 函数对话框示例"),
              h("p", "这是使用 Vue h 函数创建的对话框内容"),
              h(
                "div",
                {
                  style: {
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  },
                },
                [
                  h(
                    "el-button",
                    {
                      props: {
                        type: "primary",
                      },
                      on: {
                        click: () => this.$emit("close", "confirm"),
                      },
                    },
                    "确定",
                  ),
                  h(
                    "el-button",
                    {
                      on: {
                        click: () => this.$emit("close", "cancel"),
                      },
                    },
                    "取消",
                  ),
                ],
              ),
            ],
          );
        },
      };

      // 打开对话框
      useDialog({
        componentInstance: HFunctionComponent,
        dialogProps: {
          title: "H 函数对话框",
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
  <el-button type="primary" @click="openHFunctionDialog"
    >打开 H 函数对话框</el-button
  >
</template>

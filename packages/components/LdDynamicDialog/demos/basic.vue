<script>
import { useDialog } from '../index';

export default {
  methods: {
    openBasicDialog() {
      // 定义简单的组件，使用 render 函数
      const BasicComponent = {
        render(h) {
          return h('div', {
            style: {
              padding: '20px',
            },
          }, [
            h('h3', '基本对话框示例'),
            h('p', '这是一个简单的对话框内容'),
            h('div', {
              style: {
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              },
            }, [
              h('el-button', {
                props: {
                  type: 'primary',
                },
                on: {
                  click: () => this.$emit('close', 'confirm'),
                },
              }, '确定'),
              h('el-button', {
                on: {
                  click: () => this.$emit('close', 'cancel'),
                },
              }, '取消'),
            ]),
          ]);
        },
      };

      // 打开对话框
      useDialog({
        componentInstance: BasicComponent,
        dialogProps: {
          title: '基本对话框',
          width: '400px',
          top: '20vh',
        },
        close: (type, componentRef, close) => {
          console.log('对话框关闭，类型:', type);
          close();
        },
      });
    },
  },
};
</script>
<template>
  <el-button type="primary" @click="openBasicDialog">打开基本对话框</el-button>
</template>

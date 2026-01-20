<script>
import { useDialog } from '../index';

export default {
  data() {
    return {
      pageTitle: '当前页面标题',
    };
  },
  methods: {
    openTitleSlotDialog() {
      // 定义内容组件
      const ContentComponent = {
        props: ['pageTitle'],
        render(h) {
          return h('div', {
            style: {
              padding: '20px',
            },
          }, [
            h('h3', '标题插槽示例'),
            h('p', `当前页面标题: ${this.pageTitle}`),
            h('p', '这是一个使用组件加载方式的标题插槽示例，在标题后面添加了状态按钮。'),
            h('el-button', {
              style: {
                marginRight: '10px',
              },
              on: {
                click: () => this.$emit('close', 'cancel'),
              },
            }, '取消'),
          ]);
        },
      };

      // 定义标题插槽组件
      const TitleSlotComponent = {
        props: ['componentProps'],
        methods: {
          handleStatus1() {
            console.log('点击了状态按钮 1');
            // 这里可以添加状态按钮 1 的逻辑
          },
          handleStatus2() {
            console.log('点击了状态按钮 2');
            // 这里可以添加状态按钮 2 的逻辑
          },
        },
        render(h) {
          const pageTitle = this.componentProps?.pageTitle || '默认标题';
          return h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            },
          }, [
            h('span', `自定义标题 - ${pageTitle}`),
            h('div', {
              style: {
                display: 'flex',
                gap: '8px',
              },
            }, [
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'success',
                },
                on: {
                  click: this.handleStatus1,
                },
              }, '状态 1'),
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'warning',
                },
                on: {
                  click: this.handleStatus2,
                },
              }, '状态 2'),
            ]),
          ]);
        },
      };

      // 打开对话框
      useDialog({
        componentInstance: ContentComponent,
        componentProps: {
          pageTitle: this.pageTitle,
        },
        titleSlot: TitleSlotComponent,
        dialogProps: {
          width: '500px',
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
  <div>
    <el-button type="primary" @click="openTitleSlotDialog">打开标题插槽示例</el-button>
  </div>
</template>

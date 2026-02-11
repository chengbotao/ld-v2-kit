<template>
  <div>
    <ld-dynamic-button-group
      :buttonList="buttonList"
      @click="handleClick"
    >
      <!-- 自定义按钮1的内容 -->
      <template #btn1="{ scope }">
        <i class="el-icon-edit"></i>
        <span style="margin-left: 5px;">{{ scope.label }}</span>
      </template>
      
      <!-- 自定义按钮2的内容 -->
      <template #btn2="{ scope }">
        <i class="el-icon-delete"></i>
        <span style="margin-left: 5px;">{{ scope.label }}</span>
      </template>
      
      <!-- 自定义按钮3的内容 -->
      <template #btn3="{ scope }">
        <i class="el-icon-copy-document"></i>
        <span style="margin-left: 5px;">{{ scope.label }}</span>
      </template>
    </ld-dynamic-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonList: [
        { key: 'btn1', label: '编辑', props: { type: 'primary' } },
        { key: 'btn2', label: '删除', props: { type: 'danger' } },
        { key: 'btn3', label: '复制', props: { type: 'warning' } },
        { key: 'btn4', label: '导出', props: { type: 'success' } },
        { key: 'btn5', label: '打印', props: { type: 'info' } }
      ]
    };
  },
  methods: {
    handleClick(button) {
      console.log('点击了按钮:', button);
    }
  }
};
</script>

<template>
  <div class="async-dialog-content">
    <h3>异步加载组件示例</h3>
    <p>这是一个通过异步方式加载的组件</p>
    <p>组件加载时间: {{ loadTime }}</p>
    <div>
      <el-button type="primary" @click="$emit('close', 'confirm')">确定</el-button>
      <el-button @click="$emit('close', 'cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadTime: new Date().toLocaleTimeString(),
    };
  },
};
</script>
<style scoped>
.async-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

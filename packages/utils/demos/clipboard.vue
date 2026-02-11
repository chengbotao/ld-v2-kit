<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-input v-model="copyText" placeholder="请输入要复制的文本" style="width: 300px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="handleCopy">复制</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-input v-model="pasteText" placeholder="粘贴结果" style="width: 300px; margin-left: 10px;"></el-input>
    </div>
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { clipboard } from '../../main';

export default {
  data() {
    return {
      copyText: 'Hello, world!',
      pasteText: '',
      message: '',
      messageType: 'success'
    };
  },
  methods: {
    async handleCopy() {
      try {
        const copiedText = await clipboard(this.copyText);
        this.message = '复制成功！';
        this.messageType = 'success';
      } catch (error) {
        this.message = '复制失败：' + error.message;
        this.messageType = 'error';
      }
      this.clearMessage();
    },
    clearMessage() {
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

.success {
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
  color: #67c23a;
}

.error {
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  color: #f56c6c;
}
</style>

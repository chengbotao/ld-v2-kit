<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-date-picker
        v-model="date"
        type="datetime"
        placeholder="选择日期时间"
        style="width: 300px; margin-right: 10px;"
      ></el-date-picker>
      <el-select v-model="format" placeholder="选择格式" style="width: 200px; margin-right: 10px;">
        <el-option label="YYYY-MM-DD HH:mm:ss" value="YYYY-MM-DD HH:mm:ss"></el-option>
        <el-option label="YYYY/MM/DD" value="YYYY/MM/DD"></el-option>
        <el-option label="HH:mm:ss" value="HH:mm:ss"></el-option>
        <el-option label="YYYY年MM月DD日" value="YYYY年MM月DD日"></el-option>
        <el-option label="HH:mm" value="HH:mm"></el-option>
        <el-option label="YYYY-MM-DD" value="YYYY-MM-DD"></el-option>
        <el-option label="YYYY-MMM-DD" value="YYYY-MMM-DD"></el-option>

      </el-select>
      <el-button type="primary" @click="handleFormat">格式化</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-input v-model="formattedDate" placeholder="格式化结果" style="width: 300px;"></el-input>
    </div>
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { dateFormatter } from '../../main';

export default {
  data() {
    return {
      date: new Date(),
      format: 'YYYY-MM-DD HH:mm:ss',
      formattedDate: '',
      message: '',
      messageType: 'success'
    };
  },
  methods: {
    handleFormat() {
      try {
        if (!this.date) {
          this.message = '请选择日期时间';
          this.messageType = 'error';
          return;
        }
        this.formattedDate = dateFormatter(this.format,this.date);
        this.message = '格式化成功！';
        this.messageType = 'success';
      } catch (error) {
        this.message = '格式化失败：' + error.message;
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

<template>
  <div>
    <h3>深度合并工具示例</h3>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="handleMerge">执行合并</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <h4>对象1：</h4>
      <el-input type="textarea" v-model="obj1Str" placeholder="对象1" style="width: 100%; margin-bottom: 10px;"></el-input>
      <h4>对象2：</h4>
      <el-input type="textarea" v-model="obj2Str" placeholder="对象2" style="width: 100%; margin-bottom: 10px;"></el-input>
      <h4>合并结果：</h4>
      <el-input type="textarea" v-model="resultStr" placeholder="合并结果" style="width: 100%;" :readonly="true"></el-input>
    </div>
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { deepMerge } from '../../main';

export default {
  data() {
    return {
      obj1: {
        a: 1,
        b: {
          c: 2,
          d: 3
        }
      },
      obj2: {
        b: {
          d: 4,
          e: 5
        },
        f: 6
      },
      obj1Str: JSON.stringify({ a: 1, b: { c: 2, d: 3 } }, null, 2),
      obj2Str: JSON.stringify({ b: { d: 4, e: 5 }, f: 6 }, null, 2),
      resultStr: '',
      message: '',
      messageType: 'success'
    };
  },
  methods: {
    handleMerge() {
      try {
        // 解析输入的 JSON 字符串
        const obj1 = JSON.parse(this.obj1Str);
        const obj2 = JSON.parse(this.obj2Str);
        
        // 执行深度合并
        const result = deepMerge(obj1, obj2);
        
        // 显示合并结果
        this.resultStr = JSON.stringify(result, null, 2);
        this.message = '合并成功！';
        this.messageType = 'success';
      } catch (error) {
        this.message = '合并失败：' + error.message;
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

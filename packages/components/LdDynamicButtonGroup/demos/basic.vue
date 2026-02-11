<template>
  <div>
    <ld-dynamic-button-group
      :buttonList="buttonList"
      @click="handleClick"
    />
    <div style="margin-top: 20px;">
      <h4>点击结果：{{ clickedButton ? clickedButton.label : '未点击' }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonList: [
        { key: 'btn1', label: '按钮1', props: { type: 'primary' } },
        { key: 'btn2', label: '按钮2', props: { type: 'success' } },
        { key: 'btn3', label: '按钮3', props: { type: 'warning' } },
        { key: 'btn4', label: '按钮4', props: { type: 'danger' } },
        { key: 'btn5', label: '按钮5', props: { type: 'info' } }
      ],
      clickedButton: null
    };
  },
  methods: {
    handleClick(button) {
      this.clickedButton = button;
      console.log('点击了按钮:', button);
    }
  }
};
</script>

<script>
export default {
  name: "LdDynamicButtonGroup",
  props: {
    // 按钮数组
    buttonList: {
      type: Array,
      required: true,
    },
    // 最多显示的按钮数量
    maxVisibleButtons: {
      type: Number,
      default: 3,
    },
    // 按钮公共Props
    buttonProps: {
      type: Object,
      default: () => ({}),
    },
    // 下拉选择框Props
    dropdownProps: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    // 显示的按钮组
    visibleButtons() {
      return this.buttonList.slice(0, this.maxVisibleButtons);
    },
    // 隐藏的按钮组
    hiddenButtons() {
      return this.buttonList.slice(this.maxVisibleButtons);
    },
    // 是否有隐藏的按钮
    hasHiddenButtons() {
      return this.hiddenButtons.length > 0;
    },
  },
  methods: {
    handleClick(button) {
      this.$emit("click", button);
    },
  },
}
</script>

<template>
  <div>
    <!-- 默认显示的按钮 -->
    <el-button
        v-for="btn in visibleButtons"
        :key="btn.key"
        v-bind="{...buttonProps,...btn.props}"
        @click="handleClick(btn)"
    >
      <slot :name="btn.key" :scope="btn">
        {{ btn.label }}
      </slot>
    </el-button>

    <!-- 超出部分的下拉按钮 -->
    <el-dropdown class="more-dropdown" v-if="hasHiddenButtons" v-bind="dropdownProps" @command="handleClick">
      <slot name="dropdown">
        <el-button type="primary">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
      </slot>
      <el-dropdown-menu>
        <el-dropdown-item
            v-for="btn in hiddenButtons"
            :key="btn.key"
            v-bind="{...buttonProps,...btn.props}"
            :command="btn"
        >
          <slot :name="btn.key" :scope="btn">{{ btn.label }}</slot>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style scoped>
.more-dropdown {
  margin-left: 10px;
}
</style>

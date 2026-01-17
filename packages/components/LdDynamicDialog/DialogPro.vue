<script>
import { dragDialog } from "./drag-dialog";

export default {
  name: "DialogPro",
  directives: {
    dragDialog,
  },
  props: {
    componentInstance: {
      type: [Object, Function],
      required: true,
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    dialogProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dialogProps.height) {
        this.$refs.dialogRef.$el.querySelector(".el-dialog").style.height =
          this.dialogProps.height;
      }
    });
  },
  methods: {
    handleClose(type) {
      this.$emit("close", type);
    },
  },
};
</script>
<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="dialogProps"
    v-dragDialog
    @close="handleClose('_close')"
    class="ld-dialog-pro"
    role="dialogRef"
    :modal="false"
  >
    <component
      ref="componentRef"
      :is="componentInstance"
      v-bind="componentProps"
      @close="handleClose"
    ></component>
  </el-dialog>
</template>
<style>
.ld-dialog-pro.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ld-dialog-pro.el-dialog__wrapper .el-dialog {
  margin: 0;
  display: flex;
  flex-direction: column;
}

.ld-dialog-pro.el-dialog__wrapper .el-dialog .el-dialog__body {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

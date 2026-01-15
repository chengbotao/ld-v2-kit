<script>
import { ElDialog } from "element-ui";
import { dragDialog } from "./drag-dialog";

export default {
  name: "DialogPro",
  components: {
    ElDialog,
  },
  directives: {
    dragDialog,
  },
  props: {
    componentInstance: {
      type: [Object, Function],
    },
    componentProps: {
      type: Object,
    },
    dialogProps: {
      type: Object,
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
        document.querySelector(".ld-dialog-pro .el-dialog").style.height =
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
  <ELDialog
    :visible.sync="visible"
    v-bind="dialogProps"
    v-dragDialog
    @close="handleClose('_close')"
    class="ld-dialog-pro"
    :modal="false"
  >
    <component
      ref="componentRef"
      :is="componentInstance"
      v-bind="componentProps"
      @close="handleClose"
    ></component>
  </ELDialog>
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

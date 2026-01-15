import { deepMerge } from '../../utils/deep-merge';
import DialogPro from './DialogPro.vue';

// 导入 Vue，确保在所有环境中都能正确引用
import Vue from 'vue';

// 确保 Vue 是构造函数
const VueConstructor = typeof Vue === 'function' ? Vue : Vue.default;

const DialogConstructor = VueConstructor.extend(DialogPro);

class DialogInstance {
  instance = null;
  constructor(options = {}) {
    if (Vue.prototype.$isServer) {
      return;
    }
    this.initInstance(options)
  }
  initInstance(options) {
    // 这里可以指定义处理options的值
    this.instance = new DialogConstructor({
      propsData: options,
    }).$mount(document.createElement("div"));
    // 监听事件
    this.instance.$on('close', (type) => {
      if (type === "_close") {
        // 点击 X 关闭、 点击 modal 关闭 或者 dialogPro visible 属性变化关闭弹窗,就直接关闭无需处理 options.close 回调;
        this.close();
        return;
      }
      options.close && options.close(type, this.instance.$refs.componentRef, this.close.bind(this));
    });

    const target = options.target || document.body;
    target.appendChild(this.instance.$el);
    Vue.nextTick(() => {
      this.instance.visible = true;
    })
  }
  close() {
    this.instance.visible = false;
    this.instance.$destroy();
    Vue.nextTick(() => {
      this.instance.$el.remove();
      this.instance = null;
    })
  }
}

export const useDialog = (options = {}) => {
  return new DialogInstance(deepMerge({
    dialogProps: {
      modal: false,
      top: "0",
      closeOnClickModal: false,
      closeOnPressEscape: false,
    },
  }, options));
}

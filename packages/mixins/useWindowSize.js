export const useWindowSize = (options = {}) => {
  const {
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    includeScrollbar = true,
    type = "inner"
  } = options;

  return {
    data() {
      return {
        initialWidth: initialWidth,
        initialHeight: initialHeight,
        // 存储事件监听器的引用，用于销毁时移除
        resizeListener: null,
      };
    },
    mounted() {
      // 初始化窗口尺寸
      this.updateWindowSize();

      // 绑定窗口 resize 事件监听器
      this.resizeListener = () => this.updateWindowSize();
      window.addEventListener("resize", this.resizeListener, { passive: true });
      this.$once("hook:beforeDestroy", () => {
        // 组件销毁时移除事件监听器
        window.removeEventListener("resize", this.resizeListener);
      });
    },
    methods: {
      updateWindowSize() {
        if (type === "outer") {
          this.initialWidth = window.outerWidth;
          this.initialHeight = window.outerHeight;
        } else if (includeScrollbar) {
          this.initialWidth = window.innerWidth;
          this.initialHeight = window.innerHeight;
        } else {
          this.initialWidth = window.document.documentElement.clientWidth;
          this.initialHeight = window.document.documentElement.clientHeight;
        }
      }
    }
  };
};

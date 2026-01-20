<script>
import { clipboard } from "../utils/clipboard";

export default {
  name: "DemoContainer",
  props: {
    source: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    rawSource: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sourceVisible: false,
      sourceModule: null,
    };
  },
  computed: {
    decodedDescription() {
      return decodeURIComponent(this.description);
    },
    decodedSource() {
      return decodeURIComponent(this.source);
    },
  },
  watch: {
    path: {
      handler(newPath) {
        this.loadComponent(newPath);
      },
      immediate: true,
    },
  },
  methods: {
    loadComponent(path) {
      if (this.$demoModules && this.$demoModules[path]) {
        this.$demoModules[path]().then((module) => {
          this.sourceModule = module.default || module;
        });
      }
    },
    handleClick() {
      this.sourceVisible = !this.sourceVisible;
    },
    async copyCode() {
      try {
        await clipboard(decodeURIComponent(this.rawSource));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div class="demo-container">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="decodedDescription" />

    <section class="example">
      <div class="example-showcase">
        <component :is="sourceModule"></component>
      </div>
      <div class="example-toolbar">
        <i class="fa-solid fa-copy example-toolbar__item" @click="copyCode"></i>
        <i
          class="fa-solid fa-code example-toolbar__item"
          @click="handleClick"
        ></i>
      </div>
      <transition name="ld-fade-in-linear">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          v-show="sourceVisible"
          class="example-source"
          v-html="decodedSource"
        ></div>
      </transition>
      <transition name="ld-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          role="button"
          tabindex="0"
          @click="handleClick"
        >
          <i class="fa-solid fa-arrow-up"></i>
          <span>隐藏示例源代码</span>
        </div>
      </transition>
    </section>
  </div>
</template>

<style scoped>
.example {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  overflow: auto;
}

.example-toolbar {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  border-top: 1px solid #dee2e6;
}

.example-toolbar__item {
  margin: 0 0.5rem;
  cursor: pointer;
  transition: 0.2s;
}

.example-source ::v-deep(.language-vue) {
  margin: 0 !important;
  border-radius: 0 !important;
}

.example-float-control {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #dee2e6;
  height: 44px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-top: -1px;
  color: #6c757d;
  cursor: pointer;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.example-float-control span {
  font-size: 14px;
  margin-left: 10px;
}

.example-float-control:hover {
  color: #007bff;
}

.ld-fade-in-linear-enter-active,
.ld-fade-in-linear-leave-active {
  transition: opacity 0.2s linear;
}

.ld-fade-in-linear-enter,
.ld-fade-in-linear-leave-to {
  opacity: 0;
}
</style>

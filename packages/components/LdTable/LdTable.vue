<script>
import { useWindowSize } from "../../mixins/useWindowSize.js";
import LdTableColumn from "./LdTableColumn.vue";
const LAYOUT = {
  SMALL: "prev, pager, next, jumper, total",
  MEDIUM: "prev, pager, next, sizes, jumper, total",
  LARGE: "total, prev, pager, next, sizes, jumper",
};

/**
 * 表格高度计算器类
 */
class TableHeightCalculator {
  // 常量配置
  static TABLE_HEADER_SPACING = 12;

  constructor(options) {
    this.options = options;
  }

  /**
   * 计算容器高度
   */
  calculate() {
    const offset = this.calculateOffset();
    return {
      height: offset === 0 ? "100%" : `calc(100% - ${offset}px)`,
    };
  }

  /**
   * 计算偏移量
   */
  calculateOffset() {
    const paginationOffset = this.calculatePaginationOffset();
    return paginationOffset + TableHeightCalculator.TABLE_HEADER_SPACING;
  }

  /**
   * 计算分页器偏移量
   */
  calculatePaginationOffset() {
    const { paginationHeight } = this.options;
    return paginationHeight === 0 ? 0 : paginationHeight + 6;
  }
}

export default {
  name: "LdTable",
  inheritAttrs: false,
  components: {
    LdTableColumn,
  },
  mixins: [useWindowSize()],
  props: {
    /** 加载状态 */
    loading: {
      type: Boolean,
      default: false,
    },
    /** 列渲染配置 */
    columns: {
      type: Array,
      default: () => [],
    },
    /** 分页状态 */
    pagination: {
      type: [Object, Boolean],
      default: () => ({}),
    },
    /** 分页组件配置 */
    paginationOptions: {
      type: Object,
      default: () => ({}),
    },
    /** 空数据表格高度 */
    emptyHeight: {
      type: String,
      default: "100%",
    },
    // 空状态组件的配置项
    emptyOptions: {
      type: Object,
      default: () => ({}),
    },
    fit: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
    },
    border: {
      type: Boolean,
    },
    size: {
      type: String,
    },
    height: {
      type: [String, Number],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      paginationHeight: 48,
      tableHeaderRef: null, // 添加 tableHeaderRef 到 data 中
    };
  },
  computed: {
    showPagination() {
      return this.pagination && !this.isEmpty;
    },
    tableColumns() {
      return this.columns
        .map((column) => ({
          hidden: column.hidden || false,
          ...column,
        }))
        .filter((column) => !column.hidden);
    },
    tableProps() {
      const props = {
        fit: this.fit,
        showHeader: this.showHeader,
        stripe: this.stripe,
        border: this.border,
        size: this.size,
        data: this.data,
      };

      // 合并其他表格属性
      const otherProps = this.$attrs;
      return { ...props, ...otherProps, height: this.tableHeight };
    },
    // 响应式分页器布局
    layout() {
      // if (this.initialWidth < 768) {
      //   return LAYOUT.SMALL;
      // } else if (this.initialWidth < 1024) {
      //   return LAYOUT.MEDIUM;
      // } else {
      return LAYOUT.LARGE;
      // }
    },
    mergedPaginationOptions() {
      const defaultOptions = {
        pageSizes: [100, 200, 300, 500, 1000],
        align: "center",
        background: true,
        layout: this.layout,
        hideOnSinglePage: false,
        size: "default",
        pagerCount: this.initialWidth > 1200 ? 7 : 5,
      };

      return { ...defaultOptions, ...this.paginationOptions };
    },
    isEmpty() {
      return this.data && this.data.length === 0;
    },

    containerHeight() {
      // 简化的容器高度计算
      const calculator = new TableHeightCalculator({
        paginationHeight: this.showPagination ? this.paginationHeight : 0,
      });
      return calculator.calculate();
    },
    // 表格高度逻辑
    tableHeight() {
      // 空数据且非加载状态时固定高度
      if (this.isEmpty && !this.loading) return this.emptyHeight;
      // 使用传入的高度
      if (this.height) return this.height;
      // 默认占满容器高度
      return "100%";
    },
    // 合并空状态组件配置
    mergedEmptyOptions() {
      const defaultOptions = {
        description: this.emptyText,
        imageSize: 120,
      };
      return { ...defaultOptions, ...this.emptyOptions };
    },
  },
  methods: {
    getGlobalIndex(index) {
      if (!this.pagination) return index + 1;
      const { current, size } = this.pagination;
      return isNaN((current - 1) * size + index + 1)
        ? index + 1
        : (current - 1) * size + index + 1;
    },

    handleSizeChange(size) {
      this.$emit("pagination:size-change", size);
    },
    handleCurrentChange(current) {
      this.$emit("pagination:current-change", current);
      this.scrollToTop(); // 页码改变后滚动到表格顶部
    },
    // 滚动表格内容到顶部
    scrollToTop() {
      this.$nextTick(() => {
        const elTableRef = this.$refs.elTableRef;
        if (elTableRef) {
          // 找到 el-table_body 元素
          const tableBody = elTableRef.$el.querySelectorAll(
            ".el-table__body-wrapper"
          );
          if (tableBody.length > 0) {
            tableBody.forEach((item) => {
              item.scrollTo({
                top: 0, // 滚动目标位置（顶部）
                left: 0, // 水平位置（保持0即可）
                // behavior: "smooth", // 关键：平滑滚动，去掉则瞬间跳转
              });
            });
          }
        }
      });
    },
  },
};
</script>

<template>
  <div
    class="ld-table"
    :class="{ 'ld-table--empty': isEmpty }"
    :style="containerHeight"
  >
    <el-table
      ref="elTableRef"
      v-loading="!!loading"
      v-bind="tableProps"
      v-on="$listeners"
    >
      <template v-for="col in tableColumns">
        <!-- 渲染全局序号列 -->
        <el-table-column
          v-if="col.type === 'globalIndex'"
          fixed="left"
          align="center"
          headerAlign="center"
          v-bind="{ ...col }"
          :key="'globalIndex-' + (col.prop || col.type)"
        >
          <template #header="{ column, $index }">
            <template
              v-if="
                $scopedSlots[`${column.prop}-header`] ||
                $slots[`${column.prop}-header`]
              "
            >
              <slot
                :name="`${column.prop}-header`"
                :column="column"
                :$index="$index"
              />
            </template>
            <template v-else>
              <span>{{ col.label || "序号" }}</span>
            </template>
          </template>
          <template #default="{ row, column, $index }">
            <template
              v-if="$scopedSlots[`${column.prop}`] || $slots[`${column.prop}`]"
            >
              <slot
                :name="`${column.prop}`"
                :row="row"
                :column="column"
                :$index="$index"
              />
            </template>
            <template v-else>
              <span>{{ getGlobalIndex($index) }}</span>
            </template>
          </template>
        </el-table-column>

        <!-- 渲染列 -->
        <LdTableColumn v-else :key="col.prop || col.label" :column="col">
          <template
            v-for="(_, slotName) in $scopedSlots"
            #[slotName]="slotProps"
          >
            <slot :name="slotName" v-bind="slotProps" />
          </template>
        </LdTableColumn>
      </template>
      <template #empty>
        <template v-if="$scopedSlots['tableEmpty']">
          <slot name="tableEmpty"></slot>
        </template>
        <template v-else>
          <div v-if="loading"></div>
          <el-empty v-else v-bind="mergedEmptyOptions">
            <template
              #description
              v-if="
                $scopedSlots['tableEmptyDescription'] ||
                $slots['tableEmptyDescription']
              "
            >
              <slot name="tableEmptyDescription"></slot>
            </template>
            <template
              #image
              v-if="
                $scopedSlots['tableEmptyImage'] || $slots['tableEmptyImage']
              "
            >
              <slot name="tableEmptyImage"></slot>
            </template>
            <template
              #default
              v-if="
                $scopedSlots['tableEmptyDefault'] || $slots['tableEmptyDefault']
              "
            >
              <slot name="tableEmptyDefault"></slot>
            </template>
          </el-empty>
        </template>
      </template>
      <template #append>
        <slot name="tableAppend"></slot>
      </template>
    </el-table>

    <div
      v-if="showPagination"
      ref="paginationRef"
      class="ld-table__pagination ld-table__pagination--custom"
      :class="mergedPaginationOptions && mergedPaginationOptions.align ? 'ld-table__pagination--' + mergedPaginationOptions.align : ''"
    >
      <el-pagination
        v-bind="mergedPaginationOptions"
        :total="pagination && pagination.total"
        :disabled="loading"
        :page-size="pagination && pagination.size"
        :current-page="pagination && pagination.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template
          #default
          v-if="
            $scopedSlots['tablePaginationDefault'] ||
            $slots['tablePaginationDefault']
          "
        >
          <slot name="tablePaginationDefault"></slot>
        </template>
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>
.ld-table {
  width: 100%;
  position: relative;
}

.ld-table--empty {
  min-height: 200px;
}

.ld-table .el-table {
  width: 100%;
}

.ld-table__pagination {
  margin-top: 16px;
  padding: 8px 0;
}

.ld-table__pagination--left {
  text-align: left;
}

.ld-table__pagination--center {
  text-align: center;
}

.ld-table__pagination--right {
  text-align: right;
}

.ld-table__pagination .el-pagination {
  margin: 0;
}

.ld-table__pagination--custom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

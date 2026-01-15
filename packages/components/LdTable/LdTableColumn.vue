<script>
export default {
  name: "LdTableColumn",
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cleanColumnProps(col) {
      const columnProps = { align: "center", headerAlign: "center", ...col };
      // 删除自定义的插槽控制属性
      delete columnProps.useHeaderSlot;
      delete columnProps.useSlot;
      return columnProps;
    },
  },
};
</script>
<template>
  <el-table-column v-bind="cleanColumnProps(column)">
    <!-- 递归渲染子列 -->
    <template v-if="column.children && column.children.length > 0">
      <ld-table-column
        v-for="childCol in column.children"
        :key="childCol.prop || childCol.label"
        :column="childCol"
      />
    </template>
    <!-- 表头插槽 -->
    <template
      v-if="!column.children && column.useHeaderSlot && column.prop"
      #header="{ column: elColumn, $index }"
    >
      <template
        v-if="
          $scopedSlots[`${column.prop}-header`] ||
          $slots[`${column.prop}-header`]
        "
      >
        <slot
          :name="`${column.prop}-header`"
          :column="elColumn"
          :$index="$index"
        />
      </template>
      <template v-else>
        {{ column.label }}
      </template>
    </template>
    <!-- 内容插槽 -->
    <template
      v-if="!column.children && column.useSlot && column.prop"
      #default="{ row, column: elColumn, $index }"
    >
      <template v-if="$scopedSlots[column.prop] || $slots[column.prop]">
        <slot
          :name="column.prop"
          :row="row"
          :column="elColumn"
          :$index="$index"
        />
      </template>
      <template v-else>
        {{
          column.formatter
            ? column.formatter(row, elColumn, row[column.prop], $index)
            : row[column.prop]
        }}
      </template>
    </template>
  </el-table-column>
</template>

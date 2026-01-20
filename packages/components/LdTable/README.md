# LdTable 表格组件

LdTable 是基于 Element UI 的 `el-table` 组件封装的高级表格组件，提供了更丰富的功能和更简洁的使用方式。

## 功能特性

- ✅ 支持自定义列配置
- ✅ 内置分页功能
- ✅ 支持加载状态
- ✅ 支持空状态定制
- ✅ 支持响应式布局
- ✅ 支持全局序号列
- ✅ 支持插槽自定义

## 基本用法

:::demo LdTable/demos/basic
:::

## 带分页的表格

:::demo LdTable/demos/pagination
:::

## 带加载状态的表格

:::demo LdTable/demos/loading
:::

## 带空状态的表格

:::demo LdTable/demos/empty
:::

## 带全局序号的表格

:::demo LdTable/demos/index
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|------|------|
| `data` | 表格数据 | Array | [] | - |
| `columns` | 列配置 | Array | [] | - |
| `loading` | 加载状态 | Boolean | false | true/false |
| `pagination` | 分页配置 | Object/Boolean | {} | - |
| `paginationOptions` | 分页组件配置 | Object | {} | - |
| `emptyHeight` | 空数据表格高度 | String | "100%" | - |
| `emptyOptions` | 空状态组件配置 | Object | {} | - |
| `fit` | 列宽是否自适应 | Boolean | true | true/false |
| `showHeader` | 是否显示表头 | Boolean | true | true/false |
| `stripe` | 是否显示斑马纹 | Boolean | - | true/false |
| `border` | 是否显示边框 | Boolean | - | true/false |
| `size` | 表格尺寸 | String | - | medium/small/mini |
| `height` | 表格高度 | String/Number | - | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| `pagination:size-change` | 每页条数变化时触发 | size |
| `pagination:current-change` | 当前页码变化时触发 | current |
| 其他事件 | 支持 Element UI el-table 的所有事件 | 同 Element UI |

### Column 配置项

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|------|------|
| `prop` | 列字段名 | String | - | - |
| `label` | 列标题 | String | - | - |
| `width` | 列宽 | String/Number | - | - |
| `minWidth` | 最小列宽 | String/Number | - | - |
| `fixed` | 是否固定列 | String/Boolean | - | left/right/true/false |
| `type` | 列类型 | String | - | globalIndex/index/selection/expand |
| `hidden` | 是否隐藏列 | Boolean | false | true/false |
| 其他配置 | 支持 Element UI el-table-column 的所有配置 | - |

### Slots

| 插槽名称 | 说明 |
|------|------|
| `tableEmpty` | 空状态插槽 |
| `tableEmptyDescription` | 空状态描述插槽 |
| `tableEmptyImage` | 空状态图片插槽 |
| `tableEmptyDefault` | 空状态默认插槽 |
| `tableAppend` | 表格底部追加内容插槽 |
| `tablePaginationDefault` | 分页组件默认插槽 |
| `[prop]-header` | 自定义列头插槽，[prop] 为列的 prop 值 |
| `[prop]` | 自定义列内容插槽，[prop] 为列的 prop 值 |

## 示例代码

### 基本表格

```vue
<template>
  <ld-table :data="tableData" :columns="tableColumns"></ld-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "张三",
          age: 18,
          sex: "男",
        },
        {
          name: "李四",
          age: 20,
          sex: "女",
        },
      ],
      tableColumns: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
      ],
    };
  },
};
</script>
```

### 带分页的表格

```vue
<template>
  <ld-table 
    :data="tableData" 
    :columns="tableColumns"
    :pagination="pagination"
  ></ld-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "张三",
          age: 18,
          sex: "男",
        },
        {
          name: "李四",
          age: 20,
          sex: "女",
        },
      ],
      tableColumns: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
      ],
      pagination: {
        current: 1,
        size: 10,
        total: 2,
      },
    };
  },
};
</script>
```

## 注意事项

1. 当使用 `pagination` 功能时，需要传入正确的 `current`、`size` 和 `total` 值
2. 当使用 `globalIndex` 类型的列时，会自动计算全局序号，不受分页影响
3. 当表格数据为空且非加载状态时，会显示空状态组件
4. 组件支持响应式布局，会根据屏幕宽度自动调整分页组件的显示

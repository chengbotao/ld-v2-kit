# LdDynamicButtonGroup 动态按钮组

LdDynamicButtonGroup 是一个基于 Element UI 按钮组件封装的动态按钮组组件，支持自动将超出数量的按钮收纳到下拉菜单中。

## 功能特性

- ✅ 自动管理按钮显示数量
- ✅ 超出部分显示在下拉菜单中
- ✅ 支持自定义下拉按钮样式
- ✅ 支持为每个按钮添加插槽
- ✅ 支持按钮公共属性配置
- ✅ 支持下拉菜单属性配置

## 基本用法

:::demo LdDynamicButtonGroup/demos/basic
默认最多显示3个按钮，超出部分会显示在下拉菜单中
:::

## 自定义下拉按钮

:::demo LdDynamicButtonGroup/demos/custom-dropdown
通过 dropdown 插槽自定义下拉按钮的样式和内容
:::

## 使用插槽

:::demo LdDynamicButtonGroup/demos/slots
通过插槽为每个按钮自定义内容，可添加图标等
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|------|------|
| `buttonList` | 按钮配置数组 | Array | [] | - |
| `maxVisibleButtons` | 最多显示的按钮数量 | Number | 3 | - |
| `buttonProps` | 按钮公共属性 | Object | {} | - |
| `dropdownProps` | 下拉菜单属性 | Object | {} | - |

### buttonList 配置项

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|------|------|
| `key` | 按钮唯一标识 | String | - | - |
| `label` | 按钮文本 | String | - | - |
| `props` | 按钮属性 | Object | {} | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| `click` | 点击按钮时触发 | button: 按钮配置对象 |

### Slots

| 插槽名称 | 说明 |
|------|------|
| `dropdown` | 自定义下拉按钮插槽 |
| `[key]` | 自定义按钮内容插槽，[key] 为按钮的 key 值 |

## 注意事项

1. 每个按钮必须提供唯一的 `key` 值，用于插槽命名和元素标识
2. 当 `buttonList` 为空数组时，不会显示任何内容
3. 当按钮数量未超过 `maxVisibleButtons` 时，不会显示下拉按钮

# useDialog 函数式调用文档

`useDialog` 是一个函数式调用的对话框工具，基于 Element UI 的 `el-dialog` 组件封装，提供了更灵活、更简洁的对话框创建方式。

## 功能特性

- ✅ 函数式调用，无需在模板中声明组件
- ✅ 支持自定义组件内容
- ✅ 支持传递组件属性
- ✅ 支持自定义对话框配置
- ✅ 支持关闭回调
- ✅ 支持拖拽功能

## 基本用法

:::demo components/LdDynamicDialog/demos/basic
:::

## 表单对话框

:::demo components/LdDynamicDialog/demos/form
:::

## 使用 H 函数

:::demo components/LdDynamicDialog/demos/h-function
:::

## 异步加载组件

:::demo components/LdDynamicDialog/demos/async
:::

## 标题插槽示例

:::demo components/LdDynamicDialog/demos/title-slot
:::

### useDialog(options)

#### 参数

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|------|------|
| `componentInstance` | 要在对话框中显示的组件实例 | Object/Function | - | **必需** |
| `componentProps` | 传递给组件的属性 | Object | {} | - |
| `dialogProps` | 传递给 el-dialog 的属性 | Object | 见下文 | - |
| `titleSlot` | 自定义标题插槽，支持函数或组件对象 | Function/Object | null | - |
| `target` | 对话框挂载的目标元素 | HTMLElement | document.body | - |
| `close` | 关闭回调函数 | Function | - | - |

#### dialogProps 默认值

```javascript
{
  modal: false,
  top: "0",
  closeOnClickModal: false,
  closeOnPressEscape: false,
}
```

#### close 回调函数参数

| 参数 | 说明 | 类型 |
|------|------|------|
| `type` | 关闭类型，`_close` 表示点击 X 或遮罩层关闭 | String |
| `componentRef` | 对话框中组件的实例引用 | Object |
| `close` | 关闭对话框的函数 | Function |

#### 返回值

返回一个 `DialogInstance` 实例，包含以下方法：

| 方法 | 说明 | 参数 |
|------|------|------|
| `close()` | 关闭对话框 | - |


## 关闭对话框

### 1. 通过组件内部触发

在对话框内的组件中，通过 `$emit('close', type)` 触发关闭：

```javascript
// 在组件内部
this.$emit('close', 'confirm'); // 传递关闭类型
```

### 2. 通过 close 回调函数

在 `close` 回调函数中，调用 `close()` 方法关闭：

```javascript
close: (type, componentRef, done) => {
  // 处理逻辑
  done(); // 调用 done 方法关闭对话框
};
```

### 3. 通过对话框实例

保存对话框实例，后续可以通过实例调用 `close()` 方法：

```javascript
// 打开对话框并保存实例
const dialogInstance = useDialog(options);

// 后续需要关闭时
setTimeout(() => {
  dialogInstance.close();
  
}, 3000);
```

## 注意事项

1. **组件引用**：通过 `close` 回调函数的 `componentRef` 参数可以获取对话框中组件的实例，用于访问组件的方法和数据

2. **对话框配置**：`dialogProps` 支持 Element UI `el-dialog` 组件的所有属性，详细配置请参考 [Element UI 文档](https://element.eleme.io/#/zh-CN/component/dialog)

3. **拖拽功能**：对话框默认支持拖拽，通过 `v-dragDialog` 指令实现

4. **性能优化**：对话框关闭后会自动销毁组件实例并从 DOM 中移除，无需手动清理

## 常见问题

### Q: 如何在对话框中使用异步操作？

**A:** 可以在组件内部使用异步操作，完成后通过 `$emit('close', type)` 触发关闭：

```javascript
// 在组件内部
async handleSubmit() {
  try {
    await this.$axios.post('/api/submit', this.form);
    this.$emit('close', 'success');
  } catch (error) {
    this.$emit('close', 'error', error);
  }
}
```

### Q: 如何自定义对话框的样式？

**A:** 可以通过 `dialogProps` 传递 `customClass` 属性，然后在 CSS 中定义样式：

```javascript
const dialogInstance = useDialog({
  // ...
  dialogProps: {
    title: '自定义样式对话框',
    customClass: 'my-dialog',
  },
});
```

```css
/* 自定义对话框样式 */
.my-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```
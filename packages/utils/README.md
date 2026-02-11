# 工具函数

ld-v2-kit 提供了一系列实用的工具函数，用于简化开发过程中的常见操作。

## 如何使用

### 按需导入

```javascript
import { dateFormatter } from "ld-v2-kit";
import { deepMerge } from "ld-v2-kit";
import { clipboard } from "ld-v2-kit";
```

### 完整导入

```javascript
import LDV2Kit from "ld-v2-kit";

// 使用工具函数
const formattedDate = LDV2Kit.dateFormatter();
const customFormatDate = LDV2Kit.dateFormatter('YYYY/MM/DD', new Date());
const mergedObject = LDV2Kit.deepMerge({}, { a: 1 });
```

## clipboard 剪贴板工具

:::demo utils/demos/clipboard
剪贴板工具提供了剪贴板的复制功能，便于在项目中实现内容的复制操作
:::

```javascript
import { clipboard } from "ld-v2-kit";

// 复制文本
clipboard("Hello, world!").then((copiedText) => {
  console.log("复制成功，复制的文本是:", copiedText);
}).catch((error) => {
  console.error("复制失败:", error);
});
```

### 参数
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| `text` | 要复制的文本内容 | String | - |

### 返回值
| 类型 | 说明 |
|------|------|
| Promise\<String\> | 复制的文本内容 |


## dateFormatter 日期格式化工具

:::demo utils/demos/dateFormat
日期格式化工具提供了日期时间的格式化和处理功能，便于在项目中统一处理日期显示。
:::

```javascript
import { dateFormatter } from "ld-v2-kit";

// 格式化当前日期为默认格式
dateFormatter();

// 格式化指定日期
dateFormatter('YYYY/MM/DD', new Date('2026-02-11')); // 2026/02/11

// 格式化时间戳
dateFormatter('HH:mm:ss', 1672531200000); // 12:00:00
```

### 参数
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| `format` | 日期格式字符串 | String | `'YYYY-MM-DD HH:mm:ss'` |
| `date` | 要格式化的日期对象或时间戳 | Date/Number/String | `new Date()` |

### 返回值
| 类型 | 说明 |
|------|------|
| String | 格式化后的日期字符串 |

### 格式说明
| 格式 | 说明 | 示例 |
|------|------|------|
| **年份** | | |
| `YYYY` | 四位年份 | 2023 |
| `YY` | 两位年份 | 23 |
| **月份** | | |
| `M` | 一位或两位月份 | 1-12 |
| `MM` | 两位月份 | 01-12 |
| `MMM` | 英文月份缩写 | Jan-Dec |
| `MMMM` | 英文月份全称 | January-December |
| `MMMMM` | 中文月份 | 一月-十二月 |
| **日期** | | |
| `D` | 一位或两位日期 | 1-31 |
| `DD` | 两位日期 | 01-31 |
| **星期** | | |
| `W` | 数字星期 (0-6, 0表示星期日) | 0-6 |
| `WW` | 中文星期缩写 | 周日-周六 |
| `WWW` | 中文星期全称 | 星期日-星期六 |
| **季度** | | |
| `Q` | 数字季度 | 1-4 |
| `QQ` | 中文季度 | 一季度-四季度 |
| **时间 (24小时制)** | | |
| `H` | 一位或两位小时 | 0-23 |
| `HH` | 两位小时 | 00-23 |
| **时间 (12小时制)** | | |
| `h` | 一位或两位小时 | 1-12 |
| `hh` | 两位小时 | 01-12 |
| `A` | 大写上午/下午 | AM/PM |
| `a` | 小写上午/下午 | am/pm |
| **分钟和秒** | | |
| `m` | 一位或两位分钟 | 0-59 |
| `mm` | 两位分钟 | 00-59 |
| `s` | 一位或两位秒 | 0-59 |
| `ss` | 两位秒 | 00-59 |
| **毫秒** | | |
| `S` | 一位毫秒 | 0-9 |
| `SS` | 两位毫秒 | 00-99 |
| `SSS` | 三位毫秒 | 000-999 |


## deepMerge 深度合并对象

深度合并工具用于深度合并两个或多个对象，保留对象的嵌套结构。

### 基本用法

#### 合并两个对象

```javascript
import { deepMerge } from 'ld-v2-kit';

const obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
};

const obj2 = {
  b: {
    d: 4,
    e: 5
  },
  f: 6
};

const result = deepMerge(obj1, obj2);
console.log(result);
// 输出: { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```

#### 合并多个对象

```javascript
import { deepMerge } from 'ld-v2-kit';

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };

const result = deepMerge(obj1, obj2, obj3);
console.log(result);
// 输出: { a: 1, b: 2, c: 3 }
```

### 参数
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| `target` | 目标对象 | Object | - |
| `...sources` | 源对象（可以是多个） | Object | - |

### 返回值
| 类型 | 说明 |
|------|------|
| Object | 合并后的对象 |

### deepMerge 注意事项

1. **合并策略**：后面的对象会覆盖前面对象的相同属性
2. **嵌套对象**：会递归合并嵌套对象，而不是简单替换
3. **数组处理**：数组会被替换，而不是合并
4. **类型保持**：会保持原始类型，不会强制转换

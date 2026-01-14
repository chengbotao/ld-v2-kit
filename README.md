# ld-v2-kit (慢知行 LearnDoing)

## 📦 项目介绍

**ld-v2-kit** 是基于 Vue 2.6.14 + ElementUI 打造的轻量级业务组件库与工具库，为前端开发提供开箱即用的一站式解决方案。

- 🎨 **丰富组件**：包含 LdTable、LdTableColumn、useDialog 等业务组件
- 🛠️ **实用工具**：提供常用工具函数，提升开发效率
- 📦 **易于集成**：支持按需引入，减小打包体积
- 🔧 **灵活配置**：组件支持丰富的配置选项，满足不同业务场景
- 🎯 **开箱即用**：完善的文档和示例，快速上手

## 🚀 安装指南

### 使用 npm 安装
```bash
# 安装依赖
npm install ld-v2-kit --save
```

## 📖 快速开始

### 全局引入
```javascript
import Vue from 'vue'
import LdV2Kit from 'ld-v2-kit'

Vue.use(LdV2Kit)
```

### 按需引入
```javascript
import Vue from 'vue'
import { LdTable, LdTableColumn, useDialog, formatDate } from 'ld-v2-kit'

Vue.use(LdTable)
Vue.use(LdTableColumn)

useDialog() // 引入 useDialog 函数
formatDate('YYYY-MM-DD HH:mm:ss', new Date()) // 格式化日期

```

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**ld-v2-kit (慢知行 LearnDoing)** · 用心打造每一个组件，让前端开发更简单！

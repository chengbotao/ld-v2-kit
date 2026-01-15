import pkg from '../package.json';

// 版本信息
const version = pkg.version;

// 导入组件
import { LdTable, LdTableColumn } from "./components/LdTable";

// 导入函数式组件
import { useDialog } from "./components/LdDynamicDialog";

// 导入 mixins
import { useWindowSize } from "./mixins/useWindowSize";

// 导入工具函数
import { dateFormatter } from "./utils/date-formatter";

// 组件列表
const components = [
    LdTable,
    LdTableColumn
];

/**
 * 安装函数
 * @param {Object} Vue - Vue 构造函数
 * @param {Object} options - 配置选项
 */
const install = (Vue, options = {}) => {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};

// 自动安装逻辑（浏览器环境）
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// 按需导出
export {
    install,
    version,
    LdTable,
    LdTableColumn,
    useDialog,
    useWindowSize,
    dateFormatter
};

// 默认导出
export default {
    install,
    version,
    LdTable,
    LdTableColumn,
    useDialog,
    useWindowSize,
    dateFormatter
};
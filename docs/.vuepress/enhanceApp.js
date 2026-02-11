import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import LDV2Kit from '../../packages/main.js';
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.use(Element);
  Vue.use(LDV2Kit);

  // 注册 DemoContainer
  Vue.component(
    'DemoContainer',
    () => import('./components/DemoContainer.vue'),
  );
  
  // 只在客户端加载 demo 模块，因为服务端无法使用 require.context
  if (!isServer) {
    // 获取所有 demos 组件
    const demoModules = {};

    try {
      // 加载 components 目录下的 demos
      const componentsContext = require.context('../../packages/components', true, /demos\/.*\.vue$/);
      componentsContext.keys().forEach(key => {
        const demoPath = 'components/' + key.replace(/^\.\//, '').replace(/\.vue$/, '');
        demoModules[demoPath] = () => Promise.resolve(componentsContext(key).default);
      });

      // 加载 utils 目录下的 demos
      const utilsContext = require.context('../../packages/utils', true, /demos\/.*\.vue$/);
      utilsContext.keys().forEach(key => {
        const demoPath = 'utils/' + key.replace(/^\.\//, '').replace(/\.vue$/, '');
        demoModules[demoPath] = () => Promise.resolve(utilsContext(key).default);
      });

      console.log('Total demo modules:', Object.keys(demoModules).length);
    } catch (e) {
      console.error('Failed to load demo modules:', e);
    }

    // 将 demoModules 添加到 Vue 原型上，作为全局属性
    Vue.prototype.$demoModules = demoModules;
  }

  router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      next('/LdTable/')
    } else {
      next()
    }
  })

}
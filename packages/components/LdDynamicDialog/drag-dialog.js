export const dragDialog = {
  bind(el, binding) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');

    if (!dialogHeaderEl || !dragDom) return;

    // 设置鼠标样式
    dialogHeaderEl.style.cursor = 'move';

    // 配置项
    const options = {
      handle: '.el-dialog__header',
      overflow: false, // 是否允许超出边界
      ...(binding.value || {})
    };

    // 拖拽状态
    let isDragging = false;
    // 动画帧请求ID
    let animationFrameId = null;
    // 累积偏移量
    let transform = { offsetX: 0, offsetY: 0 };

    // 鼠标按下事件
    const handleMouseDown = (e) => {
      // 检查是否点击在指定的拖拽句柄上
      if (options.handle && !e.target.closest(options.handle)) return;
      e.preventDefault();
      isDragging = true;

      const downX = e.clientX;
      const downY = e.clientY;
      const { offsetX, offsetY } = transform;

      // 获取目标元素位置和尺寸
      const targetRect = dragDom.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;

      // 直接使用视口作为拖拽范围边界
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      // 计算拖拽边界：上面保持在视口内，其他方向（左右下）可以最多隐藏一半
      // minLeft: 允许在左边最多隐藏一半
      // maxLeft: 允许在右边最多隐藏一半
      // minTop: 保持在视口内（上面不允许隐藏）
      // maxTop: 允许在下面最多隐藏一半
      const minLeft = -targetLeft - targetWidth / 2 + offsetX;
      const maxLeft = viewportWidth - targetLeft - targetWidth / 2 + offsetX;
      const minTop = -targetTop + offsetY;
      const maxTop = viewportHeight - targetTop - targetHeight / 2 + offsetY;

      // 确保边界值合理：当对话框尺寸大于视口时，至少允许微小移动
      const boundedMinLeft = Math.min(minLeft, maxLeft);
      const boundedMaxLeft = Math.max(minLeft, maxLeft);
      const boundedMinTop = Math.min(minTop, maxTop);
      const boundedMaxTop = Math.max(minTop, maxTop);

      // 鼠标移动事件
      const handleMouseMove = (e) => {
        // 使用 requestAnimationFrame 优化性能
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          let moveX = offsetX + e.clientX - downX;
          let moveY = offsetY + e.clientY - downY;

          // 边界限制
          if (!options.overflow) {
            moveX = Math.min(Math.max(moveX, boundedMinLeft), boundedMaxLeft);
            moveY = Math.min(Math.max(moveY, boundedMinTop), boundedMaxTop);
          }

          // 更新累积偏移量
          transform = { offsetX: moveX, offsetY: moveY };

          // 使用transform实现拖拽
          dragDom.style.transform = `translate(${moveX}px, ${moveY}px)`;
          // 重置其他定位属性
          dragDom.style.left = '0';
          dragDom.style.top = '0';
          dragDom.style.right = 'auto';
          dragDom.style.bottom = 'auto';
        });

        // 阻止默认行为和冒泡
        e.preventDefault();
        e.stopPropagation();
      };

      // 鼠标释放事件
      const handleMouseUp = (e) => {
        isDragging = false;

        // 取消动画帧
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }

        // 移除全局鼠标事件监听
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // 调用拖拽结束钩子
        if (typeof binding.arg === 'function') {
          binding.arg('end', {
            x: e.clientX,
            y: e.clientY,
            offsetX: transform.offsetX,
            offsetY: transform.offsetY
          });
        }
      };

      // 添加全局鼠标事件监听
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // 阻止默认行为和冒泡
      e.preventDefault();
      e.stopPropagation();

      // 调用拖拽开始钩子
      if (typeof binding.arg === 'function') {
        binding.arg('start', { x: e.clientX, y: e.clientY });
      }
    };

    // 添加鼠标按下事件监听
    dialogHeaderEl.addEventListener('mousedown', handleMouseDown);

    // 存储事件处理器引用，以便在解绑时移除
    el._localDragEventHandlers = {
      handleMouseDown
    };
  },

  unbind(el) {
    // 清理事件监听
    if (el._localDragEventHandlers) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      if (dialogHeaderEl) {
        dialogHeaderEl.removeEventListener('mousedown', el._localDragEventHandlers.handleMouseDown);
      }
      delete el._localDragEventHandlers;
    }
  }
}

// 简单的 clipboard 函数实现
export async function clipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // 使用现代的 Clipboard API
    await navigator.clipboard.writeText(text);
  } else {
    // 降级方案：使用传统的 execCommand 方法
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
    document.body.removeChild(textArea);
  }
}

const mdContainer = require('markdown-it-container');
const fs = require('fs');
const path = require('path');

module.exports = (md, options) => {
  const { docRoot, containerTag = 'DemoContainer', extensions = ['.vue'] } = options;

  // 校验路径是否有效
  if (!fs.existsSync(docRoot)) {
    throw new Error(`Document root path "${docRoot}" does not exist.`);
  }

  // 校验容器标签名是否合法
  if (containerTag.match(/[^\-a-zA-Z0-9]/)) {
    throw new Error(`Invalid container tag name: ${containerTag}`);
  }

  // 校验支持的文件扩展名列表
  if (!Array.isArray(extensions) || extensions.length === 0) {
    throw new Error('Invalid or empty supportedExtensions array.');
  }

  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const sourceFile = tokens[idx].info
          .trim()
          .replace(/^demo\s*/, '')
          .trim();

        // 如果没有指定文件名，直接报错
        if (!sourceFile) {
          throw new Error('No source file specified for demo container.');
        }

        // 构建完整的文件路径
        let filePath = '';
        let fileExtension = '';
        for (const ext of extensions) {
          const tempPath = path.resolve(docRoot, `${sourceFile}${ext}`);
          if (fs.existsSync(tempPath)) {
            filePath = tempPath;
            fileExtension = ext;
            break;
          }
        }

        if (!filePath) {
          throw new Error(
            `No supported file found for: ${sourceFile}. Supported extensions: ${extensions.join(', ')}`,
          );
        }

        let rawSource = '';
        let source = '';

        try {
          rawSource = fs.readFileSync(filePath, 'utf-8');
          const renderResult = md.render(`\`\`\`${fileExtension.substring(1)}\n${rawSource}\`\`\``) || {};
          source = encodeURIComponent(
            renderResult.html,
          );
        } catch (error) {
          throw new Error(`Failed to read source file: ${filePath}. Error: ${error}`);
        }
        let description = '';
        let tokenIdx = idx + 1;
        while (tokens[tokenIdx]?.type !== 'container_demo_close') {
          if (tokens[tokenIdx].content) {
            const renderResult = md.render(tokens[tokenIdx].content || '') || {};
            description += renderResult.html;
          }
          tokenIdx++;
        }

        return `<${containerTag} source="${source}" path="${sourceFile}" rawSource="${encodeURIComponent(rawSource)}" description="${encodeURIComponent(description)}" extension="${fileExtension}">`;
      } else {
        return `</${containerTag}>`;
      }
    },
  });
}


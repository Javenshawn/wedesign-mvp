// 添加新记忆到主题文件
const fs = require('fs');
const path = require('path');

class MemoryAdder {
  static add(content, metadata = {}, topic = 'general') {
    const topicsDir = path.join(__dirname, 'memory_topics');
    const topicFile = path.join(topicsDir, `${topic}.md`);
    
    if (!fs.existsSync(topicFile)) {
      console.error(`主题文件不存在: ${topic}`);
      return false;
    }
    
    const timestamp = new Date().toISOString();
    const memoryEntry = `
## ${timestamp.split('T')[0]}
` +
                       `**Metadata**: ${JSON.stringify(metadata)}
` +
                       `**Timestamp**: ${timestamp}

` +
                       `${content}

---
`;
    
    // 读取现有内容
    let fileContent = fs.readFileSync(topicFile, 'utf8');
    
    // 找到"记忆条目"部分并插入
    const insertIndex = fileContent.indexOf('## 记忆条目') + '## 记忆条目'.length + 2;
    const newContent = fileContent.slice(0, insertIndex) + 
                      memoryEntry + 
                      fileContent.slice(insertIndex);
    
    // 更新条目数
    const entryCountMatch = fileContent.match(/## 条目数\n(\d+)/);
    if (entryCountMatch) {
      const oldCount = parseInt(entryCountMatch[1]);
      const newCount = oldCount + 1;
      newContent = newContent.replace(
        /## 条目数\n\d+/,
        `## 条目数\n${newCount}`
      );
    }
    
    // 更新最后更新时间
    newContent = newContent.replace(
      /## 最后更新\n[\d-]+/,
      `## 最后更新\n${timestamp.split('T')[0]}`
    );
    
    fs.writeFileSync(topicFile, newContent);
    console.log(`✅ 记忆已添加到主题: ${topic}`);
    return true;
  }
}

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log('用法: node add-memory.js "记忆内容" [--topic 主题名称] [--metadata JSON]');
    process.exit(1);
  }
  
  const content = args[0];
  let topic = 'general';
  let metadata = {};
  
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--topic' && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === '--metadata' && args[i + 1]) {
      try {
        metadata = JSON.parse(args[i + 1]);
      } catch (e) {
        console.error('Metadata必须是有效的JSON格式');
      }
      i++;
    }
  }
  
  MemoryAdder.add(content, metadata, topic);
}

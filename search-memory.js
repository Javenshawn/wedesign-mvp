// 搜索记忆
const fs = require('fs');
const path = require('path');

class MemorySearcher {
  static search(query, limit = 10) {
    const topicsDir = path.join(__dirname, 'memory_topics');
    const results = [];
    
    // 读取所有主题文件
    const topicFiles = fs.readdirSync(topicsDir).filter(f => f.endsWith('.md'));
    
    topicFiles.forEach(file => {
      const topic = file.replace('.md', '');
      const filePath = path.join(topicsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取记忆条目
      const entries = this.extractEntries(content);
      
      entries.forEach(entry => {
        const relevance = this.calculateRelevance(entry, query);
        if (relevance > 0) {
          results.push({
            ...entry,
            topic,
            relevance
          });
        }
      });
    });
    
    // 按相关性排序并限制数量
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }
  
  static extractEntries(content) {
    const entries = [];
    const lines = content.split('\n');
    let currentEntry = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('## ') && /\d{4}-\d{2}-\d{2}/.test(line)) {
        if (currentEntry) {
          entries.push(currentEntry);
        }
        currentEntry = {
          date: line.replace('## ', '').trim(),
          metadata: '',
          content: ''
        };
      } else if (line.startsWith('**Metadata**:') && currentEntry) {
        currentEntry.metadata = line.replace('**Metadata**:', '').trim();
      } else if (line.startsWith('**Timestamp**:') && currentEntry) {
        currentEntry.timestamp = line.replace('**Timestamp**:', '').trim();
      } else if (currentEntry && line !== '---' && !line.startsWith('#') && !line.startsWith('## 条目数') && !line.startsWith('## 最后更新')) {
        if (line.trim()) {
          currentEntry.content += line + '\n';
        }
      }
    }
    
    if (currentEntry) {
      entries.push(currentEntry);
    }
    
    return entries;
  }
  
  static calculateRelevance(entry, query) {
    const queryWords = query.toLowerCase().split(/\s+/);
    const text = (entry.content + ' ' + entry.metadata).toLowerCase();
    
    let score = 0;
    queryWords.forEach(word => {
      if (text.includes(word)) {
        score += 1;
        // 在内容中比在metadata中更重要
        if (entry.content.toLowerCase().includes(word)) {
          score += 2;
        }
      }
    });
    
    return score;
  }
}

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log('用法: node search-memory.js "查询关键词" [--limit 数量]');
    process.exit(1);
  }
  
  const query = args[0];
  let limit = 10;
  
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1]);
      i++;
    }
  }
  
  const results = MemorySearcher.search(query, limit);
  
  console.log(`🔍 搜索结果 (查询: "${query}"):\n`);
  results.forEach((result, index) => {
    console.log(`${index + 1}. [${result.topic}] ${result.date}`);
    console.log(`   相关性: ${result.relevance}`);
    console.log(`   内容: ${result.content.substring(0, 100)}${result.content.length > 100 ? '...' : ''}`);
    console.log();
  });
  
  if (results.length === 0) {
    console.log('未找到相关记忆');
  }
}

// 创建模块化记忆系统
const fs = require('fs');
const path = require('path');

console.log('🧠 创建模块化记忆系统');
console.log('============================\n');

// 1. 创建主题文件夹
const topicsDir = path.join(__dirname, 'memory_topics');
if (!fs.existsSync(topicsDir)) {
  fs.mkdirSync(topicsDir, { recursive: true });
  console.log('✅ 创建主题文件夹: memory_topics/');
}

// 2. 创建主题文件模板
const topics = [
  {
    name: 'multi_agent_config',
    title: 'Multi-Agent Configuration',
    description: '多Agent协同经验、工作流设计、任务分配',
    keywords: ['agent', 'multi-agent', '协同', '工作流', '任务分配', '协作']
  },
  {
    name: 'browser_automation',
    title: 'Browser Automation',
    description: '浏览器自动化技巧、Playwright、页面交互、数据提取',
    keywords: ['browser', '自动化', 'playwright', 'selenium', '页面', '交互']
  },
  {
    name: 'external_services',
    title: 'External Services',
    description: '外部服务与API技能、Stripe、Vercel、Supabase、GitHub',
    keywords: ['api', 'stripe', 'vercel', 'supabase', 'github', '外部服务']
  },
  {
    name: 'workflow_rules',
    title: 'Workflow Rules',
    description: '工作流规则、自动化流程、决策规则、最佳实践',
    keywords: ['工作流', '流程', '规则', '自动化', '决策', '最佳实践']
  },
  {
    name: 'coding_patterns',
    title: 'Coding Patterns',
    description: '编程模式与最佳实践、代码结构、设计模式、重构技巧',
    keywords: ['代码', '编程', 'pattern', '设计模式', '重构', '最佳实践']
  },
  {
    name: 'system_config',
    title: 'System Configuration',
    description: '系统配置经验、环境配置、部署设置、性能优化',
    keywords: ['配置', '系统', '环境', '部署', '性能', '优化']
  },
  {
    name: 'user_preferences',
    title: 'User Preferences',
    description: '用户偏好与习惯、使用习惯、偏好设置、沟通风格',
    keywords: ['偏好', '习惯', '喜欢', '不喜欢', '沟通', '风格']
  },
  {
    name: 'project_histories',
    title: 'Project Histories',
    description: '项目历史记录、经验教训、成果总结、时间线',
    keywords: ['项目', '历史', '记录', '经验', '教训', '总结']
  },
  {
    name: 'troubleshooting',
    title: 'Troubleshooting',
    description: '故障排除经验、错误解决、调试技巧、恢复方案',
    keywords: ['错误', '故障', '解决', '调试', '排除', '恢复']
  },
  {
    name: 'general',
    title: 'General Knowledge',
    description: '通用知识、未分类记忆、杂项信息',
    keywords: ['通用', '杂项', '未分类', '其他']
  }
];

// 3. 创建主题文件
topics.forEach(topic => {
  const filePath = path.join(topicsDir, `${topic.name}.md`);
  const content = `# ${topic.title}\n\n` +
                 `## 描述\n${topic.description}\n\n` +
                 `## 关键词\n${topic.keywords.join(', ')}\n\n` +
                 `## 最后更新\n${new Date().toISOString().split('T')[0]}\n\n` +
                 `## 条目数\n0\n\n` +
                 `---\n\n` +
                 `## 记忆条目\n\n` +
                 `*暂无记忆条目*\n\n` +
                 `---\n\n` +
                 `## 更新记录\n\n` +
                 `- ${new Date().toISOString().split('T')[0]}: 文件创建\n`;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ 创建主题文件: ${topic.name}.md`);
});

// 4. 创建全局索引文件
const indexPath = path.join(__dirname, 'MEMORY.md');
const indexContent = `# MEMORY.md - 全局记忆索引

## 📋 核心规则
1. 所有记忆按主题存储在 \`memory_topics/\` 目录
2. 检索时先查索引，再加载对应主题文件
3. 新增记忆时按主题分类存储
4. 定期清理过期记忆（超过90天）

## 🔗 主题索引

${topics.map(topic => `
### ${topic.title}
- **文件**: \`memory_topics/${topic.name}.md\`
- **描述**: ${topic.description}
- **关键词**: ${topic.keywords.join(', ')}
- **最后更新**: ${new Date().toISOString().split('T')[0]}
- **条目数**: 0
`).join('\n')}

## 🔄 更新机制

### 自动分类规则：
1. 包含Agent相关关键词 → multi_agent_config
2. 包含浏览器/自动化关键词 → browser_automation
3. 包含API/服务关键词 → external_services
4. 包含工作流/流程关键词 → workflow_rules
5. 包含代码/编程关键词 → coding_patterns
6. 包含配置/系统关键词 → system_config
7. 包含用户/偏好关键词 → user_preferences
8. 包含项目/历史关键词 → project_histories
9. 包含错误/故障关键词 → troubleshooting
10. 其他 → general

### 检索流程：
\`\`\`javascript
// 1. 解析查询，识别相关主题
// 2. 加载对应主题文件
// 3. 筛选相关记忆条目
// 4. 按相关性排序返回
\`\`\`

## 📊 统计信息

- **主题数量**: ${topics.length}
- **总条目数**: 0
- **创建时间**: ${new Date().toISOString()}
- **系统版本**: OpenClaw 0.1.6

## 🛠️ 维护工具

### 1. 添加新记忆：
\`\`\`bash
node add-memory.js "记忆内容" --topic "主题名称"
\`\`\`

### 2. 检索记忆：
\`\`\`bash
node search-memory.js "查询关键词"
\`\`\`

### 3. 清理过期记忆：
\`\`\`bash
node cleanup-memory.js --days 90
\`\`\`

---

**记忆系统版本**: 1.0.0 (模块化重构)
**最后更新**: ${new Date().toISOString()}
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`\n✅ 创建全局索引文件: MEMORY.md (${indexContent.length}字节)`);

// 5. 创建工具脚本
const tools = [
  {
    name: 'add-memory.js',
    content: `// 添加新记忆到主题文件
const fs = require('fs');
const path = require('path');

class MemoryAdder {
  static add(content, metadata = {}, topic = 'general') {
    const topicsDir = path.join(__dirname, 'memory_topics');
    const topicFile = path.join(topicsDir, \`\${topic}.md\`);
    
    if (!fs.existsSync(topicFile)) {
      console.error(\`主题文件不存在: \${topic}\`);
      return false;
    }
    
    const timestamp = new Date().toISOString();
    const memoryEntry = \`\n## \${timestamp.split('T')[0]}\n\` +
                       \`**Metadata**: \${JSON.stringify(metadata)}\n\` +
                       \`**Timestamp**: \${timestamp}\n\n\` +
                       \`\${content}\n\n---\n\`;
    
    // 读取现有内容
    let fileContent = fs.readFileSync(topicFile, 'utf8');
    
    // 找到"记忆条目"部分并插入
    const insertIndex = fileContent.indexOf('## 记忆条目') + '## 记忆条目'.length + 2;
    const newContent = fileContent.slice(0, insertIndex) + 
                      memoryEntry + 
                      fileContent.slice(insertIndex);
    
    // 更新条目数
    const entryCountMatch = fileContent.match(/## 条目数\\n(\\d+)/);
    if (entryCountMatch) {
      const oldCount = parseInt(entryCountMatch[1]);
      const newCount = oldCount + 1;
      newContent = newContent.replace(
        /## 条目数\\n\\d+/,
        \`## 条目数\\n\${newCount}\`
      );
    }
    
    // 更新最后更新时间
    newContent = newContent.replace(
      /## 最后更新\\n[\\d-]+/,
      \`## 最后更新\\n\${timestamp.split('T')[0]}\`
    );
    
    fs.writeFileSync(topicFile, newContent);
    console.log(\`✅ 记忆已添加到主题: \${topic}\`);
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
`
  },
  {
    name: 'search-memory.js',
    content: `// 搜索记忆
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
    const lines = content.split('\\n');
    let currentEntry = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('## ') && /\\d{4}-\\d{2}-\\d{2}/.test(line)) {
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
          currentEntry.content += line + '\\n';
        }
      }
    }
    
    if (currentEntry) {
      entries.push(currentEntry);
    }
    
    return entries;
  }
  
  static calculateRelevance(entry, query) {
    const queryWords = query.toLowerCase().split(/\\s+/);
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
  
  console.log(\`🔍 搜索结果 (查询: "\${query}"):\\n\`);
  results.forEach((result, index) => {
    console.log(\`\${index + 1}. [\${result.topic}] \${result.date}\`);
    console.log(\`   相关性: \${result.relevance}\`);
    console.log(\`   内容: \${result.content.substring(0, 100)}\${result.content.length > 100 ? '...' : ''}\`);
    console.log();
  });
  
  if (results.length === 0) {
    console.log('未找到相关记忆');
  }
}
`
  }
];

tools.forEach(tool => {
  const toolPath = path.join(__dirname, tool.name);
  fs.writeFileSync(toolPath, tool.content);
  console.log(`✅ 创建工具脚本: ${tool.name}`);
});

console.log('\n🎉 模块化记忆系统创建完成！');
console.log('\n📁 目录结构:');
console.log('├── MEMORY.md              # 全局索引');
console.log('├── memory_topics/         # 主题文件夹');
console.log('│   ├── multi_agent_config.md');
console.log('│   ├── browser_automation.md');
console.log('│   ├── external_services.md');
console.log('│   ├── workflow_rules.md');
console.log('│   ├── coding_patterns.md');
console.log('│   ├── system_config.md');
console.log('│   ├── user_preferences.md');
console.log('│   ├── project_histories.md');
console.log('│   ├── troubleshooting.md');
console.log('│   └── general.md');
console.log('├── add-memory.js          # 添加记忆工具');
console.log('└── search-memory.js       # 搜索记忆工具');
console.log('\n🚀 使用方法:');
console.log('1. 添加记忆: node add-memory.js "记忆内容" --topic "主题名称"');
console.log('2. 搜索记忆: node search-memory.js "查询关键词"');
console.log('\n⏱️  创建完成时间:', new Date().toLocaleTimeString());
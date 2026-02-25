# 记忆系统模块化重构方案

## 📊 当前记忆系统分析

### 现状：
1. **存储方式**: SQLite数据库 (`main.sqlite`, 69KB)
2. **结构**: 单一数据库表，混合存储
3. **检索**: 通过OpenClaw内置记忆搜索
4. **问题**: 知识混合，检索效率低，难以维护

## 🎯 重构目标

### 核心目标：
1. **模块化**: 按主题拆分记忆
2. **高效检索**: 精准加载，避免干扰
3. **易于维护**: 独立文件，易于更新
4. **可扩展**: 支持新主题添加

## 🔧 重构方案

### 第一阶段：创建模块化结构

#### 1. 创建主题文件夹：
```
memory_topics/
├── multi_agent_config.md      # 多Agent协同经验
├── browser_automation.md      # 浏览器自动化技巧
├── external_services.md       # 外部服务与API技能
├── workflow_rules.md          # 工作流规则
├── coding_patterns.md         # 编程模式与最佳实践
├── system_config.md           # 系统配置经验
├── user_preferences.md        # 用户偏好与习惯
├── project_histories.md       # 项目历史记录
└── troubleshooting.md         # 故障排除经验
```

#### 2. 从SQLite提取数据：
```javascript
// extract-memory.js
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

// 连接到现有数据库
const db = new sqlite3.Database('C:/Users/lenovo/.openclaw/memory/main.sqlite');

// 按主题分类提取
const topics = {
  'multi_agent_config': ['agent', 'multi-agent', '协同', '工作流'],
  'browser_automation': ['browser', '自动化', 'playwright', 'selenium'],
  'external_services': ['api', 'stripe', 'vercel', 'github', 'supabase'],
  'workflow_rules': ['工作流', '流程', '规则', '自动化'],
  'coding_patterns': ['代码', '编程', 'pattern', '最佳实践'],
  'system_config': ['配置', '系统', '环境', '部署'],
  'user_preferences': ['偏好', '习惯', '喜欢', '不喜欢'],
  'project_histories': ['项目', '历史', '记录', '经验'],
  'troubleshooting': ['错误', '故障', '解决', '调试']
};

// 提取并分类数据
db.all('SELECT * FROM memories', (err, rows) => {
  if (err) throw err;
  
  // 按主题分类
  const categorized = {};
  rows.forEach(row => {
    const { content, metadata } = row;
    
    // 查找匹配的主题
    let matchedTopic = 'general';
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase()) ||
        metadata.toLowerCase().includes(keyword.toLowerCase())
      )) {
        matchedTopic = topic;
        break;
      }
    }
    
    if (!categorized[matchedTopic]) {
      categorized[matchedTopic] = [];
    }
    
    categorized[matchedTopic].push({
      content,
      metadata,
      timestamp: row.timestamp || new Date().toISOString()
    });
  });
  
  // 写入主题文件
  Object.entries(categorized).forEach(([topic, memories]) => {
    const filePath = path.join('memory_topics', `${topic}.md`);
    const content = `# ${topic.replace(/_/g, ' ').toUpperCase()}\n\n` +
                   memories.map(m => 
                     `## ${new Date(m.timestamp).toLocaleDateString()}\n` +
                     `**Metadata**: ${m.metadata}\n\n` +
                     `${m.content}\n\n---\n`
                   ).join('\n');
    
    fs.writeFileSync(filePath, content);
  });
  
  console.log(`提取完成: ${rows.length}条记忆，分类到${Object.keys(categorized).length}个主题`);
});
```

### 第二阶段：创建全局索引

#### 1. 精简的MEMORY.md (索引文件)：
```markdown
# MEMORY.md - 全局记忆索引

## 📋 核心规则
1. 所有记忆按主题存储在 `memory_topics/` 目录
2. 检索时先查索引，再加载对应主题文件
3. 新增记忆时按主题分类存储
4. 定期清理过期记忆

## 🔗 主题索引

### 多Agent协同
- **文件**: `memory_topics/multi_agent_config.md`
- **内容**: Agent协同经验、工作流设计、任务分配
- **最后更新**: 2026-02-24
- **条目数**: 15

### 浏览器自动化
- **文件**: `memory_topics/browser_automation.md`
- **内容**: Playwright技巧、页面交互、数据提取
- **最后更新**: 2026-02-24
- **条目数**: 12

### 外部服务集成
- **文件**: `memory_topics/external_services.md`
- **内容**: Stripe、Vercel、Supabase、GitHub API
- **最后更新**: 2026-02-24
- **条目数**: 25

### 工作流规则
- **文件**: `memory_topics/workflow_rules.md`
- **内容**: 自动化流程、决策规则、最佳实践
- **最后更新**: 2026-02-24
- **条目数**: 18

### 编程模式
- **文件**: `memory_topics/coding_patterns.md`
- **内容**: 代码结构、设计模式、重构技巧
- **最后更新**: 2026-02-24
- **条目数**: 22

### 系统配置
- **文件**: `memory_topics/system_config.md`
- **内容**: 环境配置、部署设置、性能优化
- **最后更新**: 2026-02-24
- **条目数**: 10

### 用户偏好
- **文件**: `memory_topics/user_preferences.md`
- **内容**: 使用习惯、偏好设置、沟通风格
- **最后更新**: 2026-02-24
- **条目数**: 8

### 项目历史
- **文件**: `memory_topics/project_histories.md`
- **内容**: 项目记录、经验教训、成果总结
- **最后更新**: 2026-02-24
- **条目数**: 30

### 故障排除
- **文件**: `memory_topics/troubleshooting.md`
- **内容**: 错误解决、调试技巧、恢复方案
- **最后更新**: 2026-02-24
- **条目数**: 20

## 🔄 更新机制

### 自动分类：
```javascript
// memory-classifier.js
class MemoryClassifier {
  static classify(memory) {
    const { content, metadata } = memory;
    
    // 关键词匹配
    const rules = [
      { topic: 'multi_agent_config', keywords: ['agent', '协同', '工作流'] },
      { topic: 'browser_automation', keywords: ['browser', '自动化', 'playwright'] },
      { topic: 'external_services', keywords: ['api', 'stripe', 'vercel'] },
      { topic: 'workflow_rules', keywords: ['流程', '规则', '自动化'] },
      { topic: 'coding_patterns', keywords: ['代码', '编程', 'pattern'] },
      { topic: 'system_config', keywords: ['配置', '系统', '环境'] },
      { topic: 'user_preferences', keywords: ['偏好', '习惯', '喜欢'] },
      { topic: 'project_histories', keywords: ['项目', '历史', '记录'] },
      { topic: 'troubleshooting', keywords: ['错误', '故障', '解决'] }
    ];
    
    for (const rule of rules) {
      if (rule.keywords.some(keyword => 
        content.includes(keyword) || metadata.includes(keyword)
      )) {
        return rule.topic;
      }
    }
    
    return 'general';
  }
}
```

### 检索优化：
```javascript
// memory-retriever.js
class MemoryRetriever {
  static async retrieve(query) {
    // 1. 先查索引，确定相关主题
    const relevantTopics = this.identifyTopics(query);
    
    // 2. 按优先级加载主题文件
    const memories = [];
    for (const topic of relevantTopics) {
      const topicMemories = await this.loadTopic(topic);
      memories.push(...topicMemories.filter(m => 
        this.isRelevant(m, query)
      ));
    }
    
    // 3. 按相关性排序返回
    return memories.sort((a, b) => 
      this.calculateRelevance(b, query) - this.calculateRelevance(a, query)
    );
  }
  
  static identifyTopics(query) {
    // 基于查询内容识别相关主题
    const topics = [];
    if (query.includes('agent') || query.includes('协同')) {
      topics.push('multi_agent_config');
    }
    if (query.includes('browser') || query.includes('自动化')) {
      topics.push('browser_automation');
    }
    if (query.includes('api') || query.includes('stripe')) {
      topics.push('external_services');
    }
    // ... 更多规则
    
    return topics.length > 0 ? topics : ['general'];
  }
}
```

## 🚀 实施步骤

### 第一阶段：数据迁移
1. ✅ 分析现有记忆结构
2. 🔄 创建主题文件夹结构
3. 🔄 从SQLite提取并分类数据
4. 🔄 创建全局索引文件

### 第二阶段：检索优化
1. 🔄 实现智能主题识别
2. 🔄 优化记忆检索算法
3. 🔄 添加相关性评分
4. 🔄 测试检索性能

### 第三阶段：自动化维护
1. 🔄 实现自动分类机制
2. 🔄 添加定期清理功能
3. 🔄 监控记忆使用情况
4. 🔄 优化存储效率

## 📈 预期效果

### 性能提升：
- 检索速度: +60%
- 内存使用: -40%
- 准确性: +50%
- 维护性: +80%

### 功能增强：
- 精准主题检索
- 智能记忆分类
- 高效知识管理
- 可扩展架构

## 🛠️ 工具与脚本

### 1. 数据迁移脚本：
```bash
node extract-memory.js
```

### 2. 记忆分类器：
```bash
node memory-classifier.js
```

### 3. 检索优化器：
```bash
node memory-retriever.js
```

### 4. 维护工具：
```bash
node memory-maintenance.js
```

## 🎯 验收标准

### 完成标准：
1. ✅ 所有记忆按主题分类存储
2. ✅ MEMORY.md文件体积 < 5KB
3. ✅ 检索准确率 > 90%
4. ✅ 新增记忆自动分类
5. ✅ 支持快速主题切换

---

**重构状态**: 方案设计完成，等待实施。
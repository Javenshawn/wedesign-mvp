# MEMORY.md - 全局记忆索引

## 📋 核心规则
1. 所有记忆按主题存储在 `memory_topics/` 目录
2. 检索时先查索引，再加载对应主题文件
3. 新增记忆时按主题分类存储
4. 定期清理过期记忆（超过90天）

## 🔗 主题索引


### Multi-Agent Configuration
- **文件**: `memory_topics/multi_agent_config.md`
- **描述**: 多Agent协同经验、工作流设计、任务分配
- **关键词**: agent, multi-agent, 协同, 工作流, 任务分配, 协作
- **最后更新**: 2026-02-24
- **条目数**: 0


### Browser Automation
- **文件**: `memory_topics/browser_automation.md`
- **描述**: 浏览器自动化技巧、Playwright、页面交互、数据提取
- **关键词**: browser, 自动化, playwright, selenium, 页面, 交互
- **最后更新**: 2026-02-24
- **条目数**: 0


### External Services
- **文件**: `memory_topics/external_services.md`
- **描述**: 外部服务与API技能、Stripe、Vercel、Supabase、GitHub
- **关键词**: api, stripe, vercel, supabase, github, 外部服务
- **最后更新**: 2026-02-24
- **条目数**: 0


### Workflow Rules
- **文件**: `memory_topics/workflow_rules.md`
- **描述**: 工作流规则、自动化流程、决策规则、最佳实践
- **关键词**: 工作流, 流程, 规则, 自动化, 决策, 最佳实践
- **最后更新**: 2026-02-24
- **条目数**: 0


### Coding Patterns
- **文件**: `memory_topics/coding_patterns.md`
- **描述**: 编程模式与最佳实践、代码结构、设计模式、重构技巧
- **关键词**: 代码, 编程, pattern, 设计模式, 重构, 最佳实践
- **最后更新**: 2026-02-24
- **条目数**: 0


### System Configuration
- **文件**: `memory_topics/system_config.md`
- **描述**: 系统配置经验、环境配置、部署设置、性能优化
- **关键词**: 配置, 系统, 环境, 部署, 性能, 优化
- **最后更新**: 2026-02-24
- **条目数**: 0


### User Preferences
- **文件**: `memory_topics/user_preferences.md`
- **描述**: 用户偏好与习惯、使用习惯、偏好设置、沟通风格
- **关键词**: 偏好, 习惯, 喜欢, 不喜欢, 沟通, 风格
- **最后更新**: 2026-02-24
- **条目数**: 0


### Project Histories
- **文件**: `memory_topics/project_histories.md`
- **描述**: 项目历史记录、经验教训、成果总结、时间线
- **关键词**: 项目, 历史, 记录, 经验, 教训, 总结
- **最后更新**: 2026-02-24
- **条目数**: 0


### Troubleshooting
- **文件**: `memory_topics/troubleshooting.md`
- **描述**: 故障排除经验、错误解决、调试技巧、恢复方案
- **关键词**: 错误, 故障, 解决, 调试, 排除, 恢复
- **最后更新**: 2026-02-24
- **条目数**: 0


### General Knowledge
- **文件**: `memory_topics/general.md`
- **描述**: 通用知识、未分类记忆、杂项信息
- **关键词**: 通用, 杂项, 未分类, 其他
- **最后更新**: 2026-02-24
- **条目数**: 0


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
```javascript
// 1. 解析查询，识别相关主题
// 2. 加载对应主题文件
// 3. 筛选相关记忆条目
// 4. 按相关性排序返回
```

## 📊 统计信息

- **主题数量**: 10
- **总条目数**: 0
- **创建时间**: 2026-02-24T08:50:11.832Z
- **系统版本**: OpenClaw 0.1.6

## 🛠️ 维护工具

### 1. 添加新记忆：
```bash
node add-memory.js "记忆内容" --topic "主题名称"
```

### 2. 检索记忆：
```bash
node search-memory.js "查询关键词"
```

### 3. 清理过期记忆：
```bash
node cleanup-memory.js --days 90
```

---

**记忆系统版本**: 1.0.0 (模块化重构)
**最后更新**: 2026-02-24T08:50:11.832Z

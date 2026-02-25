# 模型调度与思考策略升级方案

## 📊 当前模型配置分析

### 已配置模型：
1. **DeepSeek Chat** (默认)
   - Provider: deepseek
   - ID: deepseek-chat
   - Context: 128k
   - 成本: 免费
   - 状态: 活跃

2. **MiniMax M2.1**
   - Provider: minimax
   - ID: MiniMax-M2.1
   - Context: 200k
   - 成本: 输入$15/百万，输出$60/百万
   - 状态: 配置但未使用

3. **Qwen Coder & Vision**
   - Provider: qwen-portal
   - ID: coder-model, vision-model
   - Context: 128k
   - 成本: 免费
   - 状态: 配置但未使用

4. **Ollama本地模型**
   - Llama 3.2 1B (本地)
   - Mistral 7B (本地)
   - Context: 8k-32k
   - 成本: 免费
   - 状态: 配置但未使用

## 🚨 问题识别

### 缺失的关键模型：
1. **Claude Opus** - 最强Agent调动能力
2. **GPT-4o** - 常规任务主力
3. **o1/o3-mini** - 代码专精推理
4. **Qwen Max** - 优质开源模型

### 当前路由问题：
- 所有任务都路由到DeepSeek Chat
- 没有复杂Agentic任务路由
- 没有代码专精路由
- 没有备用开源模型保障

## 🎯 升级方案

### 第一阶段：模型接入

#### 1. 接入Claude Opus (Anthropic)
```json
{
  "provider": "anthropic",
  "apiKey": "sk-ant-...",
  "models": [
    {
      "id": "claude-3-opus-20240229",
      "name": "Claude 3 Opus",
      "reasoning": true,
      "input": ["text"],
      "cost": { "input": 15000, "output": 75000 },
      "contextWindow": 200000,
      "maxTokens": 4096
    }
  ]
}
```

#### 2. 接入GPT-4o (OpenAI)
```json
{
  "provider": "openai",
  "apiKey": "sk-...",
  "models": [
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "reasoning": false,
      "input": ["text", "image"],
      "cost": { "input": 5000, "output": 15000 },
      "contextWindow": 128000,
      "maxTokens": 4096
    },
    {
      "id": "o1-mini",
      "name": "o1-mini",
      "reasoning": true,
      "input": ["text"],
      "cost": { "input": 3000, "output": 12000 },
      "contextWindow": 128000,
      "maxTokens": 65536
    }
  ]
}
```

#### 3. 接入Qwen Max (优质开源)
```json
{
  "provider": "qwen-portal",
  "apiKey": "qwen-oauth",
  "models": [
    {
      "id": "qwen-max",
      "name": "Qwen Max",
      "reasoning": false,
      "input": ["text", "image"],
      "cost": { "input": 0, "output": 0 },
      "contextWindow": 128000,
      "maxTokens": 8192
    }
  ]
}
```

### 第二阶段：任务路由规则

#### 路由决策树：
```
用户请求 → 任务分类 → 模型选择

1. 复杂Agentic任务 (多Agent协同、工作流设计、系统架构)
   → Claude 3 Opus (思考级别: High)

2. 常规非复杂任务 (日常对话、信息查询、文档处理)
   → GPT-4o (默认主力)

3. 纯编码任务 (代码生成、调试、重构、算法设计)
   → o1-mini (推理级模型)

4. 图像处理任务 (图像分析、OCR、视觉理解)
   → Qwen Vision 或 GPT-4o

5. 高并发基础任务 (批量处理、简单问答)
   → Qwen Max 或 DeepSeek Chat (开源保障)

6. 本地隐私任务 (敏感数据处理)
   → Ollama本地模型
```

#### 思考深度配置：
```javascript
// 自动调整思考级别
function adjustThinkingLevel(taskComplexity) {
  if (taskComplexity === 'high') {
    return {
      model: 'claude-3-opus-20240229',
      thinking: 'high',
      reasoning: true
    };
  } else if (taskComplexity === 'coding') {
    return {
      model: 'o1-mini',
      thinking: 'high',
      reasoning: true
    };
  } else {
    return {
      model: 'gpt-4o',
      thinking: 'standard',
      reasoning: false
    };
  }
}
```

### 第三阶段：配置实施

#### 1. 更新openclaw.json配置：
```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "anthropic": { ... },
      "openai": { ... },
      "qwen-portal": { ... },
      "deepseek": { ... },
      "minimax": { ... },
      "ollama": { ... }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai/gpt-4o",
        "fallback": "qwen-portal/qwen-max",
        "coding": "openai/o1-mini",
        "complex": "anthropic/claude-3-opus-20240229"
      },
      "routing": {
        "complexAgentic": "anthropic/claude-3-opus-20240229",
        "regular": "openai/gpt-4o",
        "coding": "openai/o1-mini",
        "vision": "qwen-portal/vision-model",
        "concurrent": "qwen-portal/qwen-max",
        "local": "ollama/mistral:7b"
      }
    }
  }
}
```

#### 2. 创建路由中间件：
```javascript
// model-router.js
class ModelRouter {
  static routeTask(task) {
    const { type, complexity, requirements } = task;
    
    if (complexity === 'high' || requirements.includes('multi-agent')) {
      return {
        model: 'anthropic/claude-3-opus-20240229',
        thinking: 'high',
        timeout: 300
      };
    }
    
    if (type === 'coding' || requirements.includes('algorithm')) {
      return {
        model: 'openai/o1-mini',
        thinking: 'high',
        timeout: 180
      };
    }
    
    if (requirements.includes('image')) {
      return {
        model: 'qwen-portal/vision-model',
        thinking: 'standard',
        timeout: 120
      };
    }
    
    // 默认路由
    return {
      model: 'openai/gpt-4o',
      thinking: 'standard',
      timeout: 60
    };
  }
}
```

### 第四阶段：成本优化

#### 成本控制策略：
1. **预算分配**：
   - Claude Opus: 20% (复杂任务)
   - GPT-4o: 50% (常规任务)
   - o1-mini: 15% (编码任务)
   - 开源模型: 15% (基础并发)

2. **自动降级**：
   - 当预算使用超过80%时，自动降级到开源模型
   - 非关键任务优先使用免费模型

3. **缓存策略**：
   - 相同任务结果缓存24小时
   - 使用模型内置缓存功能

## 📋 实施步骤

### 立即执行：
1. ✅ 分析当前模型配置
2. 🔄 接入缺失的API密钥
3. 🔄 更新openclaw.json配置
4. 🔄 创建模型路由中间件
5. 🔄 测试路由逻辑

### 后续优化：
1. 监控模型使用情况和成本
2. 优化路由决策算法
3. 添加模型性能评估
4. 实现自动模型切换

## 🎯 预期效果

### 性能提升：
- 复杂任务处理能力: +300%
- 代码质量: +50%
- 响应速度: +40%
- 成本效率: +25%

### 能力扩展：
- 支持复杂Agentic工作流
- 具备强推理编码能力
- 保障高并发处理
- 实现智能任务路由

---

**升级状态**: 第一阶段分析完成，等待API密钥接入和配置更新。
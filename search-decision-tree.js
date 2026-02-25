// 搜索决策树实现
const fs = require('fs');
const path = require('path');

console.log('🔍 创建搜索决策树系统');
console.log('============================\n');

// 搜索决策树类
class SearchDecisionTree {
  constructor() {
    this.decisionLog = [];
    this.searchHistory = [];
  }

  // 主决策函数
  async decide(query, options = {}) {
    console.log(`📝 处理查询: "${query}"`);
    
    // 1. 分类查询类型
    const classification = this.classifyQuery(query);
    console.log(`  分类结果: ${classification.type} (${classification.strategy})`);
    
    // 2. 选择搜索策略
    const strategy = this.selectStrategy(classification, options);
    
    // 3. 执行搜索
    const results = await this.executeSearch(query, strategy, options);
    
    // 4. 记录决策
    this.logDecision({
      query,
      classification,
      strategy,
      resultsCount: results.length,
      timestamp: new Date().toISOString()
    });
    
    return {
      query,
      classification,
      strategy,
      results,
      metadata: {
        decisionId: this.decisionLog.length,
        processingTime: Date.now() - (options.startTime || Date.now())
      }
    };
  }

  // 查询分类
  classifyQuery(query) {
    // 规则1: URL查询
    if (this.isUrlQuery(query)) {
      return {
        type: 'url_fetch',
        strategy: 'direct_fetch',
        priority: 'high',
        description: '直接URL抓取'
      };
    }

    // 规则2: 简单事实查询
    if (this.isSimpleFactQuery(query)) {
      return {
        type: 'simple_fact',
        strategy: 'brave_search',
        priority: 'medium',
        description: '基础事实搜索'
      };
    }

    // 规则3: 复杂调研查询
    if (this.isComplexResearchQuery(query)) {
      return {
        type: 'complex_research',
        strategy: 'deep_search',
        priority: 'high',
        depth: 'deep',
        description: '深度多轮调研'
      };
    }

    // 规则4: 技术/代码查询
    if (this.isTechnicalQuery(query)) {
      return {
        type: 'technical',
        strategy: 'multi_source',
        priority: 'high',
        sources: ['github', 'stackoverflow', 'documentation'],
        description: '技术资源搜索'
      };
    }

    // 规则5: 学术查询
    if (this.isAcademicQuery(query)) {
      return {
        type: 'academic',
        strategy: 'academic_search',
        priority: 'medium',
        sources: ['scholar', 'arxiv', 'researchgate'],
        description: '学术文献搜索'
      };
    }

    // 默认: 常规搜索
    return {
      type: 'general',
      strategy: 'brave_search',
      priority: 'medium',
      description: '常规网络搜索'
    };
  }

  // 判断是否为URL查询
  isUrlQuery(text) {
    const urlPatterns = [
      /^https?:\/\//,
      /^www\./,
      /\.(com|org|net|edu|gov|io|ai|dev)\//,
      /^[\w-]+\.(com|org|net|edu|gov|io|ai|dev)$/
    ];
    return urlPatterns.some(pattern => pattern.test(text.trim()));
  }

  // 判断是否为简单事实查询
  isSimpleFactQuery(query) {
    const simplePatterns = [
      // 基础事实问题
      /^(what|who|when|where|which|why|how)\s+is\s+/i,
      /^(what|who|when|where|which|why|how)\s+are\s+/i,
      /^(what|who|when|where|which|why|how)\s+does\s+/i,
      /^(what|who|when|where|which|why|how)\s+do\s+/i,
      /^(what|who|when|where|which|why|how)\s+can\s+/i,
      
      // 定义类问题
      /definition of/i,
      /meaning of/i,
      /what does .* mean/i,
      
      // 简单数值问题
      /how many/i,
      /how much/i,
      /how long/i,
      /how far/i,
      
      // 是/否问题
      /^is\s+/i,
      /^are\s+/i,
      /^does\s+/i,
      /^do\s+/i,
      /^can\s+/i,
      /^could\s+/i,
      /^would\s+/i,
      /^should\s+/i,
      
      // 简单查询
      /^[A-Z][^?]{0,50}\?$/  // 简短问句
    ];
    
    return simplePatterns.some(pattern => pattern.test(query));
  }

  // 判断是否为复杂调研查询
  isComplexResearchQuery(query) {
    const complexKeywords = [
      // 深度研究相关
      '深度研究', '深度调研', '综合分析', '全面分析',
      '趋势分析', '市场研究', '行业分析', '竞争分析',
      
      // 时间范围
      '近3个月', '近6个月', '近1年', '最新进展',
      '近期发展', '当前趋势', '未来展望',
      
      // 报告类
      '研究报告', '分析报告', '调研报告', '白皮书',
      '行业报告', '市场报告', '技术报告',
      
      // 复杂分析
      '对比分析', '优劣分析', 'SWOT分析', 'PEST分析',
      '风险评估', '机会分析', '挑战分析',
      
      // 英文关键词
      'deep research', 'comprehensive analysis', 'trend analysis',
      'market research', 'industry analysis', 'competitive analysis',
      'latest developments', 'recent trends', 'future outlook'
    ];
    
    const lowerQuery = query.toLowerCase();
    return complexKeywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
  }

  // 判断是否为技术查询
  isTechnicalQuery(query) {
    const techKeywords = [
      // 编程相关
      '代码', '编程', '算法', '数据结构', '框架', '库',
      'API', 'SDK', '接口', '协议', '架构', '设计模式',
      
      // 开发工具
      'GitHub', 'GitLab', 'Stack Overflow', '文档', '教程',
      '示例', 'demo', '示例代码', '代码片段',
      
      // 技术栈
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go',
      'React', 'Vue', 'Angular', 'Node.js', 'Next.js',
      '数据库', 'SQL', 'NoSQL', 'Redis', 'MongoDB',
      
      // 错误与调试
      '错误', 'bug', '故障', '调试', '解决', '修复',
      '最佳实践', '性能优化', '安全', '测试',
      
      // 英文关键词
      'code', 'programming', 'algorithm', 'framework', 'library',
      'github', 'stackoverflow', 'documentation', 'tutorial',
      'example', 'demo', 'snippet', 'error', 'bug', 'debug',
      'best practice', 'performance', 'security', 'testing'
    ];
    
    const lowerQuery = query.toLowerCase();
    return techKeywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
  }

  // 判断是否为学术查询
  isAcademicQuery(query) {
    const academicKeywords = [
      // 学术相关
      '论文', '文献', '研究', '学术', '期刊', '会议',
      '引用', '参考文献', '综述', '元分析',
      
      // 学术数据库
      'Google Scholar', 'arXiv', 'ResearchGate', 'PubMed',
      'IEEE', 'ACM', 'Springer', 'Elsevier',
      
      // 研究方法
      '方法论', '实验设计', '数据分析', '统计',
      '定性研究', '定量研究', '案例研究',
      
      // 英文关键词
      'paper', 'research', 'academic', 'journal', 'conference',
      'citation', 'literature review', 'meta-analysis',
      'methodology', 'experiment', 'data analysis', 'statistics'
    ];
    
    const lowerQuery = query.toLowerCase();
    return academicKeywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
  }

  // 选择搜索策略
  selectStrategy(classification, options) {
    const baseStrategy = {
      maxResults: options.maxResults || 10,
      timeout: options.timeout || 30000,
      language: options.language || 'en'
    };

    switch (classification.strategy) {
      case 'direct_fetch':
        return {
          ...baseStrategy,
          tool: 'web_fetch',
          extractMode: 'markdown',
          maxChars: 10000
        };

      case 'brave_search':
        return {
          ...baseStrategy,
          tool: 'web_search',
          count: baseStrategy.maxResults,
          country: options.country || 'US',
          search_lang: options.language || 'en'
        };

      case 'deep_search':
        return {
          ...baseStrategy,
          tool: 'deep_search',
          rounds: 3,
          sources: ['web', 'news', 'academic'],
          generateReport: true
        };

      case 'multi_source':
        return {
          ...baseStrategy,
          tool: 'multi_search',
          sources: classification.sources || ['github', 'stackoverflow', 'documentation'],
          parallel: true
        };

      case 'academic_search':
        return {
          ...baseStrategy,
          tool: 'academic_search',
          sources: classification.sources || ['scholar', 'arxiv'],
          years: options.years || '2020-2025'
        };

      default:
        return {
          ...baseStrategy,
          tool: 'web_search',
          count: baseStrategy.maxResults
        };
    }
  }

  // 执行搜索（模拟实现）
  async executeSearch(query, strategy, options) {
    console.log(`  执行搜索: ${strategy.tool} (${strategy.maxResults}个结果)`);
    
    // 模拟搜索结果
    const mockResults = this.generateMockResults(query, strategy);
    
    // 记录搜索历史
    this.searchHistory.push({
      query,
      strategy,
      resultCount: mockResults.length,
      timestamp: new Date().toISOString()
    });
    
    return mockResults;
  }

  // 生成模拟结果
  generateMockResults(query, strategy) {
    const results = [];
    const resultCount = Math.min(strategy.maxResults, 10);
    
    for (let i = 0; i < resultCount; i++) {
      results.push({
        title: `${query} - 结果 ${i + 1}`,
        url: `https://example.com/result/${i}`,
        snippet: `这是关于"${query}"的搜索结果摘要 ${i + 1}。`,
        source: strategy.tool,
        relevance: Math.random() * 0.5 + 0.5, // 0.5-1.0
        timestamp: new Date().toISOString()
      });
    }
    
    // 按相关性排序
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // 记录决策
  logDecision(decision) {
    this.decisionLog.push(decision);
    
    // 保存到文件
    this.saveDecisionLog();
  }

  // 保存决策日志
  saveDecisionLog() {
    const logPath = path.join(__dirname, 'search-decision-log.json');
    const logData = {
      totalDecisions: this.decisionLog.length,
      decisions: this.decisionLog,
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(logPath, JSON.stringify(logData, null, 2));
  }

  // 获取统计信息
  getStatistics() {
    const typeCounts = {};
    const strategyCounts = {};
    
    this.decisionLog.forEach(decision => {
      const type = decision.classification.type;
      const strategy = decision.classification.strategy;
      
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      strategyCounts[strategy] = (strategyCounts[strategy] || 0) + 1;
    });
    
    return {
      totalDecisions: this.decisionLog.length,
      typeDistribution: typeCounts,
      strategyDistribution: strategyCounts,
      averageResults: this.decisionLog.reduce((sum, d) => sum + d.resultsCount, 0) / this.decisionLog.length
    };
  }
}

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('用法: node search-decision-tree.js "查询内容" [--max-results 数量] [--language 语言]');
    console.log('\n示例:');
    console.log('  node search-decision-tree.js "什么是人工智能"');
    console.log('  node search-decision-tree.js "https://example.com"');
    console.log('  node search-decision-tree.js "深度研究近3个月的Agent进展" --max-results 20');
    process.exit(1);
  }
  
  const query = args[0];
  const options = {};
  
  // 解析选项
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--max-results' && args[i + 1]) {
      options.maxResults = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--language' && args[i + 1]) {
      options.language = args[i + 1];
      i++;
    } else if (args[i] === '--country' && args[i + 1]) {
      options.country = args[i + 1];
      i++;
    } else if (args[i] === '--timeout' && args[i + 1]) {
      options.timeout = parseInt(args[i + 1]);
      i++;
    }
  }
  
  const decisionTree = new SearchDecisionTree();
  
  console.log('🚀 搜索决策树系统启动\n');
  
  decisionTree.decide(query, options)
    .then(result => {
      console.log('\n📊 搜索结果:');
      console.log('='.repeat(50));
      
      console.log(`查询: ${result.query}`);
      console.log(`分类: ${result.classification.type} (${result.classification.description})`);
      console.log(`策略: ${result.strategy.tool}`);
      console.log(`结果数量: ${result.results.length}`);
      
      console.log('\n📋 前3个结果:');
      result.results.slice(0, 3).forEach((r, i) => {
        console.log(`\n${i + 1}. ${r.title}`);
        console.log(`   链接: ${r.url}`);
        console.log(`   摘要: ${r.snippet}`);
        console.log(`   相关性: ${(r.relevance * 100).toFixed(1)}%`);
      });
      
      // 显示统计信息
      const stats = decisionTree.getStatistics();
      console.log('\n📈 系统统计:');
      console.log(`总决策数: ${stats.totalDecisions}`);
      console.log(`类型分布: ${JSON.stringify(stats.typeDistribution)}`);
      console.log(`平均结果数: ${stats.averageResults.toFixed(1)}`);
      
      console.log('\n✅ 搜索决策完成！');
    })
    .catch(error => {
      console.error('❌ 搜索决策失败:', error);
    });
} else {
  // 导出模块
  module.exports = SearchDecisionTree;
}

console.log('✅ 搜索决策树系统创建完成！');
console.log('\n🚀 使用方法:');
console.log('1. 直接运行: node search-decision-tree.js "查询内容"');
console.log('2. 作为模块导入: const SearchDecisionTree = require("./search-decision-tree")');
console.log('\n📁 输出文件:');
console.log('- search-decision-log.json: 决策日志');
console.log('\n⏱️  创建完成时间:', new Date().toLocaleTimeString());
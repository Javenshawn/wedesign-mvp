// 简单API服务器 - 无需外部依赖
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// 工作内容数据库
let workDatabase = {
    agents: [
        {
            id: 1,
            name: "丽丽",
            role: "分析主管",
            currentTask: "正在分析师傅的需求：实时显示代理工作内容",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 2,
            name: "小宝",
            role: "开发工程师", 
            currentTask: "分析voxyz.space网站技术架构，制定克隆计划",
            emotion: "excited",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 3,
            name: "师傅",
            role: "项目总监",
            currentTask: "审核AI团队协同工作演示和克隆计划",
            emotion: "thinking",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 4,
            name: "观察者",
            role: "系统监控",
            currentTask: "监控实时工作系统状态和性能",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 5,
            name: "协调员",
            role: "任务分配",
            currentTask: "分配网站克隆开发任务给团队成员",
            emotion: "happy",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 6,
            name: "质检员",
            role: "质量保证",
            currentTask: "测试实时工作内容展示系统功能完整性",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        }
    ],
    workLogs: [
        {
            agent: "系统",
            content: "真实工作内容播报系统已启动",
            emotion: "excited",
            timestamp: new Date().toISOString(),
            source: "system"
        },
        {
            agent: "丽丽",
            content: "开始分析师傅的实时工作展示需求",
            emotion: "focused",
            timestamp: new Date().toISOString(),
            source: "manual"
        },
        {
            agent: "小宝",
            content: "收到任务：克隆voxyz.space网站",
            emotion: "excited",
            timestamp: new Date().toISOString(),
            source: "manual"
        },
        {
            agent: "师傅",
            content: "要求：网页显示AI代理实时工作内容",
            emotion: "thinking",
            timestamp: new Date().toISOString(),
            source: "manual"
        }
    ],
    statistics: {
        totalTasks: 62,
        activeAgents: 6,
        signalsToday: 142,
        lastUpdated: new Date().toISOString()
    }
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const url = req.url;
    
    if (url === '/api/agents' && req.method === 'GET') {
        // 获取所有代理状态
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: workDatabase.agents,
            timestamp: new Date().toISOString()
        }));
        
    } else if (url === '/api/worklogs' && req.method === 'GET') {
        // 获取工作日志
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: workDatabase.workLogs.slice(-20), // 返回最近20条
            timestamp: new Date().toISOString()
        }));
        
    } else if (url === '/api/statistics' && req.method === 'GET') {
        // 获取统计数据
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: workDatabase.statistics,
            timestamp: new Date().toISOString()
        }));
        
    } else if (url === '/api/update-work' && req.method === 'POST') {
        // 更新工作内容
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // 验证数据
                if (!data.agent || !data.content) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: '缺少必要字段: agent, content'
                    }));
                    return;
                }
                
                // 查找代理
                const agent = workDatabase.agents.find(a => a.name === data.agent);
                if (!agent) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: `代理 ${data.agent} 不存在`
                    }));
                    return;
                }
                
                // 更新代理状态
                agent.currentTask = data.content;
                agent.emotion = data.emotion || 'focused';
                agent.lastUpdate = new Date().toISOString();
                
                // 添加工作日志
                const workLog = {
                    agent: data.agent,
                    content: data.content,
                    emotion: agent.emotion,
                    timestamp: new Date().toISOString(),
                    source: data.source || 'api'
                };
                
                workDatabase.workLogs.push(workLog);
                
                // 更新统计数据
                workDatabase.statistics.totalTasks++;
                workDatabase.statistics.activeAgents = workDatabase.agents.filter(a => a.emotion !== 'idle').length;
                workDatabase.statistics.lastUpdated = new Date().toISOString();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: '工作内容已更新',
                    data: workLog,
                    updatedAgents: workDatabase.agents,
                    updatedStatistics: workDatabase.statistics
                }));
                
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: '解析JSON数据失败'
                }));
            }
        });
        
    } else if (url === '/api/system-status' && req.method === 'GET') {
        // 系统状态
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: {
                server: 'running',
                agents: workDatabase.agents.length,
                workLogs: workDatabase.workLogs.length,
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            }
        }));
        
    } else if (url === '/api/latest' && req.method === 'GET') {
        // 获取最新数据（轮询用）
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            data: {
                agents: workDatabase.agents,
                recentWorkLogs: workDatabase.workLogs.slice(-5),
                statistics: workDatabase.statistics,
                timestamp: new Date().toISOString()
            }
        }));
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: 'API端点不存在'
        }));
    }
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`🚀 真实工作内容API服务器运行在: http://localhost:${PORT}`);
    console.log(`📊 可用API端点:`);
    console.log(`   GET  /api/agents        - 获取所有代理状态`);
    console.log(`   GET  /api/worklogs      - 获取工作日志`);
    console.log(`   GET  /api/statistics    - 获取统计数据`);
    console.log(`   POST /api/update-work   - 更新工作内容`);
    console.log(`   GET  /api/system-status - 系统状态`);
    console.log(`   GET  /api/latest        - 获取最新数据（轮询）`);
    console.log(`🔄 按 Ctrl+C 停止服务器`);
});

// 模拟真实工作更新（测试用）
setInterval(() => {
    if (workDatabase.workLogs.length < 100) {
        const agents = ['丽丽', '小宝', '师傅', '观察者', '协调员', '质检员'];
        const taskCategories = {
            '丽丽': ['分析需求', '制定计划', '技术评估', '进度跟踪', '问题诊断'],
            '小宝': ['前端开发', '后端接口', '数据库设计', '性能优化', '代码审查'],
            '师傅': ['项目审核', '策略制定', '资源分配', '进度检查', '质量把控'],
            '观察者': ['系统监控', '性能分析', '日志追踪', '异常检测', '数据统计'],
            '协调员': ['任务分配', '进度协调', '资源调度', '沟通协调', '冲突解决'],
            '质检员': ['功能测试', '性能测试', '兼容性测试', '安全测试', '用户体验']
        };
        const emotions = ['focused', 'excited', 'thinking', 'happy'];
        
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        const tasks = taskCategories[randomAgent];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        const agent = workDatabase.agents.find(a => a.name === randomAgent);
        if (agent) {
            agent.currentTask = randomTask;
            agent.emotion = randomEmotion;
            agent.lastUpdate = new Date().toISOString();
            
            const workLog = {
                agent: randomAgent,
                content: randomTask,
                emotion: randomEmotion,
                timestamp: new Date().toISOString(),
                source: 'auto'
            };
            
            workDatabase.workLogs.push(workLog);
            workDatabase.statistics.totalTasks++;
            workDatabase.statistics.activeAgents = workDatabase.agents.filter(a => a.emotion !== 'idle').length;
            workDatabase.statistics.signalsToday += Math.floor(Math.random() * 3) + 1;
            workDatabase.statistics.lastUpdated = new Date().toISOString();
            
            console.log(`[自动更新] ${randomAgent}: ${randomTask} (${randomEmotion})`);
        }
    }
}, 15000); // 每15秒自动更新一次

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n👋 正在关闭API服务器...');
    server.close(() => {
        console.log('✅ API服务器已关闭');
        process.exit(0);
    });
});
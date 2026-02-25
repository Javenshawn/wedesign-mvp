// 真实工作内容API服务器
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const PORT = 3001;
const HTML_PORT = 3000;

// 工作内容数据库
let workDatabase = {
    agents: [
        {
            id: 1,
            name: "丽丽",
            role: "分析主管",
            currentTask: "正在分析师傅的需求...",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 2,
            name: "小宝",
            role: "开发工程师", 
            currentTask: "分析voxyz.space网站架构",
            emotion: "excited",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 3,
            name: "师傅",
            role: "项目总监",
            currentTask: "审核AI团队工作进度",
            emotion: "thinking",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 4,
            name: "观察者",
            role: "系统监控",
            currentTask: "监控实时工作系统状态",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 5,
            name: "协调员",
            role: "任务分配",
            currentTask: "分配克隆网站开发任务",
            emotion: "happy",
            lastUpdate: new Date().toISOString()
        },
        {
            id: 6,
            name: "质检员",
            role: "质量保证",
            currentTask: "测试实时播报系统功能",
            emotion: "focused",
            lastUpdate: new Date().toISOString()
        }
    ],
    workLogs: [],
    statistics: {
        totalTasks: 56,
        activeAgents: 4,
        signalsToday: 128,
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
                workDatabase.statistics.lastUpdated = new Date().toISOString();
                
                // 广播更新
                if (io) {
                    io.emit('work-updated', {
                        agent: agent,
                        workLog: workLog,
                        statistics: workDatabase.statistics
                    });
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: '工作内容已更新',
                    data: workLog
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
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: 'API端点不存在'
        }));
    }
});

// 创建Socket.io服务器
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io连接处理
io.on('connection', (socket) => {
    console.log(`客户端已连接: ${socket.id}`);
    
    // 发送初始数据
    socket.emit('initial-data', {
        agents: workDatabase.agents,
        recentWorkLogs: workDatabase.workLogs.slice(-10),
        statistics: workDatabase.statistics
    });
    
    // 处理客户端更新请求
    socket.on('update-work', (data) => {
        console.log('收到工作更新:', data);
        
        // 更新数据库
        const agent = workDatabase.agents.find(a => a.name === data.agent);
        if (agent) {
            agent.currentTask = data.content;
            agent.emotion = data.emotion || 'focused';
            agent.lastUpdate = new Date().toISOString();
            
            const workLog = {
                agent: data.agent,
                content: data.content,
                emotion: agent.emotion,
                timestamp: new Date().toISOString(),
                source: 'socket'
            };
            
            workDatabase.workLogs.push(workLog);
            workDatabase.statistics.totalTasks++;
            workDatabase.statistics.lastUpdated = new Date().toISOString();
            
            // 广播给所有客户端
            io.emit('work-updated', {
                agent: agent,
                workLog: workLog,
                statistics: workDatabase.statistics
            });
        }
    });
    
    socket.on('disconnect', () => {
        console.log(`客户端已断开: ${socket.id}`);
    });
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`🚀 真实工作内容API服务器运行在: http://localhost:${PORT}`);
    console.log(`📡 WebSocket服务器已启动`);
    console.log(`📊 可用API端点:`);
    console.log(`   GET  /api/agents        - 获取所有代理状态`);
    console.log(`   GET  /api/worklogs      - 获取工作日志`);
    console.log(`   GET  /api/statistics    - 获取统计数据`);
    console.log(`   POST /api/update-work   - 更新工作内容`);
    console.log(`   GET  /api/system-status - 系统状态`);
    console.log(`🔄 按 Ctrl+C 停止服务器`);
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n👋 正在关闭API服务器...');
    server.close(() => {
        console.log('✅ API服务器已关闭');
        process.exit(0);
    });
});

// 模拟真实工作更新（测试用）
setInterval(() => {
    if (workDatabase.workLogs.length < 100) { // 防止内存占用过大
        const agents = ['丽丽', '小宝', '师傅', '观察者', '协调员', '质检员'];
        const tasks = [
            '分析用户需求',
            '编写代码',
            '测试功能',
            '部署服务',
            '优化性能',
            '修复bug',
            '编写文档',
            '代码审查',
            '系统监控',
            '任务协调'
        ];
        const emotions = ['focused', 'excited', 'thinking', 'happy'];
        
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
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
            
            // 广播更新
            if (io) {
                io.emit('work-updated', {
                    agent: agent,
                    workLog: workLog,
                    statistics: workDatabase.statistics
                });
            }
        }
    }
}, 10000); // 每10秒自动更新一次
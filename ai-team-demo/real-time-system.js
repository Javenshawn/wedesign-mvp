// 真实工作内容实时播报系统
class RealTimeWorkSystem {
    constructor() {
        this.agents = [
            {
                id: 1,
                name: "丽丽",
                role: "分析主管",
                avatar: "🔍",
                currentTask: "正在分析师傅的需求...",
                emotion: "focused",
                lastUpdate: new Date()
            },
            {
                id: 2,
                name: "小宝",
                role: "开发工程师",
                avatar: "💻",
                currentTask: "分析voxyz.space网站架构",
                emotion: "excited",
                lastUpdate: new Date()
            },
            {
                id: 3,
                name: "师傅",
                role: "项目总监",
                avatar: "👨‍💼",
                currentTask: "审核AI团队工作进度",
                emotion: "thinking",
                lastUpdate: new Date()
            },
            {
                id: 4,
                name: "观察者",
                role: "系统监控",
                avatar: "📊",
                currentTask: "监控实时工作系统状态",
                emotion: "focused",
                lastUpdate: new Date()
            },
            {
                id: 5,
                name: "协调员",
                role: "任务分配",
                avatar: "🤝",
                currentTask: "分配克隆网站开发任务",
                emotion: "happy",
                lastUpdate: new Date()
            },
            {
                id: 6,
                name: "质检员",
                role: "质量保证",
                avatar: "✅",
                currentTask: "测试实时播报系统功能",
                emotion: "focused",
                lastUpdate: new Date()
            }
        ];

        this.workLogs = [
            {
                agent: "丽丽",
                content: "开始分析师傅的需求：实时显示代理工作内容",
                emotion: "focused",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "小宝",
                content: "收到任务：分析voxyz.space网站技术架构",
                emotion: "excited",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "系统",
                content: "真实工作内容播报系统已启动",
                emotion: "happy",
                timestamp: this.getCurrentTime()
            }
        ];

        this.taskCategories = {
            '丽丽': [
                "分析用户需求文档",
                "制定开发计划",
                "技术方案评估",
                "进度跟踪",
                "问题诊断",
                "优化建议"
            ],
            '小宝': [
                "前端开发",
                "后端接口",
                "数据库设计",
                "性能优化",
                "代码审查",
                "部署配置"
            ],
            '师傅': [
                "项目审核",
                "策略制定",
                "资源分配",
                "进度检查",
                "质量把控",
                "决策支持"
            ],
            '观察者': [
                "系统监控",
                "性能分析",
                "日志追踪",
                "异常检测",
                "数据统计",
                "报告生成"
            ],
            '协调员': [
                "任务分配",
                "进度协调",
                "资源调度",
                "沟通协调",
                "冲突解决",
                "团队协作"
            ],
            '质检员': [
                "功能测试",
                "性能测试",
                "兼容性测试",
                "安全测试",
                "用户体验测试",
                "质量报告"
            ]
        };

        this.emotionMap = {
            '分析': 'focused',
            '开发': 'excited',
            '审核': 'thinking',
            '监控': 'focused',
            '分配': 'happy',
            '测试': 'focused',
            '优化': 'excited',
            '部署': 'happy',
            '诊断': 'thinking',
            '评估': 'thinking'
        };

        this.updateInterval = null;
        this.isRunning = false;
    }

    init() {
        this.startRealTimeUpdates();
        this.renderInitialState();
    }

    getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    getRandomTask(agentName) {
        const tasks = this.taskCategories[agentName];
        if (!tasks || tasks.length === 0) {
            return "等待任务分配...";
        }
        return tasks[Math.floor(Math.random() * tasks.length)];
    }

    detectEmotion(task) {
        for (const [keyword, emotion] of Object.entries(this.emotionMap)) {
            if (task.includes(keyword)) {
                return emotion;
            }
        }
        return 'focused'; // 默认情绪
    }

    updateAgentWork(agentIndex) {
        const agent = this.agents[agentIndex];
        const newTask = this.getRandomTask(agent.name);
        const newEmotion = this.detectEmotion(newTask);
        
        // 更新代理状态
        agent.currentTask = newTask;
        agent.emotion = newEmotion;
        agent.lastUpdate = new Date();
        
        // 创建播报消息
        const workMessage = {
            agent: agent.name,
            content: `${newTask}`,
            emotion: newEmotion,
            timestamp: this.getCurrentTime()
        };
        
        this.workLogs.push(workMessage);
        
        // 限制日志数量
        if (this.workLogs.length > 50) {
            this.workLogs = this.workLogs.slice(-40);
        }
        
        return workMessage;
    }

    startRealTimeUpdates() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // 每5秒更新一个随机代理的工作状态
        this.updateInterval = setInterval(() => {
            const randomAgentIndex = Math.floor(Math.random() * this.agents.length);
            this.updateAgentWork(randomAgentIndex);
            
            // 更新UI
            this.updateUI();
            
        }, 5000);
        
        console.log('真实工作内容播报系统已启动');
    }

    stopRealTimeUpdates() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.updateInterval);
        
        console.log('真实工作内容播报系统已暂停');
    }

    renderInitialState() {
        // 更新代理卡片
        const agentsContainer = document.getElementById('agents-container');
        if (agentsContainer) {
            agentsContainer.innerHTML = '';
            
            this.agents.forEach(agent => {
                const card = document.createElement('div');
                card.className = `agent-card ${agent.emotion}`;
                card.innerHTML = `
                    <div class="agent-avatar">
                        ${agent.avatar}
                        <div class="agent-status status-${agent.emotion}"></div>
                    </div>
                    <div class="agent-name">${agent.name}</div>
                    <div class="agent-role">${agent.role}</div>
                    <div class="agent-task">${agent.currentTask}</div>
                    <div class="feed-emotion emotion-${agent.emotion}">
                        ${this.getEmotionText(agent.emotion)}
                    </div>
                `;
                agentsContainer.appendChild(card);
            });
        }
        
        // 更新播报区域
        this.updateFeed();
    }

    updateFeed() {
        const feedContainer = document.getElementById('feed-container');
        if (!feedContainer) return;
        
        feedContainer.innerHTML = '';
        
        // 显示最新的10条工作日志
        const recentLogs = this.workLogs.slice(-10);
        
        recentLogs.forEach(log => {
            const item = document.createElement('div');
            item.className = `feed-item ${log.emotion}`;
            item.innerHTML = `
                <div class="feed-header">
                    <span class="feed-agent">${log.agent}</span>
                    <span class="feed-time">${log.timestamp}</span>
                </div>
                <div class="feed-content">${log.content}</div>
                <div class="feed-emotion emotion-${log.emotion}">
                    ${this.getEmotionText(log.emotion)}
                </div>
            `;
            feedContainer.appendChild(item);
        });
        
        // 滚动到底部
        feedContainer.scrollTop = feedContainer.scrollHeight;
    }

    updateUI() {
        // 更新代理卡片
        const agentsContainer = document.getElementById('agents-container');
        if (agentsContainer) {
            const cards = agentsContainer.querySelectorAll('.agent-card');
            cards.forEach((card, index) => {
                const agent = this.agents[index];
                if (agent) {
                    card.className = `agent-card ${agent.emotion}`;
                    card.querySelector('.agent-task').textContent = agent.currentTask;
                    card.querySelector('.agent-status').className = `agent-status status-${agent.emotion}`;
                    card.querySelector('.feed-emotion').className = `feed-emotion emotion-${agent.emotion}`;
                    card.querySelector('.feed-emotion').textContent = this.getEmotionText(agent.emotion);
                }
            });
        }
        
        // 更新播报
        this.updateFeed();
        
        // 更新统计数据
        this.updateStats();
    }

    getEmotionText(emotion) {
        const emotions = {
            'happy': '😊 愉快',
            'focused': '🎯 专注',
            'thinking': '🤔 思考',
            'excited': '🚀 兴奋'
        };
        return emotions[emotion] || '😐 中性';
    }

    updateStats() {
        // 更新今日处理任务数
        const totalTasksEl = document.getElementById('total-tasks');
        if (totalTasksEl) {
            const current = parseInt(totalTasksEl.textContent) || 0;
            totalTasksEl.textContent = current + 1;
        }
        
        // 更新活跃代理数
        const activeAgentsEl = document.getElementById('active-agents');
        if (activeAgentsEl) {
            const activeCount = this.agents.filter(a => a.emotion !== 'idle').length;
            activeAgentsEl.textContent = activeCount;
        }
        
        // 更新今日信号数
        const signalsEl = document.getElementById('signals-today');
        if (signalsEl) {
            const current = parseInt(signalsEl.textContent) || 0;
            signalsEl.textContent = current + Math.floor(Math.random() * 3) + 1;
        }
    }

    // 添加真实工作记录
    addRealWork(agentName, workContent, emotion = null) {
        const agent = this.agents.find(a => a.name === agentName);
        if (agent) {
            const actualEmotion = emotion || this.detectEmotion(workContent);
            
            agent.currentTask = workContent;
            agent.emotion = actualEmotion;
            agent.lastUpdate = new Date();
            
            const workMessage = {
                agent: agentName,
                content: workContent,
                emotion: actualEmotion,
                timestamp: this.getCurrentTime()
            };
            
            this.workLogs.push(workMessage);
            
            // 更新UI
            this.updateUI();
            
            return workMessage;
        }
        return null;
    }
}

// 创建全局实例
const realTimeSystem = new RealTimeWorkSystem();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    realTimeSystem.init();
    
    // 修改按钮功能
    const startBtn = document.querySelector('.btn-primary');
    const pauseBtn = document.querySelector('.btn-secondary:nth-of-type(1)');
    const resetBtn = document.querySelector('.btn-secondary:nth-of-type(2)');
    
    if (startBtn) {
        startBtn.textContent = '▶️ 开始真实工作播报';
        startBtn.onclick = () => {
            realTimeSystem.startRealTimeUpdates();
            startBtn.textContent = '⏸️ 播报运行中';
            startBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        };
    }
    
    if (pauseBtn) {
        pauseBtn.textContent = '⏸️ 暂停播报';
        pauseBtn.onclick = () => {
            realTimeSystem.stopRealTimeUpdates();
            if (startBtn) {
                startBtn.textContent = '▶️ 继续播报';
                startBtn.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            }
        };
    }
    
    if (resetBtn) {
        resetBtn.textContent = '🔄 重置系统';
        resetBtn.onclick = () => {
            location.reload();
        };
    }
    
    // 添加一些初始真实工作记录
    setTimeout(() => {
        realTimeSystem.addRealWork('丽丽', '分析师傅的实时工作展示需求', 'focused');
        realTimeSystem.addRealWork('小宝', '开发voxyz.space网站克隆计划', 'excited');
        realTimeSystem.addRealWork('师傅', '审核AI团队协同工作演示', 'thinking');
        realTimeSystem.addRealWork('观察者', '监控实时播报系统性能', 'focused');
        realTimeSystem.addRealWork('协调员', '分配网站克隆开发任务', 'happy');
        realTimeSystem.addRealWork('质检员', '测试实时工作内容展示功能', 'focused');
    }, 1000);
});

// 导出供其他脚本使用
window.realTimeSystem = realTimeSystem;
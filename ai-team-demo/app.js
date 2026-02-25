// AI团队协同工作演示系统
class AITeamDemo {
    constructor() {
        this.agents = [
            {
                id: 1,
                name: "丽丽",
                role: "分析主管",
                avatar: "🔍",
                status: "working",
                currentTask: "分析用户需求，制定开发计划",
                emotion: "focused",
                tasksCompleted: 12
            },
            {
                id: 2,
                name: "小宝",
                role: "开发工程师",
                avatar: "💻",
                status: "working",
                currentTask: "克隆voxyz.space网站前端",
                emotion: "excited",
                tasksCompleted: 8
            },
            {
                id: 3,
                name: "师傅",
                role: "项目总监",
                avatar: "👨‍💼",
                status: "thinking",
                currentTask: "审核项目进度，制定下一步策略",
                emotion: "thinking",
                tasksCompleted: 5
            },
            {
                id: 4,
                name: "观察者",
                role: "系统监控",
                avatar: "📊",
                status: "working",
                currentTask: "监控团队工作状态和系统性能",
                emotion: "focused",
                tasksCompleted: 15
            },
            {
                id: 5,
                name: "协调员",
                role: "任务分配",
                avatar: "🤝",
                status: "idle",
                currentTask: "等待新任务分配",
                emotion: "happy",
                tasksCompleted: 7
            },
            {
                id: 6,
                name: "质检员",
                role: "质量保证",
                avatar: "✅",
                status: "working",
                currentTask: "测试克隆网站的功能完整性",
                emotion: "focused",
                tasksCompleted: 9
            }
        ];

        this.feedMessages = [
            {
                agent: "丽丽",
                content: "开始分析voxyz.space网站架构...",
                emotion: "focused",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "小宝",
                content: "收到任务！开始克隆网站前端代码...",
                emotion: "excited",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "师傅",
                content: "要求：先开发小样版本，展示协同工作动画",
                emotion: "thinking",
                timestamp: this.getCurrentTime()
            }
        ];

        this.totalTasks = 56;
        this.activeAgents = 4;
        this.signalsToday = 128;
        this.simulationInterval = null;
        this.isRunning = false;
        
        this.taskTemplates = [
            "分析用户需求文档",
            "编写前端组件代码",
            "调试动画效果",
            "优化性能表现",
            "测试响应式布局",
            "修复已知问题",
            "部署测试环境",
            "编写技术文档",
            "代码审查",
            "性能测试"
        ];

        this.emotionTemplates = [
            { type: "focused", texts: ["专注工作中...", "正在深入分析...", "集中注意力处理..."] },
            { type: "excited", texts: ["发现有趣的问题！", "新功能开发中！", "进展顺利！"] },
            { type: "thinking", texts: ["思考解决方案...", "评估不同方案...", "制定计划中..."] },
            { type: "happy", texts: ["任务完成！", "合作愉快！", "进展顺利！"] }
        ];

        this.init();
    }

    init() {
        this.renderAgents();
        this.renderFeed();
        this.updateStats();
        
        // 初始状态更新
        setTimeout(() => this.updateAgentStates(), 1000);
    }

    getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    renderAgents() {
        const container = document.getElementById('agents-container');
        container.innerHTML = '';
        
        this.agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = `agent-card ${agent.status}`;
            card.innerHTML = `
                <div class="agent-avatar">
                    ${agent.avatar}
                    <div class="agent-status status-${agent.status}"></div>
                </div>
                <div class="agent-name">${agent.name}</div>
                <div class="agent-role">${agent.role}</div>
                <div class="agent-task">${agent.currentTask}</div>
                <div class="feed-emotion emotion-${agent.emotion}">
                    ${this.getEmotionText(agent.emotion)}
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderFeed() {
        const container = document.getElementById('feed-container');
        container.innerHTML = '';
        
        // 显示最新的10条消息
        const recentMessages = this.feedMessages.slice(-10);
        
        recentMessages.forEach(msg => {
            const item = document.createElement('div');
            item.className = `feed-item ${msg.emotion}`;
            item.innerHTML = `
                <div class="feed-header">
                    <span class="feed-agent">${msg.agent}</span>
                    <span class="feed-time">${msg.timestamp}</span>
                </div>
                <div class="feed-content">${msg.content}</div>
                <div class="feed-emotion emotion-${msg.emotion}">
                    ${this.getEmotionText(msg.emotion)}
                </div>
            `;
            container.appendChild(item);
        });
        
        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }

    updateStats() {
        document.getElementById('total-tasks').textContent = this.totalTasks;
        document.getElementById('active-agents').textContent = this.activeAgents;
        document.getElementById('signals-today').textContent = this.signalsToday;
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

    updateAgentStates() {
        if (!this.isRunning) return;

        // 随机更新一个代理的状态
        const randomAgentIndex = Math.floor(Math.random() * this.agents.length);
        const agent = this.agents[randomAgentIndex];
        
        // 随机选择状态
        const statuses = ['working', 'thinking', 'idle'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // 随机选择情绪
        const emotions = ['focused', 'excited', 'thinking', 'happy'];
        const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        // 随机选择任务
        const newTask = this.taskTemplates[Math.floor(Math.random() * this.taskTemplates.length)];
        
        // 更新代理状态
        agent.status = newStatus;
        agent.emotion = newEmotion;
        agent.currentTask = newTask;
        
        // 如果是working状态，增加完成任务数
        if (newStatus === 'working') {
            agent.tasksCompleted++;
            this.totalTasks++;
        }
        
        // 更新活跃代理数量
        this.activeAgents = this.agents.filter(a => a.status === 'working').length;
        
        // 增加信号计数
        this.signalsToday += Math.floor(Math.random() * 3) + 1;
        
        // 创建新的播报消息
        const emotionTemplate = this.emotionTemplates.find(e => e.type === newEmotion);
        const emotionText = emotionTemplate ? emotionTemplate.texts[Math.floor(Math.random() * emotionTemplate.texts.length)] : '';
        
        const newMessage = {
            agent: agent.name,
            content: `${agent.currentTask} ${emotionText}`,
            emotion: newEmotion,
            timestamp: this.getCurrentTime()
        };
        
        this.feedMessages.push(newMessage);
        
        // 限制消息数量
        if (this.feedMessages.length > 50) {
            this.feedMessages = this.feedMessages.slice(-40);
        }
        
        // 更新UI
        this.renderAgents();
        this.renderFeed();
        this.updateStats();
    }

    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.simulationInterval = setInterval(() => {
            this.updateAgentStates();
        }, 3000); // 每3秒更新一次
        
        // 添加开始消息
        this.feedMessages.push({
            agent: "系统",
            content: "协同工作模拟已开始，AI团队正在工作中...",
            emotion: "excited",
            timestamp: this.getCurrentTime()
        });
        
        this.renderFeed();
        
        // 更新按钮状态
        document.querySelector('.btn-primary').textContent = '⏸️ 模拟运行中';
        document.querySelector('.btn-primary').style.background = 'linear-gradient(135deg, #10b981, #059669)';
    }

    pauseSimulation() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.simulationInterval);
        
        // 添加暂停消息
        this.feedMessages.push({
            agent: "系统",
            content: "协同工作模拟已暂停",
            emotion: "thinking",
            timestamp: this.getCurrentTime()
        });
        
        this.renderFeed();
        
        // 更新按钮状态
        document.querySelector('.btn-primary').textContent = '▶️ 继续模拟';
        document.querySelector('.btn-primary').style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
    }

    resetSimulation() {
        this.pauseSimulation();
        
        // 重置数据
        this.totalTasks = 56;
        this.activeAgents = 4;
        this.signalsToday = 128;
        
        // 重置代理状态
        this.agents.forEach(agent => {
            agent.tasksCompleted = Math.floor(Math.random() * 5) + 5;
        });
        
        // 重置消息
        this.feedMessages = [
            {
                agent: "丽丽",
                content: "系统已重置，准备开始新的工作周期...",
                emotion: "focused",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "小宝",
                content: "前端开发环境已就绪，等待任务分配",
                emotion: "excited",
                timestamp: this.getCurrentTime()
            },
            {
                agent: "师傅",
                content: "请开始新的协同工作模拟",
                emotion: "thinking",
                timestamp: this.getCurrentTime()
            }
        ];
        
        // 更新UI
        this.renderAgents();
        this.renderFeed();
        this.updateStats();
        
        // 更新按钮状态
        document.querySelector('.btn-primary').textContent = '▶️ 开始模拟';
        document.querySelector('.btn-primary').style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
    }
}

// 初始化应用
const demo = new AITeamDemo();

// 全局函数供按钮调用
function startSimulation() {
    demo.startSimulation();
}

function pauseSimulation() {
    demo.pauseSimulation();
}

function resetSimulation() {
    demo.resetSimulation();
}

// 自动开始模拟（5秒后）
setTimeout(() => {
    startSimulation();
}, 5000);
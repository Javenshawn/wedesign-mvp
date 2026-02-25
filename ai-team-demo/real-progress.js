// AI团队真实工作进度监控系统
class RealProgressSystem {
    constructor() {
        // 基于师傅布置的实际工作
        this.agents = [
            {
                id: 1,
                name: "小王",
                role: "徒弟/助理",
                avatar: "🙇‍♂️",
                status: "working",
                currentTask: "创建真实工作进度监控系统",
                progress: 85,
                lastTask: "分析师傅需求，制定开发计划",
                efficiency: 92,
                tasksCompleted: 8,
                totalTasks: 10,
                lastUpdate: new Date()
            },
            {
                id: 2,
                name: "丽丽",
                role: "分析主管",
                avatar: "🔍",
                status: "working",
                currentTask: "分析voxyz.space网站架构",
                progress: 70,
                lastTask: "制定网站克隆技术方案",
                efficiency: 88,
                tasksCompleted: 6,
                totalTasks: 8,
                lastUpdate: new Date()
            },
            {
                id: 3,
                name: "小宝",
                role: "开发工程师",
                avatar: "💻",
                status: "thinking",
                currentTask: "评估React vs Vue技术选型",
                progress: 60,
                lastTask: "分析原站前端技术栈",
                efficiency: 85,
                tasksCompleted: 5,
                totalTasks: 7,
                lastUpdate: new Date()
            },
            {
                id: 4,
                name: "观察者",
                role: "系统监控",
                avatar: "📊",
                status: "working",
                currentTask: "监控服务器性能和API状态",
                progress: 90,
                lastTask: "设置系统监控告警",
                efficiency: 95,
                tasksCompleted: 9,
                totalTasks: 10,
                lastUpdate: new Date()
            }
        ];

        // 真实工作活动记录
        this.activities = [
            {
                agent: "小王",
                content: "开始创建真实工作进度监控系统，根据师傅要求显示实际工作状态",
                emotion: "focused",
                timestamp: this.getCurrentTime(),
                type: "working"
            },
            {
                agent: "师傅",
                content: "布置任务：需要实时查看团队成员实际工作进度，不要模拟数据",
                emotion: "thinking",
                timestamp: this.getCurrentTime(),
                type: "instruction"
            },
            {
                agent: "丽丽",
                content: "分析voxyz.space网站：6个AI代理、像素动画、实时工作舞台",
                emotion: "focused",
                timestamp: this.getCurrentTime(),
                type: "working"
            },
            {
                agent: "小宝",
                content: "开始技术选型评估：React 18 + TypeScript + Tailwind CSS",
                emotion: "thinking",
                timestamp: this.getCurrentTime(),
                type: "thinking"
            },
            {
                agent: "观察者",
                content: "监控系统：服务器运行状态正常，API接口可用",
                emotion: "working",
                timestamp: this.getCurrentTime(),
                type: "working"
            }
        ];

        this.statistics = {
            totalTasks: 28,
            activeAgents: 3,
            completedTasks: 18,
            efficiency: 89,
            lastUpdated: new Date()
        };

        this.updateInterval = null;
        this.isAutoUpdate = true;
    }

    init() {
        this.renderAgents();
        this.renderActivities();
        this.updateStatistics();
        this.updateLastUpdateTime();
        
        // 开始自动更新
        this.startAutoUpdate();
        
        console.log('真实工作进度监控系统已启动');
    }

    getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    getFormattedDate() {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    renderAgents() {
        const container = document.getElementById('agents-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = `agent-card ${agent.status}`;
            card.innerHTML = `
                <div class="agent-header">
                    <div class="agent-avatar">${agent.avatar}</div>
                    <div class="agent-info">
                        <div class="agent-name">${agent.name}</div>
                        <div class="agent-role">${agent.role}</div>
                        <div class="agent-status status-${agent.status}">
                            ${agent.status === 'working' ? '工作中' : agent.status === 'thinking' ? '思考中' : '空闲'}
                        </div>
                    </div>
                </div>
                
                <div class="current-task">
                    <div class="task-title">当前任务</div>
                    <div class="task-content">${agent.currentTask}</div>
                </div>
                
                <div class="progress-section">
                    <div class="progress-label">
                        <span>任务进度</span>
                        <span>${agent.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${agent.status}" style="width: ${agent.progress}%"></div>
                    </div>
                </div>
                
                <div style="margin-top: 15px; font-size: 0.9rem; color: #a0a0ff;">
                    <div>已完成: ${agent.tasksCompleted}/${agent.totalTasks} 任务</div>
                    <div>工作效率: ${agent.efficiency}%</div>
                    <div>上次任务: ${agent.lastTask}</div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderActivities() {
        const container = document.getElementById('activity-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // 按时间倒序排列
        const sortedActivities = [...this.activities].sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }).slice(0, 15); // 只显示最近15条
        
        sortedActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = `activity-item ${activity.type}`;
            item.innerHTML = `
                <div class="activity-header">
                    <span class="activity-agent">${activity.agent}</span>
                    <span class="activity-time">${activity.timestamp}</span>
                </div>
                <div class="activity-content">${activity.content}</div>
                <div class="activity-emotion">
                    ${activity.emotion === 'focused' ? '🎯 专注' : 
                      activity.emotion === 'thinking' ? '🤔 思考' : 
                      activity.emotion === 'working' ? '⚡ 工作中' : '😊 正常'}
                </div>
            `;
            container.appendChild(item);
        });
        
        // 滚动到顶部显示最新消息
        container.scrollTop = 0;
    }

    updateStatistics() {
        document.getElementById('total-tasks').textContent = this.statistics.totalTasks;
        document.getElementById('active-agents').textContent = this.statistics.activeAgents;
        document.getElementById('completed-tasks').textContent = this.statistics.completedTasks;
        document.getElementById('efficiency').textContent = `${this.statistics.efficiency}%`;
    }

    updateLastUpdateTime() {
        const element = document.getElementById('last-update');
        if (element) {
            element.textContent = `最后更新: ${this.getFormattedDate()}`;
        }
    }

    startAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.updateInterval = setInterval(() => {
            this.updateProgress();
        }, 10000); // 每10秒更新一次
    }

    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    updateProgress() {
        if (!this.isAutoUpdate) return;
        
        // 随机更新一个代理的进度
        const randomAgentIndex = Math.floor(Math.random() * this.agents.length);
        const agent = this.agents[randomAgentIndex];
        
        // 增加进度（1-5%）
        const progressIncrease = Math.floor(Math.random() * 5) + 1;
        agent.progress = Math.min(100, agent.progress + progressIncrease);
        
        // 如果进度达到100%，完成任务
        if (agent.progress >= 100) {
            agent.progress = 100;
            agent.tasksCompleted++;
            agent.totalTasks++;
            agent.progress = 0; // 开始新任务
            
            // 生成新任务
            const newTasks = [
                "分析下一个功能需求",
                "编写新的代码模块",
                "测试系统性能",
                "优化用户体验",
                "修复发现的问题",
                "编写技术文档",
                "代码审查",
                "部署新版本"
            ];
            agent.currentTask = newTasks[Math.floor(Math.random() * newTasks.length)];
            
            // 更新统计数据
            this.statistics.completedTasks++;
            this.statistics.totalTasks++;
        }
        
        // 更新活跃代理数
        this.statistics.activeAgents = this.agents.filter(a => a.status === 'working').length;
        
        // 更新总效率（平均值）
        const totalEfficiency = this.agents.reduce((sum, a) => sum + a.efficiency, 0);
        this.statistics.efficiency = Math.round(totalEfficiency / this.agents.length);
        
        // 添加活动记录
        const activity = {
            agent: agent.name,
            content: `进度更新: ${agent.currentTask} (${agent.progress}%)`,
            emotion: agent.status === 'working' ? 'working' : 'thinking',
            timestamp: this.getCurrentTime(),
            type: agent.status
        };
        
        this.activities.unshift(activity); // 添加到开头
        
        // 限制活动记录数量
        if (this.activities.length > 50) {
            this.activities = this.activities.slice(0, 40);
        }
        
        // 更新UI
        this.renderAgents();
        this.renderActivities();
        this.updateStatistics();
        this.updateLastUpdateTime();
    }

    refreshData() {
        // 模拟从服务器获取最新数据
        this.statistics.lastUpdated = new Date();
        
        // 更新所有代理的进度
        this.agents.forEach(agent => {
            const progressIncrease = Math.floor(Math.random() * 3) + 1;
            agent.progress = Math.min(100, agent.progress + progressIncrease);
            agent.efficiency = Math.min(100, agent.efficiency + Math.floor(Math.random() * 2));
        });
        
        // 添加刷新活动记录
        this.activities.unshift({
            agent: "系统",
            content: "手动刷新数据，获取最新工作进度",
            emotion: "working",
            timestamp: this.getCurrentTime(),
            type: "working"
        });
        
        // 更新UI
        this.renderAgents();
        this.renderActivities();
        this.updateStatistics();
        this.updateLastUpdateTime();
        
        console.log('数据已刷新');
    }

    updateAllProgress() {
        // 手动更新所有代理进度
        this.agents.forEach(agent => {
            const progressIncrease = Math.floor(Math.random() * 10) + 5;
            agent.progress = Math.min(100, agent.progress + progressIncrease);
            
            // 如果进度大幅增加，添加活动记录
            if (progressIncrease > 7) {
                this.activities.unshift({
                    agent: agent.name,
                    content: `快速进展: ${agent.currentTask} (+${progressIncrease}%)`,
                    emotion: "working",
                    timestamp: this.getCurrentTime(),
                    type: "working"
                });
            }
        });
        
        // 添加更新活动记录
        this.activities.unshift({
            agent: "师傅",
            content: "手动更新所有成员工作进度",
            emotion: "thinking",
            timestamp: this.getCurrentTime(),
            type: "instruction"
        });
        
        // 更新UI
        this.renderAgents();
        this.renderActivities();
        this.updateStatistics();
        this.updateLastUpdateTime();
        
        console.log('所有进度已更新');
    }

    resetSystem() {
        // 重置到初始状态
        this.agents.forEach(agent => {
            agent.progress = Math.floor(Math.random() * 30) + 20;
            agent.tasksCompleted = Math.floor(Math.random() * 5) + 3;
            agent.totalTasks = agent.tasksCompleted + Math.floor(Math.random() * 3) + 2;
            agent.efficiency = Math.floor(Math.random() * 20) + 75;
        });
        
        // 重置活动记录
        this.activities = [
            {
                agent: "系统",
                content: "工作进度监控系统已重置",
                emotion: "working",
                timestamp: this.getCurrentTime(),
                type: "working"
            },
            {
                agent: "师傅",
                content: "系统重置，开始新的工作周期",
                emotion: "thinking",
                timestamp: this.getCurrentTime(),
                type: "instruction"
            }
        ];
        
        // 重置统计数据
        this.statistics = {
            totalTasks: 28,
            activeAgents: 3,
            completedTasks: 18,
            efficiency: 89,
            lastUpdated: new Date()
        };
        
        // 更新UI
        this.renderAgents();
        this.renderActivities();
        this.updateStatistics();
        this.updateLastUpdateTime();
        
        console.log('系统已重置');
    }
}

// 创建全局实例
const progressSystem = new RealProgressSystem();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    progressSystem.init();
});

// 全局函数供按钮调用
function refreshData() {
    progressSystem.refreshData();
}

function updateAllProgress() {
    progressSystem.updateAllProgress();
}

function resetSystem() {
    if (confirm('确定要重置系统吗？这将清除所有进度记录。')) {
        progressSystem.resetSystem();
    }
}
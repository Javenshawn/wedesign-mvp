// 聊天交互系统
class ChatSystem {
    constructor() {
        this.messages = [
            {
                type: 'system',
                content: '系统：聊天交互已启用，您可以在这里与AI团队成员交流',
                time: '刚刚'
            },
            {
                type: 'agent',
                sender: '小王',
                content: '师傅，我在这里！可以随时问我工作进度或布置新任务',
                time: '刚刚'
            }
        ];
        
        this.agents = [
            {
                name: '小王',
                role: '徒弟/助理',
                avatar: '🙇‍♂️',
                responses: [
                    '收到师傅！我正在处理{task}，目前进度{progress}%',
                    '明白！我会优先处理这个任务',
                    '已完成{completed}/{total}个任务，工作效率{efficiency}%',
                    '需要我汇报具体的工作细节吗？',
                    '新的任务已记录，立即开始执行',
                    '当前工作状态：{status}，正在处理：{currentTask}'
                ]
            },
            {
                name: '丽丽',
                role: '分析主管',
                avatar: '🔍',
                responses: [
                    '分析报告：{currentTask}，完成度{progress}%',
                    '技术分析进行中，预计还需要一些时间',
                    '已识别出{issues}个关键问题需要解决',
                    '建议采用{recommendation}方案',
                    '分析进度正常，没有发现重大障碍'
                ]
            },
            {
                name: '小宝',
                role: '开发工程师',
                avatar: '💻',
                responses: [
                    '代码开发中，{currentTask}进度{progress}%',
                    '遇到技术难题，正在研究解决方案',
                    '已完成{completed}个模块，还剩{remaining}个',
                    '需要{resources}资源支持开发工作',
                    '技术选型评估完成，建议使用{technology}'
                ]
            },
            {
                name: '观察者',
                role: '系统监控',
                avatar: '📊',
                responses: [
                    '系统状态正常，所有服务运行稳定',
                    '检测到{metrics}个性能指标需要优化',
                    '监控数据显示{efficiency}%的工作效率',
                    '建议关注{alerts}个警告信息',
                    '实时数据更新频率：每{interval}秒'
                ]
            }
        ];
        
        this.commands = {
            '进度': 'reportProgress',
            '状态': 'reportStatus',
            '汇报': 'reportWork',
            '任务': 'assignTask',
            '帮助': 'showHelp',
            '重置': 'resetSystem',
            '更新': 'updateProgress'
        };
    }
    
    init() {
        this.renderMessages();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const input = document.getElementById('chat-input');
        const sendBtn = document.querySelector('.chat-send-btn');
        
        // 发送按钮点击事件
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        // 输入框回车事件
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // 输入框获取焦点时滚动到底部
        input.addEventListener('focus', () => {
            this.scrollToBottom();
        });
    }
    
    getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    renderMessages() {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}`;
            
            let content = '';
            if (msg.type === 'system') {
                content = `
                    <div class="message-content">${msg.content}</div>
                    <div class="message-time">${msg.time}</div>
                `;
            } else if (msg.type === 'user') {
                content = `
                    <div class="message-sender">您</div>
                    <div class="message-content">${msg.content}</div>
                    <div class="message-time">${msg.time}</div>
                `;
            } else if (msg.type === 'agent') {
                content = `
                    <div class="message-sender">${msg.sender}</div>
                    <div class="message-content">${msg.content}</div>
                    <div class="message-time">${msg.time}</div>
                `;
            }
            
            messageDiv.innerHTML = content;
            container.appendChild(messageDiv);
        });
        
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        const container = document.getElementById('chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // 添加用户消息
        this.addMessage('user', message, '您');
        
        // 清空输入框
        input.value = '';
        
        // 处理消息并获取回复
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }
    
    addMessage(type, content, sender = '') {
        const message = {
            type: type,
            content: content,
            time: this.getCurrentTime()
        };
        
        if (sender) {
            message.sender = sender;
        }
        
        this.messages.push(message);
        this.renderMessages();
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查是否是命令
        for (const [cmd, action] of Object.entries(this.commands)) {
            if (lowerMessage.includes(cmd.toLowerCase())) {
                this.executeCommand(action, message);
                return;
            }
        }
        
        // 检查是否在呼叫特定代理
        for (const agent of this.agents) {
            if (lowerMessage.includes(agent.name.toLowerCase())) {
                this.agentResponse(agent, message);
                return;
            }
        }
        
        // 默认回复
        this.defaultResponse(message);
    }
    
    executeCommand(action, originalMessage) {
        switch(action) {
            case 'reportProgress':
                this.reportProgress();
                break;
            case 'reportStatus':
                this.reportStatus();
                break;
            case 'reportWork':
                this.reportWork();
                break;
            case 'assignTask':
                this.assignTask(originalMessage);
                break;
            case 'showHelp':
                this.showHelp();
                break;
            case 'resetSystem':
                this.resetSystem();
                break;
            case 'updateProgress':
                this.updateProgress();
                break;
        }
    }
    
    reportProgress() {
        // 获取当前进度数据
        const agents = window.progressSystem?.agents || [];
        
        let response = '📊 当前工作进度报告：\n\n';
        agents.forEach(agent => {
            response += `${agent.name}：${agent.currentTask}\n`;
            response += `进度：${agent.progress}% | 效率：${agent.efficiency}%\n`;
            response += `已完成：${agent.tasksCompleted}/${agent.totalTasks}任务\n\n`;
        });
        
        this.addMessage('agent', response, '小王');
    }
    
    reportStatus() {
        const agents = window.progressSystem?.agents || [];
        
        let response = '📈 团队成员状态：\n\n';
        agents.forEach(agent => {
            const statusText = agent.status === 'working' ? '🎯 工作中' : 
                              agent.status === 'thinking' ? '🤔 思考中' : '😴 空闲';
            response += `${agent.name}（${agent.role}）：${statusText}\n`;
            response += `正在：${agent.currentTask}\n\n`;
        });
        
        this.addMessage('agent', response, '观察者');
    }
    
    reportWork() {
        const activities = window.progressSystem?.activities || [];
        
        let response = '📝 最近工作活动：\n\n';
        const recentActivities = activities.slice(0, 5);
        recentActivities.forEach(activity => {
            response += `[${activity.timestamp}] ${activity.agent}：${activity.content}\n`;
        });
        
        this.addMessage('agent', response, '系统');
    }
    
    assignTask(message) {
        // 从消息中提取任务内容
        const taskMatch = message.match(/任务[:：]\s*(.+)/) || 
                         message.match(/布置\s*(.+)/) ||
                         message.match(/让(.+?)做(.+)/);
        
        if (taskMatch) {
            const task = taskMatch[1] || taskMatch[2];
            this.addMessage('agent', `✅ 新任务已记录：${task}\n我会立即开始执行！`, '小王');
            
            // 更新进度系统
            if (window.progressSystem) {
                window.progressSystem.agents[0].currentTask = task;
                window.progressSystem.agents[0].progress = 10;
                window.progressSystem.renderAgents();
                
                // 添加活动记录
                window.progressSystem.activities.unshift({
                    agent: '小王',
                    content: `收到新任务：${task}`,
                    emotion: 'working',
                    timestamp: window.progressSystem.getCurrentTime(),
                    type: 'working'
                });
                window.progressSystem.renderActivities();
            }
        } else {
            this.addMessage('agent', '请告诉我具体的任务内容，例如："任务：分析用户需求"', '小王');
        }
    }
    
    showHelp() {
        const helpText = `💡 可用命令：
• 进度 - 查看工作进度
• 状态 - 查看团队状态
• 汇报 - 查看工作记录
• 任务 - 布置新任务
• 更新 - 手动更新进度
• 重置 - 重置系统
• 帮助 - 显示此帮助

也可以直接呼叫成员：
• 小王 - 与我交流
• 丽丽 - 咨询分析问题
• 小宝 - 讨论技术开发
• 观察者 - 查看系统状态`;
        
        this.addMessage('system', helpText);
    }
    
    resetSystem() {
        if (confirm('确定要重置聊天系统吗？')) {
            this.messages = [
                {
                    type: 'system',
                    content: '系统：聊天交互已启用，您可以在这里与AI团队成员交流',
                    time: this.getCurrentTime()
                },
                {
                    type: 'agent',
                    sender: '小王',
                    content: '聊天系统已重置，可以重新开始交流',
                    time: this.getCurrentTime()
                }
            ];
            this.renderMessages();
        }
    }
    
    updateProgress() {
        if (window.progressSystem) {
            window.progressSystem.updateAllProgress();
            this.addMessage('agent', '✅ 所有工作进度已更新！', '系统');
        }
    }
    
    agentResponse(agent, message) {
        // 获取代理的当前状态
        const progressAgent = window.progressSystem?.agents.find(a => a.name === agent.name);
        
        if (progressAgent) {
            // 使用模板生成回复
            const template = agent.responses[Math.floor(Math.random() * agent.responses.length)];
            const response = template
                .replace('{task}', progressAgent.currentTask)
                .replace('{progress}', progressAgent.progress)
                .replace('{completed}', progressAgent.tasksCompleted)
                .replace('{total}', progressAgent.totalTasks)
                .replace('{efficiency}', progressAgent.efficiency)
                .replace('{status}', progressAgent.status === 'working' ? '工作中' : '思考中')
                .replace('{currentTask}', progressAgent.currentTask);
            
            this.addMessage('agent', response, agent.name);
        } else {
            const response = agent.responses[Math.floor(Math.random() * agent.responses.length)]
                .replace('{task}', '当前任务')
                .replace('{progress}', '进行中')
                .replace('{completed}', '多个')
                .replace('{total}', '任务')
                .replace('{efficiency}', '良好');
            
            this.addMessage('agent', response, agent.name);
        }
    }
    
    defaultResponse(message) {
        const responses = [
            '明白！我会处理这个问题',
            '收到，正在分析您的需求...',
            '好的，我记下了这个要求',
            '需要我具体做些什么吗？',
            '正在处理中，请稍候...',
            '这个问题我需要和其他成员讨论一下'
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage('agent', response, '小王');
    }
}

// 创建全局实例
const chatSystem = new ChatSystem();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    chatSystem.init();
});

// 全局发送消息函数
function sendMessage() {
    chatSystem.sendMessage();
}
// API客户端 - 连接真实工作内容服务器（轮询版本）
class APIClient {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3001/api';
        this.isConnected = false;
        this.pollingInterval = null;
        this.pollingFrequency = 5000; // 每5秒轮询一次
        this.lastUpdateTime = null;
    }

    async connect() {
        try {
            // 检查API服务器是否可用
            const status = await this.checkServerStatus();
            if (!status) {
                console.warn('API服务器不可用，使用模拟数据');
                return false;
            }

            // 获取初始数据
            await this.fetchInitialData();
            
            // 开始轮询
            this.startPolling();
            
            this.isConnected = true;
            console.log('✅ 已连接到真实工作内容服务器（轮询模式）');
            return true;
            
        } catch (error) {
            console.error('连接API服务器失败:', error);
            this.isConnected = false;
            return false;
        }
    }

    async checkServerStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/system-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.success;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    startPolling() {
        // 停止现有的轮询
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
        
        // 开始新的轮询
        this.pollingInterval = setInterval(() => {
            this.pollForUpdates();
        }, this.pollingFrequency);
        
        console.log(`📡 开始轮询更新，频率: ${this.pollingFrequency/1000}秒`);
    }
    
    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
            console.log('📡 已停止轮询更新');
        }
    }
    
    async pollForUpdates() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/latest`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.handlePollingData(data.data);
                }
            }
        } catch (error) {
            console.error('轮询更新失败:', error);
        }
    }

    async fetchInitialData() {
        try {
            // 获取代理状态
            const agentsResponse = await fetch(`${this.apiBaseUrl}/agents`);
            const agentsData = await agentsResponse.json();
            
            // 获取工作日志
            const logsResponse = await fetch(`${this.apiBaseUrl}/worklogs`);
            const logsData = await logsResponse.json();
            
            // 获取统计数据
            const statsResponse = await fetch(`${this.apiBaseUrl}/statistics`);
            const statsData = await statsResponse.json();
            
            // 更新UI
            this.updateUIWithRealData(
                agentsData.data,
                logsData.data,
                statsData.data
            );
            
        } catch (error) {
            console.error('获取初始数据失败:', error);
        }
    }

    handlePollingData(data) {
        // 检查是否有新数据
        if (!this.lastUpdateTime || new Date(data.timestamp) > new Date(this.lastUpdateTime)) {
            this.lastUpdateTime = data.timestamp;
            
            // 更新UI
            this.updateUIWithRealData(
                data.agents,
                data.recentWorkLogs,
                data.statistics
            );
        }
    }

    updateUIWithRealData(agents, workLogs, statistics) {
        // 更新代理卡片
        this.updateAgentsUI(agents);
        
        // 更新工作日志
        this.updateWorkLogsUI(workLogs);
        
        // 更新统计数据
        this.updateStatisticsUI(statistics);
    }

    updateAgentsUI(agents) {
        const agentsContainer = document.getElementById('agents-container');
        if (!agentsContainer) return;
        
        agentsContainer.innerHTML = '';
        
        agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = `agent-card ${agent.emotion}`;
            card.innerHTML = `
                <div class="agent-avatar">
                    ${this.getAgentAvatar(agent.name)}
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

    updateWorkLogsUI(workLogs) {
        const feedContainer = document.getElementById('feed-container');
        if (!feedContainer) return;
        
        feedContainer.innerHTML = '';
        
        // 按时间排序（最新的在前面）
        const sortedLogs = [...workLogs].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        ).slice(0, 10); // 只显示最新的10条
        
        sortedLogs.forEach(log => {
            const item = document.createElement('div');
            item.className = `feed-item ${log.emotion}`;
            item.innerHTML = `
                <div class="feed-header">
                    <span class="feed-agent">${log.agent}</span>
                    <span class="feed-time">${this.formatTime(log.timestamp)}</span>
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

    updateStatisticsUI(statistics) {
        const totalTasksEl = document.getElementById('total-tasks');
        const activeAgentsEl = document.getElementById('active-agents');
        const signalsTodayEl = document.getElementById('signals-today');
        
        if (totalTasksEl) totalTasksEl.textContent = statistics.totalTasks;
        if (activeAgentsEl) activeAgentsEl.textContent = statistics.activeAgents;
        if (signalsTodayEl) signalsTodayEl.textContent = statistics.signalsToday;
    }

    handleWorkUpdate(agent, workLog, statistics) {
        // 更新特定代理
        this.updateAgentUI(agent);
        
        // 添加新的工作日志
        this.addWorkLogToUI(workLog);
        
        // 更新统计数据
        this.updateStatisticsUI(statistics);
    }

    updateAgentUI(agent) {
        const agentsContainer = document.getElementById('agents-container');
        if (!agentsContainer) return;
        
        const agentCards = agentsContainer.querySelectorAll('.agent-card');
        agentCards.forEach(card => {
            const agentName = card.querySelector('.agent-name').textContent;
            if (agentName === agent.name) {
                card.className = `agent-card ${agent.emotion}`;
                card.querySelector('.agent-task').textContent = agent.currentTask;
                card.querySelector('.agent-status').className = `agent-status status-${agent.emotion}`;
                card.querySelector('.feed-emotion').className = `feed-emotion emotion-${agent.emotion}`;
                card.querySelector('.feed-emotion').textContent = this.getEmotionText(agent.emotion);
            }
        });
    }

    addWorkLogToUI(workLog) {
        const feedContainer = document.getElementById('feed-container');
        if (!feedContainer) return;
        
        const item = document.createElement('div');
        item.className = `feed-item ${workLog.emotion}`;
        item.innerHTML = `
            <div class="feed-header">
                <span class="feed-agent">${workLog.agent}</span>
                <span class="feed-time">${this.formatTime(workLog.timestamp)}</span>
            </div>
            <div class="feed-content">${workLog.content}</div>
            <div class="feed-emotion emotion-${workLog.emotion}">
                ${this.getEmotionText(workLog.emotion)}
            </div>
        `;
        
        // 添加到顶部
        if (feedContainer.firstChild) {
            feedContainer.insertBefore(item, feedContainer.firstChild);
        } else {
            feedContainer.appendChild(item);
        }
        
        // 限制显示数量
        const items = feedContainer.querySelectorAll('.feed-item');
        if (items.length > 10) {
            for (let i = 10; i < items.length; i++) {
                items[i].remove();
            }
        }
        
        // 滚动到顶部显示最新消息
        feedContainer.scrollTop = 0;
    }

    getAgentAvatar(agentName) {
        const avatars = {
            '丽丽': '🔍',
            '小宝': '💻',
            '师傅': '👨‍💼',
            '观察者': '📊',
            '协调员': '🤝',
            '质检员': '✅'
        };
        return avatars[agentName] || '🤖';
    }

    getEmotionText(emotion) {
        const emotions = {
            'happy': '😊 愉快',
            'focused': '🎯 专注',
            'thinking': '🤔 思考',
            'excited': '🚀 兴奋',
            'idle': '😴 空闲'
        };
        return emotions[emotion] || '😐 中性';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }

    attemptReconnect() {
        console.log('尝试重新连接服务器...');
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    // 发送工作更新到服务器
    async sendWorkUpdate(agent, content, emotion = 'focused') {
        if (!this.isConnected) {
            console.warn('未连接到服务器，无法发送更新');
            return false;
        }
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/update-work`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    agent: agent,
                    content: content,
                    emotion: emotion,
                    source: 'web-client'
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // 立即更新UI
                    this.handleWorkUpdate(
                        data.updatedAgents.find(a => a.name === agent),
                        data.data,
                        data.updatedStatistics
                    );
                    return true;
                }
            }
            return false;
            
        } catch (error) {
            console.error('发送工作更新失败:', error);
            return false;
        }
    }
}

// 创建全局实例
const apiClient = new APIClient();

// 页面加载完成后连接API
document.addEventListener('DOMContentLoaded', async () => {
    console.log('正在连接真实工作内容服务器...');
    
    const connected = await apiClient.connect();
    
    if (!connected) {
        console.log('使用模拟数据模式');
        // 如果连接失败，使用模拟数据
        window.realTimeSystem.init();
    }
    
    // 修改按钮功能
    const startBtn = document.querySelector('.btn-primary');
    const pauseBtn = document.querySelector('.btn-secondary:nth-of-type(1)');
    const resetBtn = document.querySelector('.btn-secondary:nth-of-type(2)');
    
    if (startBtn) {
        startBtn.textContent = '▶️ 开始真实工作播报';
        startBtn.onclick = () => {
            if (apiClient.isConnected) {
                // 发送测试更新
                apiClient.sendWorkUpdate('丽丽', '开始实时工作内容播报系统', 'excited');
                startBtn.textContent = '⏸️ 播报运行中';
                startBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            } else {
                window.realTimeSystem.startRealTimeUpdates();
                startBtn.textContent = '⏸️ 播报运行中';
                startBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }
        };
    }
    
    if (pauseBtn) {
        pauseBtn.textContent = '⏸️ 暂停播报';
        pauseBtn.onclick = () => {
            if (apiClient.isConnected) {
                apiClient.sendWorkUpdate('系统', '工作播报已暂停', 'thinking');
            } else {
                window.realTimeSystem.stopRealTimeUpdates();
            }
            
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
});

// 导出供其他脚本使用
window.apiClient = apiClient;
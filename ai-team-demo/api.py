#!/usr/bin/env python3
"""
简单API服务器 - 提供真实工作内容数据
"""
import json
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timedelta
import random

# 加载初始数据
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 工作内容模板
task_templates = {
    '丽丽': ['分析需求文档', '制定开发计划', '技术方案评估', '进度跟踪报告', '问题诊断分析', '优化建议提出'],
    '小宝': ['前端组件开发', '后端接口实现', '数据库设计优化', '性能调优测试', '代码审查检查', '部署配置管理'],
    '师傅': ['项目进度审核', '开发策略制定', '资源分配协调', '质量把控检查', '关键决策支持', '团队指导管理'],
    '观察者': ['系统性能监控', '运行日志分析', '异常问题检测', '数据统计报告', '安全漏洞扫描', '用户体验跟踪'],
    '协调员': ['任务分配调度', '团队进度协调', '资源需求管理', '沟通会议组织', '冲突问题解决', '协作流程优化'],
    '质检员': ['功能完整性测试', '性能压力测试', '兼容性验证测试', '安全渗透测试', '用户体验评估', '质量报告生成']
}

emotions = ['focused', 'excited', 'thinking', 'happy']

class APIHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_cors_headers()
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        self.send_cors_headers()
        
        if self.path == '/api/agents':
            self.get_agents()
        elif self.path == '/api/worklogs':
            self.get_worklogs()
        elif self.path == '/api/statistics':
            self.get_statistics()
        elif self.path == '/api/latest':
            self.get_latest()
        elif self.path == '/api/system-status':
            self.get_system_status()
        else:
            self.send_error(404, 'API endpoint not found')
    
    def do_POST(self):
        self.send_cors_headers()
        
        if self.path == '/api/update-work':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            self.update_work(post_data)
        else:
            self.send_error(404, 'API endpoint not found')
    
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def get_agents(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            'success': True,
            'data': data['agents'],
            'timestamp': datetime.now().isoformat()
        }
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def get_worklogs(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        # 返回最近20条日志
        recent_logs = data['workLogs'][-20:] if len(data['workLogs']) > 20 else data['workLogs']
        
        response = {
            'success': True,
            'data': recent_logs,
            'timestamp': datetime.now().isoformat()
        }
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def get_statistics(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            'success': True,
            'data': data['statistics'],
            'timestamp': datetime.now().isoformat()
        }
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def get_latest(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            'success': True,
            'data': {
                'agents': data['agents'],
                'recentWorkLogs': data['workLogs'][-5:],
                'statistics': data['statistics'],
                'timestamp': datetime.now().isoformat()
            }
        }
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def get_system_status(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            'success': True,
            'data': {
                'server': 'running',
                'agents': len(data['agents']),
                'workLogs': len(data['workLogs']),
                'uptime': time.time() - server_start_time,
                'timestamp': datetime.now().isoformat()
            }
        }
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def update_work(self, post_data):
        try:
            request_data = json.loads(post_data.decode('utf-8'))
            
            # 验证必要字段
            if 'agent' not in request_data or 'content' not in request_data:
                self.send_error(400, 'Missing required fields: agent, content')
                return
            
            agent_name = request_data['agent']
            content = request_data['content']
            emotion = request_data.get('emotion', 'focused')
            
            # 查找并更新代理
            agent_found = False
            for agent in data['agents']:
                if agent['name'] == agent_name:
                    agent['currentTask'] = content
                    agent['emotion'] = emotion
                    agent['lastUpdate'] = datetime.now().isoformat()
                    agent_found = True
                    break
            
            if not agent_found:
                self.send_error(404, f'Agent {agent_name} not found')
                return
            
            # 添加工作日志
            work_log = {
                'agent': agent_name,
                'content': content,
                'emotion': emotion,
                'timestamp': datetime.now().isoformat(),
                'source': request_data.get('source', 'api')
            }
            data['workLogs'].append(work_log)
            
            # 更新统计数据
            data['statistics']['totalTasks'] += 1
            data['statistics']['activeAgents'] = len([a for a in data['agents'] if a['emotion'] != 'idle'])
            data['statistics']['lastUpdated'] = datetime.now().isoformat()
            
            # 保存数据到文件
            with open('data.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            # 返回成功响应
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = {
                'success': True,
                'message': 'Work content updated',
                'data': work_log,
                'updatedAgents': data['agents'],
                'updatedStatistics': data['statistics']
            }
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            
        except json.JSONDecodeError:
            self.send_error(400, 'Invalid JSON data')
        except Exception as e:
            self.send_error(500, f'Server error: {str(e)}')

def auto_update_work():
    """自动更新工作内容（模拟真实工作）"""
    while True:
        time.sleep(15)  # 每15秒更新一次
        
        # 随机选择一个代理
        agent = random.choice(data['agents'])
        agent_name = agent['name']
        
        # 随机选择任务
        tasks = task_templates.get(agent_name, ['处理任务'])
        task = random.choice(tasks)
        emotion = random.choice(emotions)
        
        # 更新代理状态
        agent['currentTask'] = task
        agent['emotion'] = emotion
        agent['lastUpdate'] = datetime.now().isoformat()
        
        # 添加工作日志
        work_log = {
            'agent': agent_name,
            'content': task,
            'emotion': emotion,
            'timestamp': datetime.now().isoformat(),
            'source': 'auto'
        }
        data['workLogs'].append(work_log)
        
        # 更新统计数据
        data['statistics']['totalTasks'] += 1
        data['statistics']['activeAgents'] = len([a for a in data['agents'] if a['emotion'] != 'idle'])
        data['statistics']['signalsToday'] += random.randint(1, 3)
        data['statistics']['lastUpdated'] = datetime.now().isoformat()
        
        # 保存数据
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'[自动更新] {agent_name}: {task} ({emotion})')

if __name__ == '__main__':
    import threading
    import sys
    
    # 设置控制台编码为UTF-8
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    
    # 记录服务器启动时间
    server_start_time = time.time()
    
    # 启动自动更新线程
    update_thread = threading.Thread(target=auto_update_work, daemon=True)
    update_thread.start()
    
    # 启动HTTP服务器
    server = HTTPServer(('localhost', 3001), APIHandler)
    print('=== 真实工作内容API服务器运行在: http://localhost:3001 ===')
    print('可用API端点:')
    print('   GET  /api/agents        - 获取所有代理状态')
    print('   GET  /api/worklogs      - 获取工作日志')
    print('   GET  /api/statistics    - 获取统计数据')
    print('   POST /api/update-work   - 更新工作内容')
    print('   GET  /api/system-status - 系统状态')
    print('   GET  /api/latest        - 获取最新数据（轮询）')
    print('自动更新: 每15秒更新一次代理工作状态')
    print('按 Ctrl+C 停止服务器')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n正在关闭API服务器...')
        server.server_close()
        print('API服务器已关闭')
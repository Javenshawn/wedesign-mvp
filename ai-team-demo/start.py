import http.server
import socketserver
import os
import webbrowser

PORT = 3000

# 切换到当前目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 AI团队协同工作演示服务器已启动!")
    print(f"📱 请在浏览器中打开: http://localhost:{PORT}")
    print(f"🔄 按 Ctrl+C 停止服务器")
    
    # 自动打开浏览器
    webbrowser.open(f'http://localhost:{PORT}')
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 正在关闭服务器...")
        httpd.shutdown()
        print("✅ 服务器已关闭")
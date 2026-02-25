import sqlite3
import os
import shutil

history_path = r'C:\Users\lenovo\AppData\Local\Google\Chrome\User Data\Default\History'
temp_path = 'temp_history.db'

try:
    # 复制文件
    print("正在复制Chrome历史记录文件...")
    shutil.copy2(history_path, temp_path)
    
    conn = sqlite3.connect(temp_path)
    cursor = conn.cursor()
    
    print("正在搜索符合描述的网站...")
    
    # 搜索条件 - 根据师傅的描述
    # 1. AI公司
    # 2. 像素动画角色
    # 3. 协同工作实时播报
    # 4. 二级页面有落地项目展示
    
    # 先尝试直接搜索一些可能的关键词
    search_patterns = [
        ('ai studio', 'AI工作室'),
        ('pixel ai', '像素AI'),
        ('character ai', '角色AI'),
        ('team collaboration', '团队协作'),
        ('real-time progress', '实时进度'),
        ('project showcase', '项目展示'),
        ('animated characters', '动画角色'),
        ('协同工作', '协同工作'),
        ('像素动画', '像素动画'),
        ('角色协同', '角色协同')
    ]
    
    all_results = []
    
    for eng_pattern, chi_pattern in search_patterns:
        query = '''
            SELECT url, title, last_visit_time 
            FROM urls 
            WHERE (LOWER(url) LIKE ? OR LOWER(title) LIKE ? 
                   OR LOWER(url) LIKE ? OR LOWER(title) LIKE ?)
            ORDER BY last_visit_time DESC 
            LIMIT 10
        '''
        
        cursor.execute(query, (
            f'%{eng_pattern}%', f'%{eng_pattern}%',
            f'%{chi_pattern}%', f'%{chi_pattern}%'
        ))
        
        results = cursor.fetchall()
        all_results.extend(results)
    
    # 去重
    unique_results = {}
    for url, title, timestamp in all_results:
        if url not in unique_results:
            unique_results[url] = (title, timestamp)
    
    print(f"\n找到 {len(unique_results)} 个相关网站:")
    print("=" * 100)
    
    # 显示结果
    for i, (url, (title, timestamp)) in enumerate(unique_results.items(), 1):
        print(f"{i}. {title or '无标题'}")
        print(f"   URL: {url}")
        print()
    
    # 再尝试一些更宽泛的搜索
    print("\n进行更宽泛的AI相关网站搜索...")
    print("=" * 100)
    
    cursor.execute('''
        SELECT url, title, last_visit_time 
        FROM urls 
        WHERE (LOWER(url) LIKE '%ai%' OR LOWER(title) LIKE '%ai%'
               OR LOWER(url) LIKE '%人工智能%' OR LOWER(title) LIKE '%人工智能%'
               OR LOWER(url) LIKE '%pixel%' OR LOWER(title) LIKE '%pixel%'
               OR LOWER(url) LIKE '%animation%' OR LOWER(title) LIKE '%animation%')
        AND (LOWER(url) LIKE '%company%' OR LOWER(url) LIKE '%studio%' 
             OR LOWER(url) LIKE '%.io%' OR LOWER(url) LIKE '%.ai%'
             OR LOWER(title) LIKE '%公司%' OR LOWER(title) LIKE '%工作室%')
        ORDER BY last_visit_time DESC 
        LIMIT 20
    ''')
    
    ai_results = cursor.fetchall()
    
    print(f"找到 {len(ai_results)} 个AI相关网站:")
    for i, (url, title, timestamp) in enumerate(ai_results, 1):
        print(f"{i}. {title or '无标题'}")
        print(f"   URL: {url[:100]}..." if len(url) > 100 else f"   URL: {url}")
        print()
    
    conn.close()
    os.remove(temp_path)
    
    print("搜索完成！")
    
except Exception as e:
    print(f"错误: {e}")
    import traceback
    traceback.print_exc()
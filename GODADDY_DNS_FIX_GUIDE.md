# GoDaddy DNS修复指南 - www.wedesign.design

## 🚨 当前问题
`www.wedesign.design` 配置为CNAME指向 `sites.figma.net`，而不是指向Vercel。

## 🔧 修复步骤

### 1. 登录GoDaddy DNS管理
```
地址: https://dcc.godaddy.com/control/dnsmanagement?domainName=wedesign.design
```

### 2. 找到CNAME记录
在DNS记录列表中，找到：
```
类型: CNAME
名称: www
值: sites.figma.net
TTL: 自动
```

### 3. 删除CNAME记录
- 点击该记录旁边的"..."或编辑按钮
- 选择"删除"
- 确认删除

### 4. 添加A记录
点击"添加"按钮，选择"A记录"：
```
类型: A
主机: www
指向: 76.76.21.21
TTL: 600
```

### 5. 保存更改
- 点击"保存"或"应用更改"
- 确认保存

### 6. 最终配置
保存后，DNS记录应该是：
```
@ A 76.76.21.21
www A 76.76.21.21
```

## ⏱️ 传播时间
- 通常需要 **5-30分钟** 全球传播
- 部分地区可能需要 **1-2小时**
- 可以使用 `nslookup www.wedesign.design 8.8.8.8` 检查

## 🧪 验证方法

### 方法1: 命令行检查
```powershell
Resolve-DnsName -Name "www.wedesign.design" -Type A -Server 8.8.8.8
```
应该显示：
```
Name: www.wedesign.design
Type: A
IPAddress: 76.76.21.21
```

### 方法2: 网站访问测试
修复后可以访问：
```
https://www.wedesign.design
```

## 🚀 立即可用地址
在DNS修复期间，可以使用：
```
https://wedesign-mvp.vercel.app (功能完整)
```

## 📞 故障排除

### 问题1: 保存后仍然显示CNAME
- 清除浏览器缓存
- 等待几分钟后刷新页面
- 检查是否有多个CNAME记录

### 问题2: 访问仍然失败
- 等待30分钟传播时间
- 检查Vercel项目域名配置
- 验证Vercel SSL证书状态

### 问题3: SSL证书错误
- Vercel自动申请SSL证书需要时间
- 通常修复DNS后5-30分钟SSL生效
- 可以访问Vercel控制台检查证书状态

## 🎯 成功标志
1. `www.wedesign.design` 解析到 `76.76.21.21`
2. `https://www.wedesign.design` 可访问
3. 网站显示正常内容
4. 新下单流程正常工作

## ⚠️ 重要提醒
- **不要删除** `@ A 76.76.21.21` 记录（根域名已正确配置）
- 只修改 `www` 记录
- 保存后耐心等待传播
- 使用 `8.8.8.8` (Google DNS) 测试，避免本地缓存

## 📅 操作时间
建议立即操作，传播期间网站功能不受影响。
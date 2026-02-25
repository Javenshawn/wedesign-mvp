# 技术栈说明

## 核心框架
- **React 18**: 前端UI框架
- **TypeScript**: 类型安全的JavaScript超集
- **Vite**: 下一代前端构建工具

## 样式系统
- **Tailwind CSS**: 实用优先的CSS框架
- **CSS Modules**: 组件级样式隔离
- **PostCSS**: CSS转换工具

## 状态管理
- **Zustand**: 轻量级状态管理
- **React Router**: 客户端路由

## 动画与交互
- **Framer Motion**: 生产级动画库
- **Socket.io Client**: 实时通信

## 开发工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Husky**: Git钩子管理

## 部署平台
- **Vercel**: 与voxyz.space一致的部署平台
- **GitHub Actions**: CI/CD流水线

## 技术选型理由

### 为什么选择React + TypeScript？
1. **voxyz.space可能使用**: 现代AI展示网站常用此组合
2. **类型安全**: TypeScript提供更好的开发体验和错误预防
3. **生态系统**: React拥有丰富的UI库和工具支持
4. **性能**: React 18的并发特性适合实时更新场景

### 为什么选择Tailwind CSS？
1. **开发效率**: 实用类优先，快速原型开发
2. **一致性**: 设计系统易于维护
3. **性能**: 生产构建时自动去除未使用的CSS
4. **像素风格适配**: 易于创建像素风格的UI组件

### 为什么选择Framer Motion？
1. **动画性能**: 基于Spring物理的平滑动画
2. **声明式API**: 易于使用的动画声明
3. **手势支持**: 内置拖拽、点击等手势动画
4. **像素动画适配**: 适合创建帧动画和状态切换

### 为什么选择Socket.io？
1. **实时通信**: 支持WebSocket和HTTP轮询回退
2. **房间管理**: 适合多AI代理场景
3. **自动重连**: 网络不稳定的健壮性
4. **双向通信**: 客户端和服务器双向数据流

## 备选方案

### 如果发现voxyz.space使用Vue
- **迁移方案**: 改为Vue 3 + Composition API
- **等价技术栈**:
  - Vue 3代替React
  - Pinia代替Zustand
  - Vue Router代替React Router
  - 其他技术栈保持不变

### 如果动画需求复杂
- **增强方案**: 添加PixiJS或Phaser
- **适用场景**: 复杂的2D游戏化动画
- **权衡**: 增加包大小，提升动画能力

## 开发环境要求
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 或 yarn >= 1.22.0
- **Git**: 版本控制
- **代码编辑器**: VS Code（推荐）
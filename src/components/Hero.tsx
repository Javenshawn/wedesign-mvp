'use client'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* 专业背景 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          
          {/* 专业徽章 */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-800 font-medium">
              🏆 专业设计团队 • 10+ 年经验 • 200+ 满意客户
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            为您的品牌创造
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              专业、难忘的设计
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            我们不只是设计师，我们是品牌建设者。从初创公司到成熟企业，
            我们帮助客户通过卓越的设计实现业务增长。
          </p>

          {/* 核心价值主张 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">专业设计</h3>
              <p className="text-gray-600 text-sm">
                由资深设计师团队操刀，确保每个设计都达到行业最高标准
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">快速交付</h3>
              <p className="text-gray-600 text-sm">
                标准项目3-7天交付，紧急项目24小时响应，绝不拖延
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">满意保障</h3>
              <p className="text-gray-600 text-sm">
                无限修改直到满意，30天免费售后支持，100%退款保证
              </p>
            </div>
          </div>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a 
              href="#pricing" 
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center text-lg"
            >
              <span>查看专业套餐</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            
            <a 
              href="/cases" 
              className="px-10 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 inline-flex items-center text-lg"
            >
              <span>查看成功案例</span>
              <span className="ml-3">📁</span>
            </a>
          </div>

          {/* 信任指标 */}
          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-700 font-medium">满意客户</div>
                <div className="text-gray-500 text-sm mt-1">全球范围</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">完成项目</div>
                <div className="text-gray-500 text-sm mt-1">零失败记录</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-700 font-medium">客户满意度</div>
                <div className="text-gray-500 text-sm mt-1">基于真实评价</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">客户支持</div>
                <div className="text-gray-500 text-sm mt-1">随时响应</div>
              </div>
            </div>
          </div>

          {/* 支付安全保障 */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-gray-600 font-medium">支付安全保障：</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-green-600 mr-2">🔒</span>
                <span className="font-medium">SSL加密</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-blue-600 mr-2">💳</span>
                <span className="font-medium">Stripe支付</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-purple-600 mr-2">🛡️</span>
                <span className="font-medium">退款保障</span>
              </div>
            </div>
          </div>

          {/* 知名客户（简化版） */}
          <div className="mt-16">
            <div className="text-gray-600 mb-6 font-medium">服务过的知名品牌：</div>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <div className="text-gray-700 font-bold text-lg">TechStart</div>
              <div className="text-gray-700 font-bold text-lg">GreenLeaf</div>
              <div className="text-gray-700 font-bold text-lg">FinTech Pro</div>
              <div className="text-gray-700 font-bold text-lg">Creative Lab</div>
              <div className="text-gray-700 font-bold text-lg">Brand Masters</div>
            </div>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
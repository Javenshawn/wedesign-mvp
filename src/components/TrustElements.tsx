'use client'

export default function TrustElements() {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择 Wedesign？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们不只是设计，我们创造能推动业务的视觉解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 专业认证 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">专业认证</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>10+ 年设计经验</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Adobe认证设计师</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>UI/UX专业认证</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>品牌策略专家</span>
              </li>
            </ul>
          </div>

          {/* 客户信任 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">客户信任</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">200+</div>
                <div className="text-gray-600">满意客户</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">98%</div>
                <div className="text-gray-600">客户满意度</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">客户支持</div>
              </div>
            </div>
          </div>

          {/* 质量保证 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">质量保证</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>无限修改直到满意</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>100% 原创设计</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>源文件交付</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>商业使用权</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>30天免费支持</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 支付安全保障 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                💳 支付安全保障
              </h3>
              <p className="text-gray-600 mb-4">
                通过 Stripe 安全支付，您的支付信息受到银行级加密保护。
                我们不会存储您的信用卡信息。
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">🔒</span>
                  <span className="font-medium">SSL加密</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">🛡️</span>
                  <span className="font-medium">PCI合规</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="font-medium">退款保障</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">💳</div>
                <div className="text-sm font-medium mt-2">信用卡</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">🏦</div>
                <div className="text-sm font-medium mt-2">银行转账</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">📱</div>
                <div className="text-sm font-medium mt-2">数字钱包</div>
              </div>
            </div>
          </div>
        </div>

        {/* 客户评价 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            📣 客户评价
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">张先生</div>
                  <div className="text-gray-600 text-sm">TechStart CEO</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Wedesign 为我们的品牌创造了完美的视觉形象。他们的专业程度超出预期，从沟通到交付都非常顺畅。强烈推荐！"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👩‍💼</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">李女士</div>
                  <div className="text-gray-600 text-sm">GreenLeaf 创始人</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "包装设计非常出色！完全理解我们的品牌理念，设计既美观又实用。客户服务响应迅速，修改意见都能及时处理。"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ❓ 常见问题
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: 设计过程是怎样的？</h4>
              <p className="text-gray-600">
                A: 1) 需求沟通 → 2) 概念设计 → 3) 初稿展示 → 4) 修改调整 → 5) 最终交付。整个过程透明，您随时可以提出修改意见。
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: 如果对设计不满意怎么办？</h4>
              <p className="text-gray-600">
                A: 我们提供无限次修改直到您满意为止。如果最终仍不满意，我们提供100%退款保证。
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: 交付的文件格式有哪些？</h4>
              <p className="text-gray-600">
                A: 我们交付所有源文件（AI, PSD, PDF, PNG, SVG等）和商业使用权，您可以自由使用和修改。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
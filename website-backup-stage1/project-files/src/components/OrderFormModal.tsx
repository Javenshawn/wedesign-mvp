'use client'

import { useState } from 'react'

interface OrderFormData {
  // 项目信息
  projectName: string
  projectDescription: string
  projectType: string
  deadline: string
  
  // 品牌信息
  companyName: string
  industry: string
  targetAudience: string
  competitors: string
  
  // 设计偏好
  designStyle: string
  colorPreferences: string
  inspirationLinks: string
  
  // 联系信息
  contactName: string
  email: string
  phone: string
  wechat: string
  
  // 套餐选择
  selectedPlan: 'basic' | 'professional' | 'premium'
}

interface OrderFormModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: 'basic' | 'professional' | 'premium'
  onSubmit: (formData: OrderFormData) => Promise<void>
}

export default function OrderFormModal({ isOpen, onClose, selectedPlan, onSubmit }: OrderFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<OrderFormData>({
    projectName: '',
    projectDescription: '',
    projectType: '',
    deadline: '',
    companyName: '',
    industry: '',
    targetAudience: '',
    competitors: '',
    designStyle: '',
    colorPreferences: '',
    inspirationLinks: '',
    contactName: '',
    email: '',
    phone: '',
    wechat: '',
    selectedPlan
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const planPrices = {
    basic: '$299',
    professional: '$599',
    premium: '$999'
  }

  const planNames = {
    basic: '基础套餐',
    professional: '专业套餐',
    premium: '高级套餐'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* 弹窗容器 */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* 头部 */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">设计需求表单</h2>
                <p className="text-gray-600 mt-1">
                  选择套餐: <span className="font-bold text-blue-600">{planNames[selectedPlan]} ({planPrices[selectedPlan]})</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* 步骤指示器 */}
            <div className="mt-6">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {step}
                    </div>
                    <div className="mt-2 text-sm">
                      {step === 1 && '项目信息'}
                      {step === 2 && '品牌信息'}
                      {step === 3 && '设计偏好'}
                      {step === 4 && '联系信息'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                />
              </div>
            </div>
          </div>

          {/* 表单内容 */}
          <div className="p-8 overflow-y-auto max-h-[60vh]">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">项目信息</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目名称 *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="例如：品牌Logo设计"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目类型 *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="">请选择项目类型</option>
                    <option value="logo-design">Logo设计</option>
                    <option value="brand-identity">品牌形象设计</option>
                    <option value="packaging-design">包装设计</option>
                    <option value="website-design">网站设计</option>
                    <option value="ui-ux-design">UI/UX设计</option>
                    <option value="print-design">印刷品设计</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目描述 *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="请详细描述您的设计需求、目标和期望..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    期望完成时间
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="例如：2周内、1个月内"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">品牌信息</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司/品牌名称
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="您的公司或品牌名称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    行业领域
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="例如：科技、餐饮、教育、时尚等"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标受众
                  </label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="描述您的目标客户群体（年龄、性别、兴趣等）"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主要竞争对手/参考品牌
                  </label>
                  <textarea
                    name="competitors"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="列出您的竞争对手或您欣赏的品牌"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">设计偏好</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    偏好的设计风格
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['现代简约', '经典传统', '活力创意', '高端奢华', '科技感', '自然有机', '复古怀旧', '其他'].map(style => (
                      <label key={style} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="designStyle"
                          value={style}
                          checked={formData.designStyle === style}
                          onChange={handleInputChange}
                          className="text-blue-600"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    色彩偏好
                  </label>
                  <input
                    type="text"
                    name="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="例如：蓝色系、暖色调、黑白简约等"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    灵感链接/参考图片
                  </label>
                  <textarea
                    name="inspirationLinks"
                    value={formData.inspirationLinks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="可以粘贴Pinterest、Behance链接或描述您喜欢的风格"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">联系信息</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      联系人姓名 *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="您的姓名"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="用于接收设计文件和沟通"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      手机号码
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="用于紧急联系"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      微信/WhatsApp
                    </label>
                    <input
                      type="text"
                      name="wechat"
                      value={formData.wechat}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="用于日常沟通"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">订单摘要</h4>
                  <div className="space-y-2 text-blue-800">
                    <div className="flex justify-between">
                      <span>套餐:</span>
                      <span className="font-bold">{planNames[selectedPlan]} ({planPrices[selectedPlan]})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>项目:</span>
                      <span>{formData.projectName || '未填写'}</span>
                    </div>
                    <div className="text-sm text-blue-600 mt-4">
                      * 提交后我们将尽快与您联系确认需求细节
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 底部按钮 */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    上一步
                  </button>
                )}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  取消
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    下一步
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.projectName || !formData.projectType || !formData.projectDescription || !formData.contactName}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                  >
                    {loading ? '提交中...' : `提交并支付 ${planPrices[selectedPlan]}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
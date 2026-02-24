import Hero from '@/components/Hero'
import TrustElements from '@/components/TrustElements'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustElements />
      <PricingSection />
      
      {/* 最终CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            选择适合您需求的套餐，我们的专业设计师团队将为您创造令人惊叹的设计。
            每一份设计都承载着我们对品质的承诺。
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#pricing" 
              className="px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              立即查看套餐
            </a>
            <a 
              href="mailto:contact@wedesign.design" 
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              免费咨询
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>专业设计师团队</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>无限修改直到满意</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>源文件交付</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>商业使用权</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>30天免费支持</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
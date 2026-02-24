export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">W</span>
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900 tracking-tight">WEDESIGN</div>
        <div className="text-xs text-gray-500 -mt-1">Professional Design</div>
      </div>
    </div>
  )
}
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <span className="text-white font-bold text-xl font-heading">W</span>
        </div>
        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
      <div className="hidden sm:block">
        <div className="text-xl font-bold font-heading tracking-tight primary-gradient-text group-hover:scale-105 transition-transform duration-300">
          WEDESIGN
        </div>
        <div className="text-xs text-muted-foreground -mt-1 group-hover:text-foreground transition-colors">
          Professional Design
        </div>
      </div>
    </Link>
  )
}
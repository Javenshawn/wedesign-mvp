import type { Config } from 'tailwindcss'
import brandSystem from './src/lib/brand-system'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // 字体系统
      fontFamily: {
        sans: brandSystem.typography.fonts.body,
        heading: brandSystem.typography.fonts.heading,
        mono: brandSystem.typography.fonts.mono,
      },
      
      // 字号系统
      fontSize: brandSystem.typography.sizes,
      fontWeight: brandSystem.typography.weights,
      lineHeight: brandSystem.typography.lineHeights,
      
      // 间距系统
      spacing: brandSystem.spacing,
      
      // 颜色系统
      colors: {
        // 品牌色
        primary: brandSystem.colors.primary,
        secondary: brandSystem.colors.secondary,
        neutral: brandSystem.colors.neutral,
        
        // 功能色
        success: brandSystem.colors.functional.success,
        warning: brandSystem.colors.functional.warning,
        error: brandSystem.colors.functional.error,
        info: brandSystem.colors.functional.info,
        
        // 组件色
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // 圆角系统
      borderRadius: brandSystem.borderRadius,
      
      // 阴影系统
      boxShadow: brandSystem.shadows,
      
      // 动画系统
      animation: {
        ...brandSystem.animations.presets,
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
      },
      
      // 关键帧
      keyframes: {
        ...brandSystem.keyframes,
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      // 背景渐变
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      
      // 断点系统
      screens: brandSystem.breakpoints,
      
      // 其他扩展
      transitionDuration: brandSystem.animations.durations,
      transitionTimingFunction: brandSystem.animations.timingFunctions,
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
export default config
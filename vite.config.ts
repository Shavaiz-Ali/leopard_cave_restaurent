import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

const chunkMap: Record<string, string> = {
  // React core
  'react': 'vendor-react',
  'react-dom': 'vendor-react',
  'react-router': 'vendor-react',
  'react-router-dom': 'vendor-react',

  // Radix UI
  '@radix-ui/react-accordion': 'vendor-radix',
  '@radix-ui/react-alert-dialog': 'vendor-radix',
  '@radix-ui/react-aspect-ratio': 'vendor-radix',
  '@radix-ui/react-avatar': 'vendor-radix',
  '@radix-ui/react-checkbox': 'vendor-radix',
  '@radix-ui/react-collapsible': 'vendor-radix',
  '@radix-ui/react-context-menu': 'vendor-radix',
  '@radix-ui/react-dialog': 'vendor-radix',
  '@radix-ui/react-dropdown-menu': 'vendor-radix',
  '@radix-ui/react-hover-card': 'vendor-radix',
  '@radix-ui/react-icons': 'vendor-radix',
  '@radix-ui/react-label': 'vendor-radix',
  '@radix-ui/react-menubar': 'vendor-radix',
  '@radix-ui/react-navigation-menu': 'vendor-radix',
  '@radix-ui/react-popover': 'vendor-radix',
  '@radix-ui/react-progress': 'vendor-radix',
  '@radix-ui/react-radio-group': 'vendor-radix',
  '@radix-ui/react-scroll-area': 'vendor-radix',
  '@radix-ui/react-select': 'vendor-radix',
  '@radix-ui/react-separator': 'vendor-radix',
  '@radix-ui/react-slider': 'vendor-radix',
  '@radix-ui/react-slot': 'vendor-radix',
  '@radix-ui/react-switch': 'vendor-radix',
  '@radix-ui/react-tabs': 'vendor-radix',
  '@radix-ui/react-toast': 'vendor-radix',
  '@radix-ui/react-toggle': 'vendor-radix',
  '@radix-ui/react-toggle-group': 'vendor-radix',
  '@radix-ui/react-tooltip': 'vendor-radix',

  // Charts
  'recharts': 'vendor-charts',

  // Animation
  'motion': 'vendor-motion',

  // Supabase
  '@supabase/supabase-js': 'vendor-supabase',

  // Forms
  'react-hook-form': 'vendor-forms',
  '@hookform/resolvers': 'vendor-forms',
  'zod': 'vendor-forms',

  // Dates
  'date-fns': 'vendor-dates',
  'react-day-picker': 'vendor-dates',

  // UI utils
  'class-variance-authority': 'vendor-ui-utils',
  'clsx': 'vendor-ui-utils',
  'tailwind-merge': 'vendor-ui-utils',
  'lucide-react': 'vendor-ui-utils',
  'cmdk': 'vendor-ui-utils',
  'sonner': 'vendor-ui-utils',
  'vaul': 'vendor-ui-utils',
  'next-themes': 'vendor-ui-utils',
  'embla-carousel-react': 'vendor-ui-utils',
  'input-otp': 'vendor-ui-utils',
  'react-resizable-panels': 'vendor-ui-utils',

  // Network
  'axios': 'vendor-network',
  'ky': 'vendor-network',

  // Media
  'video-react': 'vendor-media',
  'react-dropzone': 'vendor-media',
  'qrcode': 'vendor-media',
}

export default defineConfig({
  plugins: [react(), svgr()],
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Match node_modules packages by scanning the chunkMap keys
          for (const [pkg, chunk] of Object.entries(chunkMap)) {
            if (id.includes(`/node_modules/${pkg}/`)) {
              return chunk
            }
          }
        },
      },
    },
  },
})
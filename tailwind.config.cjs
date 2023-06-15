module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['alert-success', 'alert-error', 'alert-info', 'alert-warning'],
  plugins: [require('daisyui')],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: '#171717',
          secondary: '#30aadd',
          accent: '#00ffc6',
          neutral: '#171717', 
          info: '#93c5fd',
          success: '#BBF7D0',
          warning: '#fdba74',
          error: '#DC2626',
          'base-content': '#FAFAFA', // Base text content color
          'base-100': '#171717', // Base background color
          '--rounded-box': '16px',
          '--rounded-btn': '4px',
          '--rounded-badge': '2px',
          '--tab-radius': '2px',
          '--btn-text-case': 'normal-case',
          '--navbar-padding': '16px'
        },
        light: {
          primary: '#FAFAFA',
          secondary: '#30aadd',
          accent: '#00ffc6',
          neutral: '#171717',
          info: '#bfdbfe',
          success: '#BBF7D0',
          warning: '#fed7aa',
          error: '#DC2626',
          'base-content': '#171717', // Base text content color
          'base-100': '#FAFAFA', // Base background color
          '--rounded-box': '16px',
          '--rounded-btn': '4px',
          '--rounded-badge': '2px',
          '--tab-radius': '2px',
          '--btn-text-case': 'normal-case',
          '--navbar-padding': '16px'
        }
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: 'dark'
  },
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite'
      },
      aspectRatio: {
        '22/23': '22 / 23'
      },
      boxShadow: {
        orange: '0px 4px 0px rgba(243, 110, 101, 0.35)'
      },
      colors: {
        blue: {
          100: '#DBEAFE',
          600: '#2563EB',
          900: '#1E3A8A'
        },
        green: {
          300: '#86EFAC',
          500: '#22C55E',
          700: '#15803D'
        },
        neutral: {
          50: '#FAFAFA',
          200: '#E5E5E5',
          500: '#737373',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        },
        orange: {
          50: '#FFF7ED',
          200: '#FDBA74',
          300: '#F26D64',
          500: '#F36E65',
          600: '#EED082',
          700: '#C2410C'
        },
        red: {
          400: '#F87171',
          600: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['ApfelGrotezk'],
        serif: ['Literata']
      },
      fontSize: {
        'btn-sm': ['16px', { lineHeight: '17px'}],
        'btn': ['20px', { lineHeight: '22px'}],
        'body-xs': ['12px', { lineHeight: '18px'}],
        'body-sm': ['16px', { lineHeight: '24px' }],
        'body-m': ['20px', { lineHeight: '30px' }],
        'body-lg': ['24px', { lineHeight: '36px' }],
        'heading-sm': ['16px', { lineHeight: '17px', textTransform: 'uppercase', letterSpacing: '0.04em' }],
        'heading-m': ['24px', { lineHeight: '30px', letterSpacing: '-0.02em' }],
        'heading-lg': ['38px', { lineHeight: '41px', letterSpacing: '-0.02em' }],
        'heading-xl': ['50px', { lineHeight: '54px', letterSpacing: '-0.02em' }],
        'heading-2xl': ['56px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(102%)' },
          '100%': { transform: 'translateX(-100vw)' }
        }
      },
      width: {
        narrowModal: '327px',
        wideModal: '471px'
      },
      zIndex: {
        max: '1000' // High enough to appear above the modal(999)
      }
    }
  }
}

module.exports = {
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            strong: {
              fontWeight: 'inherit',
            },
            h1: {
              fontSize: 'var(--text-hone)',
              lineHeight: 'var(--text-hone--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            h2: {
              fontSize: 'var(--text-htwo)',
              lineHeight: 'var(--text-htwo--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            h3: {
              fontSize: 'var(--text-hthree)',
              lineHeight: 'var(--text-hthree--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            h4: {
              fontSize: 'var(--text-hfour)',
              lineHeight: 'var(--text-hfour--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            h5: {
              fontSize: 'var(--text-hfive)',
              lineHeight: 'var(--text-hfive--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            h6: {
              fontSize: 'var(--text-hsix)',
              lineHeight: 'var(--text-hsix--line-height)',
              fontWeight: '400',
              strong: {
                fontWeight: '500',
              },
            },
            p: {
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--text-base--line-height)',
              fontWeight: '400',
              color: 'rgba(from currentcolor r g b / 0.8)',
              strong: {
                fontWeight: '500',
                color: 'rgba(from currentcolor r g b / 1)',
              },
            },
            ul: {
              li: {
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--text-base--line-height)',
                fontWeight: '400',
                color: 'rgba(from currentcolor r g b / 0.8)',
                strong: {
                  fontWeight: '500',
                  color: 'rgba(from currentcolor r g b / 1)',
                },
              },
            },
            ol: {
              li: {
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--text-base--line-height)',
                fontWeight: '400',
                color: 'rgba(from currentcolor r g b / 0.8)',
                strong: {
                  fontWeight: '500',
                  color: 'rgba(from currentcolor r g b / 1)',
                },
              },
            },
          },
        },
        md: {
          css: {
            p: {
              fontSize: 'var(--text-hfive)',
              lineHeight: 'var(--text-hfive--line-height)',
            },
          },
        },
        lg: {
          css: {
            p: {
              fontSize: 'var(--text-hfour)',
              lineHeight: 'var(--text-hfour--line-height)',
            },
          },
        },
      }),
    },
  },
  plugins: [],
};

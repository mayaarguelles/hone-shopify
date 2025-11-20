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
            h1: {
              fontSize: 'var(--text-hone)',
              lineHeight: 'var(--text-hone--line-height)',
              fontWeight: '400',
            },
            h2: {
              fontSize: 'var(--text-htwo)',
              lineHeight: 'var(--text-htwo--line-height)',
              fontWeight: '400',
            },
            h3: {
              fontSize: 'var(--text-hthree)',
              lineHeight: 'var(--text-hthree--line-height)',
              fontWeight: '400',
            },
            h4: {
              fontSize: 'var(--text-hfour)',
              lineHeight: 'var(--text-hfour--line-height)',
              fontWeight: '400',
            },
            h5: {
              fontSize: 'var(--text-hfive)',
              lineHeight: 'var(--text-hfive--line-height)',
              fontWeight: '400',
            },
            h6: {
              fontSize: 'var(--text-hsix)',
              lineHeight: 'var(--text-hsix--line-height)',
              fontWeight: '400',
            },
            p: {
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--text-base--line-height)',
              fontWeight: '400',
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

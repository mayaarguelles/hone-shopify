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
            p: {
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--text-base--line-height)',
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

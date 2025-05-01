module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        "background": 'var(--color-background)',
        "cards": 'var(--color-cards)',
        "accent": 'var(--color-accent)',

        "text-primary": 'var(--color-text-primary)',
        "text-secondary": 'var(--color-text-secondary)',

        "error": 'var(--color-error)',
        "warning": 'var(--color-warning)',
        "success": 'var(--color-success)'
      },
    },
  },
}

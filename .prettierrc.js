module.exports = {
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
  ],
};

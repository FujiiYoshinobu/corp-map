module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'boundaries', 'simple-import-sort', 'import', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    },
    'boundaries/elements': [
      { type: 'app', pattern: 'src/app/**' },
      { type: 'processes', pattern: 'src/processes/**' },
      { type: 'pages', pattern: 'src/pages/**' },
      { type: 'widgets', pattern: 'src/widgets/**' },
      { type: 'features', pattern: 'src/features/**' },
      { type: 'entities', pattern: 'src/entities/**' },
      { type: 'shared', pattern: 'src/shared/**' }
    ],
    'boundaries/ignore': ['**/*.stories.tsx', '**/__tests__/**']
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: ['app'],
            allow: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared']
          },
          { from: ['processes'], allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: ['pages'], allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: ['widgets'], allow: ['features', 'entities', 'shared'] },
          { from: ['features'], allow: ['entities', 'shared'] },
          { from: ['entities'], allow: ['shared'] },
          { from: ['shared'], allow: ['shared'] }
        ]
      }
    ],
    'boundaries/no-unknown': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
};

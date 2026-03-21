import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['.next/', 'node_modules/', 'pnpm-lock.yaml'] },
  ...nextCoreWebVitals,
  prettier,
  {
    rules: {
      'no-return-await': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'warn',
      'no-var': 'error',
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off'
    }
  }
)

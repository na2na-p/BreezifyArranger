import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importRules from 'eslint-plugin-import';

/** @type {import('eslint').Linter.RulesRecord} */
const importCustomRules = {
  'import/no-duplicates': 'error',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external'],
      pathGroups: [
        {
          pattern: '@/**',
          group: 'external',
          position: 'after',
        },
      ],
      alphabetize: {
        order: 'asc',
      },
      'newlines-between': 'always',
    },
  ],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['**/*spec.[jt]s[x]'],
      optionalDependencies: false,
      peerDependencies: false,
    },
  ],
};

/** @type {import('eslint').Linter.RulesRecord} */
const typescriptEslintCustomRules = {
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-empty-object-type': 'error',
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'generic',
      readonly: 'generic',
    },
  ],
  '@typescript-eslint/no-restricted-types': [
    'error',
    {
      types: {
        Array: {
          message:
            'Arrayの使用は禁止です。ReadonlyArrayかMutableArrayを使用してください。',
          suggest: ['MutableArray', 'ReadonlyArray'],
        },
      },
    },
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
    },
  ],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
    },
  ],
  'no-restricted-imports': 'off',
  '@typescript-eslint/no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: [
            './*/**/internal/**/*',
            '@/**/internal/**/*',
            '../**/internal/**/*',
            '@/features/**/internal/**/*',
          ],
          message: 'Do not import internal modules.',
        },
      ],
    },
  ],
};

const plugins = {
  import: importRules,
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
};

const parser = tseslint.parser;

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
  ],
  files: ['src/**/*.{js,ts,mjs,mts,cjs,cts,jsx,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser,
  },
  plugins,
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...importCustomRules,
    ...typescriptEslintCustomRules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    'import/internal-regex': '^~/',
  },
});

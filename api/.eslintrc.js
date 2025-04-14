module.exports = {
  plugins: ['security', 'promise'],
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:node/recommended',
    // 'plugin:jest/recommended',
    'plugin:prettier/recommended',
    // 'plugin:promise/recommended'
  ],
  env: {
    node: true,
    // 'jest/globals': true,
  },
  parserOptions: {
    sourceType: 'script',
    // ecmaVersion: 2020
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'linebreak-style': 'off',
    'node/prefer-global/url': ['error', 'always'],
    'node/no-missing-require': 'error',
    'no-unsafe-optional-chaining': 'on',
    'node/no-deprecated-api': [
      'error',
      {
        ignoreModuleItems: [],
        ignoreGlobalItems: [],
      },
    ],
    'node/no-unpublished-bin': [
      'error',
      {
        convertPath: null,
      },
    ],
    'node/no-extraneous-require': [
      'error',
      {
        allowModules: [],
      },
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: [],
      },
    ],
    'node/no-unsupported-features/es-builtins': [
      'error',
      {
        ignores: [],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        'version': ">=9.0.0",
        ignores: [],
      },
    ],
    'node/no-unsupported-features/node-builtins': [
      'error',
      {
        ignores: [],
      },
    ],
    // 'capitalized-comments': [
    //   'error',
    //   'always',
    //   {
    //     ignorePattern: 'pragma|ignored',
    //     ignoreInlineComments: true,
    //   },
    // ],
    // 'node/shebang': ['error', { convertPath: null }],
    // 'mocha/no-exclusive-tests': 'error',
    // 'mocha/no-global-tests': 'error',
    // 'mocha/no-identical-title': 'error',
    // 'mocha/no-nested-tests': 'error',
    // 'mocha/valid-suite-description': [1, '^[A-Z]'],
  },
};

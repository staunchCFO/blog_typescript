module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommeded',
        'prettier/@typescript-eslint',
        'plugin/prettier/recommded'
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {}
}
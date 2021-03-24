module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/strongly-recommended', '@vue/standard'],
	rules: {
		'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'generator-star-spacing': 'off',
		'no-mixed-operators': 0,
		'vue/max-attributes-per-line': [
			2,
			{
				singleline: 5,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		'vue/attribute-hyphenation': 0,
		'vue/html-self-closing': 0,
		'vue/component-name-in-template-casing': 0,
		'vue/html-closing-bracket-spacing': 0,
		'vue/singleline-html-element-content-newline': 0,
		'vue/no-unused-components': 0,
		'vue/multiline-html-element-content-newline': 0,
		'vue/no-use-v-if-with-v-for': 0,
		'vue/html-closing-bracket-newline': 0,
		'vue/no-parsing-error': 0,
		'no-tabs': 0,
		quotes: [
			2,
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true
			}
		],
		semi: [
			2,
			'never',
			{
				beforeStatementContinuationChars: 'never'
			}
		],
		'no-delete-var': 2,
		'prefer-const': [
			0,
			{
				ignoreReadBeforeAssign: false
			}
		],
		'template-curly-spacing': 'off',
		indent: [0, 4], //缩进风格
		'no-new': 0,
		'no-unused-vars': 'off',
		'space-before-function-paren': 0,
		eqeqeq: 0, //不必须使用全等,
		'dot-notation': [0, { allowKeywords: true }], //避免不必要的方括号
		'quote-props': [0, 'always'], //对象字面量中的属性名是否强制双引号
		'no-trailing-spaces': 0,
		'no-multiple-empty-lines': 0,
		'vue/html-indent': ['off']
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
}

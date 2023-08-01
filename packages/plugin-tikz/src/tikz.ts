export default [
	{
		match: /\\(usepackage|input|usemodule)(?![a-zA-Z0-9])/g,
		type: 'str'
	},
	{
		match: /\\(begin|end|node)(?![a-zA-Z0-9])/g,
		type: 'class'
	},
	{
		match: /\\[a-zA-Z0-9]+/g,
		type: 'oper'
	},
	{
		match: /%.+$/gm,
		type: 'cmnt'
	},
	{
		match: /(\(|\)|\{|\}|\[|\])/g,
		type: 'esc'
	},
	{
		match: /[0-9]+[a-z]{0,3}/g,
		type: 'num'
	}
];

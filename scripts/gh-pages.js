import { publish } from 'gh-pages';

publish(
	'demo/build',
	{
		branch: 'gh-pages',
		repo: 'https://github.com/BearToCode/carta-md.git',
		user: {
			name: 'BearToCode',
			email: 'davidebasso03@gmail.com'
		},
		dotfiles: true
	},
	() => {
		console.log('Github Pages deployed!');
	}
);

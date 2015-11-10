(function () {
	'use strict';

	angular
		.module('posts')
		.controller('PostsSingleController', PostsSingleController);

	/* @ngInject */
	function PostsSingleController(Posts, postSlug, marked, $sce) {
		/*jshint validthis: true */
		var vm = this;

		vm.post = {};
		vm.content = '';
		vm.parsedContent = '';

		activate();

		function activate() {
			Posts.getSingle(postSlug)
				.then(function(post) {
					console.log(post)
					vm.post = post;
					return post.getPostContent();
				})
				.then(function(content) {
					vm.content = _renderPostContent(content, vm.post.postFileExtension);
					console.log(vm.content)
					//vm.content = content;
				});
		}

		function _renderPostContent(content, ext) {

			console.log('Create a ' + ext + ' article');

			if(ext === '.md') {
				return marked(content, {
					gfm: true,
					tables: true,
					langPrefix: 'hljs ',
					highlight: function(code, lang) {
						console.log(lang, code)
						if(lang === undefined || lang === 'no-highlight') {
							lang = 'bash';
						}
						if(lang === 'html') {
							lang = 'xml';
						}
						if(lang === 'js') {
							lang = 'javascript';
						}
						return hljs.highlight(lang, code).value;
					}
				}, function(err, string) {
					console.log('Post parsed', err, string);
					if(err) {
						vm.errors = err;
						return;
					}

					return $sce.trustAsHtml(string);
				});

			} else {
				return $sce.trustAsHtml(content);
			}

		}
	}

})();

(function() {
	'use strict';

	angular.module('posts')
		/* @ngInject */
		.config(function ($stateProvider) {

			var PostsRoute = {
				name: 'application.posts',
				abstract: true,
				views: {
					'application@application': {
						templateUrl: 'modules/posts/posts.template.html',
						controller: 'PostsController',
						controllerAs: 'posts'
					}
				}
			};

			var PostsListsRoute = {
				name: 'application.posts.list',
				url: '/posts',
				views: {
					'application@application': {
						templateUrl: 'modules/posts/list/list.template.html',
						controller: 'PostsListController',
						controllerAs: 'postsList'
					}
				}
			};

			var PostsSingleRoute = {
				name: 'application.posts.single',
				url: '/:category/:slug',
				views: {
					'application@application': {
						templateUrl: 'modules/posts/single/single.template.html',
						controller: 'PostsSingleController',
						controllerAs: 'postsSingle'
					}
				},
				resolve: {
					postSlug: function(Posts, $stateParams) {
						console.log('go geile')
						return $stateParams.slug;
					}
				}
			};

			$stateProvider.state(PostsRoute);
			$stateProvider.state(PostsListsRoute);
			$stateProvider.state(PostsSingleRoute);
		});
})();

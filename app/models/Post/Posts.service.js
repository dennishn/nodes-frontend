(function () {
	'use strict';

	angular
		.module('Posts')
		.service('Posts', Posts);

	/* @ngInject */
	function Posts($q, $http, $filter, $sce, lodash, Post) {
		/*jshint validthis: true */

		// Variables

		var service = {
			getList: getList,
			getListPaginated: getListPaginated,
			search: search,
			getSingle: getSingle,
			collection: {
				posts: [],
				categories: []
			},
		};

		return service;

		function getList() {

			var deferred = $q.defer();

			service.collection.posts = [];
			service.collection.categories = [];

			$http.get('/content/posts.json')
				.then(function getPostsList(results) {

					for(var i = 0, l = results.data.posts.length; i < l; i++) {

						var post = new Post(results.data.posts[i]);
						service.collection.posts.push(post);

					}
					service.collection.categories = results.data.categories;

					deferred.resolve(service.collection);

				});

			return deferred.promise;

		}

		function getListPaginated(page, limit, category) {

			var deferred = $q.defer();

			service.collection.posts = [];
			service.collection.categories = [];

			$http.get('/content/posts.json')
				.then(function getPostsList(results) {

					for(var i = 0, l = results.data.posts.length; i < l; i++) {

						var post = new Post(results.data.posts[i]);
						service.collection.posts.push(post);

					}
					service.collection.categories = results.data.categories;

					var filteredCollection = service.collection.posts;

					category = category || 'all';

					if(category !== 'all') {
						filteredCollection = lodash.filter(service.collection.posts, {'category': category.toLowerCase()});
					}

					filteredCollection = $filter('offset')(filteredCollection, page * limit);
					filteredCollection = $filter('limitTo')(filteredCollection, limit);

					console.log()

					deferred.resolve({
						posts: filteredCollection,
						pagination: {
							totalPosts: service.collection.posts.length,
							totalPages: Math.ceil(service.collection.posts.length / limit) - 1
						}
					});

				});

			return deferred.promise;

		}

		function search(term) {

			var results = {
				titles: [],
				tags: []
			};

			var foundTitles = [];
			var foundTags = [];

			var coreOptions = {
				pre: '<b>',
				post: '</b>'
			};

			var titleSearch = {
				extract: function(post) {
					return post.title;
				}
			};

			angular.extend(titleSearch, coreOptions);

			service.collection.posts.forEach(function(post) {

				var _tagResults = fuzzy.filter(term, post.tags, coreOptions);

				if(_tagResults.length > 0) {

					_tagResults.forEach(function(result) {
						if(result.score < 1) {
							return;
						}
						result.original = post;
						result.string = $sce.trustAsHtml(result.string);
						foundTags.push(result);
					});

					if(foundTags.length > 0) {
						results.tags.push(_tagResults);
					}

				}

			});


			var titleResults = fuzzy.filter(term, service.collection.posts, titleSearch);

			if(titleResults.length > 0) {

				titleResults.forEach(function(result) {
					if(result.score < 1) {
						return;
					}
					result.string = $sce.trustAsHtml(result.string);
					foundTitles.push(result);
				});

				if(foundTitles.length > 0) {
					results.titles = titleResults;
				}
			}

			return results;

		}

		function getSingle(slug) {

			var deferred = $q.defer();

			if(service.collection.posts.length < 1) {
				getList().
					then(function() {
						deferred.resolve(_findPostBySlug(slug));
					});
			} else {
				deferred.resolve(_findPostBySlug(slug));
			}

			return deferred.promise;

		}

		function _findPostBySlug(slug) {

			return lodash.find(service.collection.posts, function(p) {
				return p.slug === slug;
			});

		}
	}

})();

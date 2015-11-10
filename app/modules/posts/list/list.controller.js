(function () {
	'use strict';

	angular
		.module('posts')
		.controller('PostsListController', PostsListController);

	/* @ngInject */
	function PostsListController($scope, Posts) {
		/*jshint validthis: true */
		var vm = this;

		vm.list 			= [];
		vm.pagination		= {};

		vm.postsPerPage 	= 5;

		vm.currentPage		= 0;

		vm.currentCategory 	= 'all';

		vm.nextPage 		= nextPage;
		vm.prevPage 		= prevPage;

		vm.nextPageDisabled = nextPageDisabled;
		vm.prevPageDisabled = prevPageDisabled;

		vm.setCategory 		= setCategory;

		vm.search 			= search;
		vm.clearSearch		= clearSearch;
		vm.searchResults 	= {};
		// TODO: This is for debugging only
		//vm.searchTerm 	= 'Angular';

		activate();

		function activate() {
			Posts.getListPaginated(vm.currentPage, vm.postsPerPage)
				.then(function(collection) {
					vm.list = collection.posts;
					vm.pagination = collection.pagination;
				});

			$scope.$watch(function() {
				return Posts.collection.categories;
			}, function(categories) {
				vm.listCategories = categories;
			});

			$scope.$watch(function() {
				return vm.searchTerm;
			}, function(newTerm, oldTerm) {

				if(newTerm === oldTerm) {
					return;
				}

				vm.searchResults = Posts.search(vm.searchTerm);
				console.log(vm.searchResults);
			});
		}

		function nextPage() {
			// TODO: Logik om den må....

			vm.currentPage++;
			Posts.getListPaginated(vm.currentPage, vm.postsPerPage)
				.then(function(collection) {
					vm.list = collection.posts;
					vm.pagination = collection.pagination;
				});
		}

		function prevPage() {
			// TODO: Logik om den må....

			vm.currentPage--;
			Posts.getListPaginated(vm.currentPage, vm.postsPerPage)
				.then(function(collection) {
					vm.list = collection.posts;
					vm.pagination = collection.pagination;
				});
		}

		function nextPageDisabled() {
			return vm.currentPage === vm.pagination.totalPages;
		}

		function prevPageDisabled() {
			return vm.currentPage === 0;
		}

		function setCategory(category) {
			console.log(category)
			Posts.getListPaginated(vm.currentPage, vm.postsPerPage, category)
				.then(function(collection) {
					vm.list = collection.posts;
					vm.pagination = collection.pagination;
				});
		}

		function search() {
			vm.searchResults = Posts.search(vm.searchTerm);
		}

		function clearSearch() {
			vm.searchResults = {};
			vm.searchTerm = '';
		}

		function _getListSuccess() {

		}
		function _getListError() {

		}
		function _getListFinally() {

		}
	}

})();

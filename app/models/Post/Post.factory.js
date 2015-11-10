(function () {
	'use strict';

	angular
		.module('Posts')
		.factory('Post', Post);

	/* @ngInject */
	function Post($q, $http, lodash, moment) {
		/*jshint validthis: true */

		// Variables

		// instantiate initial object
		var Model = function(data) {
			angular.extend(this, data);

			this.slug = lodash.kebabCase(data.title);
			this.category = lodash.kebabCase(data.category);
			this.published = moment(data.uri, 'DD-MM-YYYY');
		};

		Model.prototype.getPostContent = function() {

			var deferred = $q.defer();

			$http.get('/content/posts/' + this.category + '/' + this.uri + '/post' + this.postFileExtension)
				.then(function(result) {
					deferred.resolve(result.data);
				});

			return deferred.promise;
		};

		/*
			Example public method.
			Don't forget to inject your dependencies.

			Model.prototype.save = function(data) {

				var self = this;

				return someService.save(data)
					.then(function(response) {
						angular.extend(self, response.data);

						return response;
					});

			};
		*/

		return Model;
	}

})();

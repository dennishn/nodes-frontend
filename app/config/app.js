(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name nodes-frontend
	 * @description
	 * # nodes-frontend
	 *
	 * Main module of the application.
	 */
	angular
		.module('nodes-frontend', [
			'ui.router',
			'config',
			'angulartics',
			'angulartics.google.analytics',
			'mm.foundation',
			'ngAnimate',
			'angularMoment',
			'ngLodash',
			'hc.marked',
			'application',
			'index',
			'Posts',
			'posts',
			'offset'
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();
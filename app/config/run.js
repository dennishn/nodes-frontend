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
		.module('nodes-frontend')
		.run(run);

	function run(nTranslate, $state, $rootScope, $localStorage) {
		var didRunTranslate = false;

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

			if(!didRunTranslate) {


				if(!$localStorage.translate) {
					event.preventDefault();
					nTranslate.init().then(function() {
						$state.go(toState.name, toParams);
					});
				} else {
					event.preventDefault();
					nTranslate.init().then(function() {
						$state.go(toState.name, toParams);
					});
				}

				didRunTranslate = true;
			}
		});
	}
})();

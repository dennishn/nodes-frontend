(function() {
	'use strict';

	angular
		.module('offset')
		.filter('offset', Offset);

	/* @ngInject */
	function Offset() {
		return function (input, start) {
			start = parseInt(start, 10);
			return input.slice(start);
		};
	}
})();

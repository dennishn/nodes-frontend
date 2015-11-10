(function () {
	'use strict';

	var core = angular.module('config', [
		'hc.marked'
	]);

	var config = {
		appTitle: 'Title'
	};

	core.value('config', config);

	core.config(configure);

	/* @ngInject */
	function configure($logProvider,
					   $stateProvider,
					   $urlRouterProvider,
					   $locationProvider,
					   $httpProvider,
					   markedProvider) {

		markedProvider.setOptions({
			gfm: true,
			tables: true,
			langPrefix: 'hljs ',
			highlight: function(code, lang) {
				if(lang === undefined) {
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
		});
		markedProvider.setRenderer({
			link: function(href, title, text) {
				if(href.substr(0, 1) === '#') {
					return "<a class='toc__link' href='" + href + "'" + (title ? " title='" + title + "'" : '') + ">" + text + "</a>";
				}
				return "<a href='" + href + "'" + (title ? " title='" + title + "'" : '') + " target='_blank'>" + text + "</a>";
			}
		});

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/404');

		$stateProvider
			.state('application.notfound', {
				url: '/404',
				views: {
					'application@': {
						templateUrl: '404.html'
					}
				}
			})
			.state('error', {
				url: '/503',
				views: {
					'application@': {
						templateUrl: '503.html'
					}
				}
			});
	}

})();

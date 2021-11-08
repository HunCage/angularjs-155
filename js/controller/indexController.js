webapp.controller("indexController", [
	"$scope",
	"$http",
	"userFactory",
	function ($scope, $http, userFactory) {
		$scope.pageTitle = 'App Managment'
	},
]);

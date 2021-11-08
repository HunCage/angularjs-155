const webapp = angular.module("webapp", ["ngRoute"]);

webapp.config([
	"$routeProvider",
	"$locationProvider",
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when("/index", {
				templateUrl: "template/content/index.html",
                controller: "indexController"
			})
			.when("/users", {
                templateUrl: "template/content/users.html",
			})
			.when("/settings", {
                templateUrl: "template/content/settings.html",
			})
			.otherwise({
                redirectTo: "/index",
			});

		// configure html5 to get links working on jsfiddle
		// $locationProvider.html5Mode(true);
	},
]);

// webapp.controller("bodyController", [
// 	"$scope",
// 	"$http",
// 	function ($scope, $http) {

// 		$scope.isLoggedIn = false;

// 		$scope.name = "Jeffrey";

// 		$scope.users = [];
// 		$http.get("json/user.json").then(function (serverData) {
// 			$scope.users = serverData.data;
// 			console.log($scope.users);
// 		});
// 	},
// ]);

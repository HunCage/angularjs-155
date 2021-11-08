webapp.controller("bodyController", [
	"$scope",
	"$http",
	"userFactory",
	"$rootScope",
	function ($scope, $http, userFactory, $rootScope) {
		// $scope.isLoggedIn = true;
		$scope.isLoggedIn = false;

		$scope.defaultContent = "index";
		$scope.currentContentName = "";

		$scope.name = "Jeffrey";

		$scope.users = [];

		userFactory.checkLogin().then(function (res) {
			$scope.isLoggedIn = res.loggedIn;
			$scope.currentUser = res.user;
		});

		$scope.doLogin = function (loginData) {
			if (!loginData) {
				alert("Please fill the required fields!");
				return;
			}

			if (!loginData.email || !loginData.pass) {
				alert("Invalid username or password!");
				return;
			}

			userFactory.doLogin(loginData).then(function (serverData) {
				$scope.isLoggedIn = serverData.loggedIn;
			});
		};
		$scope.getTemplate = function (name) {
			return "template/" + name + ".html";
		};

		$scope.getContent = function (name) {
			if (angular.isUndefined(name)) {
				name = $scope.defaultContent;
			}

			$scope.currentContentName = name;

			$scope.currentContent = $scope.getTemplate("content/" + name);
		};

		// $scope.getContent();

		$rootScope.$on("$routeChangeSuccess", function (oldRoute, newRoute) {
			if (angular.isUndefined(name)) {
				name = $scope.defaultContent;
			} else {
				$scope.currentContentName =
					newRoute.$$route.originalPath.replace("/", "");
			}
		});
	},
]);

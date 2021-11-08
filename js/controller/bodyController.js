webapp.controller("bodyController", [
	"$scope",
	"$http",
	"userFactory",
	function ($scope, $http, userFactory) {
		$scope.isLoggedIn = true;
		// $scope.isLoggedIn = false;

		$scope.defaultContent = "index";
		$scope.currentContentName = '';

		$scope.name = "Jeffrey";

		$scope.users = [];

		$scope.doLogin = function () {
			if (!$scope.loginData) {
				alert("Please fill the required fields!");
				return;
			}

			if (!$scope.loginData.email || !$scope.loginData.pass) {
				alert("Invalid username or password!");
				return;
			}

			userFactory.checkLogin($scope.loginData).then(function (loggedIn) {
				$scope.isLoggedIn = loggedIn;
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

		$scope.getContent();
	},
]);

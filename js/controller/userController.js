webapp.controller("userController", [
	"$scope",
	"$http",
	"userFactory",
	function ($scope, $http, userFactory) {
		$scope.users = [];

		$scope.getUsers = function () {
			userFactory.getUsers().then(function (users) {
				console.log("users", users);
				if (users.loggedIn) {
					$scope.isLoggedIn = users.loggedIn;
				} else {
					$scope.users = users;
				}
			});
		};
		$scope.getUsers();

		$scope.modUser = function (user) {
			userFactory.modUser(user).then(function (saveResult) {
				console.log("saveResult", saveResult);
			});
		};
	},
]);

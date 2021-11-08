/* login handling */
webapp.factory("userFactory", [
	"$q",
	"$http",
	"$rootScope",
	function ($q, $http, $rootScope) {
		let factory = {
			sendResponse: function (defer, response) {
				if (angular.isDefined(response.loggedIn)) {
					if (response.loggedIn === false) {
						$rootScope.$broadcast("noLogin");
					}
				}
				defer.resolve(response);
			},

			doLogin: function (loginData) {
				let deferred = $q.defer();

				$http
					.post("/dologin", loginData)
					.then(function (loginResponse) {
						factory.sendResponse(deferred, loginResponse.data);
					});

				return deferred.promise;
			},

			checkLogin: function () {
				let deferred = $q.defer();

				$http.get("/checkLogin").then(function (loginResponse) {
					factory.sendResponse(deferred, loginResponse.data);
				});

				return deferred.promise;
			},

			getUsers: function () {
				let deferred = $q.defer();
				$http.get("/users").then(
					function (serverData) {
						factory.sendResponse(deferred, serverData.data);
					},
					function (error) {
						deferred.reject(error);
					}
				);
				return deferred.promise;
			},

			modUser: function (user) {
				let deferred = $q.defer();
				$http.post("/user", user).then(function (res) {
					factory.sendResponse(deferred, res.data);
				});
				return deferred.promise;
			},
		};
		return factory;
	},
]);

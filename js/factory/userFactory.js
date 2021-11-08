/* login handling */
webapp.factory("userFactory", [
	"$q",
	"$http",
	"$rootScope",
	function ($q, $http, $rootScope) {
		return {
			doLogin: function (loginData) {
				let deferred = $q.defer();

				$http
					.post("/dologin", loginData)
					.then(function (loginResponse) {
						deferred.resolve(loginResponse.data);
					});

				return deferred.promise;
			},

			checkLogin: function () {
				let deferred = $q.defer();

				$http.get("/checkLogin").then(function (loginResponse) {
					deferred.resolve(loginResponse.data);
				});

				return deferred.promise;
			},

			getUsers: function () {
				let deferred = $q.defer();
				$http.get("/users").then(
					function (serverData) {
						deferred.resolve(serverData.data);
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
					deferred.resolve(res);
				});
				return deferred.promise;
			},
		};
	},
]);

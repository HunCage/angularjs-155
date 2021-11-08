/* login handling */
webapp.factory("userFactory", [
	"$q",
	"$http",
	function ($q, $http) {
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

				$http
					.get("/checkLogin")
					.then(function (loginResponse) {
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
		};
	},
]);

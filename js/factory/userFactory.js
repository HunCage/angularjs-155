/* login handling */
webapp.factory("userFactory", [
	"$q",
	"$http",
	function ($q, $http) {
		return {
			checkLogin: function (loginData) {

                let deferred = $q.defer();

                this.getUsers().then(function(users) {
                    let loggedIn = false;
    
                    for (let k in users) {
                        if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
                            loggedIn = true;
                        }
                    }
                    deferred.resolve(loggedIn);

                }, function(error) {
                    console.error("server connection error");
                    deferred.resolve(loggedIn);

                });

                return deferred.promise;
            },

			getUsers: function () {
                let deferred = $q.defer();
				$http.get("json/user.json").then(function (serverData) {
					deferred.resolve(serverData.data);
				}, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
			},
		};
	},
]);

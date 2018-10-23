app.factory('registerService',function ($http) {
    this.register = function (firstname,lastname,emailAddress,password) {
        $http.post("https://api.myjson.com/bins/zce74",{ user : {
            "fname" : firstname,
            "lname" : lastname,
            "email" : emailAddress,
            "pwd" : password
        }
        });
    }
})
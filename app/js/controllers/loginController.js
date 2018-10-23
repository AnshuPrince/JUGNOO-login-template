app.controller('loginController',['$scope','$cookieStore','$window','$location',function ($scope,$cookieStore,$window,$location) {

    // Used for toggling the password view(bulleted or text password)
    $scope.showPassword = false;

    // toggles the value of showPassword
    $scope.togglePassword = function(){
        this.showPassword =  this.showPassword ? false : true;
    }

    //cookie
    $scope.setCookies = function(username,password){
        $cookieStore.remove('userId');
        $cookieStore.put(username,password);
    };
    //setting expire time of cookie to 1 year
    var now = new $window.Date(),
        // this will set the expiration to 1 months
        exp = new $window.Date(now.getFullYear()+1, now.getMonth()+6, now.getDate());

    // set cookie
    $scope.cookieIt = function (username) {
        user = hashString(username);
        this.setCookies('userId',user,{
            expires: exp
        });
    }

    // hash string
    function hashString(str){
        var hash = CryptoJS.HmacSHA256("Message", str);
        return str+'|'+CryptoJS.enc.Base64.stringify(hash);
    }

    //hash password
    function hashPass(str){
        var hash = CryptoJS.HmacSHA256("Message",str);
        return CryptoJS.enc.Base64.stringify(hash);
    }

    // verify the user using the cookie stored in browser
      function verifyCookie() {
        var cookie = $cookieStore.get('userId');
        if(cookie)
        {
            var name = cookie.split('|')[0];
            if(cookie == hashString(name)) {
                $location.path('/home');
            }
        }

    }
    verifyCookie();

    // verify that user is  valid
     $scope.verifySubmit = function(username,password) {
        if(username == 'admin' && password == 'admin')
        {
            this.cookieIt(username);
            verifyCookie();
            return;
        }
        if(username=="" || username==null || password==""|| password==null)
        {
            return false;
        }
        var pwd = hashPass(password);
        if(users.userName.indexOf(username) >=0 && users.code.indexOf(pwd) >= 0)
        {
            this.cookieIt(username);
        }
        else
        {
            document.getElementById('loginMessage').innerText = "Wrong username or password"
        }
        verifyCookie();
    }

    //dummy users
    var users =  {
        userName : ['anshu']
        ,
        code : [
            'W7DnI4ZQBdFWa7yurPBDUHz6TpgV7FvBs6K+HzGZuW8='
        ]
    }


}]);
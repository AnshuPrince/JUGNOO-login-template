// Controller used for registering a user
app.controller('registerController',['$scope','$cookieStore','$window','$location',function($scope,$cookieStore,$window,$location){

    //cookie
    $scope.setCookies = function(username,uid){
        $cookieStore.remove('userId');
        $cookieStore.put(username,uid,{
            expires: exp
        });
    };
    //setting expire time of cookie to 1 year
    var now = new $window.Date(),
        // this will set the expiration to 1 months
        exp = new $window.Date(now.getFullYear()+1, now.getMonth()+6, now.getDate());

    // set cookie
    $scope.cookieIt = function (username) {
        user = hashString(username);
        this.setCookies('userId',user);
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
    //Register the user and save his data
    $scope.registerUser = function() {
        // SEND USER DATA TO SERVER
        //var pwd = hashPass(password);
        // send hashed password to the server.
        var username = document.getElementById('username').value;
        this.cookieIt(username);
        verifyCookie();
    }
    // $scope.validateForm = function() {
    //     if(username == "" || username == null || password == "" || password == null || emailAddress == "" || emailAddress == null ) {
    //         alert("Mandatory fields must be filled");
    //         return false;
    //     }
    //     else {
    //         this.registerUser();
    //         return true;
    //     }
    // }

    $scope.mobileNumberValidation = function() {
        var num = document.getElementById('mobileNum').value;
        var regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if(!regex.exec(num))
        {
            document.getElementById('mobileNum').value = "";
            document.getElementById("mobileNumMsg").innerHTML = "<font color=red size=2>Invalid Mobile Number</font>";
            document.getElementById("mobileNum").focus();
        }
        else
        {
            document.getElementById("mobileNumMsg").innerHTML = "";
        }

    }

    $scope.usernameValidation = function () {
        var username = document.getElementById('username').value;
        var legalchars= /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;// /^[A-Za-z][A-Za-z0-9-$]+$/;
        if(!legalchars.exec(username))
        {
            document.getElementById("username").value = "";
            document.getElementById("umsg").innerHTML="<font color=red size=2>ALPHANUMERIC ONLY</font>";
            document.getElementById("username").focus();
            return false;
        }
        else
        {
            document.getElementById("umsg").innerHTML="";
            return true;
        }

    }

    $scope.passwordmatch = function() {
        var pass1=document.getElementById("pwd").value;
        var pass2=document.getElementById("cpwd").value;
        if(pass1!=pass2)
        {
            document.getElementById("pwd").value = "";
            document.getElementById("cpwd").value = "";
            document.getElementById("pwd").focus();
            document.getElementById("pwdmsg").innerHTML = "<font color=red size=2>PASSWORD MISMATCH</font>";
            return false;
        }
        else{
            return true;
        }
    }
    $scope.passwordlength = function() {
        x=document.getElementById("pwd").value.length;
        if(x<5) {
            document.getElementById("pwdmsg").innerHTML="<font color=red size=2>TOO SMALL</font>";
            document.getElementById("pwd").value = "";
            document.getElementById("pwd").focus();
            return false;
        }
        else {
            if (x > 15) {
                document.getElementById("pwdmsg").innerHTML = "<font color=red size=2>MAX LIMIT CROSSED</font>";
                document.getElementById("pwd").focus();
                return false;
            }
            else {
                document.getElementById("pwdmsg").innerHTML = "";
                return true;
            }

        }

    }

}]);
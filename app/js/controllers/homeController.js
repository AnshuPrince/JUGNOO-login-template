app.controller('homeController',['$scope','$cookieStore','$location',function($scope,$cookieStore,$location){
    // verify the user using the cookie stored in browser
    function verifyCookie() {
        var cookie = $cookieStore.get('userId');
        if(cookie) {
            var name = cookie.split('|')[0];
            if(cookie == hashString(name)) {
                $scope.name = name;
            }
        }
        else {
            $cookieStore.remove('userId');
            $location.path('/');
        }

    }
    // hash string
    function hashString(str){
        var hash = CryptoJS.HmacSHA256("Message", str);
        return str+'|'+CryptoJS.enc.Base64.stringify(hash);
    }
    //logout
    $scope.logout = function(){
        $cookieStore.remove('userId');
        $location.path('/');
    }
    verifyCookie();
    $scope.showData = function () {
        $location.path('/data');
    }
    //toggle slide bar
    $scope.toggleSlideBar = function() {
        $('#userInfo').toggle(500);
    };


    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}]);

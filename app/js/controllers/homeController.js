app.controller('homeController',['$scope','$cookieStore','$location',function($scope,$cookieStore,$location){
    $(document).ready( function () {
        $('#table_id').DataTable({
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            responsive: true
        });
        $('#data').hide();
        $('#userInfo').hide();
    } );
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
    //toggle slide bar
    $scope.toggleSlideBar = function() {
        $('#userInfo').toggle(500);
        $('#data').hide(500);
        shallShowHomeData();
    };

    $scope.showData = function(){
        $('#data').toggle(500);
        $('#userInfo').hide(500);
        shallShowHomeData();
    };
    function shallShowHomeData() {
        var isSlideBarOpen = $('#userInfo').is(':visible');
        var isShowDataOpen = $('#data').is(':visible');
        console.log(isShowDataOpen+'A'+isSlideBarOpen);
        if(!isSlideBarOpen || !isShowDataOpen)
        {
            $('#homeData').show();
        }
        else
        {
            $('#homeData').hide();
        }
    }
}]);

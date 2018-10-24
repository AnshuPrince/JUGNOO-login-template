/**
 * Created by anshu on 24/10/18.
 */
app.controller('tableController',['$scope','$location','$cookieStore',function($scope,$location,$cookieStore){
    $(document).ready( function () {
        $('#table_id').DataTable({
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            responsive: true
        });
    } );
}]);
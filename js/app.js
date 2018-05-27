var app = angular.module("BDMscholz", []); 
app.controller("myCtrl", function($scope , RestService) {
    $scope.actors = [{"name":"dulfrey" , "capability":0.5,"influence":0.2 ,"position":40}];
    $scope.newActor = {name:""}
    $scope.addActor = function () {
        $scope.actors.push(angular.copy($scope.newActor));
        console.log($scope.actors);
    } 
    $scope.delActor = function (actor) {
        const index = $scope.actors.indexOf(actor);
    	$scope.actors.splice(index, 1);

    } 
    $scope.calculate  = function () {
    	RestService.sendJson("https://httpbin.org/post",$scope.actors).then(function  (request) {  
	            console.info(request)
	          }).catch(function(err) {
	             $scope.requestError(err);
	           }).then(function() {
	           });
    }
    $scope.clear = function () {
    		$scope.actors = []
    }		


    	$scope.download_csv = function () {
		    var csv = 'Name,Title\n';
		    data.forEach(function(row) {
		            csv += row.join(',');
		            csv += "\n";
		    });
		 
		    console.log(csv);
		    var hiddenElement = document.createElement('a');
		    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
		    hiddenElement.target = '_blank';
		    hiddenElement.download = 'people.csv';
		    hiddenElement.click();
	}
});
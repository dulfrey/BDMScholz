var app = angular.module("BDMscholz", ['googlechart']); 

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

	
        // Properties
        $scope.myChartObject = {};

        //Methods
        $scope.hideSeries = hideSeries;
        
        init();

        function hideSeries(selectedItem) {
            var col = selectedItem.column;
            if (selectedItem.row === null) {
                if ($scope.myChartObject.view.columns[col] == col) {
                    $scope.myChartObject.view.columns[col] = {
                        label: $scope.myChartObject.data.cols[col].label,
                        type: $scope.myChartObject.data.cols[col].type,
                        calc: function() {
                            return null;
                        }
                    };
                    $scope.myChartObject.options.colors[col - 1] = '#CCCCCC';
                }
                else {
                    $scope.myChartObject.view.columns[col] = col;
                    $scope.myChartObject.options.colors[col - 1] = $scope.myChartObject.options.defaultColors[col - 1];
                }
            }
        }

        function init() {
            $scope.myChartObject.type = "LineChart";
            $scope.myChartObject.displayed = false;
            $scope.myChartObject.data = {
                "cols": [{
                    id: "month",
                    label: "Month",
                    type: "string"
                }, {
                    id: "laptop-id",
                    label: "Laptop",
                    type: "number"
                }, {
                    id: "desktop-id",
                    label: "Desktop",
                    type: "number"
                }, {
                    id: "server-id",
                    label: "Server",
                    type: "number"
                }, {
                    id: "cost-id",
                    label: "Shipping",
                    type: "number"
                }],
                "rows": [{
                    c: [{
                        v: "1"
                    }, {
                        v: 19,
                        
                    }, {
                        v: 12,
                        
                    }, {
                        v: 7,
                    }, {
                        v: 4
                    }]
                }, {
                    c: [{
                        v: "2"
                    }, {
                        v: 13
                    }, {
                        v: 1,
                        f: "1 unit (Out of stock this month)"
                    }, {
                        v: 12
                    }, {
                        v: 2
                    }]

                }, {
                    c: [{
                        v: "3"
                    }, {
                        v: 24
                    }, {
                        v: 5
                    }, {
                        v: 11
                    }, {
                        v: 6
                    }]
                }]
            };
            $scope.myChartObject.options = {
                "title": "Predición",
                "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
                "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Posición",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Rondas"
                }
            };

            $scope.myChartObject.view = {
                columns: [0, 1, 2, 3, 4]
            };
        }
    

});
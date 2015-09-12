// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location',  'cityService', 'dayService', function($scope, $location, cityService, dayService) {

    $scope.city = cityService.city;
    
    $scope.$watch('city' , function(){
    
        cityService.city = $scope.city;
    
    })
    
    $scope.submit = function() {
    
        $location.path("/forecast");
    
    };
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'dayService', 'unitService', function($scope, $resource, $routeParams, cityService, dayService, unitService) {

    $scope.city = cityService.city;
    
    $scope.days = dayService.days;
    
    $scope.units = unitService.units;
    
    
    $scope.$watchGroup(['days', 'units'], function(){
    
        dayService.days = $scope.days;
        
        unitService.units = $scope.units;
    
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method:"JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, units: $scope.units, cnt: $scope.days });
        
    });
            
    $scope.convertToDate = function(dt) {
    
        return new Date(dt * 1000);
    
    };
    
    
}]);
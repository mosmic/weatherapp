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


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'dayService', function($scope, $resource, $routeParams, cityService, dayService) {

    $scope.city = cityService.city;
    
    $scope.days = dayService.days;
    
    
    $scope.$watch('days', function(){
    
        dayService.days = $scope.days;
    
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method:"JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
        
    });
        
    $scope.convertToFarenheit = function(degK) {
    
        return Math.round((1.8 * (degK - 273)) + 32);
    
    };
    
    $scope.convertToDate = function(dt) {
    
        return new Date(dt * 1000);
    
    };
    
    
}]);
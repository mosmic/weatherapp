// DIRECTIVES
weatherApp.directive("weatherReport", function() {

    return{
    
        restrict: 'E',
        templateUrl: 'directives/weatherreport.html',
        replace: true,
        scope: {
        
            weatherDay: "=",
            convertToDate: "&",
            dateFormat: "@"
        
        }
    
    }

})
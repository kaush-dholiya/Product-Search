map.controller('currlocation', function($scope,$cordovaGeolocation) {
  $scope.getcurrentlocation=function(successCallback,errorCallback){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
       // var lat  = position.coords.latitude
       // var long = position.coords.longitude
        successCallback(position);
        
      }, function(err) {
          errorCallback(err);
      });
  }

  
});
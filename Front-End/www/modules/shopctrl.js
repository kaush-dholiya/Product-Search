map.controller('shopctrl',function($scope,$http){
  $http.defaults.useXDomain=true;

  //if(localStorage.getItem("user")) {
    //  $scope.saveduser = JSON.parse(localStorage.getItem("user"));
    //}

  $scope.shopsfun=function(){

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        $scope.shop = {
          lat : lat,
          lon : long
        };

        console.log(lat + '   ' + long);
        $http.post("http://localhost:3000/shoplocations/nearbyshops",$scope.shop).success(function(result){
          console.log(JSON.stringify(result));
        }).error(function(result){
            console.log(JSON.stringify($scope.shop));  
        });

      }, function(err) {
           console.log("errorrr")
      });
      

  }


});
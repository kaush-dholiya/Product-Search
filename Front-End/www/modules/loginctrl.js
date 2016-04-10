map.controller('loginctrl', function($scope,$http) {
    $http.defaults.useXDomain = true;
    // $http.defaults.headers.post['Content-Type'] = 'application/json';
    $scope.user = {
      username: "",
      password : ""
    }
    if(localStorage.getItem("user")) {
      $scope.saveduser = JSON.parse(localStorage.getItem("user"));
    }
    

    $scope.login=function() {
      console.log(JSON.stringify($scope.user));
      $http.post("http://localhost:3000/users/login",$scope.user).then(function(result){
        if(result.data._id) {
          localStorage.setItem("user",JSON.stringify(result.data));
          window.location.href =  "/#/map/map";
        }
        $scope.message = JSON.stringify(result);
      });
    };
});
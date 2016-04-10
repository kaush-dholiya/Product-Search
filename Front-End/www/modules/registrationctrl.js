map.controller('registrationctrl', function($scope,$http) {
    $http.defaults.useXDomain = true;
    // $http.defaults.headers.post['Content-Type'] = 'application/json';
    $scope.newuser = {
    	username: "",
    	password : "",
        email : ""
    }
   
    

    $scope.registration=function() {
    	console.log(JSON.stringify($scope.newuser));
    	$http.post("http://localhost:3000/users/register",$scope.newuser).then(function(result){
    			console.log(result);
    		//$scope.message = JSON.stringify(result);
            if(result.data._id)
            {
                window.location.href =  "/#/map/login";
            }
            else
            {
                $scope.message="User Already exists with same username or email address";
            }
    	});
    };
});

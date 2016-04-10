// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var map = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 
.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
   
  .state('map', {
    url: '/map',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('map.login',{
    url:"/login",
    views:{
      'menuContent':{
        templateUrl:'templates/login.html',
        controller:'loginctrl'
      }
    }
  })
  .state('map.map',{
    url:"/map",
    views:{
      'menuContent':{
        templateUrl:'templates/map.html',
        controller:'MapCtrl'
      }
    }
  }).state('map.registration',{
    url:"/registration",
    views:{
      'menuContent':{
        templateUrl:'templates/Registration.html',
        controller : 'registrationctrl'
      }
    }
  });

 
  $urlRouterProvider.otherwise("/map/login");
 
})

/*.factory('Markers', function($http) {
 
  var markers = [];
 
  return {
    getMarkers: function(){
 
      return $http.post("http://localhost:3000/shoplocations/OnlyShopLocations").then(function(response){
          markers = response;
          //console.log(markers);
          return markers;
      });
 
    }
  }
})*/

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation,$http) {
console.log("In controller");

            //Accessing Category data

             $scope.type = [];
             $scope.selectedCategory = {
                cname: ""
              }
            $http.post("http://localhost:3000/shoplocations/category").then(function(response){
             // $scope.type = response.data;
              for(var k=0;k<response.data.length;k++)
              {
                  $scope.type[k]=response.data[k]["category"];
              }
              console.log($scope.type);
            });
            //Accessing Category data DONE
            
            //Accessing ShopLocations For Markers which is further used below to show markers
          /* $http.post("http://localhost:3000/shoplocations/OnlyShopLocations").then(function(response){
              markers = response;
            });*/
            //Accessing ShopLocations For Markers which is further used below to show markers DONE

            //ACCESSING CURRENT POSITION
            var options = {timeout: 10000, enableHighAccuracy: true};
           $scope.location={
            lat:"",
            lon:""
           }
            $cordovaGeolocation.getCurrentPosition(options).then(function(position){
              
              var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              $scope.location.lat=position.coords.latitude;
              $scope.location.lon=position.coords.longitude;
              var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
           
              $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
              
          //Wait until the map is loaded
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){
           
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon:"https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w32"
            });      

            //ACCESSING CURRENT POSITION DONE



            // ON click the near by shop markers are shown on the map
            $scope.search=function(){
                        console.log($scope.selectedCategory.cname);
                        $http.post("http://localhost:3000/shoplocations/nearbyshops/"+$scope.selectedCategory.cname,$scope.location).then(function(response){
                              markers = response;
                              console.log("markers"+response);
                        

                        for (var i = 0; i < markers.data.length; i++) {
             
                                      // console.log("inside loop");
                                     //  console.log(markers);
                                       var lat =markers.data[i]["loc"]["lat"];
                                       var lon = markers.data[i]["loc"]["lon"];
                                      var markerPos = new google.maps.LatLng(lon,lat);
                                      //console.log(JSON.stringify(markerPos));
                                      // Add the markerto the map
                                      var marker = new google.maps.Marker({
                                          map:$scope.map,
                                          animation: google.maps.Animation.DROP,
                                          position: markerPos
                                      });
                          }  

                          }); 

            }

                  var infoWindow = new google.maps.InfoWindow({
                      content: "Here I am!"
                   });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
           
          });
           
            }, function(error){
              console.log("Could not get location");
            });


                    var watchOptions = {timeout : 3000, enableHighAccuracy: false};
           var watch = $cordovaGeolocation.watchPosition(watchOptions);
          
           watch.then(
              null,
            
              function(err) {
                 console.log(err)
              },
            
              function(position) {
                 var lat  = position.coords.latitude
                 var long = position.coords.longitude
                 console.log(lat + '' + long)
              }
           );

           watch.clearWatch();
});


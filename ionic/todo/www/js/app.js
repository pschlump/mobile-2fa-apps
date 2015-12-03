// Ionic One time key app

var g_server = "http://localhost:3116";

var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('BodyCtrl', function($scope,$http) {

	$scope.showDeviceIDInput = false;
	$scope.DeviceID = window.localStorage.getItem('DeviceID') ;
	$scope.OneTimeKey = "";
	console.log ( "Pulled up device ID = ", $scope.DeviceID );

	$scope.GetOneTimeKey = function() {
		console.log ( "get one time key" );
		var rnd = Math.random();
		callbackFx = function(x) {
			console.log ( "gen x=", x );
			$scope.OneTimeKey = x.OneTimeKey;
		}
		$http.jsonp(g_server+"/api/get2FactorFromDeviceID?DeviceID="+$scope.DeviceID+"&callback=callbackFx&_rnd="+rnd, {})
			.success(function (msg, status, headers, config) {})
			.error(function (data, status, headers, config) {});
	};
	$scope.EnterDeviceID = function() {
		console.log ( "enter device id" );
		$scope.showDeviceIDInput = true;
	};
	$scope.ScanDeviceID = function() {
		console.log ( "scan devide id" );
		// xyzzy - use ionic scanner code for QR codes
	};
	$scope.SubmitDeviceIdForm = function() {
		var x = $scope.DeviceID;
		x = $("#DeviceID").val();		// why?
		$scope.DeviceID = x;
		// $timeout(function() {
			console.log ( "Saving to local storage", x);
			window.localStorage.setItem('DeviceID', x);
		// }, 200);
		$scope.showDeviceIDInput = false;
		// xyzzy1 - message - saved it.
	};
})

;

var callbackFx = function(x) {
	console.log ( "x=", x );
}


'use strict';

angular.module('webApp.home', ['ngRoute', 'firebase'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}])

	.controller('HomeCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {



		var ref = firebase.database().ref().child('Orders');
		$scope.orders = $firebaseArray(ref);
		

		$scope.createOrder = function () {
			var name = $scope.orders.nameTxt;
			var email = $scope.orders.emailTxt;
			var phoneNo = $scope.orders.phoneNoTxt;
			var productCode = $scope.orders.productCodeTxt;
			var address = $scope.orders.addressTxt;
			var message = $scope.orders.messageTxt;
			$scope.orders.$add({
				name: name,
				email: email,
				phoneNo: phoneNo,
				address: address,
				productCode: productCode,
				message: message
			}).then(function (ref) {
				console.log(ref);
				$scope.success = true;
				window.setTimeout(function () {
					$scope.$apply(function () {
						$scope.success = false;
					});
				}, 2000);
				
			}, function (error) {
				console.log(error);
			});
			
		};

	}]);
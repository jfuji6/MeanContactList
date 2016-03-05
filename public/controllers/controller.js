var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', function($scope, $http){
	console.log("Hello world from controler");
	
	var refresh=function() {
		$http.get('/contactlist').success(function(response) {
			console.log("I got a response");
			$scope.contactlist = response;
			// clear input boxes
			$scope.contact = "";
		});
	};	
	// call the on loading
	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success( function(response){
			console.log(response);
			// refresh the page.
			refresh();
		});
	};
	
	$scope.removeContact = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};

	$scope.editContact = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id ).success(function(response){
			$scope.contact = response;
		});
	}

	$scope.updateContact =function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	}

	$scope.deselect = function() {
		$scope.contact = "";
	}
});
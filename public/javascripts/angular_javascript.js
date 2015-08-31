
var app = angular.module("MyApp", []);


/*
app.controller("MainController", function($scope){

});

app.controller("Customers", function($scope){
	$scope.myName = "";
	$scope.customers = [
		{name:'John Smith', city:'JoS'}, 
		{name: 'Jane Smith', city:'JaS'}, 
		{name: 'John Doe', city:'JoD'}, 
		{name: 'Jane Doe', city:'JaD'}
	];
});
*/

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when("/", 
	{
		controller: 'Keypass',
		// templateUrl: 'javascripts/Partials/keypass_list.html'
		templateUrl: 'javascripts/Partials/keypass_list.ejs'
	})
	.when("/keypass/show",
	{
		controller: 'Customers',
		templateUrl: 'Partials/View1.html'
	})
	.otherwise({redirectTo: "/"})
	;
}]);

var controllers = {};

controllers.Keypass = function($scope, $http) {
	$scope.myName = "";
	$scope.customers = [
		{name: 'John Smith', city:'JoS'}, 
		{name: 'Jane Smith', city:'JaS'}, 
		{name: 'John Doe', city:'JoD'}, 
		{name: 'Jane Doe', city:'JaD'}
	];

	$http.get("/api/index").success( function(data){
		$scope.data = data;
		console.log('$scope.data inside');
		console.log($scope.data);
	});

};

addCustomer = function($scope) {
	$scope.customers.push(
	{
		name: $scope.newCustomer.name,
		city: $scope.newCustomer.city
	});
};


controllers.Keyspass_c = function($scope, $http){

	// Simple POST request example (passing data) :
	$http.post('/someUrl', {msg:'hello word!'})
	.success(function(data, status, headers, config) {
	// this callback will be called asynchronously
	// when the response is available
	})
	.error(function(data, status, headers, config) {
	// called asynchronously if an error occurs
	// or server returns response with an error status.
	});

}


app.controller(controllers);

// console.log(app);


'use strict';

/* Controllers */

angular.module('app.payrollControllers', ['pascalprecht.translate', 'ngCookies'])
  .controller('PayRollSetupCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
  	
  	$http.get("/getAllPayRollComponents")
    .success(function (data) {
      $scope.payRollSetupObject = data;
      console.log($scope.payRollSetupObject);      
    })
    .error(function (err) {
      console.log(err);
    })


  	$scope.component = {};
  	$scope.selectedComp = {};
  	/*$scope.payRollSetupObject = [{
  		name: 'Gross',
  		description: 'Gross components',
  		formula: '',
  		values: [
	  		{
	  			name : 'BASIC',
				description: 'Basic component',
				formula: 'M_CTC*0.4'
	  		},
	  		{
	  			name : 'DA',
				description: 'DA',
				formula: ''
	  		},
	  		{
	  			name : 'HRA',
				description: 'HRA',
				formula: 'BASIC*0.4'
	  		},
  		]
  	},
  	{
  		name: 'Deduction',
  		description: 'Deduction components',
  		formula: '',
  		values: [
	  		{
	  			name : 'IT',
				description: 'Income Tax',
				formula: ''
	  		},
	  		{
	  			name : 'PF',
				description: 'Provident Fund',
				formula: ''
	  		},
	  		{
	  			name : 'LOAN',
				description: 'Loan',
				formula: ''
	  		},
  		]
  	},
  	{
  		name: 'Calculation Fields',
  		description: 'Calculation Fields',
  		formula: '',
  		values: [
	  		{
	  			name : 'M_CTC',
				description: 'Monthly CTC',
				formula: ''
	  		},
	  		{
	  			name : 'Y_CTC',
				description: 'Yearly CTC',
				formula: ''
	  		}
  		]
  	}
  	];*/
  	$scope.editComponent = function (item) {
  		$scope.component = item;
  	};
  	$scope.updateComponent = function (item) {
  		console.log(item);
  		var hasname = 0;
  		angular.forEach($scope.payRollSetupObject,function(value,index){  			
  			if(item.formula.indexOf(value.name) > -1){
  					hasname = 1;
  					alert(item.formula.indexOf(value.name) > -1);
  					alert(value.name);
  			}
  			angular.forEach(value.values,function(innervalues,innerindexs){
  				if(item.formula.indexOf(innervalues.name) > -1){
  					hasname = 1;
  					alert(item.formula.indexOf(innervalues.name) > -1);
  					alert(innervalues.name); 
  				}
  			});
  		});

  		if(hasname = 1){
  			$scope.component = item;
          	console.log($scope.component);
          	$http.post('/updateComponent', {_id:$scope.component._id, component:$scope.component}).success(function (data) {
            	if(data) {
              		console.log(data);              		
            	}
          	})
          	.error(function (err) {
            	console.log(err);
          	})
  		}

  	};
  	$scope.resetComponent = function () {
  		$scope.component = $scope.selectedComp;
  	};
  }]);
'use strict';

/* Controllers */

angular.module('app.controllers', [ ])
  .controller('AppCtrl', ['$scope', '$http', '$state',  '$window', 
    function(              $scope,   $http,   $state,  $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Stabenfldt',
        version: '1.0.0',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          // themeID: 1,
          // navbarHeaderColor: 'bg-black',
          // navbarCollapseColor: 'bg-white-only',
          // asideColor: 'bg-black',
          themeID: 2,
          navbarHeaderColor: 'bg-primary',
          navbarCollapseColor: 'bg-primary',
          asideColor: 'bg-white b-r',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false
        }
      }

     
      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
  }])

 //courses controller
  .controller('CoursesCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
    $scope.tests = {};
    $scope.courseslists = [
      {
        id:"1",
        sku:"KIK1201",
        name:"product1",
        description:"first product with large amount of data for testing. Is it fine with our UI. lets add some dummy data in it also and check it further.",
        retail_price:"20",
        wholesale_price:"12",
        barcode: "612615046870",
        innr_qty: "18",
        outr_qty: "144",
        warehouse_loc: "A5",
        stock_qty:"167",
        cost:"3.90",
        cost_update_date:"04 sep 2014",
        eta:"19 sep 2014",
        weight:"120 grams",
        dimensions:"14x18x99 cm",
        box_dimensions:"10.5x21x0.5 cm",
        image:"b2.jpg",
        date:"22 sep 14",
        category: "lifestyle bags",
        brand: "BAGGU",
        

      },
      {
        id:"2",
        sku:"KIK1202",
        name:"product2",
        description:"second product",
        retail_price:"20",
        wholesale_price:"12",
        barcode: "612615046870",
        innr_qty: "18",
        outr_qty: "144",
        warehouse_loc: "A5",
        stock_qty:"167",
        cost:"3.90",
        cost_update_date:"04 sep 2014",
        eta:"19 sep 2014",
        weight:"120 grams",
        dimensions:"14x18x99 cm",
        box_dimensions:"10.5x21x0.5 cm",
        image:"b0.jpg",
        date:"22 sep 14",
        category: "Shoes",
        brand: "TOMs Shoes"
      },
      {
        id:"3",
        sku:"KIK1203",
        name:"product3",
        description:"third product",
        retail_price:"20",
        wholesale_price:"12",
        barcode: "612615046870",
        innr_qty: "18",
        outr_qty: "144",
        warehouse_loc: "A5",
        stock_qty:"167",
        cost:"3.90",
        cost_update_date:"04 sep 2014",
        eta:"19 sep 2014",
        weight:"120 grams",
        dimensions:"14x18x99 cm",
        box_dimensions:"10.5x21x0.5 cm",
        image:"b1.jpg",
        date:"22 sep 14",
        category: "Shoes",
        brand: "TOMs Shoes"
      },
      {
        id:"4",
        sku:"KIK1204",
        name:"product4",
        description:"fourth product",
        retail_price:"20",
        wholesale_price:"12",
        barcode: "612615046870",
        innr_qty: "18",
        outr_qty: "144",
        warehouse_loc: "A5",
        stock_qty:"167",
        cost:"3.90",
        cost_update_date:"04 sep 2014",
        eta:"19 sep 2014",
        weight:"120 grams",
        dimensions:"14x18x99 cm",
        box_dimensions:"10.5x21x0.5 cm",
        image:"b2.jpg",
        date:"22 sep 14",
        category: "Home & Decoration",
        brand: "Kikkerland"
      },
      {
        id:"5",
        sku:"KIK1205",
        name:"product5",
        description:"fifth product",
        retail_price:"20",
        wholesale_price:"12",
        barcode: "612615046870",
        innr_qty: "18",
        outr_qty: "144",
        warehouse_loc: "A5",
        stock_qty:"167",
        cost:"3.90",
        cost_update_date:"04 sep 2014",
        eta:"19 sep 2014",
        weight:"120 grams",
        dimensions:"14x18x99 cm",
        box_dimensions:"10.5x21x0.5 cm",
        image:"b0.jpg",
        date:"22 sep 14",
        category: "Sneakers",
        brand: "BAGGU"
      }
    ];   

    $http.get('http://6b752eee.ngrok.com/practice_tests').success(function (data) {
      if(data)
        $scope.tests = data;
        console.log(data);
        //$scope.loadCategoryValues(0);
      })
      .error(function (err) {
        console.log(err);
      });

  }]) 

  .controller('AddTestCtrl',['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams){
    $scope.test = {};
    $scope.AddTestForm = {};
    $scope.QuestionForm = {};
    $scope.count = 0;
    $scope.question=[];
    $scope.ques={};
    $scope.answers_attr={};
    $scope.test_id = {};
        
    $scope.submitValues = function(){ 
      console.log(' save ');        
      console.log($scope.test); 
      
      $http.post('http://6b752eee.ngrok.com/practice_tests', {practice_test: $scope.test})
      .then(function(response) {
        if ( !response.data.success ) {
          $scope.authError = response;
        }else{
          console.log(response);
          $scope.test_id = response.data.test_id;
          alert("Test added successfully");
          /*$scope.test = {};
          $state.go('app.courses.new');*/
        }
      }, function(x) {
        console.log(x);
        $scope.authError = 'Server Error';
      });
    }
    
    $scope.addAlternatives = function(ind){
      $scope.question[ind].answers_attributes.push({description:'',correct:0});
    }

    $scope.addQuestions = function(){
      $scope.question.push({practice_test_id:'',title:'',text:'',answers_attributes:[{description:'',correct:0}]});
    }

    $scope.getSelectans = function(parent_ind,ind){
      angular.forEach($scope.question[parent_ind].answers_attributes,function(values,indexs){
        values.correct=0;
      });
      $scope.question[parent_ind].answers_attributes[ind].correct = 1;      
    }

    $scope.saveQuestion = function(ind){      
      $scope.question[ind].practice_test_id = $scope.test_id
      console.log($scope.question[ind]);   
      
      $http.post('http://6b752eee.ngrok.com/practice_tests/'+$scope.test_id+'/questions', {question: $scope.question[ind]})
      .then(function(response) {
        if ( !response.data.success ) {
          $scope.authError = response;
        }else{
          console.log(response);
          alert("Question added successfully");
          //$state.go('app.courses.listing');
        }
      }, function(x) {
        console.log(x);
        $scope.authError = 'Server Error';
      });
    }

  }]);



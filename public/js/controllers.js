'use strict';

/* Controllers */

angular.module('app.controllers', ['pascalprecht.translate', 'ngCookies'])
  .controller('AppCtrl', ['$scope', '$http', '$state', '$translate', '$localStorage', '$window', 
    function(              $scope,   $http,   $state,   $translate,   $localStorage,   $window ) {
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

      $scope.categories = [];
      $scope.employees = [];
      $scope.app.empId = {};     

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }
  }])

 
  //datepicker controller
  .controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      //$scope.dt = new Date();
      /*$scope.employee.personal_info.dob = new Date();
      $scope.employee.joining_details.doj = new Date();
      $scope.employee.joining_details.doc = new Date();*/
      /*$scope.app.user.personal_info.dob = new Date();
      $scope.app.user.joining_details.doj = new Date();
      $scope.app.user.joining_details.doc = new Date();*/
    };
    $scope.today();

    $scope.clear = function () {
      //$scope.dt = null;
      /*$scope.employee.personal_info.dob = null;
      $scope.employee.joining_details.doj = null;
      $scope.employee.joining_details.doc = null;*/
      /*$scope.app.user.personal_info.dob = null;
      $scope.app.user.joining_details.doj = null;
      $scope.app.user.joining_details.doc = null;*/
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'yyyy-MM-dd', 'dd MMM yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];
    $scope.newformat = $scope.formats[4];
  }])

  .controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }])


  .controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])

// Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();
  }])


 //courses controller
  .controller('CoursesCtrl', ['$scope', function($scope) {
    $scope.filterscat = {};
    $scope.filtersbrand = {};
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


    $scope.getTestById = function(ind) {               
      $scope.ind = ind;        
      $scope.productDetail = $scope.courseslists[ind];
     // console.log($scope.productDetail);
    }

  }]) 

  .controller('AddTestCtrl',['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams){
    $scope.test = {};
    $scope.AddTestForm = {};
    $scope.count = 1;
    $scope.question={};
        
    $scope.submitValues = function(){ 
      console.log(' save ');        
      console.log($scope.test); 
      // Try to create
     /* $http.post('/api/v1/signup', {user: $scope.user})
      .then(function(response) {
        if ( !response.data.employee ) {
          $scope.authError = response;
        }else{
          $state.go('app.dashboard');
        }
      }, function(x) {
        console.log(x);
        $scope.authError = 'Server Error';
      });*/
    };
    

    $scope.saveQuestion = function(){ 
      console.log(' save Question ');        
      console.log($scope.question); 
      
    }

  }]);



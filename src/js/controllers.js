var appControllers = angular.module('bakerapp.controllers',[]) 


appControllers.controller('FeaturedApps', ['$scope','$window','$log', 'ApplicationMetadata', 'Category', '$filter',
                                                     	function($scope, $window, $log, ApplicationMetadata, Category,$filter ) {
                         	
        	var orderBy = $filter('orderBy');
         	$scope.apps = ApplicationMetadata.query(function() {
        		    $scope.apps = orderBy($scope.apps, 'name', true);
         		  }); 
}]);
         	
         	
appControllers.controller('UserListController', ['$scope','$window','$log', 'BakerUser', 'popupService', 'ngDialog',
                            	function($scope, $window, $log, BakerUser, popupService, ngDialog) {
	
	

	$scope.bakerusers = BakerUser.query(function() {
		    //console.log($scope.bakerusers);
		  }); //query() returns all the bakerUsers
		 
	
	
	 $scope.deleteBakerUser = function(gridItem, useridx, username, name){

		 	$log.debug("Selected to DELETE User with userID = "+ useridx);
		 	

		 	var bakeruser=BakerUser.get({id:useridx}, function() {
			    $log.debug("WILL DELETE User with ID "+ bakeruser.id);
			    
		        if(popupService.showPopup('Really delete user '+name+' with username "'+username+'" ?')){
		        	$log.debug("WILL DELETE User with $scope.bakeruser.id = "+ bakeruser.id);
				 	
		        	bakeruser.$delete(function(){
		    			$scope.bakerusers.splice($scope.bakerusers.indexOf(gridItem),1)
		            });
		        
		        }
		 	});
	    }
	 
	 $scope.clickToOpen = function (gridItem) {
	        ngDialog.open({ 
	        	template: 'UserView.html',
	        	controller : ['$scope', 'BakerUser', function( $scope,  BakerUser){
	        	    $scope.bakeruser=BakerUser.get({id:gridItem});
	        	    $log.debug("WILL GET User with ID "+gridItem);   
	    			}],
	    		className: 'ngdialog-theme-default'
	    		
	        	});
	    };
	    
}]);

appControllers.controller('UserViewController', ['$scope', '$route', '$routeParams', '$location', 'BakerUser', '$anchorScroll',
                                                 function( $scope, $route, $routeParams, $location, BakerUser, $anchorScroll){
    $scope.bakeruser=BakerUser.get({id:$routeParams.id});
    
	$scope.name = "UserViewController";
	$scope.params = $routeParams;
	
	

}]);

appControllers.controller('UserAddController',function($scope, $location, BakerUser){

    $scope.bakeruser=new BakerUser();

    $scope.addBakerUser=function(){
        $scope.bakeruser.$save(function(){
			$location.path("/users");
        });
    }

});

appControllers.controller('UserEditController', ['$scope', '$route', '$routeParams', '$location', 'BakerUser', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, BakerUser, $anchorScroll){


    //console.log("WILL EDIT User with ID "+$routeParams.id);
	
    $scope.updateUser=function(){

        //console.log("$scope.password = "+$scope.password);
        //console.log("$scope.retypepassword = "+$scope.retypepassword);
    	if ( ($scope.password) && ($scope.password === $scope.retypepassword))
    		$scope.bakeruser.password= $scope.password;
    	else {
            //console.log("Will send to server empty password to keep old one ");
    		$scope.bakeruser.password= ''; //send empty to server, so not to change!
    	}
    	
        $scope.bakeruser.$update(function(){
			$location.path("/users");
        });
    };

    $scope.loadUser=function(){
        $scope.bakeruser=BakerUser.get({id:$routeParams.id});
    };

    $scope.loadUser();
}]);

appControllers.directive('equals', function() {
	  return {
	    restrict: 'A', // only activate on element attribute
	    require: 'ngModel', // get a hold of NgModelController
	    link: function(scope, elem, attrs, ngModel) {
	        //console.log("IN LINK! ");
	      if(!ngModel) return; // do nothing if no ng-model

	        //console.log("PASS IN LINK! ");
	      // watch own value and re-validate on change
	        
	      scope.$watch(attrs.ngModel, function() {
	        validate();
	      });

	      // observe the other value and re-validate on change
	      attrs.$observe('equals', function (val) {
	        validate();
	      });

	      var validate = function() {
	        // values
	        var val1 = ngModel.$viewValue;
	        var val2 = attrs.equals;

	        //console.log("val1= "+val1);
	        //console.log("val2= "+val2);
	        // set validity
	        ngModel.$setValidity('passwordVerify', ! val1 || ! val2 || val1 === val2);
	      };
	    }
	  }
	});




appControllers.controller('SubscribedMachineListController', ['$scope','$window','$log', 'SubscribedMachine', 'popupService','ngDialog',
                                             	function($scope, $window, $log, SubscribedMachine, popupService, ngDialog ) {
                 	
                 	

 	$scope.subscribedmachines = SubscribedMachine.query(function() {
 		    //console.log($scope.subscribedmachines);
 		  }); //query() returns all the subscribedmachines
 		 
 	
 	
 	 $scope.deleteSubscribedMachine = function(gridItem, useridx, url){

 		 $log.debug("Selected to DELETE SubscribedMachine with id = "+ useridx);
 		 	

 		 	var subscribedmachine=SubscribedMachine.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE SubscribedMachine with ID "+ subscribedmachine.id);
 			    
 		        if(popupService.showPopup('Really delete SubscribedMachine '+subscribedmachine.id+'" ?')){
 				 	
 		        	subscribedmachine.$delete(function(){
 		    			$scope.subscribedmachines.splice($scope.subscribedmachines.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	 
 	 $scope.clickToOpen = function (gridItem, useridx, url) {
        ngDialog.open({ 
        	template: 'SubscribedMachineView.html',
        	controller : ['$scope', 'SubscribedMachine', function( $scope,  SubscribedMachine){
        	    $scope.subscribedmachine=SubscribedMachine.get({id:useridx});
        	    var i =SubscribedMachine.get({id:useridx});
        	    //console.log("WILL GET SubscribedMachine with ID "+useridx);
        	    //console.log("WILL GET SubscribedMachine with i "+i.id);	        	    
    			}],
    		className: 'ngdialog-theme-default'
    		
        	});
    };

              	
                 	 
}]);

appControllers.controller('SubscribedMachineViewController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedMachine', '$anchorScroll', 
                                                 function( $scope, $route, $routeParams, $location, SubscribedMachine, $anchorScroll){
    $scope.subscribedmachine=SubscribedMachine.get({id:$routeParams.id});
    var i =SubscribedMachine.get({id:$routeParams.id});
    //console.log("WILL GET SubscribedMachine with ID "+$routeParams.id);
    //console.log("WILL GET SubscribedMachine with i "+i.id);
    
	$scope.name = "SubscribedMachineViewController";
	$scope.params = $routeParams;
	
	  

}]);

appControllers.controller('SubscribedMachineAddController',function($scope, $location, SubscribedMachine){

    $scope.subscribedmachine=new SubscribedMachine();

    $scope.addSubscribedMachine=function(){
        $scope.subscribedmachine.$save(function(){
			$location.path("/subscribed_machines");
        });
    }

});

appControllers.controller('SubscribedMachineEditController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedMachine', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, SubscribedMachine, $anchorScroll){


    //console.log("WILL EDIT SubscribedMachine with ID "+$routeParams.id);
	
    $scope.updateSubscribedMachine=function(){
        $scope.subscribedmachine.$update(function(){
			$location.path("/subscribed_machines");
        });
    };

    $scope.loadSubscribedMachine=function(){
        $scope.subscribedmachine=SubscribedMachine.get({id:$routeParams.id});
    };

    $scope.loadSubscribedMachine();
}]);


//Apps controller


appControllers.controller('AppListController', ['$scope','$window','$log', 'ApplicationMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, ApplicationMetadata, popupService, ngDialog ) {
                 	
                 	

 	$scope.apps = ApplicationMetadata.query(function() {
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedmachines
 		 
 	
 	
 	 $scope.deleteApp = function(gridItem, useridx){

 		$log.debug("Selected to DELETE ApplicationMetadata with id = "+ useridx);
 		 	

 		 	var app=ApplicationMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE ApplicationMetadata with ID "+ app.id);
 			    
 		        if(popupService.showPopup('Really delete Application "'+app.name+'" ?')){
 				 	
 		        	app.$delete(function(){
 		    			$scope.apps.splice($scope.apps.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('AppAddController', function($scope, $location,
		ApplicationMetadata, BakerUser, $rootScope, $http,formDataObject, Category,$filter,APIEndPointService) {

	
	$scope.app = new ApplicationMetadata();
	$scope.app.owner = $rootScope.loggedinbakeruser;//BakerUser.get({id:$rootScope.loggedinbakeruser.id});
	
	
    
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
	
	//an array of files selected
    $scope.files = [];
    $scope.screenshotimages = [];
    $scope.image = "";
    
   //listen for the file selected event
    

    $scope.$on("fileSelectedClearPrevious", function (event, args) {
    	$scope.files = [];
        $scope.screenshotimages = [];
    });
    
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
            
            var reader = new FileReader();
            
        	reader.onload = function (e) {
        		var mdl = {
        				file: args.file,
        				img: e.target.result
        		}
        		
        		$scope.screenshotimages.push( mdl ); 
        	    $scope.image = mdl.img;//trick to load the image
                $scope.$apply();
                
            }
        	
            reader.readAsDataURL(args.file);
            
            
        });
    });
	
	
	$scope.addApp = function() {
		$scope.app.$save(function() {
			$location.path("/apps");
		});
	}

	$scope.submitNewApp = function submit() {
		
		var catidsCommaSeparated = '';
		 angular.forEach ( $scope.app.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/users/'+$scope.app.owner.id+'/apps/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				appname: $scope.app.name,
				shortDescription: $scope.app.teaser,
				longDescription: $scope.app.longDescription,
				version: $scope.app.version,
				uploadedAppIcon: $scope.app.uploadedAppIcon,
				categories: catidsCommaSeparated,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).success(function() {
			$location.path("/apps");
		});
	};

});


appControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

appControllers.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
        	
        	
            
            el.bind('change', function (event) {
                var files = event.target.files;
                scope.$emit("fileSelectedClearPrevious", {});
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});

appControllers.controller('AppEditController', ['$scope', '$route', '$routeParams', '$location', 'ApplicationMetadata', '$anchorScroll','$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService',
     function( $scope, $route, $routeParams, $location, ApplicationMetadata, $anchorScroll, $http,formDataObject, cfpLoadingBar, Category, $filter, APIEndPointService){


	 //console.log("WILL EDIT ApplicationMetadata with ID "+$routeParams.id);
	
	 $scope.submitUpdateApp = function submit() {
		 //cfpLoadingBar.start();
		 var catidsCommaSeparated = '';
		 angular.forEach ( $scope.app.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 	
		 	
		 	
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/apps/'+$routeParams.id,
				headers : {
					'Content-Type' : 'multipart/form-data'
				},
				data : {
					userid: $scope.app.owner.id,
					appname: $scope.app.name,
					appid: $scope.app.id,
					appuuid: $scope.app.uuid,
					shortDescription: $scope.app.shortDescription,
					longDescription: $scope.app.longDescription,
					version: $scope.app.version,
					categories: catidsCommaSeparated,
					uploadedAppIcon: $scope.app.uploadedAppIcon,
					//file : $scope.file
				},
				transformRequest : formDataObject
			}).success(function() {
				$location.path("/apps");
			});
		};
	

    $scope.loadApp=function(cats){
    	var myapp = ApplicationMetadata.get({id:$routeParams.id}, function() {
    		
    		var categoriesToPush=[];
    		angular.forEach(myapp.categories, function(myappcateg, myappcategkey) {
	   	    		//console.log("Examining == > myappcategkey= "+myappcategkey+", myappcateg.id="+myappcateg.id+", myappcateg.name="+myappcateg.name);
	   	    		
	   	    		angular.forEach(cats, function(categ, key) {
		   	    		if (myappcateg.id === categ.id){
		   	    			categoriesToPush.push(categ);
		   	    		}
	   	    		});
	   	 	});
    		
    		myapp.categories=[];//clear everything
    		//now re add the categories to synchronize with local model
    		angular.forEach(categoriesToPush, function(cat, key) {
    			myapp.categories.push(cat);
	   	 	});	 
    		
    		angular.forEach(myapp.categories, function(myappcateg, myappcategkey) {
   	    		console.log(" == >myappcategkey= "+myappcategkey+", myappcateg.id="+myappcateg.id+", myappcateg.name="+myappcateg.name);
	   	 	});	 		
   	 		
   	 		$scope.app=myapp;    
    		
    	});     
    		          
   	 	
    };

    var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadApp($scope.categories);
	}); 
    
}]);


appControllers.controller('AppViewController', ['$scope', '$route', '$routeParams', '$location', 'ApplicationMetadata',
                                                 function( $scope, $route, $routeParams, $location, ApplicationMetadata ){
    $scope.app=ApplicationMetadata.get({id:$routeParams.id});
    //console.log("WILL GET ApplicationMetadata with ID "+$routeParams.id);

}]);



appControllers.controller('CategoriesListController', ['$scope','$window','$log', 'Category', 'popupService','ngDialog',
                                             	function($scope, $window, $log, Category, popupService, ngDialog ) {
                 	
                 	

 	$scope.categories = Category.query(function() {
 		    //console.log($scope.categories);
 		  }); //query() returns all the categories
 		 
 	
 	
 	 $scope.deleteCategory = function(gridItem, useridx){

 		 	//console.log("Selected to DELETE Categorywith id = "+ useridx);
 		 	

 		 	var cat=Category.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE Category with ID "+ cat.id);
 			    
 		        if(popupService.showPopup('Really delete Category "'+cat.name+'" ?')){
 				 	
 		        	cat.$delete(function(){
 		    			$scope.categories.splice($scope.categories.indexOf(gridItem),1)
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('CategoryAddController',function($scope, $location, Category){

    $scope.cat=new Category();

    $scope.addCategory=function(){
        $scope.cat.$save(function(){
			$location.path("/categories");
        });
    }

});

appControllers.controller('CategoryEditController', ['$scope', '$route', '$routeParams', '$location', 'Category', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, Category, $anchorScroll){


    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateCategory=function(){
        $scope.cat.$update(function(){
			$location.path("/categories");
        });
    };

    $scope.loadCategory=function(){
        $scope.cat=Category.get({id:$routeParams.id});
    };

    $scope.loadCategory();
}]);


//Apps controller


appControllers.controller('AppsMarketplaceController', ['$scope','$window','$log', 'ApplicationMetadata', 'Category', '$filter',
                                             	function($scope, $window, $log, ApplicationMetadata, Category,$filter ) {
                 	
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		    //console.log($scope.apps);
		    $scope.categories = orderBy($scope.categories, 'name', false);
	});
 	$scope.apps = ApplicationMetadata.query(function() {
 		    //console.log($scope.apps);
 		    $scope.appsTotalNumber = $scope.apps.length;
		    $scope.apps = orderBy($scope.apps, 'name', false);
 	}); 
 		 
 	$scope.filterCategory=function(category){
 			if (category.id){
 				//console.log("Selected catid = "+ category.id);
 				angular.forEach($scope.apps, function(app, key) {
 					//console.log("key= "+key+", app.id="+app.id+", app.name="+app.name);
 					//app.name = app.name+'!!';
 				});
 				$scope.selectedcategory = category;
 			}else{
 				$scope.selectedcategory = null;
 			}

			//$scope.apps = ApplicationMetadata.query();
			$scope.apps = ApplicationMetadata.query({categoryid: category.id}, function() {
	 		    //console.log($scope.apps);
			    $scope.apps = orderBy($scope.apps, 'name', false);
	 	});
    };
    
    $scope.isActive=function(c) {

   		//console.log("isActive c= "+c.name+", $scope.selectedcategory="+$scope.selectedcategory.name);
        return $scope.selectedcategory === c;
    };
    
    $scope.isNoneSelected=function(c) {
    	
    	//console.log("isNoneSelected c $scope.selectedcategory="+$scope.selectedcategory);
   		return ( (!$scope.selectedcategory) || ($scope.selectedcategory === null) );
    };

 	
                 	 
}]);
	



appControllers.controller('BunListController', ['$scope','$window','$log', 'BunMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, BunMetadata, popupService, ngDialog ) {
                 	
                 	
 	$scope.buns= BunMetadata.query(function() {
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedmachines
 		 
 	
 	
 	 $scope.deleteBun = function(gridItem, useridx){

 		$log.debug("Selected to DELETE BunMetadata with id = "+ useridx);
 		 	

 		 	var bun=BunMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE BunMetadatawith ID "+ bun.id);
 			    
 		        if(popupService.showPopup('Really delete Bun "'+bun.name+'" ?')){
 				 	
 		        	bun.$delete(function(){
 		    			$scope.buns.splice($scope.buns.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);


appControllers.controller('BunAddController', function($scope, $location,
		BunMetadata, BakerUser, $rootScope, $http,formDataObject, Category, $filter, APIEndPointService) {

	
	$scope.bun = new BunMetadata();
	$scope.bun.owner = $rootScope.loggedinbakeruser;//BakerUser.get({id:$rootScope.loggedinbakeruser.id});
	 
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
	$scope.addBun = function() {
		$scope.bun.$save(function() {
			$location.path("/buns");
		});
	}

	$scope.submitNewBun = function submit() {
		
		var catidsCommaSeparated = '';
		 angular.forEach ( $scope.bun.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/users/'+$scope.bun.owner.id+'/buns/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				bunname: $scope.bun.name,
				shortDescription: $scope.bun.teaser,
				longDescription: $scope.bun.longDescription,
				version: $scope.bun.version,
				uploadedBunIcon: $scope.bun.uploadedBunIcon,
				uploadedBunFile: $scope.bun.uploadedBunFile,
				categories: catidsCommaSeparated,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).success(function() {
			$location.path("/buns");
		});
	};

});



appControllers.controller('BunEditController', ['$scope', '$route', '$routeParams', '$location', 'BunMetadata', '$anchorScroll',
                                                '$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService',
     function( $scope, $route, $routeParams, $location, BunMetadata, $anchorScroll, $http,formDataObject, cfpLoadingBar, Category, $filter,APIEndPointService){


	
	 $scope.submitUpdateBun = function submit() {

		 var catidsCommaSeparated = '';
		 angular.forEach ( $scope.bun.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/buns/'+$routeParams.id,
				headers : {
					'Content-Type' : 'multipart/form-data'
				},
				data : {
					userid: $scope.bun.owner.id,
					bunname: $scope.bun.name,
					bunid: $scope.bun.id,
					bunuuid: $scope.bun.uuid,
					shortDescription: $scope.bun.shortDescription,
					longDescription: $scope.bun.longDescription,
					version: $scope.bun.version,
					categories: catidsCommaSeparated,
					uploadedBunIcon: $scope.bun.uploadedBunIcon,
					uploadedBunFile: $scope.bun.uploadedBunFile,
					//file : $scope.file
				},
				transformRequest : formDataObject
			}).success(function() {
				$location.path("/buns");
			});
		};
	

    $scope.loadBun=function(cats){
    	var mybun = BunMetadata.get({id:$routeParams.id}, function() {

    		var categoriesToPush=[];
	   	 	angular.forEach(mybun.categories, function(mybuncateg, mybuncategkey) {
		    		
		    		angular.forEach(cats, function(categ, key) {
	   	    		if (mybuncateg.id === categ.id){
	   	    			categoriesToPush.push(categ);
	   	    		}
		    		});
		 	});
			
	   	 	mybun.categories=[];//clear everything
			//now re add the categories to synchronize with local model
			angular.forEach(categoriesToPush, function(cat, key) {
				mybun.categories.push(cat);
			 	});	 
			
			
			$scope.bun=mybun;   
    		
    	});     
    		      
   	 	//appl.category = $scope.categories[appl.category];
        
    	//$scope.app=ApplicationMetadata.get({id:$routeParams.id});        
   	 	
    };

    var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadBun($scope.categories);
	}); 
    
}]);


appControllers.controller('BunViewController', ['$scope', '$route', '$routeParams', '$location', 'BunMetadata',
                                                 function( $scope, $route, $routeParams, $location, BunMetadata ){
    $scope.bun=BunMetadata.get({id:$routeParams.id});

}]);


appControllers.controller('BunsMarketplaceController', ['$scope','$window','$log', 'BunMetadata', 'Category', '$filter',
                                                     	function($scope, $window, $log, BunMetadata, Category,$filter ) {
                         	
        	var orderBy = $filter('orderBy');
        	$scope.categories = Category.query(function() {
        		    //console.log($scope.apps);
        		    $scope.categories = orderBy($scope.categories, 'name', false);
        	});
         	$scope.buns = BunMetadata.query(function() {
         		    //console.log($scope.apps);
         		    $scope.bunsTotalNumber = $scope.buns.length;
        		    $scope.buns = orderBy($scope.buns, 'name', false);
         	}); 
         		 
         	$scope.filterCategory=function(category){
         			if (category.id){
         				//console.log("Selected catid = "+ category.id);
         				angular.forEach($scope.buns, function(bun, key) {
         					//console.log("key= "+key+", app.id="+app.id+", app.name="+app.name);
         					//app.name = app.name+'!!';
         				});
         				$scope.selectedcategory = category;
         			}else{
         				$scope.selectedcategory = null;
         			}

        			//$scope.apps = ApplicationMetadata.query();
        			$scope.buns = BunMetadata.query({categoryid: category.id}, function() {
        	 		    //console.log($scope.apps);
        			    $scope.buns = orderBy($scope.buns, 'name', false);
        	 	});
            };
            
            $scope.isActive=function(c) {

           		//console.log("isActive c= "+c.name+", $scope.selectedcategory="+$scope.selectedcategory.name);
                return $scope.selectedcategory === c;
            };
            
            $scope.isNoneSelected=function(c) {
            	
            	//console.log("isNoneSelected c $scope.selectedcategory="+$scope.selectedcategory);
           		return ( (!$scope.selectedcategory) || ($scope.selectedcategory === null) );
            };

         	
                         	 
        }]);

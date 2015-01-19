var appControllers = angular.module('bakerapp.controllers',[ 'ngAnimate']) 


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




appControllers.controller('SubscribedResourceListController', ['$scope','$window','$log', 'SubscribedResource', 'popupService','ngDialog',
                                             	function($scope, $window, $log, SubscribedResource, popupService, ngDialog ) {
                 	
                 	

 	$scope.subscribedresources = SubscribedResource.query(function() {
 		    //console.log($scope.subscribedresources);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteSubscribedResource = function(gridItem, useridx, url){

 		 $log.debug("Selected to DELETE SubscribedResource with id = "+ useridx);
 		 	

 		 	var subscribedresource=SubscribedResource.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE SubscribedResource with ID "+ subscribedresource.id);
 			    
 		        if(popupService.showPopup('Really delete SubscribedResource '+subscribedresource.id+'" ?')){
 				 	
 		        	subscribedresource.$delete(function(){
 		    			$scope.subscribedresources.splice($scope.subscribedresources.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	 
 	 $scope.clickToOpen = function (gridItem, useridx, url) {
        ngDialog.open({ 
        	template: 'SubscribedResourceView.html',
        	controller : ['$scope', 'SubscribedResource', function( $scope,  SubscribedResource){
        	    $scope.subscribedresource=SubscribedResource.get({id:useridx});
        	    var i =SubscribedResource.get({id:useridx});
        	    //console.log("WILL GET SubscribedResource with ID "+useridx);
        	    //console.log("WILL GET SubscribedResource with i "+i.id);	        	    
    			}],
    		className: 'ngdialog-theme-default'
    		
        	});
    };

              	
                 	 
}]);

appControllers.controller('SubscribedResourceViewController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedResource', '$anchorScroll', 
                                                 function( $scope, $route, $routeParams, $location, SubscribedResource, $anchorScroll){
    $scope.subscribedresource=SubscribedResource.get({id:$routeParams.id});
    var i =SubscribedResource.get({id:$routeParams.id});
    //console.log("WILL GET SubscribedResource with ID "+$routeParams.id);
    //console.log("WILL GET SubscribedResource with i "+i.id);
    
	$scope.name = "SubscribedResourceViewController";
	$scope.params = $routeParams;
	
	  

}]);

appControllers.controller('SubscribedResourceAddController',function($scope, $rootScope,$location, SubscribedResource){

    $scope.subscribedresource=new SubscribedResource();
	$scope.subscribedresource.owner = $rootScope.loggedinbakeruser;

    $scope.addSubscribedResource=function(){
        $scope.subscribedresource.$save(function(){
			$location.path("/subscribed_resources");
        });
    }

});

appControllers.controller('SubscribedResourceEditController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedResource', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, SubscribedResource, $anchorScroll){


    //console.log("WILL EDIT SubscribedResource with ID "+$routeParams.id);
	
    $scope.updateSubscribedResource=function(){
        $scope.subscribedresource.$update(function(){
			$location.path("/subscribed_resources");
        });
    };

    $scope.loadSubscribedResource=function(){
        $scope.subscribedresource=SubscribedResource.get({id:$routeParams.id});
    };

    $scope.loadSubscribedResource();
}]);


//Apps controller


appControllers.controller('AppListController', ['$scope','$window','$log', 'AdminApplicationMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminApplicationMetadata, popupService, ngDialog ) {
                 	
                 	

 	$scope.apps = AdminApplicationMetadata.query(function() {
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteApp = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminApplicationMetadata with id = "+ useridx);
 		 	

 		 	var app=AdminApplicationMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE AdminApplicationMetadata with ID "+ app.id);
 			    
 		        if(popupService.showPopup('Really delete Application "'+app.name+'" ?')){
 				 	
 		        	app.$delete(function(){
 		    			$scope.apps.splice($scope.apps.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('AppAddController', function($scope, $location,
		AdminApplicationMetadata, BakerUser, $rootScope, $http,formDataObject, Category,$filter,APIEndPointService, Container, DeployArtifact, BunMetadata) {

	
	$scope.app = new AdminApplicationMetadata();
	$scope.app.owner = $rootScope.loggedinbakeruser;//BakerUser.get({id:$rootScope.loggedinbakeruser.id});

	$scope.app.containers=[];//clear everything
	
	var contnrId=0;
	
	var contnr = new Container(contnrId, 'Container'+contnrId);
	$scope.app.containers.push(contnr);
	$scope.activeContainer = contnr;
	
    $scope.addContainer = function() {
    	console.log('addContainer');
    	contnrId = contnrId+1;
    	var contnr = new Container(null, 'Container'+contnrId);
    	$scope.app.containers.push(contnr);
	};
	

	$scope.removeContainer = function(container){
		$scope.app.containers.splice( $scope.app.containers.indexOf(container) ,1);
		$scope.activeContainer = $scope.app.containers[0];
	}
	
	$scope.removeDeploymentArtifact= function(container, selectedBun) {

		container.deployArtifacts.splice( container.deployArtifacts.indexOf(selectedBun) ,1);
		
	}
	
	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    

	var orderBy = $filter('orderBy');
    $scope.buns = BunMetadata.query(function() {
		    $scope.bunsTotalNumber = $scope.buns.length;
		    $scope.buns = orderBy($scope.buns, 'name', false);
		    $scope.selectedBun = $scope.buns[0]; 
	}); 
    
    
    
    $scope.addDeploymentArtifact= function(container, selectedBun) {

        var da =new DeployArtifact( null, selectedBun.uuid, 
        		selectedBun.name , 
        		'uuid/'+selectedBun.uuid, 
        		selectedBun.packageLocation, 
        		selectedBun.extensions);
        container.deployArtifacts.push(da);
        return da;
        
    };
    
    
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
			url : APIEndPointService.APIURL+'services/api/repo/admin/apps/',
			headers : {
				'Content-Type' : undefined
			},

            //This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'

			transformRequest: function (data) {
                var formData = new FormData();
                //need to convert our json object to a string version of json otherwise
                // the browser will do a 'toString()' on the object which will result 
                // in the value '[Object object]' on the server.
                //formData.append("app", angular.toJson(data.app));
                formData.append("application",  angular.toJson( data.app, false) );
                //formData.append("prodname", $scope.app.name);
                //formData.append("shortDescription", $scope.app.shortDescription);
                //formData.append("longDescription", $scope.app.longDescription);
                //formData.append("version", $scope.app.version);
                formData.append("prodIcon", $scope.uploadedAppIcon);
                //formData.append("categories", catidsCommaSeparated);
                //now add all of the assigned files
                for (var i = 0; i < data.files.length; i++) {
                	formData.append("screenshots", data.files[i]);
                }
                
                return formData;
            },
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: { 
            		app: $scope.app, 
            		files: $scope.files }
			
            
		}).success(function(data, status, headers, config) {
			$location.path("/apps");
		}).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
	};
	
	

	$scope.submitNewAppOLD = function submit() {
		
		var catidsCommaSeparated = '';
		 angular.forEach ( $scope.app.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/apps/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				prodname: $scope.app.name,
				shortDescription: $scope.app.shortDescription,
				longDescription: $scope.app.longDescription,
				version: $scope.app.version,
				prodIcon: $scope.app.uploadedAppIcon,
				categories: catidsCommaSeparated,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).success(function() {
			$location.path("/apps");
		});
	};

});

appControllers.directive("contenteditable", function() {
	  return {
	    require: "ngModel",
	    link: function(scope, element, attrs, ngModel) {

	      function read() {
	        ngModel.$setViewValue(element.html());
	      }

	      ngModel.$render = function() {
	    	  var t = ngModel.$viewValue;
	    	  t =  encodeURI(t);
	        element.html( t || "");
	      };

	      element.bind("blur keyup change", function() {
	        scope.$apply(read);
	      });
	    }
	  };
	});

appControllers.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});



appControllers.directive('popover', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).popover('show');
            }, function(){
                // on mouseleave
                $(element).popover('hide');
            });
        }
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

appControllers.controller('AppEditController', ['$scope', '$route', '$routeParams', '$location', 
                                                'AdminApplicationMetadata', '$anchorScroll','$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService', 'BunMetadata', 'Container', 'DeployArtifact',
     function( $scope, $route, $routeParams, $location, AdminApplicationMetadata, $anchorScroll,
    		 $http,formDataObject, cfpLoadingBar, Category, $filter, APIEndPointService, BunMetadata, Container, DeployArtifact){
	
	

	var contnrId=0;
	
	$scope.addContainer = function() {
    	console.log('addContainer');
    	contnrId = contnrId+1;
    	var contnr = new Container(null, 'Container'+contnrId);
    	$scope.app.containers.push(contnr);
	};
	
	$scope.removeContainer = function(container){
		$scope.app.containers.splice( $scope.app.containers.indexOf(container) ,1);
		
	}
	
	$scope.removeDeploymentArtifact= function(container, selectedBun) {

		container.deployArtifacts.splice( container.deployArtifacts.indexOf(selectedBun) ,1);
		
	}
	
	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    
    
    $scope.buns = BunMetadata.query(function() {
		    $scope.bunsTotalNumber = $scope.buns.length;
		    $scope.buns = orderBy($scope.buns, 'name', false);
		    $scope.selectedBun = $scope.buns[0]; 
	}); 
    
    
    
    $scope.addDeploymentArtifact= function(container, selectedBun) {

        var da =new DeployArtifact( null, selectedBun.uuid, 
        		selectedBun.name , 
        		'uuid/'+selectedBun.uuid, 
        		selectedBun.packageLocation, 
        		selectedBun.extensions);
        container.deployArtifacts.push(da);
        return da;
        
    };

	
	
	
	
	 $scope.submitUpdateApp = function submit() {
		 //cfpLoadingBar.start();
		 	
		 	
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/apps/'+$routeParams.id,
				headers : {
					'Content-Type' : undefined
				},
				transformRequest: function (data) {
	                var formData = new FormData();
	                formData.append("application",  angular.toJson( data.app, false) );
	                    //need to convert our json object to a string version of json otherwise
	                // the browser will do a 'toString()' on the object which will result 
	                // in the value '[Object object]' on the server.
	                //formData.append("app", angular.toJson(data.app));
	                //formData.append("userid", $scope.app.owner.id);
	                //formData.append("uuid", $scope.app.uuid);
	                //formData.append("prodname", $scope.app.name);
	                //formData.append("shortDescription", $scope.app.shortDescription);
	                //formData.append("longDescription", $scope.app.longDescription);
	                //formData.append("version", $scope.app.version);
	                formData.append("prodIcon", $scope.uploadedAppIcon);
	                //formData.append("categories", catidsCommaSeparated);
	                //now add all of the assigned files
	                //var fd=new FormData();
	                for (var i = 0; i < data.files.length; i++) {
	                    //add each file to the form data and iteratively name them
	                	//fd.append("screenshots[" + i+"]", data.files[i]);
	                	formData.append("screenshots", data.files[i]);
	                }
	                //formData.append("screenshots", fd);
	                //formData.append("screenshots", data.files);
	                
	                
	                return formData;
	            },
	            data: { 
            		app: $scope.app, 
            		files: $scope.files }
			}).success(function(data, status, headers, config) {
				$location.path("/apps");
			}).
	        error(function (data, status, headers, config) {
	            alert("failed!");
	        });
		};
	

    $scope.loadApp=function(cats){
    	var myapp = AdminApplicationMetadata.get({id:$routeParams.id}, function() {
    		
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
    		
   	 		contnrId = myapp.containers.length-1;
   	 		$scope.activeContainer = myapp.containers[0];
    	});     
    		          
   	 	
    };

    var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadApp($scope.categories);
	}); 
	
	
	//screenshots handling /////////////////////////
	
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

	//screenshots handling /////////////////////////
	
	
    
}]);


appControllers.controller('AppViewController', ['$scope', '$route', '$routeParams', '$location', 'ApplicationMetadata',
                                                 function( $scope, $route, $routeParams, $location, ApplicationMetadata ){
    $scope.app=ApplicationMetadata.get({id:$routeParams.id}, function() {
        //console.log("WILL GET ApplicationMetadata with ID "+$routeParams.id);
        var shots = $scope.app.screenshots;
        $scope.screenshotimages = shots.split(",") ;    	
    	
        
        // initial image index
        $scope._Index = 0;

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };

        // show prev image
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.screenshotimages.length - 1;
        };

        // show next image
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.screenshotimages.length - 1) ? ++$scope._Index : 0;
        };

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };
        
    });

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

appControllers.controller('CategoryAddController',function($scope, $location, AdminCategory){

    $scope.cat=new AdminCategory();

    $scope.addCategory=function(){
        $scope.cat.$save(function(){
			$location.path("/categories");
        });
    }

});

appControllers.controller('CategoryEditController', ['$scope', '$route', '$routeParams', '$location', 'AdminCategory', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, AdminCategory, $anchorScroll){


    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateCategory=function(){
        $scope.cat.$update(function(){
			$location.path("/categories");
        });
    };

    $scope.loadCategory=function(){
        $scope.cat=AdminCategory.get({id:$routeParams.id});
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
	



appControllers.controller('BunListController', ['$scope','$window','$log', 'AdminBunMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminBunMetadata, popupService, ngDialog ) {
                 	
                 	
 	$scope.buns= AdminBunMetadata.query(function() {
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteBun = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminBunMetadata with id = "+ useridx);
 		 	

 		 	var bun=AdminBunMetadata.get({id:useridx}, function() {
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
		AdminBunMetadata, BakerUser, $rootScope, $http,formDataObject, Category, $filter, APIEndPointService) {
	
	$scope.bun = new AdminBunMetadata();
	$scope.bun.owner = $rootScope.loggedinbakeruser;//BakerUser.get({id:$rootScope.loggedinbakeruser.id});
	$scope.bun.extensions=[];
	
	
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
	$scope.addBun = function() {
		$scope.bun.$save(function() {
			$location.path("/buns");
		});
	}
	
	$scope.addExtension= function(bun){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.bun.extensions.push(e);
	}
	
	$scope.removeRow = function(ext) {
		$scope.bun.extensions.splice( $scope.bun.extensions.indexOf(ext) ,1);
	};
	
	
	$scope.submitNewBun = function submit() {
		 
//		var $rows = $TABLE.find('tr:not(:hidden)');
//		$rows.each(function () {
//		    var param = $(this).find("td").eq(0).html();
//		    if (param){ //not undefined
//		    	var val = $(this).find("td").eq(1).html();    
//		    	//extsCommaSeparated = extsCommaSeparated+param+'='+val+',';
//		    	
//		    	var e={};
//				e.name = param;
//				e.value = val;
//		    	
//		    	$scope.bun.extensions.push(e);
//		    }
//		});
		
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/buns/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				bun: angular.toJson( $scope.bun, false ),
				prodIcon: $scope.uploadedBunIcon,
				prodFile: $scope.uploadedBunFile,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).success(function() {
			$location.path("/buns");
		});
	};

});



appControllers.controller('BunEditController', ['$scope', '$route', '$routeParams', '$location', 'AdminBunMetadata', '$anchorScroll',
                                                '$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService',
     function( $scope, $route, $routeParams, $location, AdminBunMetadata, $anchorScroll, $http,formDataObject, cfpLoadingBar, 
    		 Category, $filter,APIEndPointService){

	
	

	
	 $scope.submitUpdateBun = function submit() {

		 var catidsCommaSeparated = '';
		 angular.forEach ( $scope.bun.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
//			var $rows = $TABLE.find('tr:not(:hidden)');
//			$rows.each(function () {
//			    var param = $(this).find("td").eq(0).html();
//			    if (param){ //not undefined
//			    	var val = $(this).find("td").eq(1).html();    
//			    	
//			    	var e={};
//					e.name = param;
//					e.value = val;			    	
//			    	$scope.bun.extensions.push(e);
//			    }
//			});
		 
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/buns/'+$routeParams.id,
				headers : {
					'Content-Type' : 'multipart/form-data'
				},
				data : {
					bun: angular.toJson( $scope.bun, false ),					
					prodIcon: $scope.uploadedBunIcon,
					prodFile: $scope.uploadedBunFile,
					//file : $scope.file
				},
				transformRequest : formDataObject
			}).success(function() {
				$location.path("/buns");
			});
		};
	

    $scope.loadBun=function(cats){
    	var mybun = AdminBunMetadata.get({id:$routeParams.id}, function() {

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
	
	$scope.addExtension= function(bun){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.bun.extensions.push(e);
	}
		
	$scope.removeRow = function(ext) {
		$scope.bun.extensions.splice( $scope.bun.extensions.indexOf(ext) ,1);
	};
	
	
	$('.table-remove').click(function () {
		  $(this).parents('tr').detach();
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


////////////////////// FiwareInstancesController 

appControllers.controller('FiwareInstancesController', ['$scope','$window','$log',  '$filter', '$rootScope', 'ComputeEndpoint', 'FIWAREServers',
                                                     	function($scope, $window, $log,  $filter, $rootScope, ComputeEndpoint, FIWAREServers ) {

	
	$scope.fiwareuser  = $rootScope.loggedinfiwareuser;
	$scope.selectedComputeEndpoint = new ComputeEndpoint();
	
	var orderBy = $filter('orderBy');
	
	$scope.computeendpoints = ComputeEndpoint.query({xauthtoken: $rootScope.loggedinfiwareuser.xOAuth2Token},  function() {
	    //console.log($scope.apps);
		$scope.selectedComputeEndpoint = $scope.computeendpoints[0];
	    $scope.computeendpoints = orderBy($scope.computeendpoints, 'region', false);
	    $scope.changeRegion();
//	    $scope.servers = FIWAREServers.query({cloudAccessToken: $rootScope.loggedinfiwareuser.cloudToken, endPointPublicURL: $scope.selectedComputeEndpoint.publicURL},  function() {
//			
//		});
	    
	});
	
	$scope.changeRegion = function(){
//		console.log("$scope.selectedComputeEndpoint.publicURL = " +  $scope.selectedComputeEndpoint.publicURL);
//		console.log("$rootScope.loggedinfiwareuser.cloudToken = " +  $rootScope.loggedinfiwareuser.cloudToken);
		 $scope.servers = FIWAREServers.query({cloudAccessToken: $rootScope.loggedinfiwareuser.cloudToken, endPointPublicURL: $scope.selectedComputeEndpoint.publicURL},  function() {
			 $scope.serversTotalNumber = $scope.servers.length;
			});
		
	};
	
        	
}]);


//////////Deployments controller

appControllers.controller('MyDeploymentsListController', ['$scope','$window','$log', 'DeploymentDescriptor', 'popupService','ngDialog',
                                             	function($scope, $window, $log, DeploymentDescriptor, popupService, ngDialog ) {
                 	
                 	
 	$scope.mydeployments= DeploymentDescriptor.query(function() {
 		    
 		  }); 
 		 
 	
 	
 	          	
                 	 
}]);


appControllers.controller('CreateAppDeploymentController', ['$scope', '$route', '$rootScope', '$routeParams','$window','$log', 
                                                            'DeploymentDescriptor', 'ApplicationMetadata', 'DeployContainer','DeployArtifact',
                                                            'SubscribedResource', '$filter', '$http', 'APIEndPointService', '$location',
                                             	function($scope, $route, $rootScope, $routeParams, $window, $log, DeploymentDescriptor, 
                                             			ApplicationMetadata, DeployContainer, DeployArtifact,  SubscribedResource , 
                                             			$filter, $http, APIEndPointService, $location) {
                 	

	var orderBy = $filter('orderBy');   	
	$scope.subscribedresources = SubscribedResource.query(function() {
			$scope.subscribedresources = orderBy($scope.subscribedresources, 'url', false);
		  }); 
		 
	
	$scope.newdeployment = new DeploymentDescriptor(); 	
	$scope.newdeployment.owner = $rootScope.loggedinbakeruser;//BakerUser.get({id:$rootScope.loggedinbakeruser.id});
	$scope.newdeployment.deployContainers=[];//clear everything 	
	
 	var myapp = ApplicationMetadata.get({id:$routeParams.id}, function() {	 		
	 		$scope.newdeployment.baseApplication=myapp;    	
	 		$scope.newdeployment.name=myapp.name+' Deployment';
	 		
	 		angular.forEach(myapp.containers, function(container, containerkey) {
	 			var dc = new DeployContainer(null, container.name);
	 			
	 			angular.forEach(container.deployArtifacts , function(deployArtifact, artifactkey) {
	 				var da =new DeployArtifact( null, deployArtifact.uuid, 
	 						deployArtifact.name , 
	 						deployArtifact.artifactURL, 
	 						deployArtifact.artifactPackageURL, 
	 						deployArtifact.extensions);
	 				
		 			dc.deployArtifacts.push(da);
	 				
	 			});
	 			
	 			$scope.newdeployment.deployContainers.push(dc);
	 			
	   	 	});	 
	 		
	 		$scope.activeContainer = $scope.newdeployment.deployContainers[0];
	 		
	}); 
 	
 	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    
    
    
    $scope.submitNewAppDeployment = function submit() {
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/deployments/',
			headers : {
				'Content-Type' : 'application/json'
			},

            data: $scope.newdeployment
			
            
		}).success(function(data, status, headers, config) {
			$location.path("/mydeployments");
		}).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
	};
 	          	
                 	 
}]);



appControllers.controller('DeploymentsAdminListController', ['$scope','$window','$log', 'DeploymentDescriptor', 'popupService','ngDialog','$http', 'APIEndPointService',
                                             	function($scope, $window, $log, DeploymentDescriptor, popupService, ngDialog, $http, APIEndPointService ) {
                 	
                 	
 	$scope.mydeployments= DeploymentDescriptor.query(function() {
 		    
 		  }); 
 		 
 	
 	 $scope.deleteDeployment = function(gridItem, depidx){

 		$log.debug("Selected to DELETE Deployment with id = "+ depidx);

 		 	var dep=DeploymentDescriptor.get({id:depidx}, function() {
 		 		
 			    
 		        if(popupService.showPopup('Really delete Deployment "'+dep.name+'" ?')){
 				 	
 		        	dep.$delete(function(){

 		 			    $log.debug("DELETED DeploymentDescriptor ID "+ dep.id);
 		    			$scope.mydeployments.splice( $scope.mydeployments.indexOf(gridItem),1  );
 		    			
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    };
 	    
 	    
 	    
 	   
 	   putAction   = function(action, deployment, depidx){
 		  $log.debug("Selected to "+action+" Deployment with id = "+ depidx);
	 		
	 		return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/deployments/'+depidx+'?action='+action,
				headers : {
					'Content-Type' : 'application/json'
				},

	            data: deployment
				
	            
			}).success(function(data, status, headers, config) {			

//		        console.log("data: " + data);
//		        console.log("data: " + JSON.stringify(data));
//		        console.log("status: " + status);
//		        console.log("headers: " + headers);
//		        console.log("config: " + config);
		        var d = JSON.parse(  JSON.stringify(data)  );
		        
		        $scope.mydeployments[$scope.mydeployments.indexOf(deployment)] = d;
		        		
		        
			}).
	        error(function (data, status, headers, config) {
	            alert("failed to communicate! "+status);
	        });
 	   }
 	    
 	    
 	   $scope.authDeployment = function(deployment, depidx){
 		  putAction('AUTH',deployment, depidx ); 
 		   
 	   }
 	   
 	  $scope.denyDeployment = function(deployment, depidx){
 		 putAction('DENY',deployment, depidx ); 
	   }
 	   
 	  $scope.uninstallDeployment = function(deployment, depidx){
  		 putAction('UNINSTALL',deployment, depidx ); 
	 	
	   }
 	          	
                 	 
}]);



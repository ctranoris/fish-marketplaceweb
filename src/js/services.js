var appServices = angular.module('bakerapp.services',[]);


appServices.factory('APIEndPointService', function() {
	  return {	      
	      
		  APIURL: "/baker/"
		  //APIURL: "http://www.forgestore.eu:443/baker/"
	  };
});


//BakerUser Resource
appServices.factory('BakerUser', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/users/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


appServices.factory('SessionService', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/sessions/");
});


appServices.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});




//Category Resource
appServices.factory('Category', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/categories/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


appServices.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			if (value){
				fd.append(key, value);
				//console.log("key="+key+", value="+value);
			}else{
				fd.append(key, "");
			}
				
		});
		return fd;
	};
});

//SubscribedMachine Resource
appServices.factory('SubscribedMachine', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/subscribedmachines/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});

//Category Resource
appServices.factory('Category', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/categories/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});

//Apps Resource
appServices.factory('ApplicationMetadata', function($resource, APIEndPointService) {
	
	return $resource(APIEndPointService.APIURL+"services/api/repo/apps/:id", 
			{ id: '@id' }, {				
		
		    update: {
		        method: 'PUT' // this method issues a PUT request      	
		      	}
	});
	
});

appServices.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			if (value){
				fd.append(key, value);
				//console.log("key="+key+", value="+value);
			}else{
				fd.append(key, "");
			}
				
		});
		return fd;
	};
});


//BakerUser Resource
appServices.factory('BunMetadata', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/buns/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});




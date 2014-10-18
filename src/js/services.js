var appServices = angular.module('bakerapp.services',[]);

//BakerUser Resource
appServices.factory('BakerUser', function($resource) {
	return $resource("/baker/services/api/repo/users/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


appServices.factory('SessionService', function($resource) {
	return $resource('/baker/services/api/repo/sessions/');
});


appServices.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});



//SubscribedMachine Resource
appServices.factory('SubscribedMachine', function($resource) {
	return $resource("/baker/services/api/repo/subscribedmachines/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});

//Category Resource
appServices.factory('Category', function($resource) {
	return $resource("/baker/services/api/repo/categories/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});

//Apps Resource
appServices.factory('ApplicationMetadata', function($resource) {
	
	return $resource("/baker/services/api/repo/apps/:id", 
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
appServices.factory('BunMetadata', function($resource) {
	return $resource("/baker/services/api/repo/buns/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});




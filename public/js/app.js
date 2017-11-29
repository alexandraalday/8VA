const app = angular.module('scout', [ 'ngFileUpload' ]);

app.controller('mainController', ['$http', '$scope', 'Upload', function($http, $scope, Upload) { 
	const controller = this;
	this.url = 'http://localhost:3000'
	this.bands = [];
	this.genres = [];
	this.currentBand = {};
	this.formdata = {};
	this.showAddBand = false;
	this.showUpdate = false;
	this.showUpload = false;


	this.getBands = () => {
	$http({
    	method: 'GET',
   		url: this.url + '/bands',
  		}).then(response => {
			this.bands = response.data;
		}).catch(err => console.log(err));
	}

	this.toggleNewBand = () => {
		this.showAddBand = !this.showAddBand;
	}

    this.processForm = () => {
		$http({
	    	method: 'POST',
	    	url: 'http://localhost:3000/bands',
	    	data: this.formdata
	    }).then(result => {
	    	this.bands.unshift(result.data);
	    	this.formdata = {};  
	    });
	}

	this.getCurrentBand = (id) => {
	    $http({
	    	method: 'GET',
	    	url: this.url + '/bands/' + id
	    }).then(response => {
	      	controller.currentBand = response.data;
	    }).catch(err => console.log(err));
	}

	this.toggleUpdate = () => {
		this.showUpdate = !this.showUpdate;
	}

	this.update = (updatedBand) => {
    	$http({
	    	method: 'PUT',
	    	url: this.url + '/bands/' + this.currentBand.id,
	    	data: { band: { name: updatedBand.name, email: updatedBand.email, status: updatedBand.status }},
	    }).then(response => {
	    	controller.currentBand = {};
	    	controller.getBands();
	    	controller.toggleUpdate();
	  	});
	}

	this.toggleUpload = () => {
		this.showUpload = !this.showUpload;
	}


	$scope.upload = (file) => {
	    file.upload = Upload.upload({
	        url: this.url + '/bands/' + this.currentBand.id + '/tracks',
	        method: 'POST',
	        data: {
	          'track[name]': file.trackName,
	          'track[mp3]': file,
	          'track[genre_id]': file.genre_id
	        },
	    }).success(response => {
            controller.getBands();
            controller.toggleUpload();
        }).error(err => console.log(error));
	}

	this.getBands();

}]);
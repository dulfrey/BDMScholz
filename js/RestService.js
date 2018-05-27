/**
* general service for get data from Back end services
*/
var RestService = function($http, $httpParamSerializer, $q) {

  // get item(s)
  function get(url, params) {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url:  url,
      params: params,
    }).then(function(result) {
      deferred.resolve(result)
     }, function(error) {
     deferred.reject(error);
     });  

    return deferred.promise;
  }

  // send form data as JSON (for create or edit item)
  function sendJson(url, formData) {
    var deferred = $q.defer();

    $http({
      method: 'POST',
      url:  url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    }).then(function(result) {
      deferred.resolve(result)
     }, function(error) {
     deferred.reject(error);
     });  

    return deferred.promise;
  }

  // send form data as JSON and GET parameters(for create or edit item)
  function sendJsonWithGETParams(url, formData, getParams) {
    var deferred = $q.defer();

    $http({
      method: 'POST',
      url:  url,
      headers: {
        'Content-Type': 'application/json',
      },
      params: getParams,
      data: formData,
    }).then(function(result) {
      deferred.resolve(result)
     }, function(error) {
     deferred.reject(error);
     }); 

    return deferred.promise;
  }

  // send form data as x-www-form-urlencoded
  function sendForm(url, formData) {
    var deferred = $q.defer();

    $http({
      method: 'POST',
      url:  url,
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: $httpParamSerializer(formData),
    }).then(function(result) {
      deferred.resolve(result)
     }, function(error) {
     deferred.reject(error);
     }); 

    return deferred.promise;
  }

  // send form data as multipart request
  function sendFormMultipart(url, formData) {
    var deferred = $q.defer();

    $http({
      method: 'POST',
      url:  url,
      headers: {
       'Content-Type': undefined,
      },
      data: formData,
    }).then(function(result) {
      deferred.resolve(result)
     }, function(error) {
     deferred.reject(error);
     }); 

    return deferred.promise;
  }

  return {
    get: function(url, formData){
      return get(url, formData);
    },
    sendJson: function(url, formData){
      return sendJson(url, formData);
    },
    sendJsonWithGETParams: function(url, formData, getParams){
      return sendJsonWithGETParams(url, formData, getParams);
    },
    sendForm: function(url, formData){
      return sendForm(url, formData);
    },
    sendFormMultipart: function(url, formData){
      return sendFormMultipart(url, formData);
    },
  }
};

angular.module('BDMscholz')
.factory('RestService', RestService)

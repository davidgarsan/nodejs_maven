(function(angular) {
  var app = angular.module('app');
  var service = 'http://localhost:8080'

  var mainController = function ($http) {
    var ctrl = this;

    ctrl.tasks = [];
    ctrl.task = {};

    loadTasks();

    ctrl.addTask = function() {
      $http.post(service + '/api/task', ctrl.task).then(function() {
        alert('Task added');
        ctrl.task = {};
        loadTasks();
      }, function(error) {
        alert(error);
      });
    };

    ctrl.removeTask = function(task) {
      $http.delete(service + '/api/task/' + task.id).then(function() {
        alert('Task removed');
        loadTasks();
      }, function(error) {
        alert(error);
      });
    };

    function loadTasks() {
      $http.get(service + '/api/tasks').then(function(response) {
        ctrl.tasks = response.data;
      }, function(error) {
        alert(error);
      });
    }
  };
  mainController.$inject = ['$http'];
  app.controller('mainController', mainController);
}(angular));
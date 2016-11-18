var app = angular.module('githubViewer', []);
var MainController = function($scope, $http, $interval, $log) {
  $scope.message = "Github G Viewer";
  $scope.repoSortOrder = "-stargazers_count";
  $scope.username = "angular";
  $scope.countdown = 5;


  var onUserComplete = function(response) {
    $scope.error = "";
    $scope.person = response.data;
    $http.get($scope.person.repos_url)
      .then(onReposComplete, onError);
  };

  var onReposComplete = function(response) {
    $scope.repos = response.data;
  };

  var onError = function(reason) {
    $scope.error = "There's been a problem";
  };

  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search();
    }
  };

  var countDownInterval = null;
  var startCountdown = function() {
    countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
  };

  $scope.search = function() {
    $log.info("searching for: " + $scope.username);
    $http.get("https://api.github.com/users/" + $scope.username)
      .then(onUserComplete, onError);
    if (countDownInterval)
      $interval.cancel(countDownInterval);
    $scope.countdown = null;
  };

  startCountdown();
};

app.controller("MainController", MainController);

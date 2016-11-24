var app = angular.module('githubViewer', []);
var MainController = function(
  $scope, github, $interval, $log,
  $anchorScroll, $location) {

  var onUserComplete = function(response) {
    $scope.error = "";
    $scope.person = response.data;
    github.getRepos($scope.person.repos_url)
      .then(onReposComplete, onError);
  };

  var onReposComplete = function(response) {
    $scope.repos = response.data;
    $location.hash("userDetails");
    $anchorScroll();
  };

  var onError = function(reason) {
    $scope.error = "There's been a problem";
  };

  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search($scope.username);
    }
  };

  var countDownInterval = null;
  var startCountdown = function() {
    countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
  };

  $scope.search = function(username) {
    $log.info("searching for: " + username);
    github.getUser(username)
      .then(onUserComplete, onError);
    if (countDownInterval) {
      $interval.cancel(countDownInterval);
      $scope.countdown = null;
    }
  };

  startCountdown();
};

$scope.message = "Github G Viewer";
$scope.repoSortOrder = "-stargazers_count";
$scope.username = "angular";
$scope.countdown = 5;
app.controller("MainController", MainController);

app.controller("MainController", MainController);

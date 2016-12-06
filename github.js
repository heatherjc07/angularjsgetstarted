(function() {

    var github = function($http) {

      var getUser = function(username) {
        return $http.get("https://api.github.com/users/" + username)
          .then(function(response) {
            return response.data;
          });
      }

      var getRepos = function(person) {
          return $http.get(person.repos_url)
        .then(function(response) {
          return response.data;
        });
    }
    
    var getRepo = function(username, reponame) {
        return $http.get("https://api.github.com/repos/" + username + "/" + reponame)
          .then(function(response) {
            return response.data;
          });
      }
      
    var getContributors = function(username, reponame) {
        return $http.get("https://api.github.com/repos/" + username + "/" + reponame + "/contributors")
          .then(function(response) {
            return response.data;
          });
      }

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepo: getRepo,
      getContributors: getContributors
    };

  };
  var module = angular.module('githubViewer'); module.factory("github", github);
}());
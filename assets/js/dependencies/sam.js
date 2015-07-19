var app = angular.module('$sam', ['ngMaterial', 'ngSails']);

app.provider('$sam', function() {

   this.$get = function () {
      return this;
    };

    this.lists = function (navLists) {
      this.navLists = navLists;
    };

    this.outputLists = function (nav) {
      return this.navLists;
    };

});

app.controller('SamSideNavController', function($scope, $mdDialog, $injector) {

  $scope.actions = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
  ];
  $scope.goToPerson = function(person, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .content('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
  $scope.navigateTo = function(to, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .content('Imagine being taken to ' + to)
        .ariaLabel('Navigation demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
  $scope.doSecondaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .content('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
});

app.controller('SamParentController', ['$scope', '$http', '$sails', '$mdToast', '$animate', function($scope, $http, $sails, $mdToast, $animate) {

  $scope.userStatus = "";
  $scope.loggedIn = false;

  $scope.showCustomToast = function() {
     $mdToast.show($mdToast.simple().content($scope.userStatus));
  };

  $scope.closeToast = function() {
    $mdToast.hide();
  };

  $scope.user = {};

  $scope.login = function(user) {

    $http.post('/auth/login', user)
      .success(function(data) {

        $scope.loggedIn = true;
        $scope.userStatus = "You've logged in!";
        $scope.showCustomToast();

      })
      .error(function(error) {

        $scope.userStatus = error.error;
        $scope.showCustomToast();

      });

  };

  $scope.samLogout = function() {

    $http.post('/auth/logout').success(function(data) {

      $scope.loggedIn = false;
      $scope.userStatus = "You've logged out!";
      $scope.showCustomToast();

    }).error(function(error) {

      $scope.userStatus = error.error;
      $scope.showCustomToast();

    });

  };

  $sails.get("/user/jwt", function (userStatus) {

     if(typeof userStatus == "object") {
        $scope.loggedIn = true;
     } else {
        $scope.loggedIn = false;
     }

  });

}]);

app.controller('SamLoginController', ['$scope', '$http', '$sails', function($scope, $http, $sails) {

  $scope.loggedIn = $scope.$parent.loggedIn;


}]);

app.controller('SamMainController', ['$scope', '$sails', '$http', '$filter', '$interval', '$mdSidenav', '$mdDialog', function ($scope, $sails, $http, $filter, $interval, $mdSidenav, $mdDialog) {

    $scope.loggedIn = $scope.$parent.loggedIn;

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.deletePost = function (postId) {

        if (typeof postId === 'number') {

            var req = {
                method: 'POST',
                url: '/posts/destroy?id=' + postId
            };

            $http(req);

        }

    };

    $scope.determinateValue = 0;

    $scope.$on('$destroy', function () {

        $interval.cancel(postsLoading);

    });

    $scope.demo = {
        topDirections: ['left', 'up'],
        bottomDirections: ['down', 'right'],
        availableModes: ['md-fling', 'md-scale'],
        selectedMode: 'md-fling',
        availableDirections: ['up', 'down', 'left', 'right'],
        selectedDirection: 'down'
    };

    $scope.posts = [];

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/templates/createNewPost.html',
            parent: angular.element(document.body),
            targetEvent: ev
        })
            .then(function (answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.alert = 'You cancelled the dialog.';
        });
    };

    (function () {

        $sails.get("/posts")
            .success(function (data, status, headers, jwr) {

            $scope.posts = data;
            $scope.determinateValue = 100;

        })
            .error(function (data, status, headers, jwr) {

            throw new Error("Couldn't find the blueprint API for /posts");

        });

        $sails.on("posts", function (message) {

            if (message.verb == "destroyed") {

                var index = $filter('getIndex')($scope.posts, parseInt(message.id, 10));
                $scope.posts.splice(index, 1);

            } else if (message.verb == "created") {
                $scope.posts.push(message.data);
            }

        });

    }());

}]);

function DialogController($scope, $mdDialog, $http) {

    $scope.colors = ["green", "gray", "yellow", "blue", "purple", "red"];

    $scope.createPost = function (newPost) {

        var req = {
            method: 'POST',
            url: '/posts/create',
            data: newPost
        };

        $http(req)
            .success(function (data) {
            $mdDialog.cancel();
        })
            .error(function (data) {
            console.log(data);
        });

    };

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

app.filter('getIndex', function () {
    return function (input, id) {
        var i = 0,
            len = input.length;
        for (; i < len; i++) {
            if (+input[i].id == +id) {
                return i;
            }
        }
        return null;
    };
});

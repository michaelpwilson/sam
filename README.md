# SAM

[![Screenshot](https://raw.githubusercontent.com/mwils-bp/sam/develop/sam.jpg)](http://mwils.co.uk:1337)

A framework to get you started in minutes with [Sails.js](http://sailsjs.org) and [Angular Material](http://material.angularjs.org) to achieve full stack javascript development.
Sails.js powers everything on the back-end, suppling a Blueprint API with realtime support via [Socket.io](). Whilst Angular Material provides a set of reusable, well-tested, and accessible UI components based on the Material Design system. 
SAM comes included with components that are commonly seen in many web applications such as user authentication and JWT.

## Features

* Everything is real-time!
* User Authentication
* JSON web tokens
* Get started in five minutes

## View the demo

[![Login](https://raw.githubusercontent.com/mwils-bp/sam/develop/sam-login.jpg)](http://mwils.co.uk:1337)

The demo is included in this repository showing off the [Grid List](https://material.angularjs.org/latest/#/demo/material.components.gridList) component.

[http://mwils.co.uk:8080](http://mwils.co.uk:8080)

## Sails dependencies

All dependencies can be found in the ```package.json```, but just so you are aware:

1. [Waterlock](http://waterlock.ninja)

## Angular dependencies

All dependencies can be found in the ```assets/js/dependencies``` directory. This includes of:

1. angular.min.js (v1.4.1)
2. [angular-sails.min.js](https://github.com/janpantel/angular-sails)
3. angular-animate.min.js
4. angular-aria.min.js
5. angular-material.min.js
6. angular-ui-router.min.js
7. sam.js

Any angular modules placed inside this directory will be loaded after the above.

### Grunt task

Any angular modules placed inside this directory will be loaded after the above. This order of the dependencies
is kept within the assets pipeline bundled with Sails.

```javascript
// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/angular.min.js',
  'js/dependencies/angular-sails.min.js',
  'js/dependencies/angular-animate.min.js',
  'js/dependencies/angular-aria.min.js',
  'js/dependencies/angular-material.min.js',
  'js/dependencies/angular-ui-router.min.js',
  'js/dependencies/sam.js',
  'js/dependencies/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];
```

## Getting started

Clone this repository:
```bash
git clone https://github.com/mwils-bp/sam.git
```

Make sure you install of the require dependencies and go inside the ```sails-angular-material``` directory.
```bash
cd sam && npm install
```

### Angular.js

Your Angular application is based at ```assets/js/app.js```, which allows you to organize the parts of your interface into a state machine.

```javascript
var app = angular.module('MyApp', ['ui.router', '$sam']);

app.config(function($stateProvider, $urlRouterProvider, $samProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/templates/home.html"
    });

  $samProvider
   .lists([{
     "title": "Navigation",
     "navigation": [{
       "name": "Home"
     }]
   }, {
    "title": "Actions",
    "navigation": [{
      "name": "My account"
    }, {
      "name": "Settings"
    }, {
      "name": "Logout"
    }]
   }]);

});
```

### $samProvider

#### .lists( array )

Configures the lists which appear in the Sidenav.

```javascript
$samProvider
  .lists([{
     "title": "Navigation",
     "navigation": [{
       "name": "Home"
     }]
  }, {
     "title": "Actions",
     "navigation": [{
       "name": "My account"
     }, {
       "name": "Settings"
     }, {
       "name": "Logout"
     }]
  }]);
```

### Sails.js

Sails.js is a web framework that makes it easy to build custom, enterprise-grade Node.js apps. It is designed to resemble the MVC architecture from frameworks like Ruby on Rails, but with support for the more modern, data-oriented style of web app development. It's especially good for building realtime features like chat.

Sails is built on [Node.js](http://nodejs.org/), [Connect](http://www.senchalabs.org/connect/), [Express](http://expressjs.com/), and [Socket.io](http://socket.io/).

Sails [controllers](http://sailsjs.org/documentation/concepts/controllers) are compatible with Connect middleware, so in most cases, you can paste code into Sails from an existing Express project and everything will work-- plus you'll be able to use WebSockets to talk to your API, and vice versa.

The ORM, [Waterline](https://github.com/balderdashy/waterline), has a well-defined adapter system for supporting all kinds of datastores.  Officially supported databases include [MySQL](https://github.com/balderdashy/sails-mysql), [PostgreSQL](https://github.com/balderdashy/sails-postgresql), [MongoDB](https://github.com/balderdashy/sails-mongo), [Redis](https://github.com/balderdashy/sails-redis), local [disk](https://github.com/balderdashy/sails-disk), and local [memory](https://github.com/balderdashy/sails-memory).  [Community adapters](https://github.com/balderdashy/sails-docs/blob/master/contributing/intro-to-custom-adapters.md#notable-community-adapters) exist for [CouchDB](https://github.com/search?q=sails+couch&nwo=codeswarm%2Fsails-couchdb-orm&search_target=global&ref=cmdform), [neDB](https://github.com/adityamukho/sails-nedb), [TingoDB](https://github.com/andyhu/sails-tingo), [SQLite](https://github.com/AndrewJo/sails-sqlite3/tree/0.10), [Oracle](https://github.com/search?q=sails+oracle&type=Repositories&ref=searchresults), [MSSQL](https://github.com/cnect/sails-mssql), [DB2](https://github.com/search?q=sails+db2&type=Repositories&ref=searchresults), [ElasticSearch](https://github.com/search?q=%28elasticsearch+AND+sails%29+OR+%28elasticsearch+AND+waterline%29+&type=Repositories&ref=searchresults), [Riak](https://github.com/search?q=sails+riak&type=Repositories&ref=searchresults),
[neo4j](https://www.npmjs.org/package/sails-neo4j), [OrientDB](https://github.com/appscot/sails-orientdb),
[Amazon RDS](https://github.com/TakenPilot/sails-rds), [DynamoDB](https://github.com/TakenPilot/sails-dynamodb), [Azure Tables](https://github.com/azuqua/sails-azuretables), and [RethinkDB](https://github.com/search?q=%28%28sails+rethinkdb+in%3Aname%29+OR+%28waterline+rethinkdb+in%3Aname%29%29&type=Repositories&ref=searchresults); for various 3rd-party REST APIs like Quickbooks, Yelp, and Twitter, including a configurable generic [REST API adapter](https://github.com/zohararad/sails-rest); plus some [eclectic projects](https://www.youtube.com/watch?v=OmcQZD_LIAE).

#### Links
- [Website](http://sailsjs.org/)
- [Official Documentation](http://sailsjs.org/documentation)
- [Changelog](https://github.com/balderdashy/sails/blob/master/CHANGELOG.md)
- [Roadmap](https://github.com/balderdashy/sails/blob/master/ROADMAP.md#roadmap)
- [Google Group](https://groups.google.com/forum/#!forum/sailsjs)
- [Twitter](https://twitter.com/sailsjs)
- [SailsCasts](http://irlnathan.github.io/sailscasts/)

## Now that your ready

Now generate an API for "posts" which will consist of a Model, a View and a Controller: 
```bash
sails generate api posts
```

A controller will be created, found in the ```api/``` folder. 

```javascript
/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

 index: function(req, res) {

   Posts.watch(req.socket);

   Posts.find({}).exec(function findPosts(err, foundPosts) {

     Posts.subscribe(req.socket, foundPosts);
     res.json(foundPosts);

   });

 }

};
```

Next is to create your model, this will be where your business logic resides:

```javascript
/**
* Posts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    r: {
     type: "integer",
     required: true
    },
    c: {
     type: "integer",
     required: true
    },
    color: {
     type: "string",
     required: true
    },
    name: {
      type: "string",
      unique: true
    }
  }

};
```

We then use [angular-sails](https://github.com/janpantel/angular-sails) on the front end for use of web sockets.

1. ```$sails.get("/posts")``` for the first time and attach it to the ```$scope```.
2. On every new action which happens to the "posts", do that action


```javascript
  (function () {

    $sails.get("/posts")
      .success(function (data, status, headers, jwr) {

        $scope.posts = data;

      })
      .error(function (data, status, headers, jwr) {

        throw new Error(data);

      });

    $sails.on("posts", function (message) {

      if(message.verb == "destroyed") {

        var index = $filter('getIndex')($scope.posts, parseInt(message.id));
        $scope.posts.splice(index, 1);

      } else if(message.verb == "created") {

        $scope.posts.push(message.data);

      }

    });

  }());
```

Now we can start to perform actions with Angular like destroying or creating a record:
```javascript
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

$scope.deletePost = function (postId) {

  if (typeof postId === 'number') {

    var req = {
      method: 'POST',
      url: '/posts/destroy?id=' + postId
    };

    $http(req);

  }

};
```

The Angular Material Grid List is used to display the posts via this code here:

```html
<md-grid-list ng-show="determinateValue === 100" md-cols-sm="1" md-cols-md="2" md-cols-gt-md="6" md-row-height-gt-md="1:1" md-row-height="2:2" md-gutter="12px" md-gutter-gt-sm="8px">
    <md-grid-tile ng-init="isOpen = false" ng-repeat="post in posts" class="{{post.color}}" md-rowspan="{{post.r}}" md-colspan="{{post.c}}" md-colspan-sm="1">
        <div>
            <md-button ng-click="deletePost(post.id)" aria-label="delete" class="md-mini deletePost">
                <md-icon md-svg-src="/images/delete.svg"></md-icon>
            </md-button>
        </div>
        <md-grid-tile-footer>
             <h3>#{{$index}} {{post.name}}: ({{post.r}}r x {{post.c}}c)</h3>
        </md-grid-tile-footer>
    </md-grid-tile>
</md-grid-list>
```

## More coming soon!

If you would like to contribute to this repository, feel free!

/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
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


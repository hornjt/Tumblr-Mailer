// Authenticate via OAuth
var tumblr = require('tumblr.js'),
http = require('http'),
blogName = "atomicpizzarebel.tumblr.com";


var client = tumblr.createClient({
  consumer_key: 'OCFihagoU0ny5kMQmQf2wv1JCPYF2B3tzn0z92FL2ScA7QC3yH',
  consumer_secret: 'wSAyV8clgavD0B568hQdsUIV8FbOMnn6h0JIdlsM6oDJYxMlqb',
  token: 'COco5SgGolpXek4j1pjjzJRXhgl4q532rpfoqUMCKq1ZCJ89Dw',
  token_secret: 'rbXofHQ3u56Pww9o4Rrq4Z73y4Umh5rfMs77fkR4ehyF9JaWuc'
});


client.posts(blogName, function(err, data){
	var postsArray = [];
	if (err !== null) {
		console.log(err);
	} else {	
		for (var i = 0; i < data.posts.length; i++) {
			postsArray.push(data.posts[i].body.slice(3,-4));
		};
	}
	console.log(postsArray);
	
})
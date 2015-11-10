var fs = require('fs');
var path = require('path');
var faker = require('faker');

var postsCount = 30;
var postsConfig = require('./app/content/posts.json');
var postsDir = './app/content/posts';

var seedPostUriCounter = 0;

// Lets make 10 "tags"
var seedTags = _createRandomTags(10);
// And 3 "categories"
var seedCategories = _createRandomCategories(3);

console.log('Populating random posts...');
var seedPosts = _createRandomPosts(postsCount);

console.log('Creating post files...');

_createRandomPostFiles(postsCount);

console.log('Writing posts.json...');
postsConfig.categories = seedCategories;
postsConfig.posts = seedPosts;
fs.writeFile('app/content/posts.json', JSON.stringify(postsConfig, null, '\t'), function(err) {
	if(err) {
		return console.log(err);
	}
});

function _createRandomPostFiles(count) {
	var i = 0,
		l = count;

	for(; i < l; i++) {

		var postConfig = seedPosts[i];

		var postMarkdown = [
			'# ' + postConfig.title + '\n',
			faker.lorem.paragraphs(4)
		].join();
		console.log(postMarkdown)

		if(!fs.existsSync('app/content/posts/' + postConfig.category + '/' + i)) {
			fs.mkdirSync('app/content/posts/' + postConfig.category + '/' + i, 0777, function(err) {
				if(err) {
					return console.log(err);
				}
			});
		}
		fs.writeFile('app/content/posts/' + postConfig.category + '/' + i + '/' + 'post.md', postMarkdown, function(err) {
			if(err) {
				return console.log(err);
			}
		});
	}
}

function _createRandomPosts(count) {
	var i = 0,
		l = count;

	var posts = [];

	for(; i < l; i++) {
		posts.push(_createRandomPost());
	}

	return posts;
}

function _createRandomPost() {
	var post = {
		'uri': seedPostUriCounter,
		'title': faker.company.catchPhrase(),
		'postFileExtension': '.md',
		'category': _getRandomArrayElements(seedCategories, 1)[0],
		'tags': _getRandomArrayElements(seedTags, 3)
	};
	
	seedPostUriCounter++;
	
	return post;
}

function _createRandomCategories(count) {
	var i = 0,
		l = count;

	var categories = [];

	for(; i < l; i++) {

		var category = faker.company.bsBuzz();

		if(!fs.existsSync('app/content/posts/' + category)) {
			fs.mkdirSync('app/content/posts/' + category, 0777, function(err){
				if(err){
					return console.log(err);
				}
			});
		}

		categories.push(category);
	}
	
	return categories;
}

function _createRandomTags(count) {
	var i = 0,
		l = count;

	var tags = [];

	for(; i < l; i++) {
		tags.push(faker.hacker.abbreviation());
	}

	return tags;
}

//alert( getRandomArrayElements(numbers, 4) );
function _getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}
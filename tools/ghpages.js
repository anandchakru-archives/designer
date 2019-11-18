/* Publish to github pages */
var ghpages = require('gh-pages');

ghpages.publish('dist', {
  message: 'Auto-generated commit to gh-pages'
}, function (err) {
  if (err) {
    console.log('Error publishing to gh-pages: ' + err);
  }
});
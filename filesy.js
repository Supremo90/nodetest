var fs = require('fs');

fs.writeFile('demo.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
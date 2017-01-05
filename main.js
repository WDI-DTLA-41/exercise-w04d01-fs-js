var fs = require('fs');

fs.readFile('./census.csv', 'utf-8', function(err, data) {
  if(err) throw err;

  var arr = data.split('\n');
  arr.pop();
  // console.log(arr);

  arr.forEach(function(str, index) {
    arr[index] = str.split(',');
  });

  var headings = arr.shift();
  headings.forEach(function(str, index) {
    headings[index] = str.trim();
  });

  var objects = [];
  arr.forEach(function(str) {
    var state = {};
    for(var i = 0; i < headings.length; i++) {
      state[headings[i]] = str[i];
    }
    objects.push(state);
  });
  console.log(objects);
  var str = '[\n';

  objects.forEach(function(object) {
    str += '\t{';
    for(var key in object) {
      str += key + ': ' + object[key] + ', ';
    }
    str = str.substring(0, str.length-2) + '},\n';
  });
  str = str.substring(0, str.length-2) + '\n]';

  fs.writeFile('census.json', str, function(err) {
    if(err) throw err;
    console.log('file saved');
  })
});

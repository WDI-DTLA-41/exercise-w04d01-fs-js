var fs = require('fs');

fs.readFile('./census.csv', 'utf8', (err, data) => {
  if (err) throw err;
  var stats = data.split('\n'),
      newArr = [];
  stats.pop();
  // console.log(stats);
  for ( var i = 0; i < stats.length; i++ ) {
    stats[i] = stats[i].split(',');
  }
  var header = stats.shift();
  for ( var b = 0; b < stats.length; b++ ) {
    var newObj = {};
    for ( var j = 0; j < header.length; j++ ) {
      var key = header[j]
      newObj[key] = stats[b][j];
    }
    newArr.push(newObj);
  }
  newArr = JSON.stringify(newArr);
  console.log(newArr);
  fs.writeFile('stats.JSON', newArr, (err) => {
    if (err) throw err;
    console.log('saved the census data as JSON')
  })
});

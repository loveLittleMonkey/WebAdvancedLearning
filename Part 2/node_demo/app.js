var fs = require('fs');
fs.readFile('./index.js', 'utf-8', function(err, data) {
    var newData = data.replace(/\/\*[\s\S]*\*\//,'');
    fs.writeFile('./index.copy.js', newData, function(err) {
        if(!err) {
            console.log('Write file success')
        }
    })
})
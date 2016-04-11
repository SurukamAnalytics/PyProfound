exports.classify = function(req, res) {
    var PythonShell = require('python-shell');
    console.log("Its hitting the express function!")
    csv_file_path = req.body.file_path
    separator = req.body.separator
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python-scripts',
      args: [csv_file_path, separator]
    };

    PythonShell.run('classify.py', options, function (err, results) {
      if (err){
        res.send({"status":500,"error":err});
      } 
      else{
        res.send({"status":200,"score":results[0]});
      } 
      // results is an array consisting of messages collected during execution
      /*console.log('results: %j', results);
      res.send(results)*/
    });
    
    //res.send({"status":200})
};
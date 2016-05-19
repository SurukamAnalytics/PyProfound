exports.classify = function(req, res) {
    var PythonShell = require('python-shell');
    csv_file_path = req.body.file_path
    separator = req.body.separator
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python-scripts',
      args: [csv_file_path,separator]
    };
    //args: [csv_file_path,separator,first_column_index,first_row_header]
    PythonShell.run('classify.py', options, function (err, results) {
      if (err){
        res.send({"status":500,"error":err});
      } 
      else{
        res.send({"status":200,"scores":results});
      } 
    }).on('message',function(message){
      console.log(message)
    });
    console.log("classify called")
    //res.send({"status":200})
};
exports.test = function(req,res) {
    var PythonShell = require('python-shell');
    csv_file_path = req.body.file_path
    separator = req.body.separator
    model_name = req.body.model_name
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python-scripts',
      args: [csv_file_path,separator,model_name]
    };

    PythonShell.run('test.py', options, function (err, results) {
      if (err){
        res.send({"status":500,"error":err});
      } 
      else{
        res.send({"status":200,"model_name":model_name,"results": results});
      } 
    }).on('message',function(message){
      console.log(message)
    });
};
/*exports.export = function(req, res){
var fs = require('fs');
console.log("export called")
fs.writeFile('annotation.txt', req, function (err) {
          if (err) res.send('error generating pdf! ' + err.message);
          else res.send('pdf saved!');
      });
};*/
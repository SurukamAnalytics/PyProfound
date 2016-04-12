$(function(){
	 // Electron's UI library. We will need it for later.
    var shell = require('shell');
    var dialog = require('remote').require('dialog');
	var fs = require('fs');
	var client = require('scp2');
	var path = require('path');
	var http = require('http');
	var querystring = require('querystring');
	var app = require('remote').app; 
	var data = null;
	var dataFilePath = path.join(app.getPath('userData'), 'data.json');
	var remoteDataDirectory = '/root/pyprofound-data';//should ideally come from a config.js file 

	$('#upload').on('click', function (e) {
	    dialog.showOpenDialog({ filters: [
     		{ name: 'text', extensions: ['csv','txt','tsv'] }
    	]},function (fileNames) {
    		 console.log(fileNames)
			 if (fileNames === undefined) return;
			  var fileName = fileNames[0]
			  fs.readFile(fileName, 'utf-8', function (err, data) {
			  	console.log("uploading" + fileName)
			  	client.scp(fileName, {
				    host: '50.22.85.12',
				    username: 'root',
				    password: 'DqKBDnH9',
				    path: '/root/pyprofound-data'
				}, function(err) {
					if(err == null){
						$("#editor").val("File uploaded successfully");
						data = {}
						data["uploaded_file_name"] = path.parse(fileName)["base"]
						fs.writeFileSync(dataFilePath, JSON.stringify(data));  
					}
				});
			});
		});
	});
	$("#classify").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(remoteDataDirectory, fileName)
  		});
		var post_options = {
			host: '50.22.85.12',
			port: '9000',
			path: '/ml-api/classify',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		};
		var post_req = http.request(post_options, function(res) {
      		res.setEncoding('utf8');
      		res.on('data', function (chunk) {
          		console.log('Response: ' + chunk);
          		console.log("Classified!");
          		$("#editor").val('Response: ' + chunk);
      		});
  	   	});
		// post the data
  		post_req.write(post_data);
	  	post_req.end();
	});
});
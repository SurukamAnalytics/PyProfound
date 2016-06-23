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
	var remoteDataDirectory = '/root/pyprofound-data';
	var localDataDirectory = '/home/rishi/PyProfound/ml-api/input';
	var model_file;
	var x;
	//should ideally come from a config.js file 

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
					else {
						$("#editor").val("File  not uploaded successfully");
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
	      'file_path': path.join(localDataDirectory, fileName)
  		});
		var post_options = {
			host: '0.0.0.0',
			port: '8000',
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
          		console.log("Trained!");
          		$("#editor").val(chunk);
      		});
  	   	});
		// post the data
  		post_req.write(post_data);
	  	post_req.end();
	 });
	$("#AdaBoost,#Decision-Tree,#Linear-Discriminant-Analysis,#Linear-SVM,#Nearest-Neighbors,#Naive-Bayes,#Quadratic-Discriminant-Analysis,#Random-Forest,#RBF-SVM").on('click',function (e) {
		console.log(e.toElement.id)
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': e.toElement.id
  		});
		var post_options = {
			host: '0.0.0.0',
			port: '8000',
			path: '/ml-api/test',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		};
		var post_req = http.request(post_options, function(res) {
      		res.setEncoding('utf8');
      		res.on('data', function (chunk) {
          		console.log('Response: ' + chunk);
          		console.log("Tested!");
          		$("#editor").val(chunk);
      		});
  	   	});
		// post the data
  		post_req.write(post_data);
	  	post_req.end();
	 });
	$("#export_train").on('click',function (e) {
		var rishi = $("textarea#editor").val();
		var objectrishi= JSON.parse(rishi);
    	console.log(objectrishi.scores);
    	var shareInfoLen = Object.keys(objectrishi.scores).length;
    	console.log(shareInfoLen);
    	var fs = require('fs');
		fs.writeFileSync("./newoutput.txt",'', "UTF-8",{'flags': 'a+'});

		for (var i = 1; i < shareInfoLen; i++) {
			 //fs.appendFileSync("./output.txt", objectrishi.scores[i] + "\n");}
		 	 fs.appendFileSync("./newoutput.txt", i +")" + objectrishi.scores[i] + "\n", "UTF-8",{'flags': 'a+'});
		}
	});
	$("#export_test").on('click',function (e) {
		var rishi1 = $("textarea#editor").val();
		console.log(rishi1)
		var objectrishi1= JSON.parse(rishi1);
    	console.log(objectrishi1.results);
    	var len = Math.floor(objectrishi1.results[0]);
    	var length1 = len+2;
    	var fs = require('fs');
    	fs.writeFileSync("./"+objectrishi1.model_name+" testedoutput.txt",'', "UTF-8",{'flags': 'a+'});
    	for (var i = 1; i < length1 ; i++) {
		 		 fs.appendFileSync("./"+objectrishi1.model_name+" testedoutput.txt", str(objectrishi1.results[i]) + "\n", "UTF-8",{'flags': 'a+'});
		 		  }
	});
});

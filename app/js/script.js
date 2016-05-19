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
				});
			});
		});
	});
	/*$('#test').on('click',function(e){
		//data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		//model_file = fs.readFileSync(newoutput,'utf-8');
		//model_file = JSON.parse(fs.readFileSync($("textarea#editor").val(), 'utf-8')); 
		//fileName = data["uploaded_file_name"]
		//console.log(fileName)
		console.log("enter the number corresponding to the model you want to apply")
		var fs = require('fs')
					  , filename = "./newoutput.txt";
					fs.readFile(filename, 'utf8', function(err, data) {
					  if (err) throw err;
					  //console.log('OK: ' + filename);
					  console.log(data)
					});
	});*/
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
	$("#AdaBoost").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'AdaBoost'
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
	$("#Decision-Tree").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Decision-Tree'
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
	$("#Linear-Discriminant-Analysis").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Linear-Discriminant-Analysis'
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
	$("#Linear-SVM").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Linear-SVM'
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
	$("#Naive-Bayes").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Naive-Bayes'
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
	$("#Nearest-Neighbors").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Nearest-Neighbors'
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
	$("#Quadratic-Discriminant-Analysis").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Quadratic-Discriminant-Analysis'
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
	$("#Random-Forest").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'Random-Forest'
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
	$("#RBF-SVM").on('click',function (e) {
		
		data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
		fileName = data["uploaded_file_name"]
		console.log(fileName)
		var post_data = querystring.stringify({
	      'separator' : 'comma',//needs to come from form data
	      'file_path': path.join(localDataDirectory, fileName),
	      'model_name': 'RBF-SVM'
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
		/*fs.writeFile('output_1.txt',JSON.stringify(objectrishi.scores),function (err) {
			if (err) {console.error('Crap happens');}});*/
		//if (x==1){ 
		//	open("./newoutput.txt", 'w').close();}

		 	for (var i = 0; i < shareInfoLen; i++) {
		 		 //fs.appendFileSync("./output.txt", objectrishi.scores[i] + "\n");}
		 		 fs.appendFileSync("./newoutput.txt",(i+1) +")" + objectrishi.scores[i] + "\n", "UTF-8",{'flags': 'a+'});
		 		  }
		 		  
			/*BufferedReader in = new BufferedReader(new FileReader("./newoutput.txt"));
			String line = in.readLine();
			while(line != null)
			{
			  System.out.println(line);
			  line = in.readLine();
			}
			in.close();*/
        //console.log(newoutput.txt);
        //function model_file(){
        //	return newoutput
        //}
	});
	$("#export_test").on('click',function (e) {
		var rishi1 = $("textarea#editor").val();
		console.log(rishi1)
		var objectrishi1= JSON.parse(rishi1);
    	console.log(objectrishi1.results);
    	var fs = require('fs');
    	fs.writeFileSync("./"+objectrishi1.model_name+" testedoutput.txt",objectrishi1.results + "\n", "UTF-8",{'flags': 'a+'});
	});
});
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*function myFunction() {
    document.getElementById("test/train").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/
function toggleNavPanel(x){
	var panel = document.getElementById(x) , navarrow = document.getElementById("navarrow"), maxH="300px";
	if(panel.style.height == maxH){
		panel.style.height = "0px";
		navarrow.innerHTML = "&#9662;";
	} else {
		panel.style.height = maxH;
		navarrow.innerHTML = "&#9652;";
	}
}
function toggleNavPanel1(x){
	var panel = document.getElementById(x) , navarrow = document.getElementById("navarrow1"), maxH="400px";
	if(panel.style.height == maxH){
		panel.style.height = "0px";
		navarrow.innerHTML = "&#9654;";
	} else {
		panel.style.height = maxH;
		navarrow.innerHTML = "&#9652;";
	}
}
function toggleNavPanel2(x){
	var panel = document.getElementById(x) , navarrow = document.getElementById("navarrow2"), maxH="100px";
	if(panel.style.height == maxH){
		panel.style.height = "0px";
		navarrow.innerHTML = "&#9662;";
	} else {
		panel.style.height = maxH;
		navarrow.innerHTML = "&#9652;";
	}
}
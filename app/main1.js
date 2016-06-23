"use strict";

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const windowManager = require('electron-window-manager');
require('crash-reporter').start();
var path = require('path');
var mainWindow = null;	
function clicked () {
	var user = document.getElementById('username');
	var pass = document.getElementById('password');

	//var coruser = "test";
	//var corpass = "123";

	if (user.value) {

		if (pass.value) {

			window.alert("You are logged in as " + user.value);
			/*app.on('window-all-closed', function() {	
			  // On OS X it is common for applications and their menu bar
			  // to stay active until the user quits explicitly with Cmd + Q
			  if (process.platform != 'darwin') {
			    app.quit();
			  }
			});
			app.on('ready', function() {
				mainWindow = new BrowserWindow(
				    {
				     height: 600,
				     width: 750,
				     icon:path.join(__dirname, '/app/img/surukam_logo.png'),
				     backgroundColor:"blue",
				     resizable: true
				    });

				  // and load the index.html of the app.
				  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

				  // Open the DevTools.
				  mainWindow.webContents.openDevTools();

				  // Emitted when the window is closed.
				  mainWindow.on('closed', function() {
				    // Dereference the window object, usually you would store windows
				    // in an array if your app supports multi windows, this is the time
				    // when you should delete the corresponding element.
				    mainWindow = null;
				  });
				});*/
		}else {

			 window.alert("Incorrect username or password!");
		
		}

	} else {

		window.alert("Incorrect username or password!");
	
	}

}
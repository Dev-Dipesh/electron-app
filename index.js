const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

var app = electron.app;
var ipc = electron.ipcMain;

app.on('ready', function() {
	var appWindow, infoWindow;
	appWindow = new BrowserWindow({
		show: false
	});

	appWindow.loadURL('http://raybo.org');

	infoWindow = new BrowserWindow({
		width: 400,
		height: 300,
		transparent: true,
		show: false,
		frame: false
	});

	infoWindow.loadURL('file://' + __dirname + '/info.html');

	appWindow.once('ready-to-show', function() {
		appWindow.show();
		setTimeout(function() {
			infoWindow.show();
			// setTimeout(function() {
			// 	infoWindow.hide();
			// }, 1000);
		}, 1000);
	});

	ipc.on('closeInfoWindow', function(event, arg) {
		event.returnValue = '';
		infoWindow.hide();
	});
});
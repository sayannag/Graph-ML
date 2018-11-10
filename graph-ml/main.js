/**
 * Created by Subhashis on 01-03-2018.
 */
const {app, BrowserWindow} = require('electron');

let win;

function createWIndow(){
    BrowserWindow.setMaximized(true);
    win= new BrowserWindow({
        width:600,
        height:600,
        backgroundColor: '#DDDDFF'
    });

    win.loadURL('file://${__dirname}/dist/index.html');
    win.maximize();
    win.webContents.openDevTools();

    win.on('closed', function(){
        win=null;
    });
}


app.on('window-all-closed', function(){
    if(process.platform!='darwin'){
        app.quit();
    }
});

app.on('activate', function () {
    if(win===null){
        createWindow();
    }

});
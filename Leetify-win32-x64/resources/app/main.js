const { app, BrowserWindow, Menu, session, shell } = require('electron');

// Disable hardware acceleration for apps that don't require it
app.disableHardwareAcceleration();

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        title: 'Leetify Desktop (UnOfficial)',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
    });


    mainWindow.loadURL('http://www.leetify.com/auth/login');

    mainWindow.webContents.on('did-finish-load', () => {
        const currentUrl = mainWindow.webContents.getURL();
        console.log('Current URL:', currentUrl);

        if (currentUrl.endsWith('leetify.com/') || currentUrl.endsWith('leetify.com')) {

            if (currentUrl.includes('steamcommunity.com/openid/login') || currentUrl.includes('faceit.com/en/oauth')) {

                ;// Ignore and allow the user to login without a redirect.

            }
            else {
                mainWindow.loadURL('http://www.leetify.com/auth/login');
            }
        } else if (!currentUrl.includes('/app') && !currentUrl.includes('/auth/login')) {
            console.log('User is in an unexpected state, consider additional handling here.');
        }
    });


    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuTemplate = [
        {
            label: 'Dashboard',
            click() {
                mainWindow.loadURL('http://www.leetify.com/app');
            }
        },
        {
            label: 'Matches',
            click() {
                mainWindow.loadURL('https://leetify.com/app/matches/list');
            }
        },
        {
            label: 'General',
            click() {
                mainWindow.loadURL('https://leetify.com/app/general');
            }
        },
        {
            label: 'Practice Servers',
            click() {
                mainWindow.loadURL('https://leetify.com/app/servers');
            }
        }
    ]
    // Menu Bar - Config
    const menu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(menu)

    // Handle window closed event
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    return mainWindow;
}

app.on('ready', () => {
    // Create main window
    createMainWindow();


});

app.on('window-all-closed', () => {
    // On macOS, quit the app when all windows are closed
    if (process.platform !== 'darwin') {//nolan is god 

        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, re-create a window if none are open and dock icon clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

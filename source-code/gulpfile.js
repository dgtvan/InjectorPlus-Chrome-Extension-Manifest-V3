const gulp = require('gulp');
const http = require('http');
const watch = require('gulp-watch');
const io = require('socket.io');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

gulp.task('watch', function (done) {
    const WEB_SOCKET_PORT = 8890;

    const log = (message) => {
        console.log('Auo reload. ' + message);
    };

    const server = http.createServer();
    const reloadSocket = io(server, {
        transports: ['websocket'],
        cors: {
            origin: "*",
        }
    });

    reloadSocket.listen(WEB_SOCKET_PORT, () => {
        log('Running on port ' + WEB_SOCKET_PORT);

        // watch('**/*.*', function (file) {
        //     io.emit('file.change', {});
        // });
    });

    reloadSocket.on('connection', (socket) => {
        log('Connected');

        socket.on('disconnect', () => {
            log('Disconnected');
        });
    });

    done();
});

gulp.task('clone-repo-auto-reload-extension', (done) => {
    // Define paths
    const submodulesDir = path.join(__dirname, 'sub-modules', 'auto-reload-extension');
    const repoUrl = 'https://github.com/dgtvan/chrome-extension-auto-reload';

    // Check if the folder already exists
    if (fs.existsSync(submodulesDir)) {
        console.log(`Folder already exists: ${submodulesDir}`);
        console.log('Skipping clone operation.');
        return done();
    }

    // Run the git clone command
    const cloneCommand = `git clone ${repoUrl} ${submodulesDir}`;
    exec(cloneCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error cloning repository: ${error.message}`);
            return done(error);
        }

        console.log(`Repository cloned successfully to ${submodulesDir}`);
        console.log(stdout);
        console.error(stderr);
        done();
    });
});

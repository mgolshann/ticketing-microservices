// we are telling webpack rather than trying to watch for a file changes
// in some automated fashion instead pull all the different files inside
// of a project directory automatically at once every 300 milliseconds

// Traditionally this change will fix the issue with file change detection 
// when running inside of a docker container
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.Poll = 300;
        return config;
    }
};
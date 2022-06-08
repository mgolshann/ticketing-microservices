modules.exports = {
    webpackDevMiddleware: config => {
        config.watchOption.Poll = 300;
        return config;
    }
}
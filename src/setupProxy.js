const { createProxyMiddleware } = require('http-proxy-middleware');
     
    module.exports = function(app) {
        app.use(createProxyMiddleware('/api/**', { target: 'http://localhost:4000' }));
        app.use(createProxyMiddleware('/users/**', { target: 'http://localhost:4000' }));
        app.use(createProxyMiddleware('/lands/**', { target: 'http://localhost:4000' }));
        app.use(createProxyMiddleware('/**', { target: 'http://localhost:4000' }));
    };
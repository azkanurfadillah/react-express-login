const proxy = require("http-proxy-middleware")

module.exports = app => {
    app.use(proxy("/*", {target: "http://localhost:5000/user"}))
}
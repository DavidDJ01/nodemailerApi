
const mailer = require("./mailer")

function route(app){
    app.use("/api", mailer)
}

module.exports = route
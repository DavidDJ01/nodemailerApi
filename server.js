var express = require("express")
var app = express()
var cors = require("cors")
var port = 8090
const route = require("./route/index")


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended : true
}))

route(app)
console.log(`http://localhost:${port}`)
app.listen(port, () => {console.log(`Server đang chạy ${port}`)})


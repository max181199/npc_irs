var express = require(`express`)
var bodyParser = require('body-parser')
const cors = require("cors");
var {default: routers} = require('./src/routes/index')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cors());
app.use(routers)

app.listen(process.env.PORT, function(){
  console.log(`SERVER START ON PORT::${process.env.PORT}`)
})


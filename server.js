var express = require('express')
var morgan = require('morgan')
var app = express()
var templating = require('jade')

var index = templating.compileFile(__dirname + '/src/template/index.jade')
//var attraction = templating.compileFile(__dirname + '/src/template/attraction.jade')

app.use(morgan('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function(req, res) {
    res.send(index({title: 'Home'}))
})

app.get('/attraction/*-:id', function(req, res) {
    res.send(index({title: req.params.id}))
})

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on http://localhost:' + (process.env.PORT || 3000))
})

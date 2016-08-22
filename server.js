var express = require('express')
var morgan = require('morgan')
var app = express()
var templating = require('jade')

//var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/timra');
var attractions = db.get('attractions');

var index = templating.compileFile(__dirname + '/src/template/index.jade')
var attraction = templating.compileFile(__dirname + '/src/template/attraction.jade')


app.use(morgan('dev'))
app.use(express.static(__dirname + '/static'))


app.get('/', function(req, res) {
    res.send(index({
        title: 'Home',
    }))
})

app.get('/attractions/:xbeg-:xend-:ybeg-:yend', function(req, res) {
    attractions.find().then((docs) => {
        res.send(docs);
    })
})

app.get('/attraction/*-:id', function(req, res) {
    res.send(index({title: req.params.id}))
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on http://localhost:' + port)
})

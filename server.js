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

app.get('/attractions/:xbeg!:xend!:ybeg!:yend', function(req, res) {

    // Sort out wrapping of x coordinates.
    var xbeg = (parseFloat(req.params.xbeg) + 180) % 360 - 180;
    var xend = (parseFloat(req.params.xend) + 180) % 360 - 180;
    var ybeg = parseFloat(req.params.ybeg);
    var yend = parseFloat(req.params.yend);

    var query = {y: {$gte: ybeg, $lte: yend}};

    if (xbeg <= xend)
        query.x = {$gte: xbeg, $lte: xend};
    else
        query.$or = [{x: {$gte: xbeg}}, {x: {$lte: xend}}];
    
    attractions.find(query).then((docs) => {
        res.send(docs);
    });
});

app.get('/attraction/*-:id', function(req, res) {
    res.send(index({title: req.params.id}))
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on http://localhost:' + port)
})

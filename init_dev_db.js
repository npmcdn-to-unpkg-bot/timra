
var monk = require('monk');
var db = monk('localhost:27017/timra');

var attractions;

db
    .then(() => {
        attractions = db.get('attractions');    
        return attractions.remove();
    })
    .then(() => {
        return Promise.all([
            attractions.index('x'),
            attractions.index('y'),
        ]);
    })
    .then(() => {
        return attractions
            .insert([
                {
                    head: "Nordanviksstenen",
                    desc: "A glacial erratic which used to be an infamous obstacle for sea men in the viking era.",
                    x: 60.260599,
                    y: 18.371433,
                },
                {
                    head: "Penis Shaped Water Tower",
                    desc: "Old water tower in Östhammar with an interesting shape.",
                    x: 60.257914,
                    y: 18.368581,
                },
                {
                    head: "Vasa Museum",
                    desc: "Warship that sunk in 1628 and was salvaged in 1961, now it has its own museum.",
                    x: 59.327989, 
                    y: 18.091708,
                },
            ])
    })
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("fatal error: ", err);
        process.exit(1);
    });


function get_json(url)
{
    var promise = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 4000;
        xhr.open("GET", url , true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            
            if (xhr.status === 200) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                }
                catch (e) {
                    reject("failed to parse json from '" + url + "': " + e);
                }
            }
            else {
                reject("get_json to '" + url + "' failed, readyState " + xhr.readyState + ", status " + xhr.status);
            }
        };
    });
    return promise;
}

var style = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
            color: [255, 0, 0, 1]
        })
    })
});

var features = new ol.Collection();

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),  // TODO OSM does not have satelite.
        }),
        new ol.layer.Vector({
            style: style,
            source: new ol.source.Vector({
                features: features,
            }),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([17.00, 54.00]),
        zoom: 4
    }),
});

get_json("attractions/1-2-3-4")
    .then(function(data) {
        features.clear();
        for (var i in data) {
            console.info(data[i]);
            features.push(new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([data[i].y, data[i].x])),
            }));
        }
    })
    .catch(function(err) {
        console.error("xhr failed:", err);
    });


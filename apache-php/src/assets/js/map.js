map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([2.35, 48.85]),
        zoom: 13,
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }),
        }),

    ],
     
});

//objet numéro 1 :
P1 = [2.35, 48.85]
let item1 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(P1, 'EPSG:3857'))),
        ],
    }),
});
//style : 
const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/coffre.png",
    width: 50,
    height:50,
  })
});
	
item1.setStyle(iconStyle);
//ajout à la carte
map.addLayer(item1);






//cacher les items en fonction du zoom :
map.on('moveend', function (evt) {
    let m = evt.map;
      let v = m.getView();
        if (v.getZoom() > 10) {
            toggleitems(true);
        } else {
                toggleitems(false);
        }
    });

function toggleitems(show) {
    /*
        let lyrs = map.getAllLayers(); 
        for (let l in lyrs) {
            source = lyrs[l].getSource();  
             
            let features = source.getFeaturesCollection();          
            features.forEach( function (feat) {                 
                let s = feat.getStyle()[0];  //works
                if (show) {
                    if (s.getScale()[0] == 0) {       
                        s.setScale([1, 1]);
                    }
                } else {
                    
                    if (s.getScale()[0] == 1) {       
                        s.setScale([0, 0]);
                    }
                }                           
            });         
            
        }           
        map.render();   //appears to do nothing
        //map_obj.renderSync();  //exceeds max call stack size
        */
    }

//récupération des données depuis le php
console.log(tab_pts[0]['geom'])
paris = tab_pts[0]['geom']

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
    //controle du niveau de zoom à partir duquel l'item est visible
    minZoom: 15,
    source: new ol.source.Vector({
        features: [
            new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(P1, 'EPSG:3857'))),
        ],          
    }),
});
//style : 
const coffre = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/coffre.png",
    width: 50,
    height:50,
  })
});
	
item1.setStyle(coffre);

//ajout à la carte
map.addLayer(item1);



Vue.createApp({
    data(){
        return{
            inventaire:[],
        };
    },
    mounted(){
        map.on('click', (evt) => {
            /*
            this.inventaire.push(item1.getSource().url);
            console.log(item1.getSource());
           */
        });
    },
}).mount('#entete')




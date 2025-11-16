//récupération des données depuis le php
console.log('testeeeeee');
console.log(tab_obj[0]['emplacement']);
paris = tab_obj[0]['emplacement'];

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

//------------------------------------------------------------------------0------------------------------------------------------------------------------//

//objet numéro 0 :
P0 = JSON.parse(tab_obj[0].emplacement).coordinates; 
let F0 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P0, 'EPSG:3857')),
    nom: tab_obj[0]['nom'],
    classe: tab_obj[0]['classe'], 
    obj_prec: tab_obj[0]['objet_precedent']
});
let item0 = new ol.layer.Vector({
    //controle du niveau de zoom à partir duquel l'item est visible

    source: new ol.source.Vector({
        features: [F0],          
    }),
});
//style : 
const cle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/cle.jpg",
    width: 50,
    height:50,
  })
});
	
item0.setStyle(cle);

//------------------------------------------------------------------------1------------------------------------------------------------------------------//


//objet numéro 1 :
P1 = JSON.parse(tab_obj[1].emplacement).coordinates;
let F1 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P1, 'EPSG:3857')),
    nom: tab_obj[1]['nom'],
    classe: tab_obj[1]['classe'], 
    obj_prec: tab_obj[1]['objet_precedent']
});
let item1 = new ol.layer.Vector({
    //controle du niveau de zoom à partir duquel l'item est visible
 
    source: new ol.source.Vector({
        features: [F1],          
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

//-----------------------------------------------------------------------2-------------------------------------------------------------------------------//


//objet numéro 2 :
P2 = JSON.parse(tab_obj[2].emplacement).coordinates;
let F2 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P2, 'EPSG:3857')),
    nom: tab_obj[2]['nom'],
    classe: tab_obj[2]['classe'], 
    obj_prec: tab_obj[2]['objet_precedent']
});
let item2 = new ol.layer.Vector({
    //controle du niveau de zoom à partir duquel l'item est visible
 
    source: new ol.source.Vector({
        features: [F2],          
    }),
});
//style : 
//rien pour l'instant

//-----------------------------------------------------------------------3-------------------------------------------------------------------------------//


//objet numéro 3 :
P3 = JSON.parse(tab_obj[3].emplacement).coordinates;
let F3 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P3, 'EPSG:3857')),
    nom: tab_obj[3]['nom'],
    classe: tab_obj[3]['classe'], 
    obj_prec: tab_obj[3]['objet_precedent']
});
let item3 = new ol.layer.Vector({
    //controle du niveau de zoom à partir duquel l'item est visible
 
    source: new ol.source.Vector({
        features: [F3],          
    }),
});
//style : 
//rien pour l'instant

//-----------------------------------------------------------------AJOUT---CARTE------------------------------------------------------------------------------//

//ajout à la carte

map.addLayer(item0);
map.addLayer(item1);
map.addLayer(item2);
map.addLayer(item3);

/*
function onMapClick(e) {
    const coords3857 = e.coordinate
    const coords4326 = ol.proj.toLonLat(coords3857); // Conversion en lon/lat
    //alert("You clicked the map at " + e.latlng);
    console.log(coords4326);
};

map.on('click', onMapClick);
*/



Vue.createApp({
    data(){
        return{
            inventaire:[],
            indice:['va à la capitale']
        };
    },
    mounted(){
        const app = this;
        //ajout du clique à la carte
        map.on('singleclick', function (evt) {

        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

        console.log("Feature cliquée :", feature);

        // Récupérer les infos
        let obj_prec = feature.get('obj_prec');
        let nom = feature.get('nom');

        alert("Vous avez cliqué sur : " + nom);
        if(nom=='cle'){
            item0.getSource().removeFeature(feature);
            app.inventaire.push('cle');
            app.indice[0]=("Le prochain objet se trouve dans une ville celèbre commençant par un L");
        }; 
        if(nom=='coffre'){
            if (app.inventaire[0]=='cle'){
               item1.getSource().removeFeature(feature);
               app.inventaire.push('code 1 : 3498'); 
               app.indice[0]=('Va à la ville du Z-event');
            }
            else{
                app.indice[0]=("Il faut trouver la clé dans la capitale");
            }
        };  
        return true; // stop si nécessaire
    });
});
    },
}).mount('#entete')




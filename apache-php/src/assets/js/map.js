// --- récupération des données depuis le PHP ---
console.log('testeeeeee');
console.log(tab_obj[0]['emplacement']);
paris = tab_obj[0]['emplacement'];

// --- CARTE ---
map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([2.35, 48.85]),
        zoom: 13,
    }),
    layers: [
        // FOND OSM
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors',
            }),
        })
    ],
});

// --- HEATMAP GEOserver (WMS) déclarée globalement ---
var heatmapLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/HeatMap/wms',
        params: {
            'LAYERS': 'HeatMap:objets',
            'TILED': true,
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }),
    opacity: 0.6,
    visible: false   // 🔥 cachée au démarrage
});

// On l'ajoute après la carte
map.addLayer(heatmapLayer);

// ----------------------------------------------------------------------
// OBJETS 0, 1, 2, 3 (inchangés)
// ----------------------------------------------------------------------

P0 = JSON.parse(tab_obj[0].emplacement).coordinates; 
let F0 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P0, 'EPSG:3857')),
    nom: tab_obj[0]['nom'],
    classe: tab_obj[0]['classe'], 
    obj_prec: tab_obj[0]['objet_precedent']
});
let item0 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [F0],      
    }),
    minZoom:12,    
});
const cle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/cle.png",
    width: 50,
    height:50,
  })
});
item0.setStyle(cle);

// ----------------------------------------------------------------------
// OBJET 1
// ----------------------------------------------------------------------

P1 = JSON.parse(tab_obj[1].emplacement).coordinates;
let F1 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(P1, 'EPSG:3857')),
    nom: tab_obj[1]['nom'],
    classe: tab_obj[1]['classe'], 
    obj_prec: tab_obj[1]['objet_precedent']
});
let item1 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [F1],          
    }),
    minZoom:12,
});
const coffre = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/coffre2.png",
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
    minZoom:12,
});
//style : 
//style : 
const code = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0, 0],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: "../assets/img/cadena.avif",
    width: 50,
    height:50,
  })
});
	
item2.setStyle(code);

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
    minZoom:12,
});
//style : 
item3.setStyle(code);

//-----------------------------------------------------------------AJOUT---CARTE------------------------------------------------------------------------------//

//ajout à la carte

map.addLayer(item0);
map.addLayer(item1);
map.addLayer(item2);
map.addLayer(item3);

// ----------------------------------------------------------------------
// --- APP VUE.JS ---
// ----------------------------------------------------------------------

const app = Vue.createApp({
    data(){
        return{
            pseudo: "",
            inventaire:[],
            indice:['va à la capitale'],
            code1:'3498',
            code2:'3759',       
            heatmapVisible: false
        };
    },

    methods: {
        toggleHeatmap(){
            this.heatmapVisible = !this.heatmapVisible;
            heatmapLayer.setVisible(this.heatmapVisible);
        }
    },

    mounted(){
        this.startTime = new Date();

        const app = this;

        // Click sur la carte
        map.on('singleclick', function (evt) {
            map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

                let nom = feature.get('nom');
                alert("Vous avez cliqué sur : " + nom);

                if(nom=='cle'){
                    item0.getSource().removeFeature(feature);
                    app.inventaire.push('cle');
                    app.indice[0]=("Le prochain objet se trouve dans une ville célèbre commençant par un L");
                }

                if(nom=='coffre'){
                    if (app.inventaire[0]=='cle'){
                        item1.getSource().removeFeature(feature);
                        app.inventaire.push('code 1 : 3498'); 
                        app.indice[0]=('Va à la ville du Z-event');
                    }
                    else{
                        app.indice[0]=("Il faut trouver la clé dans la capitale");
                    }
                }

        //alert("Vous avez cliqué sur : " + nom);
        if(nom=='cle'){
            item0.getSource().removeFeature(feature);
            app.inventaire.push('cle');
            app.indice[0]=("Le prochain objet se trouve dans une ville celèbre commençant par un L");
        }; 
        if(nom=='coffre'){
            if (app.inventaire[0]=='cle'){
               item1.getSource().removeFeature(feature);
               app.inventaire.push('code 1 : '+app.code1 ); 
               app.indice[0]=('Va à la ville du Z-event');
            }
            else{
                app.indice[0]=("Il faut trouver la clé dans la capitale");
            }
        };  
        if(nom=='code'){

            let code = prompt("Entrez votre code à 4 chiffres :");
            if (code === app.code1) {
                item2.getSource().removeFeature(feature);
                app.indice[0] = ("La suite est à Mantes-la-Jolie !")
                app.inventaire.push('code 2 : '+app.code2); 
            } 
            else {
                alert("Code invalide.");
            }
        };  
        if(nom=='code2'){

            let code = prompt("Entrez votre code à 4 chiffres :");
            if (code === app.code2) {
                item3.getSource().removeFeature(feature);
                app.indice[0] = ("")
                alert("VICTOIRE !")

                const endTime = new Date();
                const timeDiffMin = Math.floor((endTime - app.startTime) / 60000);

                const objetsTrouves = app.inventaire.filter(i => i !== 'code 1' && i !== 'code 2').length;
                const codesTrouves = 2; // code1 et code2
                const score = (objetsTrouves * 10) + (codesTrouves * 20) - timeDiffMin;
                console.log("SCORE CALCULÉ :", score);

                // envoyer le score au serveur
                fetch('/save-score', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        pseudo: app.pseudo,  
                        score: score          
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        alert("Score enregistré !");
                    } else {
                        alert("Erreur lors de l'enregistrement du score.");
                    }
                });
   
            } else {
                alert("Code invalide.");
            }
        };  
        return true; // stop si nécessaire
    });
});
    },
}).mount('#entete');

document.getElementById("start-btn").addEventListener("click", function(){
    const p = document.getElementById("pseudo-input").value.trim();

    if(p === ""){
        alert("Tu dois entrer un pseudo pour jouer !");
        return;
    }

    app.pseudo = p;

    document.getElementById("pseudo-box").style.display = "none";

    document.getElementById("entete").style.display = "block";

    // début chrono
    app.startTime = new Date();
});


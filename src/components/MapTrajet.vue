<script setup>
    // import éléments de vue
    import { onMounted, ref } from 'vue'
    // Import Leaflet
    import * as Leaflet from 'leaflet'
    // css leaflet
    import 'leaflet/dist/leaflet.css'

    // Leaflet routing machine
    import 'leaflet-routing-machine'
    import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


    // Canevas pour la carte
    let tileLayer = Leaflet.tileLayer
    // Initialisation de la carte sous forme d'une ref
    let map = ref()
    
    // Points de localisation
    let depart = ref({
        latitude : 0,
        longitude : 0
    })

    let arrivee = ref({
        latitude : 0,
        longitude : 0
    })

    // Nb click sur la carte
    let nbClick = ref()
    nbClick.value = 0

    // Controle de calcul du parcours
    let routingControl = null

    // Markers
    let mDepart = null
    let mArrivee = null

    // Lorsque le composant est monté dans la vue
    onMounted( async ()=> {
        // Caractérisitques de la carte
        tileLayer = Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
      );

      // Création de la carte sur la div ayant l'id = 'map'
      map = Leaflet.map('map',
        {
            zoomControl: true, // Contrôle de Zoom
            layers: [tileLayer], // Canevas pour dessiner la carte
            maxZoom: 18,        // Zoom maxi autorisé
            minZoom: 6          // Zoom mini autorisé
        })
        // projetction de la carte avec centrage aux coordonnées indiquées, avec facteur d'agrandissement
        .setView([47.495328, 6.8044455], 17)

        // Gérer dynamiquement le click sur la carte pour obtenir la latitude et longitude
        map.on('click', (e) => {
console.log("click e",e)

            // Réinitialisation du contrôle de calcul de parcours
            if(routingControl !=null){map.removeControl(routingControl) }
            // nbClick impair => arrivee
            if(nbClick.value %2 !=0){
                arrivee.value.latitude = e.latlng.lat
                arrivee.value.longitude = e.latlng.lng

                // Suppression du marker s'il existe déjà
                if(mArrivee){ map.removeLayer(mArrivee)}
                // Marker d'arrivée
                mArrivee = Leaflet.marker(e.latlng).addTo(map)

            }else{// nbclick pair => depart
                depart.value.latitude = e.latlng.lat
                depart.value.longitude = e.latlng.lng

                // Suppression du marker s'il existe déjà
                if(mDepart){ map.removeLayer(mDepart)}
                // Marker de départ
                mDepart = Leaflet.marker(e.latlng).addTo(map)
            }
            nbClick.value++
        })

    }) // Fin onMounted

    const calculateRoute = () => {

        routingControl = Leaflet.Routing.control({
            waypoints : [
                Leaflet.latLng(depart.value.latitude, depart.value.longitude), // départ                
                Leaflet.latLng(arrivee.value.latitude, arrivee.value.longitude), // arrivée
            ],
            language: 'fr' // langue désirée
        })
        .addTo(map)
    console.log("routingControl", routingControl)        


    }



</script>


<template>
    <div class="container-fluid" style="color:black;">
        <h5>Calcul à partir de 2 points lat / lng</h5>
        <div class="input-group mb-3">
            <button class="btn btn-success form-control">Départ : </button> 
            <input type="number" step="0.1" v-model="depart.latitude" />
            <input type="number" step="0.1" v-model="depart.longitude" />

            <button class="btn btn-success form-control">Arrivée : </button> 
            <input type="number" step="0.1" v-model="arrivee.latitude" />
            <input type="number" step="0.1" v-model="arrivee.longitude" />

            <button class="btn btn-primary form-control" @click="calculateRoute">Calcul trajet(s)</button> 

        </div>
        <div class="container-fluid">
            <div id="map" @click="mapClick"> 
            </div>
        </div>
    </div>
</template>

<style scoped>
#map{
    width:100%;
    height: 70vh;
}
</style>
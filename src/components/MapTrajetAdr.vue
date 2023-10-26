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
        adr : null,
        latlng : []
    })

    let arrivee = ref({
        adr : null,
        latlng : []
    })

    // Liste adresses proposées
    let lstAdr = ref()

    // 1 : Depart, 2 arrivée
    let type = ref()

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

    }) // Fin onMounted


    // Vérification entrée pour adresses saisies
    const verif = async (point, t) => {
        type.value = t
        try{
            const response = await fetch("https://api-adresse.data.gouv.fr/search/?q="+point.adr)
            lstAdr.value = await response.json()
        }catch(error){
            console.log('Erreur lors de la récupération des adresses : ',error)
        }
    }
    // Selection d'une adresse dans la liste des adresses proposées
    const selectAdr = (adr) => {

        if(type.value == 1){ // départ
            depart.value.adr = adr.properties.label
            depart.value.latlng = [
                adr.geometry.coordinates[1],
                adr.geometry.coordinates[0]
            ]
            // Position du marker
            mDepart = Leaflet.marker(depart.value.latlng).addTo(map)
            // RAZ lstAdr
            lstAdr.value = null
            // Position carte sur la marker
            map.panTo(depart.value.latlng, 17)
        }else{ // Arrivée
            arrivee.value.adr = adr.properties.label
            arrivee.value.latlng = [
                adr.geometry.coordinates[1],
                adr.geometry.coordinates[0]
            ]
            // Position du marker
            mArrivee = Leaflet.marker(arrivee.value.latlng).addTo(map)
            // RAZ lstAdr
            lstAdr.value = null
            // ajout au groupe de markers depart et arrivee
            let markerGroup = new Leaflet.featureGroup([mDepart, mArrivee])
            // Utilisation de la fonction setBounds pour ajuster la vue de la carte afin d'englober tous les marqueurs
            map.fitBounds(markerGroup.getBounds())


        }
    }

    // Calcul des trajets
    const calculateRoute = () => {
        routingControl = Leaflet.Routing.control({
            waypoints : [
                Leaflet.latLng(depart.value.latlng[0], depart.value.latlng[1]), // départ                
                Leaflet.latLng(arrivee.value.latlng[0], arrivee.value.latlng[1]), // arrivée
            ],
            language: 'fr' // langue désirée
        })
        .addTo(map)
        console.log("routingControl", routingControl)        
    }


</script>


<template>
    <div class="container-fluid" style="color:black;">
        <h5>Calcul à partir de 2 adresses</h5>
        
        <table class="table"> 

            <thead> 
                <tr>
                    <th>Départ</th>
                    <th>Arrivée</th>
                    <th>Calcul</th>
                </tr>
            </thead>
            <tbody> 
                <tr> 
                    <td>
                        <div class="input-group">
                            <input class="form-control" type="text" v-model="depart.adr" />
                            <button class="btn btn-primary" @click="verif(depart, 1)"> 
                                <i class="fa fa-lg fa-eye"></i> 
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="input-group">
                            <input class="form-control" type="text" v-model="arrivee.adr" />
                            <button class="btn btn-primary" @click="verif(arrivee, 2)"> 
                                <i class="fa fa-lg fa-eye"></i> 
                            </button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-primary form-control" @click="calculateRoute">
                            Calcul trajet(s) 
                        </button>
                    </td>
                </tr>
                <tr> 
                    <td colspan="3"> 
                        <div class="list-group" mt-2>
                            <ul class="list-group" v-if="lstAdr">
                                <li 
                                    v-for="(rue, index) in lstAdr.features"
                                :key="index"
                                class="list-group-item"
                                @click="selectAdr(rue)"
                                >
                                    {{ rue.properties.label }}
                                </li>
                            </ul> 

                        </div>
                    </td>
                </tr>


            </tbody>

        </table>

        <div class="container-fluid">
            <div id="map"> 
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
<script setup>
    // Import des éléments utiles de vue
    import { ref, onMounted } from 'vue'

    // Import de Vue3-easy-data-table et ses styles
    import Vue3EasyDataTable from 'vue3-easy-data-table'
    import 'vue3-easy-data-table/dist/style.css'

    // Import des fonctions de serviceAjax.js  
    import { getVillageois, getVideos }from '@/composables/serviceAjax.js'

    // Import des fonctions utilisées de utilsApp.js  
    import { linearise }from '@/composables/utilsApp.js'

    // Liste des villageois
    let listeVillageois     = ref()
    // Initialisation en tableau
    listeVillageois.value = []

    // header / entêtes
    // Fixer la largeur des colonnes, interêt ne redimensionne pas les largeurs lors des filtres
    // Mais les largeurs sont approximatives en regard des outils/frameworks css utilisés
    let headerVillageois     = ref([
            { "text": "nom",              "value": "nom",               sortable:true },
            { "text": "adresse",          "value": "adresse",           sortable:true },
            { "text": "latitude",         "value": "latitude",          sortable:true },
            { "text": "longitude",        "value": "longitude",         sortable:true},
            { "text": "nom Lieu",         "value": "leLieuHabitat.nom", sortable:true},
            { "text": "nom Specialite",   "value": "laSpecialite.nom",  sortable:true }
    ])

    // Filtrage pour les villageois
    // Critère pour le nom
    const nomCriteria = ref();
    nomCriteria.value = ""

    // Critère pour l'adresse
    const adresseCriteria = ref();
    adresseCriteria.value = ""

    // Critère pour le lieu habitat
    const lieuCriteria = ref();
    lieuCriteria.value = ""

    // Tableau contenant les filtrages
    const filterOptions = ref([])

    // Filtre sur nom
    filterOptions.value.push({
        field: 'nom',
        criteria: nomCriteria.value,
        // value : valeur saisie, criteria : variable du filtrage pour comparaison
        comparison: (value, criteria) => (
            // value doit être renseignée
            value != null           
            // le criteria doit être renseigné
            && criteria != null     
            // on utilise plutôt includes que l'égalité pour les valeurs multiples 
            && value.toLowerCase().includes(nomCriteria.value) 
        )
    })

    // Filtre sur adresse
    filterOptions.value.push({
        field: 'adresse',
        criteria: adresseCriteria.value,
        comparison: (value, criteria) => (
            value != null 
            && criteria != null 
            && value.toLowerCase().includes(adresseCriteria.value)
        )
    })

    // Filtre sur le lieu habitat
    filterOptions.value.push({
        field: 'leLieuHabitat.nom',
        criteria: lieuCriteria.value,
        comparison: (value, criteria) => (
            value != null 
            && criteria != null 
            && value.toLowerCase().includes(lieuCriteria.value)
        )
    })

    //Filtrage latitude et longitude
    // Selection de l'option
    let latLngSelected = ref()
    // Sauvegarde de toutes les valeurs pour les filtres
    let listeVillageoisSvg     = ref([])


    // Liste des vidéos
    let listeVideos     = ref()
    // Initialisation en tableau
    listeVideos.value = []
/*
    // Affichage des propriétés de vue3-easy-data-table
    console.log('options', Vue3EasyDataTable.props)
    // Customisation
    // Libellé rows per page
    Vue3EasyDataTable.props.rowsPerPageMessage.default = "Lignes par page"
    // message entre pagination et page maxi 
    Vue3EasyDataTable.props.rowsOfPageSeparatorMessage.default = " à "
    // Nb de pages en pagination par défaut
    Vue3EasyDataTable.props.rowsItems.default = [25, 50, 100, 200]
    // Customisation pages par défaut
    Vue3EasyDataTable.props.rowsPerPage.default = 10
*/
    // ou par propriétés
    let rowsItems = ref([25, 50, 100, 200])
    let rowsPerPage = ref(10)

    // entêtes
    let headerVideos     = ref([
            { "text": "Titre",            "value": "titre",     sortable:true, width:20},
            { "text": "Année sortie",     "value": "annee",     sortable:true},
            { "text": "Pays",             "value": "pays",                       },
            { "text": "Catégories",       "value": "categories",                 },
//            { "text": "Acteurs",          "value": "acteurs",                    },
//            { "text": "Réalisateurs",     "value": "realisateurs",               }
        ])

    // visibilité des tables
    let villageoisVisible = ref(false)
    let videosVisible     = ref(false)

    // Table des vidéos
    // Filtrage pour les vidéos
    // Critère pour le titre
    const titreCriteria = ref();
    titreCriteria.value = ""

    // Critère pour l'année de sorte
    const anneeCriteria = ref();
    anneeCriteria.value = ""

    // Critère pour le pays de production
    const paysCriteria = ref();
    paysCriteria.value = ""

    // Critère pour les categories
    const categoriesCriteria = ref();
    categoriesCriteria.value = ""


    // Tableau contenant les filtrages
    const filterOptionsVideo = ref([])

    // Filtre sur titre
    filterOptionsVideo.value.push({
        field: 'titre',
        criteria: titreCriteria.value,
        comparison: (value, criteria) => (
            value != null           
            && criteria != null     
            && value.toLowerCase().includes(titreCriteria.value) 
        )
    })
    // Filtre sur l'année
    filterOptionsVideo.value.push({
        field: 'annee',
        criteria: anneeCriteria.value,
        comparison: (value, criteria) => (
            value != null           
            && criteria != null     
            && value.toLowerCase().includes(anneeCriteria.value) 
        )
    })
    // Filtre sur le pays
    filterOptionsVideo.value.push({
        field: 'pays',
        criteria: paysCriteria.value,
        comparison: (value, criteria) => (
            value != null           
            && criteria != null     
            && value.toLowerCase().includes(paysCriteria.value) 
        )
    })

    // Filtre sur les catégories
    filterOptionsVideo.value.push({
        field: 'categories',
        criteria: categoriesCriteria.value,
        comparison: (value, criteria) => (
            value != null           
            && criteria != null     
            && value.toLowerCase().includes(categoriesCriteria.value) 
        )
    })

    // Au montage de la vue
    onMounted( async() => {
        // Appel de la liste des villageois
        await getVillageois()
        .then( response => {        
        listeVillageois.value = response  
        // Mise à jour sauvegarde de toutes les valeurs   
        listeVillageoisSvg.value = response     
        })

        // Appel de la liste des vidéos
        await getVideos()
        .then( response => {
            listeVideos.value = response 
            // Mise en forme des informations composées
            listeVideos.value.forEach((video)=>{
                video.pays =          linearise(video, "lesPays",         "nom")
                video.categories =    linearise(video, "lesCategories",   "lib")
                video.acteurs =       linearise(video, "lesActeurs",      "prenom|nom")
                video.realisateurs =  linearise(video, "lesRealisateurs", "prenom|nom")
            })    
        })
    }) // Fin onMounted

    // Filtre personnalisé sur latitude/longitude
    // 0 - Non Renseigné
    // 1 - Renseigné
    // 2 - Tout
    const filterLatLng = (type, value) => {
    if(type == 'lat'){ // latitude
        if(value == 0){ // Non renseigné soit 0
            listeVillageois.value = listeVillageoisSvg.value.filter( (villageois)=>{            
            return parseFloat(villageois.latitude) == 0 })          
        }
        if(value == 1){ // Renseigné soit différent de 0
        listeVillageois.value = listeVillageoisSvg.value.filter( (villageois)=>{
            return parseFloat(villageois.latitude) !== 0 })          
        }
    }else{
        if(value == 0){ // Non renseigné soit 0
            listeVillageois.value = listeVillageoisSvg.value.filter( (villageois)=>{
                return parseFloat(villageois.longitude) == 0 })          
            }
            if(value == 1){ // Renseigné soit différent de 0
            listeVillageois.value = listeVillageoisSvg.value.filter( (villageois)=>{
                return parseFloat(villageois.longitude) != 0 })          
            }
        }
        if(value == 2){ // Tous
            listeVillageois.value = listeVillageoisSvg.value.slice()                    
        }
    }


</script>

<template>
    <div class="container-fluid"> 
        <h3>Tables personnalisées</h3>
        <h4>
        <span>Tableau de la liste des villageois - {{ listeVillageois.length }}</span>      
        <span class="float-right">
            <i :class="{'fa fa-eye': villageoisVisible, 'fa fa-eye-slash': !villageoisVisible}" 
                @click="villageoisVisible = !villageoisVisible"></i>          
            </span>

        </h4>
        <Vue3EasyDataTable
        v-if="villageoisVisible"
        :headers="headerVillageois"
        :items = "listeVillageois"
        :filter-options="filterOptions"
        border-cell 
        table-class-name="customize-table"

        rowsPerPageMessage = "Lignes par page"
        rowsOfPageSeparatorMessage = "à"
        :rowsItems = "rowsItems"
        :rowsPerPage = "rowsPerPage"

        >

            <template #header-nom="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="nomCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-adresse="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="adresseCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-leLieuHabitat.nom="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="lieuCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-latitude="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop>
                        <select class="form-control" v-model="latLngSelected" 
                            @change="filterLatLng('lat', latLngSelected)">
                            <option value="0">Non Renseigné</option>
                            <option value="1">Renseigné</option>
                            <option value="2">Tout</option>
                        </select>
                    </div>          
                </div>
            </template>

            <template #header-longitude="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop>
                        <select class="form-control" v-model="latLngSelected" 
                            @change="filterLatLng('lng', latLngSelected)">
                            <option value="0">Non Renseigné</option>
                            <option value="1">Renseigné</option>
                            <option value="2">Tout</option>
                        </select>
                    </div>          
                </div>
            </template>

            <!-- Customisation des lignes -->
            <template #item-nom="{ nom, image }">
              <div class="text-center">
                <img :src="image" :alt="nom" class="img-fluid" style="max-width:60px;"/>
                <br/>
                <b>{{ nom }}</b>
              </div>
            </template>

        </Vue3EasyDataTable>
        <hr/>

        <h4>
        <span>Tableau de la liste des vidéos - {{ listeVideos.length }}</span>      
        <span class="float-right">
            <i 
                :class="{'fa fa-eye': videosVisible, 'fa fa-eye-slash': !videosVisible}" 
                @click="videosVisible = !videosVisible"></i>          
            </span>

        </h4>

        <Vue3EasyDataTable
            v-if="videosVisible"
            :headers="headerVideos"
            :items = "listeVideos"
            :filter-options="filterOptionsVideo"
            class="customize-table"
            border-cell >

            <template #header-titre="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="titreCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-annee="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="anneeCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-pays="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="paysCriteria" @click.stop>
                    </div>
                </div>
            </template>

            <template #header-categories="header">
                <div class="filter-column text-center">
                    {{ header.text }}
                    <div class="input-group input-group-sm mb-3" @click.stop >
                        <input v-model="categoriesCriteria" @click.stop>
                    </div>
                </div>
            </template>


            <!-- Customisation des lignes -->
            <template #item-titre="{ titre, image }">
              <div class="text-center">
                <img :src="image" :alt="titre" class="img-fluid" style="max-width:100px;"/>
                <br/>
                <span style="word-wrap:break-word">
                <b>{{ titre }}</b>
                </span>
              </div>
            </template>

            <template #expand="item">
                <div style="padding:15px">
                    <table class="table">
                        <thead>
                        <tr class="table-secondary">
                            <th>Acteurs</th>
                            <th>Réalisateurs</th>
                            <th>Synopsis</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button v-for="acteur in item.lesActeurs" :key="acteur.id" 
                                    class="btn btn-primary btn-sm mx-1 my-1" >{{ acteur.prenom }} {{ acteur.nom }}</button>
                                </td>
                                <td >
                                    <button v-for="real in item.lesRealisateurs" :key="real.id" 
                                    class="btn btn-dark btn-sm mx-1 my-1" >{{ real.prenom }} {{ real.nom }}</button>
                                </td>
                                <td>
                                    <p>{{  item.synopsis }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </Vue3EasyDataTable>
        <hr/>


    </div>
</template>

<style scoped>

.customize-table {
--easy-table-header-height: 50px;
--easy-table-header-background-color: #d8d0d0;
--easy-table-header-font-size:18px;
--easy-table-body-row-font-size:20px;
}
</style>
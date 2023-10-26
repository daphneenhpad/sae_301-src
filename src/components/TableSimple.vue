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
  let headerVillageois     = ref([
        { "text": "nom",              "value": "nom" },
        { "text": "adresse",          "value": "adresse" },
        { "text": "latitude",         "value": "latitude" },
        { "text": "longitude",        "value": "longitude" },
        { "text": "nom Lieu",         "value": "leLieuHabitat.nom" },
        { "text": "nom Specialite",   "value": "laSpecialite.nom" }
      ])

  // Liste des vidéos
  let listeVideos     = ref()
  // Initialisation en tableau
  listeVideos.value = []

  // entêtes
  let headerVideos     = ref([
        { "text": "Titre",            "value": "titre" },
        { "text": "Année sortie",     "value": "annee" },
        { "text": "Pays",             "value": "pays" },
        { "text": "Catégories",       "value": "categories" },
        { "text": "Acteurs",          "value": "acteurs" },
        { "text": "Réalisateurs",     "value": "realisateurs" }
      ])

  // visibilité des tables
  let villageoisVisible = ref(false)
  let videosVisible     = ref(false)

  // Au montage de la vue
  onMounted( async() => {
    // Appel de la liste des villageois
    await getVillageois()
    .then( response => {
      listeVillageois.value = response     
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

</script>

<template>
  <div class="container-fluid"> 
    <h3>Tables simples</h3>
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
      show-index
      border-cell
    />
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
      show-index
      border-cell
    />
    <hr/>


  </div>
</template>

<style scoped>
template{
  font-family:calibri!important;
}
</style>
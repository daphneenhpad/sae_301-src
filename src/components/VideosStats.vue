<script setup>
  // Import des éléments utiles e vue
  import { ref, onMounted } from 'vue'

  // Import fonction Ajax du serviceAjax.js
  import { getVideos } from '@/composables/serviceAjax.js'

  // Import fonction comptage de  utilApp.js
  import { countDataMulti } from '@/composables/utilsApp.js'

  // Liste des videos
  let listeVideos = ref()
  // Données de calcul des vidéos
  let lstDataVideos = ref({
    categories : [],
    pays : []
  })

  // Au montage de la vue
  onMounted( async()=>{
    // Appel service Ajax liste des videos
    await getVideos()
    .then( response =>{
      listeVideos.value = response
      // Linearisation de la liste des videos
      listeVideos.value.forEach( (video)=>{
        // Mise en 1° niveau des informations utiles
        video.categories = ""
        video.lesCategories.forEach( (cat)=>{
          video.categories += cat.lib+" "
        })
        video.categories = video.categories.trim()
        video.pays = ""
          video.lesPays.forEach( (pays)=>{
          video.pays += pays.nom+" "
        })
        video.pays = video.pays.trim()
        // Suppression des données inutiles
        delete video.lesCategories
        delete video.lesPays
        delete video.lesActeurs
        delete video.lesRealisateurs
      })
      // Calculs stats
      lstDataVideos.value.pays =        countDataMulti(listeVideos.value, 'pays')
      lstDataVideos.value.categories =  countDataMulti(listeVideos.value, 'categories')
    })
  }) // Fin OnMounted
</script>

<template>
  <div class="container-fluid">
    <h1>Services Vidéos</h1>
    <h4>Liste des vidéos</h4>
    <table class="table table-stripped">
      <thead class="thead-dark"> 
        <tr>
          <th>Comptage catégories</th>
          <th>Comptage pays</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="video in lstDataVideos.categories" :key="video">
                  <td>{{video.label}}</td> 
                  <td>{{video.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="video in lstDataVideos.pays" :key="video">
                  <td>{{video.label}}</td> 
                  <td>{{video.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table> 
    <pre>
    {{ lstDataVideos }}
    </pre>
  </div>
</template>

<style scoped>

</style>
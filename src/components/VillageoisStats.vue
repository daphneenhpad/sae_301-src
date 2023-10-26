<script setup> 
  // Import des éléments utiles e vue
  import { ref, onMounted } from 'vue'

  // Import fonction Ajax du serviceAjax.js
  import { getVillageois } from '@/composables/serviceAjax.js'

  // Import fonction comptage de  utilApp.js
  import { countData } from '@/composables/utilsApp.js'

  // Liste des villageois
  let listeVillageois = ref()
  // Données de calcul des villageois
  let lstDataVillageois = ref({
    nomSpecialite : [],
    nomLieu : []
  })

  // Au montage de la vue
  onMounted( async()=>{
    // Appel service Ajax liste des villageois
    await getVillageois()
    .then( response =>{
      listeVillageois.value = response

      // Linearisation de la liste des villageois
      listeVillageois.value.forEach( (villageois)=>{
        // Mise en 1° niveau des informations utiles
        villageois.idLieu = villageois.leLieuHabitat.id
        villageois.nomLieu = villageois.leLieuHabitat.nom
        villageois.idSpecialite = villageois.laSpecialite.id
        villageois.nomSpecialite = villageois.laSpecialite.nom
        // Suppression des données inutiles
        delete villageois.leLieuHabitat
        delete villageois.laSpecialite
        delete villageois.lesBatailles
        delete villageois.lesCasquesPris
        delete villageois.lesPotionsBues
        delete villageois.lesPotionsDroit

      })

      lstDataVillageois.value.nomSpecialite = countData(listeVillageois.value, 'nomSpecialite')
      lstDataVillageois.value.nomLieu =       countData(listeVillageois.value, 'nomLieu')


    })

  })//Fin de onMounted

</script>

<template>
  <div class="container-fluid">
    <h1>Services villageois</h1>
    <hr/>
    <h4>Liste des villageois 01</h4>
    <table class="table table-stripped">
      <thead class="thead-dark"> 
        <tr>
          <th>Spécialité</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sp in lstDataVillageois.nomSpecialite" :key="sp">
          <td>{{sp.label}}</td> 
          <td>{{sp.total}}</td> 
        </tr>
      </tbody>
    </table>

    <h4>Liste des villageois 02</h4>
    <table class="table table-stripped">
      <thead class="thead-dark"> 
        <tr>
          <th>Comptage nomSpecialite</th>
          <th>Comptage nomLieu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="sp in lstDataVillageois.nomSpecialite" :key="sp">
                  <td>{{sp.label}}</td> 
                  <td>{{sp.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="sp in lstDataVillageois.nomLieu" :key="sp">
                  <td>{{sp.label}}</td> 
                  <td>{{sp.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <pre>
      {{ lstDataVillageois }}
    </pre>
  </div>
</template>

<style scoped>

</style>
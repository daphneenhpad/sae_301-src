<script setup>
  // Import des éléments utiles e vue
  import { ref, onMounted } from 'vue'

  // Import fonction Ajax du serviceAjax.js
  import { getDepartements, getRegions, getEpcis, getCommunesDepartement } from '@/composables/serviceAjax.js'
  // Import fonction de calcul
  import { sumWhereFor } from '../composables/utilsApp';

  // Structure  ref pour la récupération des résultats Ajax
  let listeRegions =        ref()
  let listeDepartements =   ref()
  let listeEpcis =          ref()
  let listeCommunes =       ref()

  // Strutures choix dans listes deroulantes
  let regionSelected = ref()
  let departementSelected = ref()

  // Variables pour les sommations
  let sumPopByDep =   ref() // Calcul pour departement
  let sumPopByEpci =  ref() // Calcul pour Epcis

// Au montage de la vue
onMounted( async()=>{
  // Appel service Ajax liste des régions
  await getRegions()
  .then( response =>{
    listeRegions.value = response
    // Tri des région par ordre alphabétique
    // La méthode localeCompare() renvoie un nombre indiquant 
    // si la chaîne de caractères courante se situe avant, après 
    // ou est la même que la chaîne passée en paramètre, 
    // selon l'ordre lexicographique de la locale.
    listeRegions.value.sort( (a,b) => a.nom.localeCompare(b.nom) )
  })
  // Appel service Ajax pour les Epcis
  await getEpcis()
  .then( response =>{
    listeEpcis.value = response
  })

})// Fin onMounted

// Alimentation de la liste deroulante des departements
const updateDepartements = async () => {
  // Reinitialisation de la liste des departements
  listeDepartements.value = []
  await getDepartements(regionSelected.value)
  .then( response =>{
    listeDepartements.value = response
  })
}

// Alimentation de la liste deroulante des communes
const updateCommunes = async () => {
  // Reinitialisation de la liste des communes
  listeCommunes.value = []
  await getCommunesDepartement(departementSelected.value)
  .then( response =>{
    listeCommunes.value = response
    // Calcul pour departement
    sumPopByDep.value = sumWhereFor(listeCommunes.value, 'codeDepartement', 'population')
    // Calcul pour Epci    
    sumPopByEpci.value = sumWhereFor(listeCommunes.value, 'codeEpci', 'population')

    // Recherche les libellés Epci
    sumPopByEpci.value.forEach( (sum_epci)=>{
      // Parcours de Epcis
      listeEpcis.value.forEach( (epci)=>{
        // Si code Epci trouvé
        if(sum_epci.label == epci.code){
          // Création d'un label sur listeEpci
          sum_epci.libelle = epci.nom
        }
      })
    })
  })
}

</script>

<template>
  <div class="container-fluid">
    <h1>Services Départements</h1>

    <h5>API data.gouv.fr - Comptage des populations</h5>

    <div class="input-group mb-3"> 
      <div class="input-grou-prepend"> 
        <span class="input-group-text">1°) Sélectionner une région</span>
      </div>
      <select v-model="regionSelected" class="from-control" @change="updateDepartements"> 
        <option disabled valeur="0">Choisir une région</option>
        <option v-for="region in listeRegions" :key="region.code" :value="region.code">{{ region.nom }}</option> 
      </select>

      <div class="input-group-prepend"> 
        <span class="input-group-text">2°) Sélectionner un département</span>
      </div>
      <select v-model="departementSelected" class="from-control" @change="updateCommunes"> 
        <option disabled valeur="0">Choisir un département</option>
        <option v-for="dep in listeDepartements" :key="dep.code" :value="dep.code">{{ dep.nom }}</option> 
      </select>
    </div>

    <table class="table table-stripped">
      <thead class="thead-dark"> 
        <tr>
          <th>Comptage par département</th>
          <th>Comptage par EPCI</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="element in sumPopByDep" :key="element">
                  <td>{{element.label}}</td> 
                  <td>{{element.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="table table-stripped">
              <tbody>
                <tr v-for="element in sumPopByEpci" :key="element">
                  <td>{{element.label}} - {{ element.libelle }}</td> 
                  <td>{{element.total}}</td> 
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table> 
    <pre>
      {{ sumPopByDep }}
    </pre>
    <pre>
      {{ sumPopByEpci }}
    </pre>
  </div>
</template>

<style scoped>
       
</style>


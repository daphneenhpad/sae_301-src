<script setup>
  // Import des éléments utilisé venant de VueJs
  import {onMounted, ref} from 'vue'

  // Utilisation d'une ref pour requête Ajax
  // null au départ (important)
  let products = ref(null);
  // Au montage du composant
  onMounted(async() => {
    // Appel Ajax via fetch
    const response = await fetch('https://jsongaulois.jmfino.fr/listeVillageois.php')
    // Récupération de la réponse en format json
    products.value = await response.json() 
    // Affichage dans la console
    console.log("ListProduct : ",products)
  })
</script>

<template>
    <div>
        <h6>Composant - ListProducts.vue : </h6>
        <div v-for="p in products" :key="p.id">
            {{p.id}} - {{p.nom}}
        </div>
        <hr/>   
    </div>
</template>

<style scoped>
/* pour les hr du composant */
hr{
  background-color:white
}
</style>

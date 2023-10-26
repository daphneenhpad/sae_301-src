<script setup>
  // Import des éléments utilisés venant de VueJs
import { ref, reactive, computed, onMounted } from 'vue'

// Import du composant ListProducts
import ListProducts from '@/components/ListProducts.vue'


  // Création d'une ref
  let title = ref();
  // valeur de la ref
  title.value = 'setupView';

  // Création d'un objet reactive
  const user = reactive({
    name : 'Fino',
    firstName : 'Jean-Marie'
  });

  // Création d'une props
  const proprietes = defineProps({ 
    name :        { type: String,    default:'Fino'         },
    firstName :   { type: String,    default:'Jean-Marie'   },
    date:         { type: Date,      default:new Date()     },
    number:       { type: Number,    default:7              },
    preferences:  { type: Object,    default:() => {}       }
  });

  // Fonction pour ajouter des 0 
  // avant les éléments d'une date < 10
  // identique à : const addZero = function(val){
  const addZero = (val) => {
    if(val < 10)    { return val = '0'+val }
    else            { return val }
  }

  // Zone calculée (fonction flèchée)
  // identique à : const now = computed( function(){ 
  const now = computed( () => { 
      let d = new Date();
      let day =     addZero(d.getDate());
      let month =   addZero(d.getMonth()+1);
      let year =    d.getFullYear();      
      let hour =    addZero(d.getHours());      
      let mn =      addZero(d.getMinutes());      
      let se =      addZero(d.getSeconds());
      
      let d1 = [hour, mn, se].join(':');
      let d2 = [day, month, year].join('/');
  
      return [d2, d1].join(' à '); 
    }
  )

  // Création d'une méthode
  // cp permet de passer des majuscules aux minuscules au départ : minuscules
  let cp = false;
  const capitalize = () => {
    // On prend la valeur inverse de cp 
    // si true : on est en majuscules, si false : on est en minuscules
    cp = !cp;
    if(cp){
      // Si cp true on passe en majuscules
      title.value = title.value.toUpperCase();
    }else{
      // Si cp false on passe en minuscules
      title.value = title.value.toLowerCase();
    }
  }

  // Utilisation d'une ref pour requête Ajax
  // null au départ (important)
  let liste = ref(null);

  // Au montage du composant
  onMounted(async() => {
    // Appel Ajax via fetch
    const response = await fetch('https://jsongaulois.jmfino.fr/listeVillageois.php')
    // Récupération de la réponse en format json
    liste.value = await response.json() 
    // Affichage dans la console
    console.log(liste)
  })

</script>

<template>
  <div class="container">
    <hr/>
    <h6>ref - title : {{title}}</h6>
    
    <h6>reactive - user :  {{user.firstName}} {{user.name}}</h6>
    <hr/>

    <h6>props - proprietes : </h6> 
      <ul>
        <li>{{proprietes.name}}</li>
        <li>{{proprietes.firstName}}</li>
        <li>{{proprietes.date}}</li>
        <li>{{proprietes.number}}</li>
        <li>{{proprietes.preferences}}</li>
      </ul>
    <hr/>


    <h6>Aujourd'hui : {{ now }}</h6>

    <input type="text" v-model="title" />
    <button type="button" @click="capitalize(title)">Capitalize (on/off)</button>
    <hr/>

    <h6>Liste villageois : </h6>
    <div v-for="v in liste" :key="v.id">
    {{v.id}} - {{v.nom}}
    </div>
    <hr/>

    <h6>Liste des villageois avec composants :</h6>
    <ListProducts />

  <hr/>
  </div>
</template>

<style scoped>
hr{
  background-color:white
}
</style>


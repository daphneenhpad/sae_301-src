<script setup>
  // Import éléments de vue
  import { ref } from 'vue'

  import MapOsm from '../components/MapOsm.vue'
  import MapTrajet from '../components/MapTrajet.vue'
  import GestionAdr from '../components/GestionAdr.vue'
  import MapTrajetAdr from '../components/MapTrajetAdr.vue'

  // Onglet selectionné
  let selection = ref()
  selection.value = 1
  // Fonction de sélection de l'onglet
  const select = (val) => {
    selection.value = val
  }

</script>

<template>
  <div class="container-fluid2">

    <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
        <a class="navbar-brand" to="/">POINT RELAIS</a>
        <button class="navbar-toggler" 
          type="button" data-toggle="collapse" 
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarText">
    
            <ul class="navbar-nav">              
                <li class="nav-item">
                  <a class="nav-link active" href="#" @click="select(1)">carte</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#" @click="select(2)">calcul trajet via lat/lng</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#" @click="select(3)">gestion adresse</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#" @click="select(4)">calcul trajet via adresse</a>
                </li>
            </ul >
        </div>

    </nav>

    <div class="card-map" v-if="selection == 1">
      <div class="card-body">
        <MapOsm /> 
      </div> 
    </div>

    <div class="card-map" v-if="selection == 2">
      <div class="card-body">
        <MapTrajet /> 
      </div> 
    </div>

    <div class="card-map" v-if="selection == 3">
      <div class="card-body">
        <GestionAdr /> 
      </div> 
    </div>

    <div class="card-map" v-if="selection == 4">
      <div class="card-body">
        <MapTrajetAdr /> 
      </div> 
    </div>

    <!-- footer -->

<footer class="footer">
    <div class="footer-top">
        <img src="/img/envelope.png" alt="Photo 1">
        
        <hr class="separator">
        <img src="/img/faq.png" alt="Photo 2">
        <hr class="separator">
        <img src="/img/return.png" alt="Photo 3">
    </div>
    <div class="footer-middle">
        <img src="/img/logo_tavue.png" alt="Logo" class="footer-logo">
    </div>
    <div class="footer-bottom">
        <div class="social-icons">
            <img src="/img/LinkedIn.png" alt="Icon 1">
            <img src="/img/instagram.png" alt="Icon 2">
            <img src="/img/facebook.png" alt="Icon 3">
            <img src="/img/youtube.png" alt="Icon 4">
        </div>
        <div class="footer-texts">
            <p>CGV</p>
            <p>Mentions légales</p>
            <p>Politique de confidentialité</p>
        </div>
        <div class="bottom-icons">
            <img src="/img/visa.png" alt="Bottom Icon 1">
            <img src="/img/PayPal.png" alt="Bottom Icon 2">
            <img src="/img/mastercard.png" alt="Bottom Icon 3">
        </div>
    </div>
</footer>

  </div>
</template>
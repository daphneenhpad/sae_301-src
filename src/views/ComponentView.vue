<script setup>
  // Import éléments de vue
  import { ref } from 'vue'

  import TableSimple            from '../components/TableSimple.vue'
  import TableTrisFiltres       from '../components/TableTrisFiltres.vue'
  import TablePerso             from '../components/TablePerso.vue'

  // Onglet selectionné
  let selection = ref()
  selection.value = 1
  // Fonction de sélection de l'onglet
  const select = (val) => {
    selection.value = val
  }

</script>

<template>
    <div class="container-fluid" style="color:black;"> 
  
      <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
          <a class="navbar-brand" to="/">Composables</a>
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
                    <a class="nav-link active" href="#" @click="select(1)">1.Tables simples</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="#" @click="select(2)">2.Tables tris filtres</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="#" @click="select(3)">3.Tables personnalisées</a>
                  </li>
  
              </ul >
          </div>
  
      </nav>

      <div class="card" v-if="selection == 1">
      <div class="card-body">
        <TableSimple /> 
      </div> 
    </div>

    <div class="card" v-if="selection == 2">
      <div class="card-body">
        <TableTrisFiltres /> 
      </div> 
    </div>

    <div class="card" v-if="selection == 3">
      <div class="card-body">
        <TablePerso /> 
      </div> 
    </div>

    </div>
</template>
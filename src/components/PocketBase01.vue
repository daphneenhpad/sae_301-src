<script setup>
  // Import éléments de vue
  import { ref,onMounted } from 'vue'

  // Import pocketbase
  import PocketBase from 'pocketbase'
  // Objet pocketBase
  const pb = new PocketBase("http://127.0.0.1:8090");

  // import pour formatage des dates
  import { format, parseISO } from 'date-fns'

  // Liste des videos
  let listeFilms = ref()

  // Création d'une nouvelle video / film
  // Attention même structure que clle de PocketBase
  let newVideo = ref({
    titre : "",
    anne: 0
  })

  // Au montage du composant
  onMounted(async() => {
    refresh()
  }) // Fin de onMounted

  const refresh = async()=>{
    listeFilms.value = await pb.collection('film').getFullList({ sort: 'titre' })
    // Formattage des dates en français
    listeFilms.value.forEach( (film)=>{
      film.created = format(parseISO(film.created), "dd/MM/yyyy HH:mm:ss")
      film.updated = format(parseISO(film.updated), "dd/MM/yyyy HH:mm:ss")
    })
  }

  const create = async()=>{
    let result = await pb.collection('film').create(newVideo.value)
    console.log("result create", result)
    refresh()
  }

  const update = async(item)=>{
    let result = await pb.collection('film').update(item.id, {
      titre : item.titre,
      annee : item.annee
    })
    console.log("result update", result)
    refresh()
  }

  const del = async(item)=>{
    let result = await pb.collection('film').delete(item.id)
    console.log("result delete", result)
    refresh()
  }




</script>

<template>
  <div class="container-fluid">
    <h4>Liste des vidéos</h4>
    <hr/>
  
    <form class="input-group mb-3" @submit.prevent="create">
      <button class="btn btn-dark">
        <b>Création d'une vidéo</b>
      </button>

      <div class="btn btn-success">
        <b>Titre : </b>
      </div>
      <input class="form-control" placeholder="Titre" required v-model="newVideo.titre">

      <div class="btn btn-success">
        <b>Année : </b>
      </div>
      <input type="number" class="form-control" placeholder="Année de sortie" required v-model="newVideo.annee">

      <button class="btn btn-dark" type="submit">
        <i class="fa fa-plus-circle"></i>
      </button>
    </form>

    <!-- Table des vidéos -->
    <table class="table table-light">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Année</th>
          <th>Créé le</th>
          <th>Modifié le</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listeFilms" :key="item.id">
          <td>
            <input type="text" v-model="item.titre" />
          </td>
          <td>
            <input type="number" v-model="item.annee" />
          </td>
          <td>{{ item.created }}</td>
          <td>{{ item.updated }}</td>
          <td>
            <div class="text-center">
              <a href="#">
                <i class="fa fa-edit fa-lg m-1" title="Mettre à jour" @click="update(item)"></i>
              </a>
              <a href="#">
                <i class="fa fa-trash fa-lg m-1" title="Supprimer" @click="del(item)"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>

    </table>

    <pre style="color:white;">
      {{ listeFilms }}
    </pre>

  </div>
</template>

<style scoped>
a{
  color:black;
}
</style>


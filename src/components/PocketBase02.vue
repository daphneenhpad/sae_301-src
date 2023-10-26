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
  let video = ref({
    titre :           "",
    annee:            0,
    affiche:          null,
    ba :              null,
    synopsis :        "",
    lesCategories :   [],
    lesActeurs :      [],
    lesRealisateurs : []    
  })

  // Titre de la modale (création / modification)
  let titreModale = ref(null)
  // Prévisualisation de l'image / l'affiche
  let affichePreview = ref(null)
  // Type de mouvement (création/modification)
  let typeMvt = ref(null)

  // Liste des catégories
  let listeCategories = ref(null)

  // Liste des personnes
  let listePersonnes = ref(null)
  // Résultat e la recherche des personnes
  let lstPersonResult = ref(null)
  // Masque de recherche
  let searchAct = ref('')

  // Liste des acteurs/tries de la vidéo
  // Liste de ceux/celles qui n'y sont pas
  let listeNonActeurs = ref(null)
  let listeActeurs = ref(null)



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
    // Liste des categories
    listeCategories.value = await pb.collection('categorie').getFullList({ sort: 'libelle' })
    // Liste des personnes
    listePersonnes.value = await pb.collection('personne').getFullList({ sort: 'nom' })
  }

  const openModale = async(type, item)=>{
    // Type de mouvement demandé
    typeMvt.value = type
    switch(type){
      case 'create':
        titreModale.value = "Création d'une vidéo"
        // Réinitialisation des éléments du formulaire création/modif
        video.value = {
          titre :           "",
          annee:            0,
          affiche:          null,
          ba :              null,
          synopsis :        "",
          lesCategories :   [],
          lesActeurs :      [],
          lesRealisateurs : []    
        }
        listeNonActeurs.value   = null
        listeActeurs.value      = null
        affichePreview.value    = null

      break
      case 'update':
        titreModale.value = "Modification d'une vidéo"
        // Charger les informations de la vidéo
        video.value = item
        // filtrer les acteurs/trices deja attachés ou non
        filterPersonne(video.value.lesActeurs, 'acteur')
        // charger l'affiche
        affichePreview.value = 
          "http://127.0.0.1:8090/api/files/"    // Répertoire des fichiers du serveur
          +video.value.collectionId             // Id de la collection
          +"/"
          +video.value.id                       // Id de la video
          +"/"
          +video.value.affiche                  // Nom du fichier de l'affiche de la video
      break
      case 'delete':
        // Charger les informations de la vidéo
        video.value = item
        // charger l'affiche
        affichePreview.value = 
          "http://127.0.0.1:8090/api/files/"    // Répertoire des fichiers du serveur
          +video.value.collectionId             // Id de la collection
          +"/"
          +video.value.id                       // Id de la video
          +"/"
          +video.value.affiche                  // Nom du fichier de l'affiche de la video
      break
    }
  }

  const previewImage = (event) => {
    let file = event.target.files[0]    // Récuperer le fichier sélectionné
    video.value.affiche = file          // Placer le fichier en tant qu'affiche de la video/film
    // Vérifier que le fichier est une image
    if( file && file.type.startsWith('image/') ){
      // Créer un objet FileReader pour lire le contenu de l'image
      const reader = new FileReader()
      reader.onload = () =>{
        // Une fois l'image chargée, mettre à jour la prévisualisation
        affichePreview.value = reader.result
      }
      // lire le contenu de l'image en tant qu'URL de données
      reader.readAsDataURL(file)
    } else{
      affichePreview.value = null
    }   
  }

  // Mise à jour video/film (creation / modification)
  const updateFilm = async(type)=> {
    if(type=="create"){
      let result = await pb.collection('film').create(video.value)
      //console.log("result create", result)
    }else{
      let result = await pb.collection('film').update(video.value.id, video.value)
      //console.log("result update", result)
    }
    refresh()
  }

  // Verification si une categorie appartient à la video
  const verifClass = (cat) => {
    // Verifier si la categorie est une categorie du film
    let trouve = false
    video.value.lesCategories.forEach( (catVideo)=>{
      if(cat.id == catVideo){
        trouve = true
      }
    })
    // Si toruve est vrai c'est une categorie de la video
    // sinon non
    if(trouve){ return "btn btn-success"}
    else{ return "btn btn-light"}

  }

  // Selection d'une categorie
  const selectCat = (cat) => {
    // Les categories de la video ne sont que des valeurs simples
    // Trouver l'index de l'élément, si index = -1 non trouve, sinon trouvé
    let index = video.value.lesCategories.indexOf(cat.id)
    // si elle existe, on la supprime
    if(index > -1){
      // Splice : permet de supprimer un élément
      // index : la position de l'élément
      // 1 : nombre de suppression
      video.value.lesCategories.splice(index, 1)
    }else{ // Sino on l'ajoute
      video.value.lesCategories.push(cat.id)
    }
  }

  // Renvoie une liste de personnes présentes ou non
  // en tant qu'acteur/trice ou realisateur/trice
  const filterPersonne = (lst, type) =>{
    if(type=="acteur"){
      listeNonActeurs.value = listePersonnes.value.filter( personne => !lst.includes(personne.id) )
      listeActeurs.value    = listePersonnes.value.filter( personne => lst.includes(personne.id) )
    }else{ // realisateurs
      // No way
    }
  }

  // Recherche d'une personne par le baiis d'un champs de saisie
  const searchPersonne = () => {
    // A partir d'un caractère
    if(searchAct.value.length > 1){
      lstPersonResult.value = listeNonActeurs.value.filter((personne)=>{
        // Recherche per nom et prénom
        let np = personne.nom+" "+personne.prenom
        return np.toLowerCase().includes(searchAct.value.toLowerCase())
      })
    }else{
      lstPersonResult.value = null
    }
  }

  // Ajouter un acteur/trice à une video
  const addPersonne = (personne) => {
    // Ajout à la video
    video.value.lesActeurs.push(personne.id)
    // Réinitialiser le champs de recherche
    searchAct.value = ""
    // Réinitialisation du resultat de recherche
    lstPersonResult.value = null
    // Mettre à jour des acteur/trice et les autres
    filterPersonne(video.value.lesActeurs, 'acteur')
  }

  // Supprimer un acteur/trice d'une une video
  const delPersonne = (personne) => {
    // On utilise un filrage pour enlever l'acteur/trice concerné
    video.value.lesActeurs = video.value.lesActeurs.filter( idPersonne => idPersonne != personne.id )
    // Mettre à jour des acteur/trice et les autres
    filterPersonne(video.value.lesActeurs, 'acteur')
  }

  const del = async(item)=>{
    let result = await pb.collection('film').delete(item.id)
    //console.log("result delete", result)
    refresh()
  }

</script>

<template>
  <div class="container-fluid">
    <h4>Liste des vidéos (2)</h4>
    <hr/>
  
    <div class="input-group mb-3">
      <button class="btn btn-dark">
        <b>Création d'une vidéo</b>
      </button>

      <button class="btn btn-dark" type="btn" @click="openModale('create', video)"
        data-toggle="modal" data-target="#modale">
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>

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
          <td>{{ item.titre }}</td>
          <td>{{ item.annee }}</td>
          <td>{{ item.created }}</td>
          <td>{{ item.updated }}</td>
          <td>
            <div class="text-center">
              <a href="#">
                <i class="fa fa-edit fa-lg m-1" title="Mettre à jour" 
                data-toggle="modal" data-target="#modale"
                @click="openModale('update', item)"></i>
              </a>
              <a href="#">
                <i class="fa fa-trash fa-lg m-1" title="Supprimer" 
                data-toggle="modal" data-target="#modaleDelete"                
                @click="openModale('delete', item)"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale de création / Modification -->
    <div class="modal fade" id="modale" tabindex="-1" role="dialog">      
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
  
          <div class="modal-header bg-dark">
              <h5 class="modal-title">{{titreModale}}</h5>                          
              <button type="button" class="close" data-dismiss="modal" 
                aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              
            <table class="table">
              <thead> 
                <tr class="text-center">
                  <td><h5>Affiche & synopsis</h5></td>
                  <td><h5>Informations</h5></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="col-5">
                    <div>
                      <div class="input-group-prepend">
                        <span class="input-group-text">Synopsis</span> 
                      </div>
                      <textarea class="form-control" v-model="video.synopsis" rows="5"></textarea>                      
                    </div>
                    <hr/>
                    <div class="input-group"> 
                      <div class="input-group-prepend">
                        <span class="input-group-text">Image</span> 
                      </div>
                      <div class="custom-file"> 
                        <input type="file" class="custom-file-input" 
                          @change="previewImage" >
                      </div>
                      <label class="custom-file-label" for="file">Sélectionner une image</label>
                    </div>
                    <div class="text-center mt-4">
                      <img :src="affichePreview" class="img-fluid"/>
                    </div>
                  </td>
                  <td class="col-7">

                    <div class="input-group mb-3"> 
                      <div class="input-group-text">Titre : </div>
                      <input class="form-control" v-model="video.titre" />
                    </div>

                    <div class="input-group mb-3"> 
                      <div class="input-group-text">Année : </div>
                      <input type="number" class="form-control" v-model="video.annee" />
                    </div>

                    <div class="card">
                      <div class="card-title btn btn-light mt-3"><b>Catégories</b> 
                        <div class="card-body d-flex justify-content-around">
                          <div v-for="cat in listeCategories" :key="cat.id">
                              <button :class="verifClass(cat)" @click="selectCat(cat)">
                                {{ cat.libelle }}
                              </button>
                          </div>
                        </div> 
                      </div> 
                    </div>

                    <div class="card">
                      <div class="card-title btn btn-light mt-3">
                        <b>Acteurs</b>
                      </div>
                    
                      <div class="card-body">
                        <table class="table"> 
                          <tbody>
                            <tr>
                              <td class="col-6">
                                <div class="input-group mb-3">
                                  <div class="input-group-text"> 
                                    <i class="fa fa-search fa-lg mr-2"></i>Recherche :
                                  </div>
                                  <input class="form-control" v-model="searchAct" @input="searchPersonne" />
                                </div>                                
                                <div v-for="acteur in lstPersonResult" :key="acteur.id"> 
                                  <button class="btn btn-primary mb-2">
                                    {{ acteur.prenom }} {{ acteur.nom }}
                                    <i class="fa fa-plus-circle fa-lg m-1" title="Ajouter à la vidéo"
                                      @click="addPersonne(acteur)"></i>
                                  </button>
                                </div>
                              </td>
                              <td class="col-6">
                                <h6>Acteurs/trices de la vidéo</h6>
                                <div class="d-flex flex-column"> 
                                  <div v-for="acteur in listeActeurs" :key="acteur.id"> 
                                    <button class="btn btn-success mb-2">
                                      {{ acteur.prenom }} {{ acteur.nom }}
                                      <i class="fa fa-trash fa-lg m-1" title="Supprimer de la vidéo"
                                        @click="delPersonne(acteur)"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="card-footer"> 
              <button type="button" class="btn btn-dark float-left" 
                data-dismiss="modal" >Cancel</button>
              <button type="button" class="btn btn-dark float-right"
                data-dismiss="modal"
                @click="updateFilm(typeMvt)">
                  Valider
              </button>
          </div>
        </div>    
      </div>
    </div>

    <!-- Modale de suppression -->
    <div class="modal fade" id="modaleDelete" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title">Suppression d'une vidéo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert">
                <h5 class="text-center">
                Attention, vous allez supprimer cette vidéo, 
                cette suppression est irréversible !!</h5>
            </div>

            <div> 
              <div class="float-left mr-4">
                <img :src="affichePreview" class="img-fluid" style="max-width: 250px;" /> 
              </div>
              <div style="color:black;"> 
                  <h5>Titre : {{ video.titre }}</h5>
                  <h5>Année : {{ video.annee }}</h5>
                  <p>{{ video.synopsis }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-dark float-left" 
              data-dismiss="modal" >Cancel</button>
            <button type="button" class="btn btn-danger float-right"
              data-dismiss="modal"
              @click="del(video)" >
              Supprimer
            </button>            
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
a{
  color:black;
}
</style>


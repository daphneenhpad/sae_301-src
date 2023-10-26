<script setup>
  // Import éléments de vue
  import { ref, onMounted } from 'vue';
  // Import éléments de routage
  import { useRouter } from 'vue-router';
  const router = useRouter()

  // Import pocketbase
  import PocketBase from 'pocketbase'
  // Objet pocketBase
  const pb = new PocketBase("http://127.0.0.1:8090");

  
  // user connecté ? au départ faux
  let isConnected = ref(false)

  // Element de connexion
  let user = ref('')
  let psw = ref('')

  // User connecté
  let currentUser = ref(null)
  let avatar = ref(null)

// Au montage du composant
onMounted(async() => {
  // Vérifier que le user est déjà connecté
  refresh()

})

const refresh = ()=>{
  if(pb.authStore.isValid){
    currentUser.value = pb.authStore.model
    isConnected.value = true

    avatar.value =
      "http://127.0.0.1:8090/api/files/"  // Adresse serveur et repertoire des fichiers image
      +currentUser.value.collectionId     // Id ou name de la collection concernée
      +"/"
      +currentUser.value.id               // Id de l'utilisateur connecté
      +"/"
      +currentUser.value.avatar           // Nom fichier image pocketbase
      +"?thumb=100x100"                   // Taille par défaut     

//      console.log("image avatar utilisateur", avatar)
  }
}

const connect = async()=>{
  try{
    const authData = await pb.collection('users')
    .authWithPassword(user.value, psw.value)
//    console.log("connecté : ",authData)
    refresh()    
  }catch(error){
//    console.log("erreur de connexion : ",error.message)
    alert("Erreur d'identification : mauvais login et/ou mot de passe")
    user.value = ""
    psw.value = ""
  }
}

const deconnect = ()=>{
  // Suppression utilisateur connecté
  pb.authStore.clear()
  isConnected.value=false
  avatar.value = null
  // Retour à la page d'accueil -> Redirection
  router.push({name:"HomeView"})
}
</script>

<template>
  <div class="container-fluid">
    <div class="header">
 
    <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
        <button class="navbar-toggler" 
          type="button" data-toggle="collapse" 
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
    
            <ul class="navbar-nav" v-if="isConnected">              
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/setup">Setup</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/geoloc">Geoloc</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/service">Services</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/composant">Composants</RouterLink>
                </li>
               
                <li class="nav-item dropdown mr-0">                            
                    <a class="nav-link dropdown-toggle" 
                        href="#" 
                        id="dropdown01" 
                        role="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                      PocketBase
                    </a>
                      <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <RouterLink class="dropdown-item" to="/pocketbase01">Consultations/Maj 01</RouterLink>
                        <RouterLink class="dropdown-item" to="/pocketbase02">Consultations/Maj 02</RouterLink>
                      </div>
                </li>
            </ul >
           
             <div class="logo"><RouterLink to="/"><img src="/img/logo_tavue.png" alt="Logo"></RouterLink></div>
        <nav>
            <ul>
                <li><RouterLink to="/personnaliser">PERSONNALISER</RouterLink></li>
                <li><a href="#">NOS PRODUITS</a></li>
                <li><RouterLink to="/geoloc">POINTS RELAIS</RouterLink></li>
                <li><a href="#">CONTACT</a></li>
            </ul>
        </nav>
        <div class="icons">
            <div class="icon"><RouterLink to="/personnaliser"><img src="/img/edit.png" alt="Crayon"></RouterLink></div>
            <div class="icon"><RouterLink to="/compte"><img src="/img/user.png" alt="Compte"></RouterLink></div>
            <div class="icon"><RouterLink to="/panier"><img src="/img/shopping-basket.png" alt="Panier"></RouterLink></div>
        </div>

            <div class="ml-auto">              
              <span v-if="isConnected"> 
                <img :src="avatar" class="img-fluid" style="max-width:60px;" />
                <button class="btn btn-light mr-2">
                  {{ currentUser.name }}
                </button>              
                <button class="btn btn-dark ml-auto" type="button" @click="deconnect">
                    <i class="fa fa-sign-out"></i>
                  </button>
              </span>

              <form v-else class="form-inline  input-group-sm ml-auto" >
                  <input class="form-control mr-2" placeholder="Login" v-model="user">
                  <input class="form-control mr-2" placeholder="Password" v-model="psw">
                  <button class="btn btn-dark ml-auto" 
                      type="button" @click.prevent="connect">
                      <i class="fa fa-power-off"></i>
                  </button>
                </form>
              </div>

        </div>

    </nav>
  </div>
    
    <RouterView />

  </div>
</template>
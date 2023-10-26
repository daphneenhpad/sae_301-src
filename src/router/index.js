import { createRouter, createWebHistory } from 'vue-router'
import HomeView from            '../views/HomeView.vue'
import SetupView from           '../views/SetupView.vue'
import GeolocView from          '../views/GeolocView.vue'
import ServiceView from         '../views/ServiceView.vue'
import ComponentView from       '../views/ComponentView.vue'
import PocketBase01View from       '../views/PocketBase01View.vue'
import PocketBase02View from       '../views/PocketBase02View.vue'

import PersonnalisationView from       '../views/PersonnalisationView.vue'
import CompteView from       '../views/CompteView.vue'
import PanierView from       '../views/PanierView.vue'

// Import pocketbase
import PocketBase from 'pocketbase'
// Objet pocketBase
const pb = new PocketBase("http://127.0.0.1:8090");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',              name: 'HomeView',           component: HomeView },
    { path: '/personnaliser',              name: 'PersonnalisationView',           component: PersonnalisationView },
    { path: '/compte',              name: 'CompteView',           component: CompteView },
    { path: '/panier',              name: 'PanierView',           component: PanierView },
    
    { path: '/setup',         name: 'SetupView',          component: SetupView },
    { path: '/geoloc',        name: 'GeolocView',         component: GeolocView },
    { path: '/service',       name: 'ServiceView',        component: ServiceView },
    { path: '/composant',     name: 'ComponentView',      component: ComponentView },
    { path: '/pocketbase01',  name: 'PocketBase01View',   component: PocketBase01View },
    { path: '/pocketbase02',  name: 'PocketBase02View',   component: PocketBase02View },
  ]
})

// Vérification de route demandée
// to : où il veut aller
// from : d'où il vient 
// next : s'il peut y aller
/*
router.beforeEach( (to, from, next) =>{
  if(to.name == "HomeView"){ // Si page d'accueil demandée, on autorise
    next()
  }else{  // Si une autre route est demandée, on vérifie si l'utilisateur est connecté        
    if(pb.authStore.model != null){ // Utilisateur connecté => OK
      next()
    }else{ // Utilisateur non connecté, redirection sur la page d'acceuil
      router.push({name:"HomeView"})
    }
  }
})
*/
export default router

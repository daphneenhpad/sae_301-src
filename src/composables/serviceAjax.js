// Service d'appels Ajax via fetch    

// les fonctions sont exportables
// afin de permetre leur utilisation par un programme externe
// (réutilisable par import) 

// Promesse de recherche pour les villageois
export const getVillageois = async () => {
    // Requête Ajax 
    let rq = "https://jsongaulois.jmfino.fr/listeVillageois.php"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}

// Promesse de recherche pour les vidéos
export const getVideos = async () => {
    // Requête Ajax 
    let rq = "https://jsonvideo.jmfino.fr/listeVideo.php"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}

// Promesse de recherche pour les régions
export const getRegions = async () => {
    // Requête Ajax 
    let rq = "https://geo.api.gouv.fr/regions"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}

// Promesse de recherche pour les départements d'une région
export const getDepartements = async (codeRegion) => {
    // Requête Ajax 
    let rq = "https://geo.api.gouv.fr/regions/"+codeRegion+"/departements"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}

// Promesse de recherche pour les commune d'un département
export const getCommunesDepartement = async (codeDepartement) => {
    // Requête Ajax 
    let rq = "https://geo.api.gouv.fr/departements/"+codeDepartement+"/communes"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}

// Promesse de recherche pour la liste des EPCIs
export const getEpcis = async () => {
    // Requête Ajax 
    let rq = "https://geo.api.gouv.fr/epcis"
    // Retour des résultats , attentio 2 return
    return await fetch(rq) // on renvoie la requete à qui le demande
        .then(response => {
            return response.json()  // return du resultat en json
        })
        .catch(error => { throw error } ) // Cas d'erreur
}









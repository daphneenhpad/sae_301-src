// Service de calculs statistiques

// les fonctions sont exportables
// afin de permetre leur utilisation par un programme externe
// (réutilisable par import) 

// Permet d'obtenir un comptage d'occurences rencontrées pour une rubrique indiquée
// lstData : le flux de données
// label : la rubrique demandée pour le comptage
export const countData = (lstData, label) => {
    // Récupération des valeurs de la rubrique indiquée
    let tabObj = []
    lstData.forEach( (element) => {
        // lelement[label] meê chose que element.label
        // par exemple villageois[nomSpecialite] = villageois.nomSpecialite
        // Parce que element.label ne marcherait pas (ça serait element.nomSpecialite)
        // Mais in ne connait pas au prélable le nom du label (nomSpecialite, nomLieu ? ... )
        tabObj.push(element[label])
    })
    // Set pour elemenation des doublons
    let set = new Set(tabObj)
    // Reprise du set sous forme d'un tableau
    tabObj = Array.from(set)

    // Comptage des valeurs
    let nbTotal = 0 // nb total des valeurs
    let result = [] // Tableau de resultat des comptages
    // Parcours du tableau des rubriques
    tabObj.forEach ( (element)=>{
        // nb de valeurs rencontrées - initialisation
        let nb = 0
        lstData.forEach( (data)=> {
            if(data[label] == element ){
                nb++ // nombre pour la rubrique
                nbTotal++ // nombre total
            }
        })
        // Récupération des informations
        // Création d'un objet
        let calcul = {
            label: element, // Nom de la rubrique
            total: nb // Nombre de comptage
        }
        // Alimentation tableau de resultats
        result.push(calcul)
    })
    // Ligne de totalisation totale
    let total = {
        label: "Total",
        total: nbTotal
    }
    result.push(total)
    // Renvoi du résultat
    return result
}

// Permet d'obtenir un comptage d'occurences rencontrées pour une rubrique indiquée
// lstData : le flux de données
// label : la rubrique demandée pour le comptage
export const countDataMulti = (lstData, label) => {
    // Récupération des valeurs de la rubrique indiquée
    let tabObj = []
    lstData.forEach( (element) => {
        tabObj.push(element[label])
    })
    // Cas des valeurs multiples
    let temp = []
    tabObj.forEach( (value)=>{
        let val = value.split(' ')
        val.forEach( (v)=>{
            temp.push(v)
        })
    })
    tabObj = temp
    // Set pour elemenation des doublons
    let set = new Set(tabObj)
    // Reprise du set sous forme d'un tableau
    tabObj = Array.from(set)
    // Suppression des valeurs vides
    // car split() sur une valeur vide donne au moins un element vide
    tabObj = tabObj.filter( (item)=> item != "" )

    // Comptage des valeurs
    let nbTotal = 0 // nb total des valeurs
    let result = [] // Tableau de resultat des comptages
    // Parcours du tableau des rubriques
    tabObj.forEach ( (element)=>{
        // nb de valeurs rencontrées - initialisation
        let nb = 0
        lstData.forEach( (data)=> {
            if(data[label].includes(element) ){
                nb++ // nombre pour la rubrique
                nbTotal++ // nombre total
            }
        })
        // Récupération des informations
        // Création d'un objet
        let calcul = {
            label: element, // Nom de la rubrique
            total: nb // Nombre de comptage
        }
        // Alimentation tableau de resultats
        result.push(calcul)
    })
    // Ligne de totalisation totale
    let total = {
        label: "Total",
        total: nbTotal
    }
    result.push(total)
    // Renvoi du résultat
    return result  
}



// Permet de calculer la somme de valeur pour un propriété, 
// la valeur étant contenant dans une autre propriété
// lstData : le flux de données
// label : la propriété pour laquelle la somme est effectuée
// f : la propriété contenant la valeur pour le calcul
export const sumWhereFor = (lstData, label, f) => {
    // Récupération des valeurs de la rubrique indiquée
    let tabObj = []
    lstData.forEach( (element) => {
        tabObj.push(element[label])
    })
    // Set pour elemenation des doublons
    let set = new Set(tabObj)
    // Reprise du set sous forme d'un tableau
    tabObj = Array.from(set)

    // Comptage des valeurs
    let result = [] // Tableau de resultat des comptages
    // Parcours du tableau des rubriques
    tabObj.forEach ( (element)=>{
        // nb de valeurs rencontrées - initialisation
        let sum = 0
        lstData.forEach( (data)=> {
            // Si la propriété en cours des données (data ou la commune dans notre cas)
            // par exemple : codeDepartement
            // est égale à l'élément demandé
            // par exemple : codeDepartement
            // On effectue la somme
            if(data[label] == element ){
                sum+= data[f] 
            }
        })
        // Récupération des informations
        // Création d'un objet
        let calcul = {
            label: element, // Nom de la rubrique
            total: sum // Somme
        }
        // Alimentation tableau de resultats
        result.push(calcul)
    })
    // Renvoi du résultat
    return result
}

// Fonction de linearisation d'une propriété composée
// object :l'objet concerné
// composite : La propriété composite
// property : la propriete ou les propriété contenant la/les valeurs à récupérer pour une concaténation
// Si plusieurs propriétés, elles sont séparées par | (pipe)
// cible : la propriété cible à créer dynamiquement qui contiendra les valeurs séparées par " - "
export const linearise = (object, composite, property)=>{
    // Inotialisation du résultat à renvoyer
    let result = ""
    // Boucle sur l'objet composite à parcourir
    object[composite].forEach( (comp)=>{
        // Verification si property contient plusieurs rubriques
        // séparées par |
        let tab = property.split("|")
        let temp = ""        
        // Boucle sur les valeurs
        tab.forEach( (prop) => {
            temp += comp[prop]+" " 
        })
        result += temp+ " - "
    })
    // Suppression du dernier " - "
    result = result.slice(0,-3)
    return result
}  